import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Divider,
  Avatar,
  Alert,
  Snackbar,
} from '@mui/material';
import { Visibility, VisibilityOff, Phone as PhoneIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Add Google icon component
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const LOGO_SRC = process.env.PUBLIC_URL + '/alg.png';

const AuthPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [register, setRegister] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== undefined) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Updated handlers with Firebase implementation
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm(login)) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      showSnackbar('Login successful! Redirecting to homepage...', 'success');
      navigate('/home');
    } catch (err) {
      let errorMessage = 'Failed to login';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm(register)) return;
  
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, register.email, register.password);
      showSnackbar('Account created successfully! Redirecting to homepage...', 'success');
      navigate('/home');
    } catch (err) {
      let errorMessage = 'Failed to create account';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      showSnackbar('Please enter your email address', 'error');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      showSnackbar('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      showSnackbar('Password reset link sent to your email!', 'success');
      setResetEmail('');
    } catch (err) {
      let errorMessage = 'Failed to send reset email';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showSnackbar('Google sign in successful! Redirecting to homepage...', 'success');
      navigate('/home');
    } catch (err) {
      let errorMessage = 'Failed to sign in with Google';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in was cancelled';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups for this site';
      }
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = (provider) => {
    if (provider === 'Google') {
      handleGoogleSignIn();
    } else {
      showSnackbar(`${provider} sign in coming soon!`, 'info');
    }
  };

  const handleGuest = () => {
    showSnackbar('Welcome! You can browse our products as a guest. Sign in to access your cart and make purchases.', 'info');
    navigate('/home');
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, width: '100%', mt: 6 }}>
        {/* Logo and Site Name */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar src={LOGO_SRC} alt="Ann's Luxury Gifts Logo" sx={{ width: 56, height: 56, mb: 1, borderRadius: 2 }} />
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            Ann's Luxury Gifts
          </Typography>
        </Box>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3, '& .MuiTab-root': { fontWeight: 600 } }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
          <Tab label="Reset Password" />
        </Tabs>

        {tab === 0 && (
          <form onSubmit={handleLogin}>
            <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}>
              Welcome Back
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={login.email}
              onChange={e => setLogin({ ...login, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              margin="normal"
              value={login.password}
              onChange={e => setLogin({ ...login, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, mb: 1, py: 1.2, fontWeight: 600 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Divider sx={{ my: 2 }}>or</Divider>
            <Button
              variant="outlined"
              fullWidth
              disabled={loading}
              startIcon={<GoogleIcon />}
              sx={{ mb: 1, borderColor: theme.palette.highlight.main, color: theme.palette.highlight.main, '&:hover': { borderColor: theme.palette.highlight.dark, background: theme.palette.highlight.light + '10' } }}
              onClick={() => handleSocial('Google')}
            >
              Sign in with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              disabled={loading}
              startIcon={<PhoneIcon />}
              sx={{ mb: 1, borderColor: theme.palette.accent.main, color: theme.palette.accent.main, '&:hover': { borderColor: theme.palette.accent.dark, background: theme.palette.accent.light + '10' } }}
              onClick={() => handleSocial('Phone Number')}
            >
              Sign in with Phone Number
            </Button>
            <Divider sx={{ my: 2 }}>or</Divider>
            <Button
              variant="text"
              fullWidth
              disabled={loading}
              onClick={handleGuest}
              sx={{ color: theme.palette.text.secondary, '&:hover': { background: theme.palette.action.hover } }}
            >
              Continue as Guest
            </Button>
          </form>
        )}

        {tab === 1 && (
          <form onSubmit={handleRegister}>
            <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}>
              Create Account
            </Typography>
            <TextField
              label="Name"
              type="text"
              fullWidth
              required
              margin="normal"
              value={register.name}
              onChange={e => setRegister({ ...register, name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={register.email}
              onChange={e => setRegister({ ...register, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              margin="normal"
              value={register.password}
              onChange={e => setRegister({ ...register, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              required
              margin="normal"
              value={register.confirmPassword}
              onChange={e => setRegister({ ...register, confirmPassword: e.target.value })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, mb: 1, py: 1.2, fontWeight: 600 }}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>
        )}

        {tab === 2 && (
          <form onSubmit={handleReset}>
            <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}>
              Reset Password
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="accent"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuthPage; 
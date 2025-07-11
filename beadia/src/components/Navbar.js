import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Badge,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle,
  Logout,
  Person,
  Login,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const { getCartItemCount } = useCart();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleProfileMenuClose();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCartClick = () => {
    if (!user) {
      setCartDialogOpen(true);
    } else {
      navigate('/cart');
    }
  };

  const handleCloseCartDialog = () => {
    setCartDialogOpen(false);
  };

  const handleLoginFromCart = () => {
    setCartDialogOpen(false);
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', path: '/home' },
    { text: 'Products', path: '/products' },
    { text: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
        >
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              style: {
                color: theme.palette.primary.main,
                fontWeight: 500,
              },
            }}
          />
        </ListItem>
      ))}
      {user ? (
        <>
          <Divider sx={{ my: 1 }} />
          <ListItem
            button
            onClick={handleLogout}
          >
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                style: {
                  color: theme.palette.error.main,
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        </>
      ) : (
        <>
          <Divider sx={{ my: 1 }} />
          <ListItem
            button
            component={RouterLink}
            to="/login"
            onClick={handleDrawerToggle}
          >
            <ListItemText
              primary="Login"
              primaryTypographyProps={{
                style: {
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.primary.light}20`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              component={RouterLink}
              to="/home"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <img
                src={process.env.PUBLIC_URL + '/alg.png'}
                alt="Ann's Luxury Gifts Logo"
                style={{ width: 32, height: 32, marginRight: 8, objectFit: 'contain', borderRadius: 4 }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: theme.palette.primary.main,
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                }}
              >
                Ann's Luxury Gifts
              </Typography>
            </Box>

            {isMobile ? (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  variant="temporary"
                  anchor="right"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true,
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                >
                  {drawer}
                </Drawer>
              </>
            ) : (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: theme.palette.primary.main,
                      mx: 1,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: theme.palette.highlight.main,
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            <IconButton
              onClick={handleCartClick}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  color: theme.palette.highlight.main,
                },
              }}
            >
              <Badge
                badgeContent={getCartItemCount()}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: theme.palette.highlight.main,
                    color: theme.palette.highlight.contrastText,
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* User Profile Menu */}
            {user ? (
              <Box sx={{ ml: 1 }}>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      color: theme.palette.highlight.main,
                    },
                  }}
                >
                  {user.photoURL ? (
                    <Avatar
                      src={user.photoURL}
                      alt={user.displayName || user.email}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <MenuItem disabled>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person sx={{ mr: 1, fontSize: 20 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {user.displayName || 'User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1, fontSize: 20 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                startIcon={<Login />}
                sx={{
                  ml: 1,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.highlight.main,
                  },
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Cart Access Dialog for Guests */}
      <Dialog
        open={cartDialogOpen}
        onClose={handleCloseCartDialog}
        aria-labelledby="cart-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="cart-dialog-title">
          Sign In Required
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            You need to sign in to access your shopping cart and complete purchases.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to save your cart items and proceed with checkout.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCartDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleLoginFromCart} 
            variant="contained" 
            color="primary"
            startIcon={<Login />}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar; 
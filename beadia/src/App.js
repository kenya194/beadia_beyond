import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { CartProvider } from './context/CartContext';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1B4D3E', // Deep Emerald Green
      light: '#2D6A5A',
      dark: '#0F2A22',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D4B996', // Metallic Champagne
      light: '#E5D0B5',
      dark: '#B39A7A',
      contrastText: '#1B4D3E',
    },
    neutral: {
      main: '#2C2C2C', // Charcoal
      light: '#4A4A4A',
      dark: '#1A1A1A',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#E2725B', // Terracotta
      light: '#E88A77',
      dark: '#C45A44',
      contrastText: '#FFFFFF',
    },
    highlight: {
      main: '#008080', // Teal
      light: '#00A0A0',
      dark: '#006060',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FDF6E9', // Creamy Off-White
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C', // Dark Charcoal
      secondary: '#4A4A4A',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: '#1B4D3E',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: '#1B4D3E',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: '#1B4D3E',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      color: '#1B4D3E',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      color: '#1B4D3E',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      color: '#1B4D3E',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#2D6A5A',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#E5D0B5',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease-in-out',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(253, 246, 233, 0.95), rgba(253, 246, 233, 0.95))',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

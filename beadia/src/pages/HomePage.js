import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import { motion } from 'framer-motion';

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Beads Collection',
    price: 'Ghc450.00',
    image: '/images/Rhinestone.jpg',
  },
  {
    id: 2,
    name: 'Handcrafted Jewelry Set',
    price: 'Ghc150.00',
    image: '/images/Schwarzes.jpg',
  },
  {
    id: 3,
    name: 'Artisan Bead Kit',
    price: 'Ghc130.00',
    image: '/images/bead.jpg',
  },
  {
    id: 4,
    name: 'Artisan Jewelry Set',
    price: 'Ghc130.00',
    image: '/images/jewelry.jpg',
  },
  {
    id: 5,
    name: 'Customized Diaries',
    price: 'Ghc200.00',
    image: '/images/diaries.jpg',
  },
  {
    id: 6,
    name: 'Customized Wallets',
    price: 'Ghc180.00',
    image: '/images/wallet1.jpg',
  },
  {
    id: 7,
    name: 'Customized pack',
    price: 'Ghc350.00',
    image: '/images/pack.jpg',
  },
];

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#f1cf90' }}>
                  Discover Unique Beads & Jewelry
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ color: '#f1cf90' }}>
                  Handcrafted with passion, designed for you
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/products"
                  sx={{ mt: 2 }}
                >
                  Shop Now
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Products
        </Typography>
        <Grid container spacing={6}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.name}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={RouterLink}
                      to={`/products/${product.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Store Location CTA */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Visit Our Store
              </Typography>
              <Typography variant="body1" paragraph>
                Experience our products in person at our beautiful store location.
                Our friendly staff is ready to help you find the perfect pieces.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/contact"
              >
                Get Directions
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add a map component or store image here */}
              <Box
                sx={{
                  height: 300,
                  bgcolor: 'grey.300',
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 
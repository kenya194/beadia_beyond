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

// Helper function to generate featured products
const generateFeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Beads Collection',
      // price: 'Ghc120.00',
      image: '/images/Rhinestone.jpg',
      category: 'premium',
    },
    {
      id: 2,
      name: 'Handcrafted Jewelry Set',
      // price: 'Ghc150.00',
      image: '/images/Schwarzes.jpg',
      category: 'jewelry',
    },
    {
      id: 3,
      name: 'Artisan Bead Kit',
      // price: 'Ghc130.00',
      image: '/images/bead.jpg',
      category: 'beads',
    },
    {
      id: 4,
      name: 'Artisan Jewelry Set',
      // price: 'Ghc130.00',
      image: '/images/jewelry.jpg',
      category: 'jewelry',
    },
    {
      id: 5,
      name: 'Customized Diaries',
      // price: 'Ghc200.00',
      image: '/images/diaries.jpg',
      category: 'accessories',
    },
    {
      id: 6,
      name: 'Customized Wallets',
      // price: 'Ghc180.00',
      image: '/images/Wallet1.jpeg',
      category: 'accessories',
    },
    {
      id: 7,
      name: 'Customized Pack',
      // price: 'Ghc350.00',
      image: '/images/pack.jpg',
      category: 'kits',
    },
    {
      id: 8,
      name: 'Royal Alabaster Bracelet',
      // price: 'Ghc280.00',
      image: '/images/The Royal Alabaster Bracelet.jpg',
      category: 'jewelry',
    },
    {
      id: 9,
      name: 'Yin & Yang Collection',
      // price: 'Ghc320.00',
      image: '/images/สร้อยข้อมือ ลูกปัด จี้ห้อย รูปหยิน & หยาง.jpg',
      category: 'jewelry',
    },
    {
      id: 10,
      name: 'Premium Jewelry Collection',
      // price: 'Ghc400.00',
      image: '/images/jewelry2.jpg',
      category: 'jewelry',
    },
    {
      id: 11,
      name: 'Jewelry Collection',
      // price: 'Ghc380.00',
      image: '/images/gold.jpg',
      category: 'premium',
    },
    {
      id: 12,
      name: 'Customized Bottles Set',
      // price: 'Ghc250.00',
      image: '/images/bottles.jpg',
      category: 'kits',
    },
  ];

  return products;
};

// Generate the featured products array
const featuredProducts = generateFeaturedProducts();

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: '50vh', md: '60vh' },
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
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    color: '#f1cf90',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 'bold',
                  }}
                >
                  Discover Unique Beads & Jewelry
                </Typography>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    color: '#f1cf90',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    mb: 4,
                  }}
                >
                  Handcrafted with passion, designed for you
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/products"
                  sx={{ 
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  Shop Now
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 6,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          Featured Products
        </Typography>
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {featuredProducts.map((product) => (
            <Grid item key={product.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      height: 280,
                      objectFit: 'cover',
                    }}
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent 
                    sx={{ 
                      flexGrow: 1,
                      pb: 2,
                      pt: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        mb: 1,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
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
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}
              >
                Visit Our Store
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: '1.1rem',
                  color: 'text.secondary',
                  mb: 4,
                }}
              >
                Experience our products in person at our beautiful store location.
                Our friendly staff is ready to help you find the perfect pieces.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Get Directions
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: 250, md: 400 },
                  bgcolor: 'grey.300',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
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
import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  Chip,
  Rating,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  Share,
  Favorite,
  ArrowBack,
  ShoppingCart,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Sample product data - in a real app, this would come from an API
const products = {
  1: {
    id: 1,
    name: 'Premium Beads Collection',
    price: '$49.99',
    images: [
      '/images/beads1.jpg',
      '/images/beads2.jpg',
      '/images/beads3.jpg',
    ],
    description: 'A premium collection of handcrafted beads perfect for creating unique jewelry pieces. Each bead is carefully selected for its quality and beauty.',
    specifications: {
      material: 'Glass, Stone, Wood',
      size: 'Various sizes from 4mm to 12mm',
      colors: 'Multiple colors available',
      quantity: '100 pieces',
    },
    rating: 4.5,
    reviews: 24,
    stock: 'In Stock',
    category: 'beads',
  },
  // Add more products as needed
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = products[id];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Product not found</Typography>
        <Button
          component={RouterLink}
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={RouterLink}
        to="/products"
        startIcon={<ArrowBack />}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <motion.img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mt: 2,
                overflowX: 'auto',
                pb: 1,
              }}
            >
              {product.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid #1976d2' : 'none',
                  }}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} reviews)
              </Typography>
            </Box>
            <Typography variant="h4" color="primary" gutterBottom>
              {product.price}
            </Typography>
            <Chip
              label={product.stock}
              color={product.stock === 'In Stock' ? 'success' : 'warning'}
              sx={{ mb: 2 }}
            />
          </Box>

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Specifications
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Typography variant="body1">{value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ flexGrow: 1 }}
            >
              Add to Cart
            </Button>
            <IconButton color="primary">
              <Share />
            </IconButton>
            <IconButton color="primary">
              <Favorite />
            </IconButton>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<LocationOn />}
            component={RouterLink}
            to="/contact"
            fullWidth
          >
            Visit Store
          </Button>
        </Grid>
      </Grid>

      {/* Related Products Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          You May Also Like
        </Typography>
        <Grid container spacing={3}>
          {/* Add related products here */}
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails; 
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Share,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Customized Bottles',
    price: 'Ghc150 - Ghc200',
    image: '/images/bottles.jpg',
    category: 'kits',
    stock: 'In Stock',
  },
  {
    id: 2,
    name: 'Customized Jewelry Set',
    price: 'Ghc150 - Ghc200',
    image: '/images/gold.jpg',
    category: 'jewelry',
    stock: 'In Stock',
  },
  {
    id: 3,
    name: 'Beads',
    price: 'Ghc120 - Ghc150',
    image: '/images/bracelets.jpg',
    category: 'beads',
    stock: 'In Stock',
  },
  {
    id: 4,
    name: 'Customized Sets',
    price: 'Ghc350 - Ghc450',
    image: '/images/package.jpg',
    category: 'beads',
    stock: 'In Stock',
  },

  // Add more products as needed
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price') {
        return parseFloat(a.price.replace('$', '')) -
          parseFloat(b.price.replace('$', ''));
      }
      return 0;
    });

  const handleAddToCart = (product) => {
    addToCart(product);
    setSelectedProduct(product);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>

      {/* Filters and Search */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Products"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="beads">Beads</MenuItem>
                <MenuItem value="jewelry">Jewelry</MenuItem>
                <MenuItem value="kits">Kits</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {product.price}
                  </Typography>
                  <Chip
                    label={product.stock}
                    color={product.stock === 'In Stock' ? 'success' : 'warning'}
                    size="small"
                  />
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
                  <Button
                    size="small"
                    color="secondary"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton size="small">
                    <Favorite />
                  </IconButton>
                  <IconButton size="small">
                    <Share />
                  </IconButton>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

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
          {selectedProduct && `${selectedProduct.name} added to cart!`}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductList; 
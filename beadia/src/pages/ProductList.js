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

// Helper function to generate products
const generateProducts = () => {
  const products = [];
  let id = 1;

  // Generate bead products (B1-B17)
  for (let i = 1; i <= 17; i++) {
    products.push({
      id: id++,
      name: `Bead Set ${i}`,
      price: 'Ghc120 - Ghc150',
      image: `/images/B${i}.jpg`,
      category: 'beads',
      stock: 'In Stock',
    });
  }

  // Generate jewelry products (J1-J11)
  for (let i = 1; i <= 11; i++) {
    products.push({
      id: id++,
      name: `Jewelry Set ${i}`,
      price: 'Ghc150 - Ghc200',
      image: `/images/J${i}.jpg`,
      category: 'jewelry',
      stock: 'In Stock',
    });
  }

  // Generate kit products (D1-D8)
  for (let i = 1; i <= 8; i++) {
    products.push({
      id: id++,
      name: `Kit Set D${i}`,
      price: 'Ghc350 - Ghc450',
      image: `/images/D${i}.jpg`,
      category: 'kits',
      stock: 'In Stock',
    });
  }

  // Generate kit products (W1-W3)
  for (let i = 1; i <= 3; i++) {
    products.push({
      id: id++,
      name: `Kit Set W${i}`,
      price: 'Ghc350 - Ghc450',
      image: `/images/W${i}.jpg`,
      category: 'kits',
      stock: 'In Stock',
    });
  }

  return products;
};

// Generate the products array
const products = generateProducts();

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
            <FormControl fullWidth>
              <InputLabel>Search</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                sx={{ 
                  bgcolor: 'background.paper',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="beads">Beads Collection</MenuItem>
                <MenuItem value="jewelry">Jewelry Collection</MenuItem>
                <MenuItem value="kits">Kit Sets</MenuItem>
                <MenuItem value="premium">Premium Collection</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
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
                sx={{ 
                  bgcolor: 'background.paper',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Product Grid */}
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: { xs: 2, sm: 3, md: 4 },
          mt: 2,
        }}
      >
        {filteredProducts.map((product) => (
          <Grid item key={product.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
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
                    height: 320,
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    <Chip
                      label={product.stock}
                      color={product.stock === 'In Stock' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="medium"
                    color="secondary"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    sx={{ 
                      width: '100%',
                      py: 1,
                    }}
                  >
                    Add to Cart
                  </Button>
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
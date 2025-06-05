import React from 'react';
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
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { getCartItemCount } = useCart();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
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
    </List>
  );

  return (
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
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <StoreIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: 32,
                mr: 1,
              }}
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
            component={RouterLink}
            to="/cart"
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 
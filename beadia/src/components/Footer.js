import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  TextField,
  Button,
} from '@mui/material';
import {
  Instagram,
  Twitter,
  WhatsApp,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { FaSnapchat } from 'react-icons/fa';


const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        py: 6,
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(to right, ${theme.palette.highlight.main}, ${theme.palette.accent.main})`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.secondary.main,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
              }}
            >
              Beadia Beyond
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: theme.palette.primary.contrastText }}>
              Discover the art of beadwork with our premium collection of beads and
              jewelry-making supplies.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>

              <IconButton 
                component="a"
                href="https://www.snapchat.com/add/an-gella71"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <FaSnapchat style={{ fontSize: '1.5rem' }} />
              </IconButton>

              <IconButton
              component="a"
              href="https://www.instagram.com/customization_resin_art?igsh=MTVkNTI3anY2anlsdA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
                sx={{
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com/beadiabeyond"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href="https://wa.me/233540754502"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.secondary.main,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/products"
                color="inherit"
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                  },
                }}
              >
                Products
              </Link>
              <Link
                href="/about"
                color="inherit"
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                  },
                }}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                  },
                }}
              >
                Contact
              </Link>
              <Link
                href="/blog"
                color="inherit"
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    color: theme.palette.highlight.main,
                  },
                }}
              >
                Blog
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.secondary.main,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
              }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: theme.palette.secondary.main }} />
                <Typography variant="body2" sx={{ color: theme.palette.primary.contrastText }}>
                 Burma Camp, Accra, Ghana
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <Typography variant="body2" sx={{ color: theme.palette.primary.contrastText }}>
                  +233 540754502 

                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: theme.palette.secondary.main }} />
                <Typography variant="body2" sx={{ color: theme.palette.primary.contrastText }}>
                mensahangelina33@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.secondary.main,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
              }}
            >
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: theme.palette.primary.contrastText }}>
              Subscribe to our newsletter for the latest updates and offers.
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <TextField
                placeholder="Your email"
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& fieldset': {
                      borderColor: theme.palette.secondary.main,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.highlight.main,
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.highlight.main,
                  color: theme.palette.highlight.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.highlight.dark,
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.primary.light}40`,
            mt: 4,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.primary.contrastText }}>
            © {new Date().getFullYear()} ALG. All rights reserved. Designed by <Link href="https://ernestbuilds.vercel.app/" target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.secondary.main, textDecoration: 'none', '&:hover': { color: theme.palette.highlight.main } }}>Ernest Amankwah</Link> 
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

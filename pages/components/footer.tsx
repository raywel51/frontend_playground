import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: 'auto',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="sm">
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Website Name
        </Typography>
      </Container>
    </FooterContainer>
  );
}

export default Footer;

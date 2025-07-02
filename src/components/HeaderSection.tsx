// import React from 'react';
import { Box, Typography, Button, IconButton, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HeaderSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #f72585',
        borderRadius: '12px',
        padding: 2,
        mb: 3,
        background: 'linear-gradient(90deg, #2a1446, #212154)',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <IconButton sx={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          <strong>Event Name</strong> <span style={{ fontWeight: 400, fontSize: '0.9rem' }}>(Venue Details)</span>
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#f72585',
            color: '#fff',
            borderRadius: '6px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#e31570',
            },
          }}
        >
          Event Details
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#f72585',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#311a52',
              borderColor: '#f72585',
            },
          }}
        >
          Assign Coordinator/Contractor
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#f72585',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#311a52',
              borderColor: '#f72585',
            },
          }}
        >
          Session Management
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#f72585',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#311a52',
              borderColor: '#f72585',
            },
          }}
        >
          Generate SOW
        </Button>
      </Stack>
    </Box>
  );
};

export default HeaderSection;
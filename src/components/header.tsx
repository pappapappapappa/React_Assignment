// Header.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, InfoOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import BitCoin from '../assets/bitCoin.png';
import User from '../assets/user.jpg';
import Sidebar from './Sidebar';
import { FAMILY } from '../theme';

const Header: React.FC = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        px: 1,
        mb: 2,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          alignItems: 'center',
          minHeight: '64px !important',
          padding: 0,
        }}
      >
        {/* LEFT: Logo + Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: isMobile ? 'auto' : '81%' }}>
          <Box
            component="img"
            src={BitCoin}
            alt="Logo"
            sx={{ width: 35, height: 35 }}
          />
          {isMobile && <Box onClick={() => setMobileOpen(true)} sx={{ color: 'white' }}>
            <MenuIcon />
          </Box>}
        </Box>

        {/* CENTER: Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <InfoOutlined sx={{ color: 'white', fontSize: 20 }} />
          </IconButton>
          <IconButton sx={{marginRight: isMobile ? 0 : 2}}>
            <Badge variant="dot" color="secondary">
              <NotificationsNoneOutlined sx={{ color: 'white', fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Box>

        {/* RIGHT: User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src={User}
            alt="User"
            sx={{
              border: '2px solid #ff69b4',
              borderRadius: '50%',
              height: 35,
              width: 35,
              objectFit: 'cover',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#ffffff',
                fontFamily: FAMILY.kanitRegular,
                lineHeight: 1,
              }}
            >
              Hi,{' '}
              <span style={{ color: '#00FFFF' }}>Muhammad Asad</span>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#bbbbbb',
                fontFamily: FAMILY.kanitRegular,
                lineHeight: 1,
              }}
            >
              welcome back!
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      {/* Sidebar */}
      {isMobile && <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />}
    </AppBar>
  );
};

export default Header;

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  styled,
  Badge,
  Button,
  Drawer
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Logout,
} from '@mui/icons-material';
import branchLine from '../assets/tree.png'
import { FAMILY } from '../theme';
import {
  useMediaQuery,
  useTheme,
} from '@mui/material';

type SidebarProps = {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

const SidebarWrapper = styled(Box)(({}) => ({
  width: '100%',
  minWidth: 250,
  background: '#0e081b',
  color: '#fff',
  border: '2px solid #c445f3',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: '5px',
}));

const GlowText = styled(Typography)(() => ({
  color: '#D175B6',
  fontFamily:FAMILY.kanitSemiBold,
  fontSize:20,
  fontWeight:500,
  width:'90%',
  textShadow: '0 0 6px #D175B6',
}));

const SubItem = styled(ListItemButton)<{ selected?: boolean }>(({ selected }) => ({
  marginLeft: '10px',
  width: '80%',
  height: '40px',
  flexDirection: 'row',
  color: '#fff',
  marginTop: '25px',
  position: 'absolute',
  borderRadius: '6px',
  border: selected ? '1px solid #f38fff' : 'none',
  backgroundColor: selected ? '#000' : 'transparent',
  '&:hover': {
    backgroundColor: '#1a1a2e',
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const [selectedItem, setSelectedItem] = useState<string>('New Requests');
  const [activeSection, setActiveSection] = useState<string>('Events');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelection = (label: string) => {
    setSelectedItem(label);
    if (isMobile) setMobileOpen(false);
  };

  const handleClick = (section: string) => {
    setActiveSection(prev => (prev === section ? '' : section));
  };

  const drawerContent = (
    <SidebarWrapper sx={{border: isMobile ? 'transparent' : '2px solid #c445f3'}}>
      <Box>
        <List>
          {/* Events */}
          <ListItemButton 
            onClick={() => handleClick('Events')}
            sx={{
              border:  activeSection === 'Events' ? '1px solid #f38fff':'none',
              backgroundColor: activeSection === 'Events' ? '#000': 'none',
              borderRadius: '6px',
              marginX:1,
              paddingX:2,
            }}
          >
            <GlowText>Events</GlowText>
            {activeSection === 'Events' ? <ExpandLess style={{ fill: '#c445f3' }}/> : <ExpandMore style={{ fill: '#c445f3' }}/> }
          </ListItemButton>
          <Collapse in={activeSection === 'Events'} timeout="auto" unmountOnExit>
            <List disablePadding>
              {['New Requests', 'Estimate', 'Events', 'Partial Requests'].map((label, index) => (
                <Box key={label} style={{ display: 'flex', paddingLeft:'10%' }}>
                  <Box
                    component="img"
                    src={branchLine}
                    alt="branch"
                    sx={{
                      marginTop: (index == 0 ? '25px' : '-5px'),
                      height: (index == 0 ? '18px' : '48px'),
                      width: '8px',
                    }}
                  />
                  <SubItem
                    style={{ alignItems: 'center' }}
                    selected={selectedItem === label}
                    onClick={() => handleSelection(label)}
                  >
                    <ListItemText
                      primary={
                        <Typography fontFamily={FAMILY.kanitLight} color="#FFFFFF" fontSize={14}>
                          {label}
                        </Typography>}
                    />
                    {label === 'Estimate' && (
                      <Badge
                        badgeContent={9}
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: '#f38fff',
                            color: '#fff',
                            fontFamily:FAMILY.kanitLight,
                            fontSize: '0.75rem',
                            height: 20,
                            minWidth: 20,
                          },
                        }}
                      />
                    )}
                  </SubItem>
                </Box>
              ))}
            </List>
          </Collapse>

          {/* Positions */}
          <ListItemButton 
            sx={{
              border: activeSection === 'Positions' ? '1px solid #f38fff' : 'none',
              borderRadius: '6px',
              paddingX:2,
              marginX:1,
              marginTop:3
            }}
            onClick={() => handleClick('Positions')}>
            <ListItemText
              primary={
                <Typography fontWeight='500' color="#FFFFFF" fontFamily={FAMILY.kanitBold} fontSize={20}>
                  Positions
                </Typography>}
            />
          </ListItemButton>

          {/* Contractors */}
          <ListItemButton 
            sx={{
              border: activeSection === 'Contractors' ? '1px solid #f38fff' : 'none',
              borderRadius: '6px',
              paddingX:2,
              marginX:1,
              marginTop:2
            }}
            onClick={() => handleClick('Contractors')}>
            <ListItemText
              primary={
                <Typography fontWeight='500' color="#FFFFFF" fontFamily={FAMILY.kanitLight} fontSize={20}>
                  Contractors
                </Typography>}
            />
          </ListItemButton>

          {/* Users */}
          <ListItemButton 
            sx={{
              border: activeSection === 'users' ? '1px solid #f38fff' : 'none',
              borderRadius: '6px',
              paddingX:2,
              marginX:1,
              marginTop:2
            }}
            onClick={() => handleClick('users')}>
            <ListItemText
              primary={
                <Typography fontWeight='500' color="#FFFFFF" fontFamily={FAMILY.kanitLight} fontSize={20}> 
                  Users
                </Typography>}
            />
            {activeSection === 'users' ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={activeSection === 'users'} timeout="auto" unmountOnExit>
            <List disablePadding sx={{marginTop:'0'}}>
              {['Admins', 'Clients', 'Coordinators'].map((label, index) => (
                <Box key={label} style={{ display: 'flex', paddingLeft: '10%' }}>
                  <Box
                    component="img"
                    src={branchLine}
                    alt="branch"
                    sx={{
                      marginTop: (index == 0 ? '25px' : '-5px'),
                      height: (index == 0 ? '18px' : '48px'),
                      width: '8px',
                    }}
                  />
                  <SubItem
                    style={{ alignItems: 'center' }}
                    selected={selectedItem === label}
                    onClick={() => handleSelection(label)}
                  >
                    <ListItemText 
                      primary={
                        <Typography fontFamily={FAMILY.kanitLight} color="#FFFFFF" fontSize={14}>
                          {label}
                        </Typography>} 
                    />
                  </SubItem>
                </Box>
              ))}
            </List>
          </Collapse>

          {/* Profile */}
          <ListItemButton 
            sx={{
              border: activeSection === 'Profile' ? '1px solid #f38fff' : 'none',
              borderRadius: '6px',
              paddingX:2,
              marginX:1,
              marginTop:2
            }}
            onClick={() => handleClick('Profile')}>
            <ListItemText
              primary={
                <Typography fontWeight='500' color="#FFFFFF" fontFamily={FAMILY.kanitLight} fontSize={20}>
                  Profile
                </Typography>}
            />
          </ListItemButton>
        </List>
      </Box>

      {/* Logout */}
      <Box textAlign="center" sx={{ mb: 3, width:'100%' }}>
        <Button 
          startIcon={<Logout />}
          sx={{
            width: '90%',
            mx:'5%',
            justifyContent: 'center',
            background: '#000',
            color: '#fff',
            borderRadius: 2,
            fontSize: 16,
            fontFamily: FAMILY.kanitLight,
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#111',
            },
          }}
        > Logout</Button>
      </Box>
    </SidebarWrapper>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              background: '#0e081b',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Box sx={{ width: '20%', minWidth: 250 }}>{drawerContent}</Box>
      )}
    </>
  );
};

export default Sidebar;

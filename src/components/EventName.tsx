import React, { useState } from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  Tab,
  Tabs,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Sidebar from './Sidebar';
import { FAMILY } from '../theme';
import Star from '../assets/star.png';

const GradientBox = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
  color: 'white',
  fontFamily: 'Roboto, sans-serif',
  width: '95%',
  marginLeft: '2.5%',
  overflowX: 'hidden',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const neonBorder = {
    border: '1px solid #D175B6',
    borderRadius: 2,
    padding: '10px',
    backgroundColor: '#1c1c2b',
};

const coordinatorsList = ['John Doe', 'Jane Smith', 'Alice Johnson'];
const rows = Array.from({ length: 13 });

const EventManagementPage: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<string>('');
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState<string | null>('');
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <GradientBox sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
            flexGrow: 1,
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '100%' : 'auto',
            p: isMobile ? 1.5 : 3,
            border: '1px solid #c445f3',
            borderRadius: '12px',
            ml: isMobile ? 0 : 1,
            padding: isMobile ? 0 : '12px',
            marginLeft: isMobile ? 0 : 3
        }}
        >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontFamily: FAMILY.kanitRegular,
            fontSize: isMobile ? '24px' : '30px',
            fontWeight: '600'
          }}
        >
          Event Name{' '}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{
              fontFamily: FAMILY.kanitRegular,
              fontSize: isMobile ? '14px' : '18px',
              fontWeight: '400'
            }}
          >
            (Venue Details)
          </Typography>
        </Typography>

      <Box
        sx={{
            display: 'inline-flex',
            p: '2px',
        }}>
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_e, val) => setTab(val)}
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: '25px',
            borderRadius: '10px',
            border: '1px solid #D175B6',
            mb: 2,
            '.MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          {['Event Details', 'Assign Coordinator/Coordinator', 'Session Management', 'Generate SOW'].map((label, index) => (
            <Tab
              key={label}
              label={label}
              disableFocusRipple
              sx={{
                textTransform: 'none',
                fontWeight: 400,
                fontFamily: FAMILY.kanitRegular,
                minHeight: '25px',
                px: 3,
                border: tab === index ? 'none' : '1px solid #D175B6',
                backgroundColor: tab === index ? '#D175B6' : 'transparent',
                color: tab === index ? '#fff' : '#D175B6',
                transition: '0.3s',
                '&:hover': {
                  border: 'none',
                  backgroundColor: tab === index ? '#D175B6' : 'rgba(196, 69, 243, 0.1)',
                },
                '&.Mui-selected, &:focus, &:focus-visible': {
                  outline: 'none',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

        {/* Coordinator Section */}
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 20, fontFamily: FAMILY.kanitRegular, fontWeight: 600, color: '#fff', mb: 1 }}>
              Assign Coordinator
            </Typography>
            <Autocomplete
              freeSolo
              options={coordinatorsList}
              value={value}
              onChange={(_e: any, newValue: string | null) => setValue(newValue)}
              inputValue={inputValue}
              onInputChange={(_e, newInputValue) => setInputValue(newInputValue)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  color: '#fff',
                  border: '1px solid #fff',
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                },
                '& .MuiSvgIcon-root': {
                  color: '#fff',
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Coordinator"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      background: 'transparent',
                      fontFamily: FAMILY.kanitRegular,
                    },
                  }}
                />
              )}
            />
            <Button
              sx={{
                color: '#D175B6',
                textTransform: 'none',
                fontFamily: FAMILY.kanitRegular,
                fontWeight: 500,
              }}
              onClick={() => {
                if (inputValue && !coordinatorsList.includes(inputValue.trim())) {
                  alert(`Add new coordinator: ${inputValue}`);
                }
              }}
            >
              Add New Coordinator
            </Button>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, color: '#fff' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 600, fontFamily: FAMILY.kanitRegular }}>
              Event Name <Typography component="span" sx={{ fontSize: 18, fontWeight: 300 }}> (Venue Here) </Typography>
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1, border: '1px solid #D175B6', borderRadius: 1, px: 2, py: 0.5 }}>
              {[
                { label: 'Start', value: '12-12-2023' },
                { label: 'Ends', value: '15-12-2023' },
              ].map((item) => (
                <Box key={item.label} sx={{ fontFamily: FAMILY.kanitRegular, fontSize: 15 }}>
                  {item.label}:{' '}
                  <Box component="span" sx={{ fontWeight: 600 }}>{item.value}</Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ border: '1px solid #D175B6', borderRadius: 1, px: 2, py: 0.5, fontSize: 15 }}>
              Venue Address: <Box component="span" sx={{ fontWeight: 600 }}>Some Location 12, Name Here, City, State.</Box>
            </Box>
          </Box>
        </Box>

        {/* Contractor and Table */}
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3, mt: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 600, fontFamily: FAMILY.kanitRegular, mb: 2 }}>Assign Contractor</Typography>
            <Box sx={{ border: "1px solid #D175B6", backgroundColor: '#000', paddingY: 1, paddingX: 2, borderRadius: 2 }}>
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  sx={{
                    ...neonBorder,
                    border: "1px solid #D175B6",
                    mb: 2,
                    backgroundColor: i === 1 ? '#D175B6' : '#000',
                    color: '#fff',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 16, fontFamily: FAMILY.kanitRegular }}>
                      Meeting Room {i}
                    </Typography>
                    <Box component="img" src={Star} alt="star" sx={{ height: 28, width: 28 }} />
                    <Typography sx={{ fontSize: 15 }}>
                      <span style={{ color: i === 1 ? '#000' : '#D175B6', fontFamily: FAMILY.kanitRegular }}>
                        12 Positions
                      </span>
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 12, mt: 0.2, color: i === 1 ? '#ffe1ff' : '#aaa', fontFamily: FAMILY.kanitRegular }}>
                    Start from 12 Jan, 2023 – Ends at 15 Jan, 2023
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1, fontFamily: FAMILY.kanitRegular }}>
              Positions
            </Typography>

            <TableContainer 
              sx={{ border: '1px solid #D175B6', borderRadius: 2, boxShadow: '0 0 5px #D175B6', backgroundColor: '#000', overflowX: 'auto',width: '100%', }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {['Position', 'Time', 'Info', 'Quantity', 'Contractor'].map((head) => (
                      <TableCell key={head} sx={{ color: '#fff', fontWeight: 600, borderBottom: '1px solid #D175B6', fontSize: 14, fontFamily: FAMILY.kanitRegular }}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.map((_, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ color: '#fff', fontSize: 13, fontFamily: FAMILY.kanitRegular }}>Camera 1 (Video)</TableCell>
                      <TableCell sx={{ color: '#fff', fontSize: 13, fontFamily: FAMILY.kanitRegular }}>9 am – 7 pm</TableCell>
                      <TableCell sx={{ color: '#fff', fontSize: 13, fontFamily: FAMILY.kanitRegular }}><b>LP default</b></TableCell>
                      <TableCell sx={{ color: '#fff', fontSize: 13, fontFamily: FAMILY.kanitRegular }}>20</TableCell>
                      <TableCell>
                        <Select
                          value={selectedContractor}
                          onChange={(e) => setSelectedContractor(e.target.value)}
                          size="small"
                          fullWidth
                          displayEmpty
                          renderValue={(selected) => selected || <span style={{ color: '#999', fontFamily: FAMILY.kanitRegular }}>Select Contractor</span>}
                          sx={{
                            color: '#fff',
                            backgroundColor: 'transparent',
                            border: '1px solid #D175B6',
                            borderRadius: '6px',
                            fontSize: 13,
                            height: '34px',
                            '& .MuiSelect-icon': { color: '#FFF' },
                          }}
                        >
                          <MenuItem value=""><em>Select Contractor</em></MenuItem>
                          <MenuItem value="John">John</MenuItem>
                          <MenuItem value="Alice">Alice</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, py: 1 }}>
                <Typography sx={{ cursor: 'pointer', fontSize: 18 }} onClick={() => setPage((p) => Math.max(1, p - 1))}>←</Typography>
                {[...Array(Math.ceil(rows.length / rowsPerPage))].map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setPage(i + 1)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: i + 1 === page ? '#c445f3' : '#fff',
                      cursor: 'pointer',
                    }}
                  />
                ))}
                <Typography sx={{ cursor: 'pointer', fontSize: 18 }} onClick={() => setPage((p) => Math.min(Math.ceil(rows.length / rowsPerPage), p + 1))}>→</Typography>
              </Box>
            </TableContainer>
          </Box>
        </Box>

        {/* Save Button */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(-10deg, #FF00FF4D, #D85AD8)',
              borderRadius: '8px',
              px: 7,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              fontFamily: FAMILY.kanitRegular,
              color: '#fff',
              boxShadow: '0 0 5px #D85AD8'
            }}
          >
            Save Edits
          </Button>
        </Box>
      </Box>
    </GradientBox>
  );
};

export default EventManagementPage;

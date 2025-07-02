import React, { useEffect, useState } from 'react';
import {
  Box, AppBar, Toolbar, Typography, InputBase,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Pagination, useMediaQuery
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Sidebar from './Sidebar';
import { sampleData } from '../data/data';
import CustomSortIcon from './CustomSortIcon';
import AddIcon from '../assets/add.png';
import { FAMILY } from '../theme';

type ChildProps = {
  onSendData: (data: boolean) => void;
};

const GradientBox = styled(Box)(() => ({
  background: 'linear-gradient(to right, #1d0e2f, #342156)',
  minHeight: '100vh',
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  width: '95%',
  marginLeft: '2.5%',
  overflowX: 'hidden',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#ffffff', 0.15),
  '&:hover': { backgroundColor: alpha('#ffffff', 0.25) },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(1), width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch' },
  },
}));

const EventRequests: React.FC<ChildProps> = ({ onSendData }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const rowsPerPage = 12;
  const [page, setPage] = useState(1);
  const [hide, setHide] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'eventName',
    direction: 'asc',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredData = sampleData.filter((item) =>
    [item.eventName, item.clientName, item.venue].some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const { key, direction } = sortConfig;
    const aVal = a[key as keyof typeof a];
    const bVal = b[key as keyof typeof b];

    if (key === 'eventEnd') {
      return direction === 'asc'
        ? new Date(aVal as string).getTime() - new Date(bVal as string).getTime()
        : new Date(bVal as string).getTime() - new Date(aVal as string).getTime();
    }

    return direction === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const paginatedRows = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const handlePageChange = (_: any, value: number) => setPage(value);

  const renderHeader = (label: string, key: string, width: string) => (
    <TableCell
      onClick={() => handleSort(key)}
      sx={{
        color: '#fff',
        fontFamily: FAMILY.kanitRegular,
        cursor: 'pointer',
        width,
        whiteSpace: 'nowrap',
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {label}
        {sortConfig.key === key && <CustomSortIcon direction={sortConfig.direction} />}
      </Box>
    </TableCell>
  );

  const sendData = () => {
    setHide(!hide)
    const data = !hide;
    onSendData(data);
  };

  return (
    <GradientBox>
      {/* <Sidebar /> */}

      {/* Sidebar with external control */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <Box component="main" sx={{
        p: isMobile ? 1 : 2,
        flexGrow: 1,
        border: '2px solid #c445f3',
        borderRadius: '12px',
        ml: isMobile ? 0 : 1,
        mt: isMobile ? 1 : 0,
        marginLeft: isMobile ? 0 : 3
      }}>
        <AppBar position="static" sx={{
          backgroundColor: '#2a1446',
          borderRadius: 2,
          height: isMobile ? 'auto' : '70px',
          px: 1,
        }}>
          <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: FAMILY.kanitRegular, mb: isMobile ? 1 : 0 }}>
              Event Requests
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
              <Search sx={{ flexGrow: 1 }}>
                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search here"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
              <Box component="img" src={AddIcon} alt="Add" sx={{
                width: '50px', height: '50px', ml: isMobile ? 1 : 2,
              }} />
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ backgroundColor: '#2a1446', minWidth: '700px' }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#D175B6' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', width: '40px' }} />
                  {renderHeader('Event Name', 'eventName', '200px')}
                  <TableCell sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular, width: '150px' }}>Event Start</TableCell>
                  {renderHeader('Event End', 'eventEnd', '150px')}
                  {renderHeader('Client Name', 'clientName', '150px')}
                  <TableCell sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular, width: '150px' }}>Contact Info</TableCell>
                  <TableCell sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular, width: '200px' }}>Venue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row, index) => (
                  <TableRow key={index} sx={{ height: '43px', '& td': { pt: '6px', pb: '6px', lineHeight: '1.2' } }}>
                    <TableCell><VisibilityIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={sendData} /></TableCell>
                    <TableCell sx={{ color: '#fff' }}>{row.eventName}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{row.eventStart}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{row.eventEnd}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{row.clientName}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{row.contact}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{row.venue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ py: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#000' }}>
          <Pagination
            count={Math.ceil(sortedData.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#fff',
                backgroundColor: '#000',
                '&.Mui-selected': {
                  backgroundColor: '#f38fff',
                  color: '#000',
                  fontWeight: 'bold',
                },
              },
            }}
          />
        </Box>
      </Box>
    </GradientBox>
  );
};

export default EventRequests;

// import React, { useState } from 'react';
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   InputBase,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Pagination,
// } from '@mui/material';
// import { styled, alpha } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import Sidebar from './Sidebar';
// import { sampleData } from '../data/data';
// import CustomSortIcon from './CustomSortIcon';
// import AddIcon from '../assets/add.png';
// import { FAMILY } from '../theme';

// const GradientBox = styled(Box)(() => ({
//   background: 'linear-gradient(to right, #1d0e2f, #342156)',
//   minHeight: '100vh',
//   color: 'white',
//   display: 'flex',
//   flexDirection: 'row',
//   width: '100vw',
// }));

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha('#ffffff', 0.15),
//   '&:hover': {
//     backgroundColor: alpha('#ffffff', 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const EventRequests: React.FC = () => {
//   const rowsPerPage = 10;
//   const [page, setPage] = useState(1);
//   const [sortBy, setSortBy] = useState<string>('eventName');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


//   const handleSort = (field: string) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('asc');
//     }
//   };


//   const sortedData = [...sampleData].sort((a, b) => {
//     if (sortBy === 'eventEnd') {
//       return sortOrder === 'asc'
//         ? new Date(a.eventEnd).getTime() - new Date(b.eventEnd).getTime()
//         : new Date(b.eventEnd).getTime() - new Date(a.eventEnd).getTime();
//     }

//     if (sortBy === 'eventName') {
//       return sortOrder === 'asc'
//         ? a.eventName.localeCompare(b.eventName)
//         : b.eventName.localeCompare(a.eventName);
//     }

//     if (sortBy === 'clientName') {
//       return sortOrder === 'asc'
//         ? a.clientName.localeCompare(b.clientName)
//         : b.clientName.localeCompare(a.clientName);
//     }
//     return 0;
//   });

//   const renderHeader = (label: string, field: string) => (
//     <TableCell
//       onClick={() => handleSort(field)}
//       sx={{
//         cursor: 'pointer',
//         color: '#fff',
//         fontFamily: FAMILY.kanitRegular,
//         display: 'flex',
//         alignItems: 'center',
//         gap: '6px',
//       }}
//     >
//       {label}
//       {sortBy === field && <CustomSortIcon direction={sortOrder} />}
//     </TableCell>
//   );

//   const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   const paginatedRows = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

//   return (
//     <GradientBox>
//       <Sidebar />
//       <Box component="main" sx={{ p: 2, flexGrow: 1, border: '2px solid #c445f3', borderRadius: '12px', ml: 1 }}>
//         <AppBar position="static" sx={{ backgroundColor: '#2a1446', borderRadius: 2, height: '70px' }}>
//           <Toolbar>
//             <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: FAMILY.kanitExtraBold }}>
//               Event Requests
//             </Typography>
//             <Search>
//               <SearchIconWrapper>
//                 <SearchIcon />
//               </SearchIconWrapper>
//               <StyledInputBase placeholder="Search here" inputProps={{ 'aria-label': 'search' }} />
//             </Search>
//             <Box component="img" src={AddIcon} alt="Add" sx={{ width: '60px', height: '60px' }} />
//           </Toolbar>
//         </AppBar>

//         <TableContainer component={Paper} sx={{ backgroundColor: '#2a1446' }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#D175B6' }}>
//               <TableRow>
//                 <TableCell sx={{ color: '#fff' }} />
//                 {/* <TableCell
//                   onClick={() => handleSort('eventName')}
//                   sx={{
//                     cursor: 'pointer',
//                     width: '200px',
//                     fontFamily: FAMILY.kanitRegular,
//                     color: '#fff',
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" gap={1}>
//                     Event Name
//                     {sortBy === 'eventName' && <CustomSortIcon direction={sortOrder} />}
//                   </Box>
//                 </TableCell> */}
//                 <TableCell 
//                   onClick={() => handleSort('eventName')} 
//                   sx={{
//                     cursor: 'pointer',
//                     width: '200px',
//                     fontFamily: FAMILY.kanitRegular,
//                     color: '#fff',
//                   }}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                   Event Name
//                   {sortBy === 'eventName' && <CustomSortIcon direction={sortOrder} />}
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular }}>
//                 Event Start
//               </TableCell>
//               <TableCell
//                 sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular, cursor: 'pointer' }}
//                 onClick={() => handleSort('eventEnd')}
//               >
//                 <Box display="flex" alignItems="center" gap={1}>
//                   Event End
//                   {sortBy === 'eventEnd' && <CustomSortIcon direction={sortOrder} />}
//                 </Box>
//               </TableCell>
//               <TableCell
//                 sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular, cursor: 'pointer' }}
//                 onClick={() => handleSort('clientName')}
//               >
//                 <Box display="flex" alignItems="center" gap={1}>
//                   Client Name
//                   {sortBy === 'clientName' && <CustomSortIcon direction={sortOrder} />}
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular }}>Contact Info</TableCell>
//               <TableCell sx={{ color: '#fff', fontFamily: FAMILY.kanitRegular }}>Venue</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginatedRows.map((event, index) => (
//               <TableRow key={index}>
//                 <TableCell><VisibilityIcon sx={{ color: '#fff' }} /></TableCell>
//                 <TableCell sx={{ color: '#fff' }}>{event.eventName}</TableCell>
//                 <TableCell sx={{ color: '#fff' }}>{event.eventStart}</TableCell>
//                 <TableCell sx={{ color: '#fff' }}>{event.eventEnd}</TableCell>
//                 <TableCell sx={{ color: '#fff' }}>{event.clientName}</TableCell>
//                 <TableCell sx={{ color: '#fff' }}>{event.contact}</TableCell>
//                 <TableCell sx={{ color: '#fff' }}>{event.venue}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>


//       <Box sx={{ py: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#000' }}>
//         <Pagination
//           count={Math.ceil(sampleData.length / rowsPerPage)}
//           page={page}
//           onChange={handlePageChange}
//           sx={{
//             '& .MuiPaginationItem-root': {
//               color: '#fff',
//               backgroundColor: '#000',
//               '&.Mui-selected': {
//                 backgroundColor: '#f38fff',
//                 color: '#000',
//                 fontWeight: 'bold',
//               },
//               '&:hover': {
//                 backgroundColor: '#333',
//               },
//             },
//           }}
//         />
//       </Box>
//     </Box>
//     </GradientBox >
//   );
// };

// export default EventRequests;

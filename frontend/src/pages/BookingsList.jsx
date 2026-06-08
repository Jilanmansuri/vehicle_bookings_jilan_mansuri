import { useState, useEffect } from 'react';
import { Typography, Chip, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import api from '../services/api';

const BookingsList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let url = `/bookings?page=${page + 1}&limit=${pageSize}`;
      if (searchKeyword) url += `&keyword=${searchKeyword}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      
      const response = await api.get(url);
      setRows(response.data.data.docs);
      setTotalRows(response.data.data.totalDocs);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, pageSize, searchKeyword, statusFilter]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(0); // Reset to first page on search
  };

  const columns = [
    { field: 'bookingId', headerName: 'Booking ID', width: 130 },
    { 
      field: 'customer', 
      headerName: 'Customer', 
      width: 150,
      valueGetter: (value, row) => row?.customer?.name || 'N/A'
    },
    { 
      field: 'vehicle', 
      headerName: 'Vehicle', 
      width: 150,
      valueGetter: (value, row) => row?.vehicle?.type || 'N/A'
    },
    { field: 'fare', headerName: 'Fare', width: 100, type: 'number' },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 160,
      renderCell: (params) => {
        const status = params.value;
        let color = 'default';
        if (status === 'Success') color = 'success';
        if (status === 'Pending') color = 'warning';
        if (status?.includes('Canceled')) color = 'error';

        return <Chip label={status} color={color} size="small" />;
      }
    },
    { field: 'date', headerName: 'Date', width: 180, 
      valueFormatter: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
            Bookings
          </Typography>
          <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
            Manage all vehicle bookings in the system.
          </Typography>
        </div>
        
        <div className="flex gap-4 items-center">
          <FormControl size="small" className="w-40 bg-white dark:bg-gray-800 rounded-lg">
            <InputLabel className="dark:text-gray-300">Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              label="Filter by Status"
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
              className="dark:text-white"
            >
              <MenuItem value=""><em>All Statuses</em></MenuItem>
              <MenuItem value="Success">Success</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Canceled by Customer">Canceled by Customer</MenuItem>
              <MenuItem value="Canceled by Driver">Canceled by Driver</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <DataTable 
        title="Bookings"
        columns={columns}
        rows={rows}
        loading={loading}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default BookingsList;

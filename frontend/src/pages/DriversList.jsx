import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { toast } from 'react-toastify';

const DriversList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/drivers?page=${page + 1}&limit=${pageSize}`);
      setRows(response.data.data.docs || []);
      setTotalRows(response.data.data.totalDocs || 0);
    } catch (error) {
      console.error('Failed to fetch drivers:', error);
      toast.error('Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [page, pageSize]);

  const columns = [
    { field: 'name', headerName: 'Driver Name', width: 250 },
    { field: 'averageRating', headerName: 'Average Rating', width: 180, type: 'number' },
    { field: 'createdAt', headerName: 'Joined Date', width: 180, 
      valueFormatter: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
            Drivers Directory
          </Typography>
          <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
            View and manage all registered drivers.
          </Typography>
        </div>
      </div>

      <DataTable 
        columns={columns}
        rows={rows}
        loading={loading}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default DriversList;

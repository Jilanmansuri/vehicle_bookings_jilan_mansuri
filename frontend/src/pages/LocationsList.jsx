import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { toast } from 'react-toastify';

const LocationsList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/locations?page=${page + 1}&limit=${pageSize}`);
      setRows(response.data.data.docs || []);
      setTotalRows(response.data.data.totalDocs || 0);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      toast.error('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [page, pageSize]);

  const columns = [
    { field: 'name', headerName: 'Location Name', width: 400 },
    { field: 'createdAt', headerName: 'Added On', width: 180, 
      valueFormatter: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
            Locations Directory
          </Typography>
          <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
            View all pickup and drop locations in the system.
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

export default LocationsList;

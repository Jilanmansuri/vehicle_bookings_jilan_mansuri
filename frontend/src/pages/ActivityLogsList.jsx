import { useState, useEffect } from 'react';
import { Typography, Chip } from '@mui/material';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { toast } from 'react-toastify';

const ActivityLogsList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/activity?page=${page + 1}&limit=${pageSize}`);
      setRows(response.data.data.docs || []);
      setTotalRows(response.data.data.totalDocs || 0);
    } catch (error) {
      toast.error('Failed to fetch activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, pageSize]);

  const columns = [
    { field: 'createdAt', headerName: 'Timestamp', width: 200, valueGetter: (params) => new Date(params.value).toLocaleString() },
    { 
      field: 'user', 
      headerName: 'User', 
      width: 200, 
      valueGetter: (params) => params.value?.name || params.value?.email || 'System' 
    },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150,
      renderCell: (params) => {
        let color = 'default';
        if (params.value === 'Create') color = 'success';
        if (params.value === 'Update') color = 'warning';
        if (params.value === 'Delete') color = 'error';
        if (params.value === 'Login') color = 'info';
        return <Chip label={params.value} color={color} size="small" />;
      }
    },
    { field: 'entity', headerName: 'Entity', width: 130 },
    { field: 'details', headerName: 'Details', flex: 1 },
    { field: 'ipAddress', headerName: 'IP Address', width: 150 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <Typography variant="h5" className="font-bold text-gray-800 dark:text-white">
          Activity Logs
        </Typography>
        <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
          Monitor system activities and user actions.
        </Typography>
      </div>

      <div className="h-[600px] w-full">
        <DataTable
          rows={rows}
          columns={columns}
          loading={loading}
          page={page}
          pageSize={pageSize}
          totalRows={totalRows}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default ActivityLogsList;

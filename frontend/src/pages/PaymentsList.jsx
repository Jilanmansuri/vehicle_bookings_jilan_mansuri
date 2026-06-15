import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import DataTable from '../components/DataTable';
import api from '../services/api';

const fetchPayments = async ({ queryKey }) => {
  const [_key, { page, pageSize }] = queryKey;
  const response = await api.get(`/payments?page=${page + 1}&limit=${pageSize}`);
  return response.data.data;
};

const PaymentsList = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['payments', { page, pageSize }],
    queryFn: fetchPayments,
    keepPreviousData: true,
  });

  const columns = [
    { field: 'method', headerName: 'Payment Method', width: 300, flex: 1 },
    { field: 'createdAt', headerName: 'Added On', width: 250, 
      valueFormatter: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
            Payment Methods
          </Typography>
          <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
            View all accepted payment methods.
          </Typography>
        </div>
      </Box>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl overflow-hidden shadow-lg"
      >
        <DataTable 
          columns={columns}
          rows={Array.isArray(data) ? data : (data?.docs || [])}
          loading={isLoading}
          page={page}
          pageSize={pageSize}
          totalRows={Array.isArray(data) ? data.length : (data?.totalDocs || 0)}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </motion.div>
    </motion.div>
  );
};

export default PaymentsList;

import { useState } from 'react';
import { Typography, Button, Chip, IconButton, Box } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { createVehicle, updateVehicle, deleteVehicle } from '../services/vehicle.service';
import VehicleFormModal from '../components/VehicleFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const fetchVehicles = async ({ queryKey }) => {
  const [_key, { page, pageSize }] = queryKey;
  const response = await api.get(`/vehicles?page=${page + 1}&limit=${pageSize}`);
  return response.data.data;
};

const VehiclesList = () => {
  const queryClient = useQueryClient();
  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['vehicles', { page, pageSize }],
    queryFn: fetchVehicles,
    keepPreviousData: true,
  });

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setIsFormOpen(false);
      setIsDeleteOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const createMutation = useMutation({
    mutationFn: createVehicle,
    ...mutationOptions,
    onSuccess: () => {
      toast.success('Vehicle added successfully');
      mutationOptions.onSuccess();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => updateVehicle(id, values),
    ...mutationOptions,
    onSuccess: () => {
      toast.success('Vehicle updated successfully');
      mutationOptions.onSuccess();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    ...mutationOptions,
    onSuccess: () => {
      toast.success('Vehicle deleted successfully');
      mutationOptions.onSuccess();
    }
  });

  const handleAddClick = () => {
    setSelectedVehicle(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = (values) => {
    if (selectedVehicle) {
      updateMutation.mutate({ id: selectedVehicle._id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedVehicle._id);
  };

  const columns = [
    { field: 'type', headerName: 'Vehicle Type', width: 200 },
    { 
      field: 'isAvailable', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value ? 'Available' : 'Unavailable'} 
          color={params.value ? 'success' : 'error'} 
          size="small" 
          className="font-semibold"
        />
      )
    },
    { field: 'createdAt', headerName: 'Added On', width: 180, 
      valueFormatter: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconButton 
            size="small" 
            color="primary" 
            onClick={() => handleEditClick(params.row)}
            className="hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleDeleteClick(params.row)}
            className="hover:bg-red-50 dark:hover:bg-gray-800 transition-colors"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )
    }
  ];

  const actionLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

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
            Vehicles Directory
          </Typography>
          <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
            Manage the fleet of vehicles available for booking.
          </Typography>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          className="bg-blue-600 hover:bg-blue-700 shadow-md lift-on-hover px-6 py-2 rounded-xl font-bold"
          onClick={handleAddClick}
        >
          Add Vehicle
        </Button>
      </Box>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl overflow-hidden"
      >
        <DataTable 
          columns={columns}
          rows={data?.docs || []}
          loading={isLoading}
          page={page}
          pageSize={pageSize}
          totalRows={data?.totalDocs || 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </motion.div>

      <VehicleFormModal 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedVehicle}
        loading={actionLoading}
      />

      <ConfirmDeleteModal 
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={actionLoading}
        title="Delete Vehicle"
        message={`Are you sure you want to delete the vehicle "${selectedVehicle?.type}"?`}
      />
    </motion.div>
  );
};

export default VehiclesList;

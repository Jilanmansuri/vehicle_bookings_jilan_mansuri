import { useState, useEffect } from 'react';
import { Typography, Button, Chip, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { createVehicle, updateVehicle, deleteVehicle } from '../services/vehicle.service';
import VehicleFormModal from '../components/VehicleFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { toast } from 'react-toastify';

const VehiclesList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/vehicles?page=${page + 1}&limit=${pageSize}`);
      setRows(response.data.data.docs || []);
      setTotalRows(response.data.data.totalDocs || 0);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

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

  const handleFormSubmit = async (values) => {
    setActionLoading(true);
    try {
      if (selectedVehicle) {
        await updateVehicle(selectedVehicle._id, values);
        toast.success('Vehicle updated successfully');
      } else {
        await createVehicle(values);
        toast.success('Vehicle added successfully');
      }
      setIsFormOpen(false);
      fetchVehicles(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteVehicle(selectedVehicle._id);
      toast.success('Vehicle deleted successfully');
      setIsDeleteOpen(false);
      fetchVehicles(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [page, pageSize]);

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
            className="hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleDeleteClick(params.row)}
            className="hover:bg-red-50 dark:hover:bg-gray-800"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleAddClick}
        >
          Add Vehicle
        </Button>
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
    </div>
  );
};

export default VehiclesList;

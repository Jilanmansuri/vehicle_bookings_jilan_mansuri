import { useState, useEffect } from 'react';
import { Typography, Chip, Button, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { createCustomer, updateCustomer, deleteCustomer } from '../services/customer.service';
import UserFormModal from '../components/UserFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { toast } from 'react-toastify';

const UsersList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/customers?page=${page + 1}&limit=${pageSize}`);
      setRows(response.data.data.docs || []);
      setTotalRows(response.data.data.totalDocs || 0);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setActionLoading(true);
    try {
      if (selectedUser) {
        await updateCustomer(selectedUser._id, values);
        toast.success('User updated successfully');
      } else {
        await createCustomer(values);
        toast.success('User added successfully');
      }
      setIsFormOpen(false);
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteCustomer(selectedUser._id);
      toast.success('User deleted successfully');
      setIsDeleteOpen(false);
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize]);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 180 },
    { field: 'createdAt', headerName: 'Joined Date', width: 180, 
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
            Users Management
          </Typography>
          <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
            View and manage system users and administrators.
          </Typography>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleAddClick}
        >
          Add User
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

      <UserFormModal 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedUser}
        loading={actionLoading}
      />

      <ConfirmDeleteModal 
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={actionLoading}
        title="Delete User"
        message={`Are you sure you want to delete the user "${selectedUser?.name}"?`}
      />
    </div>
  );
};

export default UsersList;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';

const UserFormModal = ({ open, onClose, onSubmit, initialData, loading }) => {
  const isEditMode = Boolean(initialData);

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string(),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={!loading ? handleClose : undefined} fullWidth maxWidth="sm" PaperProps={{ className: "rounded-xl glass dark:bg-gray-800/95 backdrop-blur-xl" }}>
      <DialogTitle className="font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
        {isEditMode ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="space-y-5 pt-6">
          <div className="space-y-1 mt-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full px-4 py-3.5 rounded-xl border bg-white/40 dark:bg-gray-900/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-gray-800/60 transition-all ${
                formik.touched.name && formik.errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200/60 dark:border-gray-700/60'
              }`}
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs font-medium mt-1 ml-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full px-4 py-3.5 rounded-xl border bg-white/40 dark:bg-gray-900/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-gray-800/60 transition-all ${
                formik.touched.email && formik.errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200/60 dark:border-gray-700/60'
              }`}
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs font-medium mt-1 ml-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Phone Number (Optional)</label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={`w-full px-4 py-3.5 rounded-xl border bg-white/40 dark:bg-gray-900/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-gray-800/60 transition-all ${
                formik.touched.phone && formik.errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200/60 dark:border-gray-700/60'
              }`}
              placeholder="+1234567890"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </DialogContent>
        <DialogActions className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleClose} disabled={loading} className="text-gray-500 hover:text-gray-700">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6"
          >
            {isEditMode ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserFormModal;

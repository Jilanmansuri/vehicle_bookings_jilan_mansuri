import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

const VehicleFormModal = ({ open, onClose, onSubmit, initialData, loading }) => {
  const isEditMode = Boolean(initialData);

  const formik = useFormik({
    initialValues: {
      type: initialData?.type || '',
      isAvailable: initialData ? initialData.isAvailable : true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.string().required('Vehicle type is required'),
      isAvailable: Yup.boolean().required('Status is required'),
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
        {isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="space-y-6 pt-6">
          <div className="space-y-1 mt-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Vehicle Type</label>
            <input
              id="type"
              name="type"
              type="text"
              className={`w-full px-4 py-3 rounded-xl border bg-white/40 dark:bg-gray-900/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-gray-800/60 transition-all ${
                formik.touched.type && formik.errors.type ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200/60 dark:border-gray-700/60'
              }`}
              placeholder="e.g. Bike, Car, Auto"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.type && formik.errors.type && (
              <p className="text-red-500 text-xs font-medium mt-1 ml-1">{formik.errors.type}</p>
            )}
          </div>

          <FormControl fullWidth variant="outlined" error={formik.touched.isAvailable && Boolean(formik.errors.isAvailable)}>
            <InputLabel id="status-label" className="dark:text-gray-300">Availability Status</InputLabel>
            <Select
              labelId="status-label"
              id="isAvailable"
              name="isAvailable"
              value={formik.values.isAvailable}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Availability Status"
              className="bg-white/40 dark:bg-gray-900/40 rounded-xl"
            >
              <MenuItem value={true}>Available</MenuItem>
              <MenuItem value={false}>Unavailable</MenuItem>
            </Select>
            {formik.touched.isAvailable && formik.errors.isAvailable && (
              <FormHelperText>{formik.errors.isAvailable}</FormHelperText>
            )}
          </FormControl>
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
            {isEditMode ? 'Save Changes' : 'Add Vehicle'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VehicleFormModal;

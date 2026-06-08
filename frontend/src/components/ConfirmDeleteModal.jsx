import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';

const ConfirmDeleteModal = ({ open, onClose, onConfirm, title, message, loading }) => {
  return (
    <Dialog open={open} onClose={!loading ? onClose : undefined} PaperProps={{ className: "rounded-xl glass dark:bg-gray-800/90" }}>
      <DialogTitle className="font-bold text-gray-900 dark:text-white">
        {title || 'Confirm Delete'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="text-gray-600 dark:text-gray-300">
          {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose} disabled={loading} className="text-gray-500 hover:text-gray-700">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;

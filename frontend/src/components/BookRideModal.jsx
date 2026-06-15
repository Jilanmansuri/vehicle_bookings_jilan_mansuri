import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import api from '../services/api';
import { toast } from 'react-toastify';

const BookRideModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ customers: [], vehicles: [], locations: [], payments: [] });
  const [formData, setFormData] = useState({
    customer: '',
    vehicle: '',
    pickupLocation: '',
    dropLocation: '',
    distance: '',
    fare: '',
    paymentMethod: ''
  });

  useEffect(() => {
    if (open) {
      fetchDropdownData();
    }
  }, [open]);

  const fetchDropdownData = async () => {
    const extractDocs = (res) => Array.isArray(res.data.data) ? res.data.data : (res.data.data?.docs || []);

    try {
      const [custRes, vehRes, locRes, payRes] = await Promise.all([
        api.get('/customers?limit=50'),
        api.get('/vehicles?limit=50'),
        api.get('/locations?limit=50'),
        api.get('/payments?limit=20')
      ]);
      setData({
        customers: extractDocs(custRes),
        vehicles: extractDocs(vehRes),
        locations: extractDocs(locRes),
        payments: extractDocs(payRes)
      });
    } catch (error) {
      console.error("Failed to load options", error);
      toast.error("Failed to load booking options");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/bookings', {
        ...formData,
        distance: Number(formData.distance),
        fare: Number(formData.fare),
        status: 'Pending'
      });
      toast.success('Ride booked successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to book ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="dark:bg-slate-900 dark:text-white font-bold border-b dark:border-slate-800/50">
        Book a New Ride
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="dark:bg-slate-900 flex flex-col gap-5 pt-6 pb-4">
          <TextField select fullWidth label="Customer" name="customer" value={formData.customer} onChange={handleChange} required>
            {data.customers.map(c => <MenuItem key={c._id} value={c._id}>{c.name || c.customerId}</MenuItem>)}
          </TextField>
          
          <TextField select fullWidth label="Vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} required>
            {data.vehicles.map(v => <MenuItem key={v._id} value={v._id}>{v.type}</MenuItem>)}
          </TextField>

          <TextField select fullWidth label="Pickup Location" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required>
            {data.locations.map(l => <MenuItem key={l._id} value={l._id}>{l.name}</MenuItem>)}
          </TextField>

          <TextField select fullWidth label="Drop Location" name="dropLocation" value={formData.dropLocation} onChange={handleChange} required>
            {data.locations.map(l => <MenuItem key={l._id} value={l._id}>{l.name}</MenuItem>)}
          </TextField>

          <div className="flex gap-5">
            <TextField fullWidth type="number" label="Distance (km)" name="distance" value={formData.distance} onChange={handleChange} required />
            <TextField fullWidth type="number" label="Estimated Fare (₹)" name="fare" value={formData.fare} onChange={handleChange} required />
          </div>

          <TextField select fullWidth label="Payment Method" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            {data.payments.map(p => <MenuItem key={p._id} value={p._id}>{p.method}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions className="dark:bg-slate-900 border-t dark:border-slate-800/50 p-4">
          <Button onClick={onClose} color="inherit" className="dark:text-gray-300 font-semibold mr-2">Cancel</Button>
          <Button type="submit" variant="contained" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md font-bold px-6 py-2" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Book Ride'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookRideModal;

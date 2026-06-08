import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { 
  People as PeopleIcon, 
  DirectionsCar as CarIcon, 
  BookOnline as BookingIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@mui/material';
import api from '../services/api';
import { useSelector } from 'react-redux';
import BookRideModal from '../components/BookRideModal';

const StatCard = ({ title, value, icon, color }) => (
  <Paper className="p-6 flex items-center justify-between shadow-lg shadow-gray-200/50 dark:shadow-none dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800/50 rounded-2xl lift-on-hover">
    <div>
      <Typography variant="body2" className="text-gray-500 dark:text-gray-400 font-semibold mb-1 tracking-wide uppercase text-xs">
        {title}
      </Typography>
      <Typography variant="h4" className="font-extrabold text-gray-900 dark:text-white">
        {value}
      </Typography>
    </div>
    <div className={`p-4 rounded-2xl ${color} shadow-inner`}>
      {icon}
    </div>
  </Paper>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.role !== 'admin') {
        setLoading(false);
        return; // Don't fetch stats for normal users
      }
      try {
        const response = await api.get('/bookings/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  const totals = stats?.totals?.[0] || { count: 0, totalRevenue: 0 };
  const topVehicles = stats?.topVehicles || [];

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
          Welcome back to the vehicle booking {user?.role === 'admin' ? 'admin panel' : 'portal'}.
        </Typography>
      </div>

      {user?.role === 'admin' ? (
        <>
          <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Total Bookings" 
            value={totals.count} 
            icon={<BookingIcon className="text-blue-600" />} 
            color="bg-blue-100 dark:bg-blue-900/30"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Total Revenue" 
            value={`₹${totals.totalRevenue.toLocaleString()}`} 
            icon={<MoneyIcon className="text-green-600" />} 
            color="bg-green-100 dark:bg-green-900/30"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Active Users" 
            value="1,245" // Mock for now, would come from /users/stats
            icon={<PeopleIcon className="text-purple-600" />} 
            color="bg-purple-100 dark:bg-purple-900/30"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Vehicles" 
            value="86" // Mock for now
            icon={<CarIcon className="text-orange-600" />} 
            color="bg-orange-100 dark:bg-orange-900/30"
          />
        </Grid>
      </Grid>

      <div className="mt-8">
        <Paper className="p-6 shadow-sm dark:bg-gray-800">
          <Typography variant="h6" className="font-bold mb-6 text-gray-800 dark:text-white">
            Top Vehicles by Bookings
          </Typography>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topVehicles}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', color: '#fff', border: 'none' }}
                  cursor={{fill: 'transparent'}}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </div>
        </>
      ) : (
        <Paper className="p-8 text-center shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex flex-col items-center">
          <Typography variant="h5" className="font-bold text-gray-800 dark:text-white mb-2">
            Hello, {user?.name}!
          </Typography>
          <Typography variant="body1" className="text-gray-600 dark:text-gray-300 mb-6">
            You are logged in as a Standard User. You can view your bookings in the Bookings tab or book a new ride below.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setIsBookModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-3 rounded-xl font-bold"
          >
            Book a New Ride
          </Button>
        </Paper>
      )}

      <BookRideModal 
        open={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
        onSuccess={() => {
          // Could refresh data here if needed
        }}
      />
    </div>
  );
};

export default Dashboard;

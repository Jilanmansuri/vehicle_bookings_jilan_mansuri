import { useState } from 'react';
import { Grid, Paper, Typography, Skeleton, Button } from '@mui/material';
import { 
  People as PeopleIcon, 
  DirectionsCar as CarIcon, 
  BookOnline as BookingIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../services/api';
import BookRideModal from '../components/BookRideModal';

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    <Paper className="p-6 h-full flex items-center justify-between shadow-lg shadow-gray-200/50 dark:shadow-none dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800/50 rounded-2xl lift-on-hover glass">
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
  </motion.div>
);

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div>
      <Skeleton variant="text" width="30%" height={60} />
      <Skeleton variant="text" width="40%" height={30} />
    </div>
    <Grid container spacing={4}>
      {[...Array(4)].map((_, i) => (
        <Grid item xs={12} sm={6} lg={3} key={i}>
          <Skeleton variant="rectangular" height={120} className="rounded-2xl" />
        </Grid>
      ))}
    </Grid>
    <div className="mt-8">
      <Skeleton variant="rectangular" height={400} className="rounded-2xl" />
    </div>
  </div>
);

const fetchDashboardStats = async () => {
  const response = await api.get('/bookings/stats');
  return response.data.data;
};

const Dashboard = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    enabled: user?.role === 'admin',
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Paper className="p-6 text-center text-red-500 rounded-2xl">
        <Typography variant="h6">Failed to load dashboard statistics.</Typography>
      </Paper>
    );
  }

  const totals = stats?.totals?.[0] || { count: 0, totalRevenue: 0 };
  const topVehicles = stats?.topVehicles || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
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
                delay={0.1}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard 
                title="Total Revenue" 
                value={`₹${totals.totalRevenue.toLocaleString()}`} 
                icon={<MoneyIcon className="text-green-600" />} 
                color="bg-green-100 dark:bg-green-900/30"
                delay={0.2}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard 
                title="Active Users" 
                value="1,245" // Mock
                icon={<PeopleIcon className="text-purple-600" />} 
                color="bg-purple-100 dark:bg-purple-900/30"
                delay={0.3}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard 
                title="Vehicles" 
                value="86" // Mock
                icon={<CarIcon className="text-orange-600" />} 
                color="bg-orange-100 dark:bg-orange-900/30"
                delay={0.4}
              />
            </Grid>
          </Grid>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Paper className="p-6 shadow-sm dark:bg-gray-800 glass rounded-2xl">
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
                      contentStyle={{ backgroundColor: '#1f2937', color: '#fff', border: 'none', borderRadius: '8px' }}
                      cursor={{fill: 'rgba(59, 130, 246, 0.1)'}}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper className="p-8 text-center shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex flex-col items-center glass">
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
              className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-3 rounded-xl font-bold lift-on-hover"
            >
              Book a New Ride
            </Button>
          </Paper>
        </motion.div>
      )}

      <BookRideModal 
        open={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
        onSuccess={() => {}}
      />
    </motion.div>
  );
};

export default Dashboard;

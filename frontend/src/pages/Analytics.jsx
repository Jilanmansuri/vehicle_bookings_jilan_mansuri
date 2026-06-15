import { Paper, Typography, Grid, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip } from '@mui/material';
import { 
  People as PeopleIcon, 
  DirectionsCar as CarIcon, 
  BookOnline as BookingIcon,
  AttachMoney as MoneyIcon,
  TrendingUp,
  TrendingDown,
  Star as StarIcon
} from '@mui/icons-material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../services/api';

const PIE_COLORS = ['#00f2fe', '#4facfe', '#a18cd1', '#fbc2eb', '#ff9a9e'];
const AREA_COLOR = '#0ea5e9'; // Cyan/Blue
const BAR_COLOR = '#8b5cf6'; // Purple

const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const TrendIndicator = ({ value }) => {
  const isPositive = value >= 0;
  return (
    <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
      {isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
      <span>{Math.abs(value).toFixed(1)}%</span>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, delay, trend }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100 }}
    className="h-full"
  >
    <Paper className="p-6 h-full flex flex-col justify-between shadow-xl dark:shadow-blue-900/5 dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-100 dark:border-white/5 rounded-[20px] relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300">
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-10 ${color.split(' ')[0]} group-hover:opacity-30 transition-opacity duration-500`} />
      
      <div className="flex justify-between items-start mb-4 z-10">
        <div className={`p-3 rounded-2xl ${color} shadow-sm backdrop-blur-md border border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        {trend !== undefined && <TrendIndicator value={trend} />}
      </div>

      <div className="z-10">
        <Typography variant="overline" className="text-gray-500 dark:text-gray-400 font-bold tracking-widest text-[10px] block mb-1">
          {title}
        </Typography>
        <Typography variant="h4" className="font-black text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
          {value}
        </Typography>
      </div>
    </Paper>
  </motion.div>
);

const fetchAnalyticsStats = async () => {
  const response = await api.get('/bookings/stats');
  return response.data.data;
};

const Analytics = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['analyticsStats'],
    queryFn: fetchAnalyticsStats,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Typography variant="h4"><Skeleton width="30%" /></Typography>
        <Grid container spacing={4}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={12} sm={6} lg={3} key={i}>
              <Skeleton variant="rectangular" height={160} className="rounded-[20px]" />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  if (error) {
    return (
      <Paper className="p-6 text-center text-red-500 rounded-2xl">
        <Typography variant="h6">Failed to load analytics.</Typography>
      </Paper>
    );
  }

  const counts = stats?.entityCounts || { users: 0, vehicles: 0, drivers: 0, locations: 0 };
  const revenueOverTime = stats?.revenueOverTime || [];
  const topVehicles = stats?.topVehicles || [];
  const byStatus = stats?.byStatus || [];
  const topDrivers = stats?.topDriversList || [];

  // Trend Calculations
  const thisMonthRev = stats?.thisMonth?.[0]?.revenue || 0;
  const lastMonthRev = stats?.lastMonth?.[0]?.revenue || 0;
  const revTrend = lastMonthRev === 0 ? 100 : ((thisMonthRev - lastMonthRev) / lastMonthRev) * 100;

  const thisMonthBook = stats?.thisMonth?.[0]?.bookings || 0;
  const lastMonthBook = stats?.lastMonth?.[0]?.bookings || 0;
  const bookTrend = lastMonthBook === 0 ? 100 : ((thisMonthBook - lastMonthBook) / lastMonthBook) * 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h4" className="font-extrabold text-gray-900 dark:text-white tracking-tight">
            Overview
          </Typography>
          <Typography variant="body2" className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Monitor your business performance and key metrics.
          </Typography>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Total Revenue (This Month)" 
            value={formatCurrency(thisMonthRev)} 
            icon={<MoneyIcon className="text-emerald-500" />} 
            color="bg-emerald-500/10 dark:bg-emerald-500/20"
            trend={revTrend}
            delay={0.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Bookings (This Month)" 
            value={thisMonthBook.toLocaleString()} 
            icon={<BookingIcon className="text-blue-500" />} 
            color="bg-blue-500/10 dark:bg-blue-500/20"
            trend={bookTrend}
            delay={0.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Total Active Users" 
            value={counts.users.toLocaleString()} 
            icon={<PeopleIcon className="text-indigo-500" />} 
            color="bg-indigo-500/10 dark:bg-indigo-500/20"
            trend={12.5} // Simulated
            delay={0.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Total Vehicles" 
            value={counts.vehicles.toLocaleString()} 
            icon={<CarIcon className="text-violet-500" />} 
            color="bg-violet-500/10 dark:bg-violet-500/20"
            delay={0.4}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Main Area Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <Paper className="p-6 md:p-8 shadow-xl dark:shadow-none dark:bg-[#1e293b] border border-gray-100 dark:border-white/5 rounded-[24px] h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  Revenue Overview
                </Typography>
                <Chip label="Last 30 Days" size="small" className="bg-gray-100 dark:bg-[#0f172a] text-gray-600 dark:text-gray-300 font-semibold" />
              </div>
              <ResponsiveContainer width="100%" height="85%">
                {revenueOverTime.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                    <TrendingUp style={{ fontSize: 48, opacity: 0.2 }} className="mb-2" />
                    <Typography variant="body2" className="font-medium">No revenue data available for this period.</Typography>
                  </div>
                ) : (
                  <AreaChart data={revenueOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={AREA_COLOR} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={AREA_COLOR} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} minTickGap={20} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                      formatter={(value) => [formatCurrency(value), 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke={AREA_COLOR} strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>

        {/* Status Donut Chart */}
        <Grid item xs={12} lg={4}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <Paper className="p-6 md:p-8 shadow-xl dark:shadow-none dark:bg-[#1e293b] border border-gray-100 dark:border-white/5 rounded-[24px] h-[400px] flex flex-col relative">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-2">
                Booking Status
              </Typography>
              <div className="flex-1 relative">
                {byStatus.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <Typography variant="body2" className="font-medium">No bookings found.</Typography>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={byStatus}
                        cx="50%"
                        cy="40%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="count"
                        nameKey="_id"
                        stroke="none"
                        cornerRadius={6}
                      >
                        {byStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center" 
                        iconType="circle" 
                        wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#94a3b8', paddingTop: '10px' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Bottom Section: Top Drivers Table & Top Vehicles Bar */}
      <Grid container spacing={4}>
        {/* Top Drivers Table */}
        <Grid item xs={12} lg={7}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
            <Paper className="shadow-xl dark:shadow-none dark:bg-[#1e293b] border border-gray-100 dark:border-white/5 rounded-[24px] overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  Top Performing Drivers
                </Typography>
              </div>
              <TableContainer>
                <Table>
                  <TableHead className="bg-gray-50/50 dark:bg-white/[0.02]">
                    <TableRow>
                      <TableCell className="text-gray-500 dark:text-gray-400 font-semibold border-b dark:border-white/5">Driver</TableCell>
                      <TableCell className="text-gray-500 dark:text-gray-400 font-semibold border-b dark:border-white/5">Rating</TableCell>
                      <TableCell align="center" className="text-gray-500 dark:text-gray-400 font-semibold border-b dark:border-white/5">Trips</TableCell>
                      <TableCell align="right" className="text-gray-500 dark:text-gray-400 font-semibold border-b dark:border-white/5">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topDrivers.length === 0 ? (
                      <TableRow><TableCell colSpan={4} align="center" className="text-gray-500 dark:border-white/5">No driver data available</TableCell></TableRow>
                    ) : (
                      topDrivers.map((row, idx) => (
                        <TableRow key={idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                          <TableCell className="border-b dark:border-white/5">
                            <div className="flex items-center gap-3">
                              <Avatar className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-bold w-8 h-8 text-sm">
                                {row.name.charAt(0)}
                              </Avatar>
                              <span className="font-semibold text-gray-800 dark:text-gray-200">{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="border-b dark:border-white/5">
                            <div className="flex items-center text-yellow-500 font-bold text-sm">
                              <StarIcon fontSize="small" className="mr-1" />
                              {row.averageRating ? row.averageRating.toFixed(1) : 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell align="center" className="border-b dark:border-white/5 font-semibold text-gray-700 dark:text-gray-300">
                            {row.count}
                          </TableCell>
                          <TableCell align="right" className="border-b dark:border-white/5 font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(row.revenue)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </motion.div>
        </Grid>

        {/* Top Vehicles Bar Chart */}
        <Grid item xs={12} lg={5}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
            <Paper className="p-6 md:p-8 shadow-xl dark:shadow-none dark:bg-[#1e293b] border border-gray-100 dark:border-white/5 rounded-[24px] h-full min-h-[350px]">
              <Typography variant="h6" className="font-bold mb-6 text-gray-800 dark:text-white">
                Vehicles by Demand
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topVehicles} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24} fill={BAR_COLOR}>
                    {topVehicles.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Analytics;

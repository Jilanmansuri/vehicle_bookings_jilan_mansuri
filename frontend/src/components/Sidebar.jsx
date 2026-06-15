import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Dashboard as DashboardIcon, 
  People as PeopleIcon, 
  DirectionsCar as CarIcon, 
  BookOnline as BookingIcon,
  Settings as SettingsIcon,
  PersonPin as DriverIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
  AccountCircle as ProfileIcon,
  ListAlt as ListIcon,
  BarChart as AnalyticsIcon
} from '@mui/icons-material';

const Sidebar = ({ open }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const adminMenuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'Analytics', path: '/dashboard/analytics', icon: <AnalyticsIcon /> },
    { title: 'Users', path: '/dashboard/users', icon: <PeopleIcon /> },
    { title: 'Vehicles', path: '/dashboard/vehicles', icon: <CarIcon /> },
    { title: 'Drivers', path: '/dashboard/drivers', icon: <DriverIcon /> },
    { title: 'Locations', path: '/dashboard/locations', icon: <LocationIcon /> },
    { title: 'Payments', path: '/dashboard/payments', icon: <PaymentIcon /> },
    { title: 'Bookings', path: '/dashboard/bookings', icon: <BookingIcon /> },
    { title: 'Activity Logs', path: '/dashboard/activity', icon: <ListIcon /> },
    { title: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon /> },
  ];

  const userMenuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'My Bookings', path: '/dashboard/bookings', icon: <BookingIcon /> },
    { title: 'Available Vehicles', path: '/dashboard/vehicles', icon: <CarIcon /> },
    { title: 'Booking History', path: '/dashboard/history', icon: <HistoryIcon /> },
    { title: 'Payment History', path: '/dashboard/payments', icon: <PaymentIcon /> },
    { title: 'My Profile', path: '/dashboard/settings', icon: <ProfileIcon /> },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div className={`${open ? 'w-72' : 'w-20'} bg-[#f8fafc]/80 dark:bg-[#0f172a]/90 backdrop-blur-2xl border-r border-gray-200/50 dark:border-white/5 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col z-40`}>
      <div className="h-20 flex items-center justify-center border-b border-gray-200/50 dark:border-white/5 px-4">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="Logo" className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <h1 className={`text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 whitespace-nowrap overflow-hidden transition-all duration-300 ${open ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
            RideMetrics
          </h1>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-1.5 overflow-y-auto pb-6">
        <div className={`text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 ml-2 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 hidden'}`}>
          Menu
        </div>
        
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 dark:border-cyan-500/20 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)] dark:shadow-[inset_0_0_12px_rgba(6,182,212,0.15)]' 
                  : 'text-gray-500 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 border border-transparent'
              }`}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-cyan-400 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
              
              <span className={`mr-4 transition-all duration-300 relative z-10 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'group-hover:scale-110 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                {item.icon}
              </span>
              <span className={`${!open && 'hidden'} font-semibold tracking-wide whitespace-nowrap relative z-10 text-[13px]`}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

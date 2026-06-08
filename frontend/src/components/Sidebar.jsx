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
  ListAlt as ListIcon
} from '@mui/icons-material';

const Sidebar = ({ open }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const adminMenuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
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
    <div className={`${open ? 'w-72' : 'w-20'} bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 flex flex-col z-20`}>
      <div className="h-20 flex items-center justify-center border-b border-gray-100 dark:border-gray-800/50 px-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl shadow-lg shadow-blue-500/30 text-white">
            <CarIcon fontSize="small" />
          </div>
          <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 whitespace-nowrap overflow-hidden transition-all duration-300 ${open ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
            DealXpress
          </h1>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 text-blue-700 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <span className={`mr-4 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className={`${!open && 'hidden'} font-medium tracking-wide whitespace-nowrap`}>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

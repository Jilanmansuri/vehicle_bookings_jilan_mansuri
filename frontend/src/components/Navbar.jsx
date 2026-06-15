import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, Avatar, Menu, MenuItem, InputBase, Badge } from '@mui/material';
import { 
  Menu as MenuIcon, 
  Brightness4, 
  Brightness7, 
  ExitToApp,
  Search as SearchIcon,
  NotificationsNone as NotificationsIcon
} from '@mui/icons-material';
import { toggleTheme } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { logoutUser } from '../services/auth.service';

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const themeMode = useSelector((state) => state.ui.themeMode);
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <header className="h-20 bg-white/40 dark:bg-[#0f172a]/60 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] flex items-center justify-between px-8 transition-all duration-300 sticky top-0 z-50">
      <div className="flex items-center space-x-6">
        <IconButton 
          onClick={toggleSidebar} 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all duration-300"
          size="medium"
        >
          <MenuIcon />
        </IconButton>
        
        {/* Global Search */}
        <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-[#1e293b]/50 border border-gray-200/50 dark:border-white/5 rounded-2xl px-4 py-2 w-72 lg:w-96 hover:bg-gray-100 dark:hover:bg-[#1e293b]/80 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all duration-300 group">
          <SearchIcon className="text-gray-400 group-focus-within:text-blue-500 transition-colors" fontSize="small" />
          <InputBase
            placeholder="Search bookings, users, or drivers..."
            className="ml-3 flex-1 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 font-medium"
          />
          <div className="hidden lg:flex items-center space-x-1 border border-gray-200 dark:border-white/10 rounded px-1.5 py-0.5 bg-white dark:bg-[#0f172a]">
            <span className="text-[10px] font-bold text-gray-400">Ctrl</span>
            <span className="text-[10px] font-bold text-gray-400">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 lg:space-x-6">
        
        {/* Theme Toggle */}
        <IconButton 
          onClick={() => dispatch(toggleTheme())} 
          className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all duration-300"
        >
          {themeMode === 'dark' ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
        </IconButton>

        {/* Notifications */}
        <IconButton 
          className="text-gray-400 hover:text-blue-500 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all duration-300"
        >
          <Badge color="error" variant="dot" overlap="circular">
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>

        <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>

        <div 
          className="flex items-center space-x-3 cursor-pointer group p-1.5 pr-4 rounded-full bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-white/10" 
          onClick={handleMenuOpen}
        >
          <div className="relative">
            <Avatar 
              sx={{ 
                width: 36, height: 36,
                bgcolor: 'transparent',
                background: 'linear-gradient(135deg, #0ea5e9, #4f46e5)',
                fontWeight: '900',
                fontSize: '1rem'
              }}
              className="ring-2 ring-white dark:ring-[#0f172a] shadow-md group-hover:scale-105 transition-transform duration-300"
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#0f172a] rounded-full shadow-sm"></div>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase mt-0.5">
              {user?.role || 'Admin'}
            </p>
          </div>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.25))',
              mt: 2,
              borderRadius: '16px',
              border: themeMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              bgcolor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              color: themeMode === 'dark' ? '#f8fafc' : '#0f172a',
              minWidth: '200px',
              padding: '8px',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 24,
                width: 10,
                height: 10,
                bgcolor: themeMode === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                borderTop: themeMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                borderLeft: themeMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              },
            },
          }}
        >
          <div className="px-4 py-3 mb-2 border-b border-gray-100 dark:border-white/10">
            <p className="text-sm font-bold truncate">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'admin@ridemetrics.com'}</p>
          </div>
          
          <MenuItem className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl font-medium mx-1 py-2.5 text-sm transition-colors">
            Profile Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl font-bold mx-1 mt-1 py-2.5 text-sm transition-colors group">
            <ExitToApp fontSize="small" className="mr-3 group-hover:scale-110 transition-transform" />
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;

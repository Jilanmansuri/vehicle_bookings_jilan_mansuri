import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7, ExitToApp } from '@mui/icons-material';
import { toggleTheme } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { logoutUser } from '../services/auth.service';
import { useState } from 'react';

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
    <header className="h-20 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between px-6 transition-all duration-300 sticky top-0 z-10">
      <div className="flex items-center">
        <IconButton onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MenuIcon />
        </IconButton>
      </div>

      <div className="flex items-center space-x-4">
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {themeMode === 'dark' ? <Brightness7 className="text-yellow-400" /> : <Brightness4 className="text-gray-600" />}
        </IconButton>

        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleMenuOpen}>
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'Admin'}</p>
          </div>
          <Avatar sx={{ bgcolor: '#3b82f6' }}>{user?.name?.charAt(0) || 'A'}</Avatar>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout} className="text-red-600">
            <ExitToApp fontSize="small" className="mr-2" />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;

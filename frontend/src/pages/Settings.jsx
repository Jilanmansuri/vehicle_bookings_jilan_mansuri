import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Paper, Grid, TextField, Button, Switch, FormControlLabel, Divider, Avatar } from '@mui/material';
import { Person as PersonIcon, DarkMode, LightMode, Security as SecurityIcon } from '@mui/icons-material';
import { toggleTheme } from '../store/slices/uiSlice';
import { toast } from 'react-toastify';

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const themeMode = useSelector((state) => state.ui.themeMode);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully! (Demo)');
    }, 500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast.success('Password changed successfully! (Demo)');
      setCurrentPassword('');
      setNewPassword('');
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
          Settings & Profile
        </Typography>
        <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences.
        </Typography>
      </div>

      <Grid container spacing={4}>
        {/* Left Column - Profile Settings */}
        <Grid item xs={12} md={7}>
          <div className="space-y-6">
            <Paper className="p-6 shadow-sm dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <PersonIcon className="text-blue-500" />
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  Personal Information
                </Typography>
              </div>
              
              <div className="flex items-center gap-6 mb-8">
                <Avatar 
                  className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 text-3xl font-bold"
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <div>
                  <Typography variant="h6" className="font-bold dark:text-white">
                    {user?.name}
                  </Typography>
                  <Typography className="text-gray-500 dark:text-gray-400 capitalize">
                    {user?.role} Account
                  </Typography>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <TextField 
                  fullWidth 
                  label="Full Name" 
                  variant="outlined" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl"
                />
                <TextField 
                  fullWidth 
                  label="Email Address" 
                  type="email" 
                  variant="outlined" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-2.5"
                >
                  Save Changes
                </Button>
              </form>
            </Paper>

            <Paper className="p-6 shadow-sm dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <SecurityIcon className="text-purple-500" />
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  Change Password
                </Typography>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <TextField 
                  fullWidth 
                  label="Current Password" 
                  type="password" 
                  variant="outlined" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl"
                />
                <TextField 
                  fullWidth 
                  label="New Password" 
                  type="password" 
                  variant="outlined" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-xl px-8 py-2.5"
                >
                  Update Password
                </Button>
              </form>
            </Paper>
          </div>
        </Grid>

        {/* Right Column - Preferences */}
        <Grid item xs={12} md={5}>
          <Paper className="p-6 shadow-sm dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-6">
              Preferences
            </Typography>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {themeMode === 'dark' ? <DarkMode className="text-blue-400" /> : <LightMode className="text-orange-400" />}
                  <div>
                    <Typography className="font-semibold text-gray-800 dark:text-white">
                      Dark Mode
                    </Typography>
                    <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                      Toggle dark/light theme
                    </Typography>
                  </div>
                </div>
                <Switch 
                  checked={themeMode === 'dark'} 
                  onChange={() => dispatch(toggleTheme())} 
                  color="primary" 
                />
              </div>

              <Divider className="dark:border-gray-700" />

              <div className="flex items-center justify-between">
                <div>
                  <Typography className="font-semibold text-gray-800 dark:text-white">
                    Email Notifications
                  </Typography>
                  <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                    Receive daily summaries
                  </Typography>
                </div>
                <Switch defaultChecked color="primary" />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;

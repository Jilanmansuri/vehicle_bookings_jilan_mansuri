import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, TextField, Button, Switch, Divider, Avatar } from '@mui/material';
import { Person as PersonIcon, DarkMode, LightMode, Security as SecurityIcon } from '@mui/icons-material';
import { toggleTheme } from '../store/slices/uiSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

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
    setTimeout(() => {
      toast.success('Profile updated successfully!');
    }, 500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setTimeout(() => {
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    }, 500);
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <Typography variant="h3" className="font-extrabold tracking-tight text-gray-900 dark:text-white">
          Settings & Profile
        </Typography>
        <Typography variant="subtitle1" className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account preferences and security.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Left Column - Profile Settings */}
        <Grid item xs={12} md={7}>
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="p-8 shadow-xl shadow-blue-900/5 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 lift-on-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                  <PersonIcon className="text-blue-600 dark:text-blue-400" fontSize="large" />
                </div>
                <Typography variant="h5" className="font-bold text-gray-900 dark:text-white tracking-tight">
                  Personal Information
                </Typography>
              </div>
              
              <div className="flex items-center gap-6 mb-8 relative z-10">
                <Avatar 
                  className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 text-4xl font-black shadow-lg shadow-blue-500/30 ring-4 ring-white dark:ring-slate-800"
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <div>
                  <Typography variant="h5" className="font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </Typography>
                  <Typography className="text-blue-600 dark:text-blue-400 font-semibold capitalize tracking-wide text-sm mt-1">
                    {user?.role} Account
                  </Typography>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 relative z-10">
                <TextField 
                  fullWidth 
                  label="Full Name" 
                  variant="outlined" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl"
                  InputProps={{ className: 'rounded-xl' }}
                />
                <TextField 
                  fullWidth 
                  label="Email Address" 
                  type="email" 
                  variant="outlined" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl"
                  InputProps={{ className: 'rounded-xl' }}
                />
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg rounded-xl px-10 py-3 font-bold capitalize tracking-wide transition-all"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 shadow-xl shadow-purple-900/5 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 lift-on-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-2xl">
                  <SecurityIcon className="text-purple-600 dark:text-purple-400" fontSize="large" />
                </div>
                <Typography variant="h5" className="font-bold text-gray-900 dark:text-white tracking-tight">
                  Security
                </Typography>
              </div>

              <form onSubmit={handleChangePassword} className="flex flex-col gap-6 relative z-10">
                <TextField 
                  fullWidth 
                  label="Current Password" 
                  type="password" 
                  variant="outlined" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl"
                  InputProps={{ className: 'rounded-xl' }}
                />
                <TextField 
                  fullWidth 
                  label="New Password" 
                  type="password" 
                  variant="outlined" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl"
                  InputProps={{ className: 'rounded-xl' }}
                />
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg rounded-xl px-10 py-3 font-bold capitalize tracking-wide transition-all"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </Grid>

        {/* Right Column - Preferences */}
        <Grid item xs={12} md={5}>
          <motion.div variants={itemVariants} className="p-8 shadow-xl shadow-orange-900/5 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 sticky top-28">
            <Typography variant="h5" className="font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
              Preferences
            </Typography>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                    {themeMode === 'dark' ? <DarkMode className="text-indigo-400" /> : <LightMode className="text-orange-500" />}
                  </div>
                  <div>
                    <Typography className="font-bold text-gray-900 dark:text-white">
                      Dark Mode
                    </Typography>
                    <Typography variant="body2" className="text-gray-500 dark:text-gray-400 mt-0.5">
                      Toggle appearance
                    </Typography>
                  </div>
                </div>
                <Switch 
                  checked={themeMode === 'dark'} 
                  onChange={() => dispatch(toggleTheme())} 
                  color="primary" 
                />
              </div>

              <Divider className="dark:border-gray-700/50" />

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <Typography className="font-bold text-gray-900 dark:text-white">
                      Email Notifications
                    </Typography>
                    <Typography variant="body2" className="text-gray-500 dark:text-gray-400 mt-0.5">
                      Receive daily updates
                    </Typography>
                  </div>
                </div>
                <Switch defaultChecked color="primary" />
              </div>
            </div>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Settings;

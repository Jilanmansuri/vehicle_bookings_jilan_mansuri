import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleTheme } from '../store/slices/uiSlice';
import { 
  Brightness4 as MoonIcon, 
  Brightness7 as SunIcon 
} from '@mui/icons-material';

// Custom neon/vibrant icons using SVG for visual crispness
const ShieldIcon = () => (
  <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-6 h-6 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-6 h-6 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6 text-rose-500 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.themeMode);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-gray-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative transition-colors duration-300">
      
      {/* Background glow graphics */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-[30vh] right-1/4 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20vh] left-10 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-[#030712]/60 backdrop-blur-xl border-b border-slate-200/80 dark:border-gray-800/80 px-6 lg:px-16 py-4 flex items-center justify-between transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            RideMetrics
          </span>
        </div>

        {/* Center operational pill */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-100 dark:bg-gray-900/60 border border-slate-200/60 dark:border-gray-800/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-500 dark:text-gray-400">Ride Booking:</span>
          <span>Operational</span>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => dispatch(toggleTheme())} 
            className="p-2.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-gray-700 transition-all duration-200 cursor-pointer"
            title="Toggle theme"
          >
            {themeMode === 'dark' ? <SunIcon fontSize="small" /> : <MoonIcon fontSize="small" />}
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="hidden sm:inline-flex items-center text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all px-4 py-2 cursor-pointer"
          >
            Sign In
          </button>

          <button 
            onClick={() => navigate('/register')}
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] cursor-pointer group"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Feature Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-gradient-to-r dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 mb-8 tracking-wide shadow-sm"
        >
          <span>🏆</span>
          <span>Premium Fleet Booking Portal</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          Supercharge Your Fleet <br />
          For <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-500 bg-clip-text text-transparent">Modern Bookings</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-600 dark:text-gray-400 text-lg sm:text-xl max-w-3xl leading-relaxed mb-10"
        >
          Unlock granular booking operations. Manage vehicle collections, analyze driver assignments, perform real-time scheduling, and configure RBAC authorization policies in one beautiful panel.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto"
        >
          <button 
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-base transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)] dark:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            Create Free Account
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-semibold rounded-xl text-base transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800/40 shadow-sm"
          >
            Sign In Dashboard
          </button>
        </motion.div>

        {/* Mockup Dashboard Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-5xl bg-white dark:bg-[#090d16]/80 border border-slate-200 dark:border-gray-800 rounded-2xl p-1 md:p-2.5 shadow-xl dark:shadow-2xl relative transition-colors duration-300"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-gray-800/60">
            {/* Red, Yellow, Green circles */}
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            
            {/* URL bar */}
            <div className="bg-slate-100 dark:bg-gray-950/80 border border-slate-200/60 dark:border-gray-800/60 text-slate-400 dark:text-gray-500 text-xs px-6 py-1.5 rounded-lg max-w-[280px] sm:max-w-[360px] w-full truncate font-mono tracking-wider select-none text-center">
              https://ridemetrics.io/dashboard
            </div>

            <div className="w-12"></div> {/* Spacer to balance dots */}
          </div>

          {/* Stats Preview Content */}
          <div className="bg-slate-50/30 dark:bg-[#040810] p-6 rounded-b-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left transition-colors duration-300">
            
            {/* Stat Card 1 */}
            <div className="bg-white dark:bg-gray-900/30 border border-slate-200/60 dark:border-gray-800/50 p-5 rounded-xl backdrop-blur-md relative overflow-hidden group shadow-sm transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Bookings</p>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">115,011</h3>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-2 flex items-center gap-1">
                <span>↑ 12.5%</span> <span className="text-slate-400 dark:text-gray-500 font-medium">this month</span>
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white dark:bg-gray-900/30 border border-slate-200/60 dark:border-gray-800/50 p-5 rounded-xl backdrop-blur-md relative overflow-hidden group shadow-sm transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Active Vehicles</p>
              <h3 className="text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tight">2,481</h3>
              <p className="text-[11px] text-purple-500 dark:text-purple-400/80 font-bold mt-2 flex items-center gap-1">
                <span>98.6%</span> <span className="text-slate-400 dark:text-gray-500 font-medium">availability</span>
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white dark:bg-gray-900/30 border border-slate-200/60 dark:border-gray-800/50 p-5 rounded-xl backdrop-blur-md relative overflow-hidden group shadow-sm transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Drivers On Duty</p>
              <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">42,912</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80 font-bold mt-2 flex items-center gap-1">
                <span>1,489</span> <span className="text-slate-400 dark:text-gray-500 font-medium">active shifts</span>
              </p>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white dark:bg-gray-900/30 border border-slate-200/60 dark:border-gray-800/50 p-5 rounded-xl backdrop-blur-md relative overflow-hidden group shadow-sm transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
              <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Avg Dispatch</p>
              <h3 className="text-3xl font-black text-sky-600 dark:text-sky-400 tracking-tight">48 ms</h3>
              <p className="text-[11px] text-sky-600 dark:text-sky-400/80 font-bold mt-2 flex items-center gap-1">
                <span>99.98%</span> <span className="text-slate-400 dark:text-gray-500 font-medium">success rate</span>
              </p>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
        {/* Background visual header effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-slate-200/30 dark:text-gray-800/5 text-[5rem] sm:text-[9rem] font-black select-none pointer-events-none text-center w-full uppercase tracking-widest transition-colors duration-300">
          EXCELLENCE
        </div>

        <div className="text-center relative mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Features Engineered for Excellence
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our dashboard comes packed with premium architectural designs and robust data-management capabilities out of the box.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.3)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#0b0f19]/80 border border-slate-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col items-start shadow-md dark:shadow-lg hover:shadow-blue-500/5 transition-all group"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mb-6 shadow-inner ring-1 ring-blue-500/10 dark:ring-blue-500/20 group-hover:bg-blue-500/20 transition-all duration-300">
              <ShieldIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-wide">JWT Auth & Route Guards</h3>
            <p className="text-slate-650 dark:text-gray-400 text-sm leading-relaxed">
              Secure signup, login, and password management. Supports strict role authentication blocks dividing administrators from standard accounts.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -6, borderColor: 'rgba(168,85,247,0.3)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#0b0f19]/80 border border-slate-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col items-start shadow-md dark:shadow-lg hover:shadow-purple-500/5 transition-all group"
          >
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl mb-6 shadow-inner ring-1 ring-purple-500/10 dark:ring-purple-500/20 group-hover:bg-purple-500/20 transition-all duration-300">
              <DatabaseIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-wide">Interactive MongoDB Grid</h3>
            <p className="text-slate-650 dark:text-gray-400 text-sm leading-relaxed">
              Explore dataset collections seamlessly. Complete query builder support for paginated views, alphabetical sorting, and dynamic headers.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.3)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#0b0f19]/80 border border-slate-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col items-start shadow-md dark:shadow-lg hover:shadow-blue-500/5 transition-all group"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mb-6 shadow-inner ring-1 ring-blue-500/10 dark:ring-blue-500/20 group-hover:bg-blue-500/20 transition-all duration-300">
              <ChartIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-wide">Analytics Visualization</h3>
            <p className="text-slate-650 dark:text-gray-400 text-sm leading-relaxed">
              Graph distributions of programming languages, framework usage, and repository sources dynamically using rich Recharts graphs.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            whileHover={{ y: -6, borderColor: 'rgba(16,185,129,0.3)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#0b0f19]/80 border border-slate-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col items-start shadow-md dark:shadow-lg hover:shadow-emerald-500/5 transition-all group"
          >
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl mb-6 shadow-inner ring-1 ring-emerald-500/10 dark:ring-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
              <LightningIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-wide">Live Regex Filters & Search</h3>
            <p className="text-slate-650 dark:text-gray-400 text-sm leading-relaxed">
              Search through 115,000+ records instantly. Employs optimized backend indexing to query text, code fragments, and parameters safely.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div 
            whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.3)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#0b0f19]/80 border border-slate-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col items-start shadow-md dark:shadow-lg hover:shadow-blue-500/5 transition-all group"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mb-6 shadow-inner ring-1 ring-blue-500/10 dark:ring-blue-500/20 group-hover:bg-blue-500/20 transition-all duration-300">
              <FileIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-wide">JSON Import & CSV Export</h3>
            <p className="text-slate-650 dark:text-gray-400 text-sm leading-relaxed">
              Import local JSON datasets to seed database collections directly, or stream the filtered items list into local CSV files.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div 
            whileHover={{ y: -6, borderColor: 'rgba(244,63,94,0.3)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#0b0f19]/80 border border-slate-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col items-start shadow-md dark:shadow-lg hover:shadow-rose-500/5 transition-all group"
          >
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-2xl mb-6 shadow-inner ring-1 ring-rose-500/10 dark:ring-rose-500/20 group-hover:bg-rose-500/20 transition-all duration-300">
              <UsersIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-wide">Admin Roster Control</h3>
            <p className="text-slate-650 dark:text-gray-400 text-sm leading-relaxed">
              Administrator-exclusive panels to manage active user rosters, configure permissions, and toggle system roles.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-gray-800/80 bg-white/50 dark:bg-gray-950/40 py-12 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-500 dark:text-gray-400">
              RideMetrics &copy; {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-gray-500 font-medium">
            <span className="hover:text-slate-900 dark:hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 dark:hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 dark:hover:text-gray-300 cursor-pointer">Contact Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';
import { loginUser, googleLogin } from '../services/auth.service';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await loginUser(values);
        if (response.success) {
          dispatch(setCredentials({ user: response.data.user, token: response.data.accessToken }));
          toast.success('Login successful!');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await googleLogin(credentialResponse.credential);
      if (response.success) {
        dispatch(setCredentials({ user: response.data.user, token: response.data.accessToken }));
        toast.success('Google Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to authenticate with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-[#0f172a]">
      {/* Left Side - Image/Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-blue-600 dark:bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-900/90 dark:from-slate-900/95 dark:to-indigo-900/90 z-10" />
        <img 
          src={heroImage} 
          alt="Luxury Cars" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-20 flex flex-col items-start justify-center p-16 h-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Premium Vehicle <br/> Booking Experience
            </h1>
            <p className="text-xl text-blue-100 max-w-md font-light leading-relaxed">
              Manage your fleet, book luxurious rides, and track analytics all in one sophisticated platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-hidden">
        {/* Decorative ambient blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md w-full space-y-8 z-10 glass p-8 sm:p-10 rounded-3xl shadow-xl dark:shadow-none border border-white/50 dark:border-gray-700/50 relative"
        >
          <div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Create one now
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formik.touched.email && formik.errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  placeholder="name@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs font-medium mt-1 ml-1">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formik.touched.password && formik.errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs font-medium mt-1 ml-1">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
                className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl font-bold text-white rounded-xl transition-all lift-on-hover"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </div>
            
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 rounded">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast.error('Google Login Failed');
                }}
                useOneTap
              />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

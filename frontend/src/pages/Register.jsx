import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';
import { registerUser, googleLogin } from '../services/auth.service';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        
        if (response.success) {
          dispatch(setCredentials({ user: response.data.user, token: response.data.accessToken }));
          toast.success('Registration successful!');
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
        toast.success('Google Registration/Login successful!');
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
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-hidden order-2 lg:order-1">
        {/* Decorative ambient blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md w-full space-y-6 z-10 glass p-8 sm:p-10 rounded-3xl shadow-xl dark:shadow-none border border-white/50 dark:border-gray-700/50 relative"
        >
          <div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Create an Account
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
          
          <form className="mt-6 space-y-5" onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formik.touched.name && formik.errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs font-medium mt-1 ml-1">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
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
                  className={`w-full px-4 py-3 rounded-xl border bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
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

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`w-full px-4 py-3 rounded-xl border bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  placeholder="••••••••"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs font-medium mt-1 ml-1">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
                className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl font-bold text-white rounded-xl transition-all lift-on-hover"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
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

      {/* Right Side - Image/Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-blue-600 dark:bg-indigo-900 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/90 to-indigo-900/90 dark:from-slate-900/95 dark:to-indigo-900/90 z-10" />
        <img 
          src={heroImage} 
          alt="Luxury Cars" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-20 flex flex-col items-end justify-center p-16 h-full text-white w-full text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Join the Fleet <br/> Today
            </h1>
            <p className="text-xl text-blue-100 max-w-md ml-auto font-light leading-relaxed">
              Unlock access to premium vehicles, seamless bookings, and a world-class travel experience.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

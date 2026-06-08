import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';
import { loginUser } from '../services/auth.service';
import { toast } from 'react-toastify';
import { TextField, Button, CircularProgress } from '@mui/material';

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
        // Error handled by interceptor, but we catch it here to stop loading
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient">
      <div className="max-w-md w-full space-y-8 p-10 glass rounded-2xl shadow-2xl mx-4 lift-on-hover">
        <div>
          <h2 className="mt-2 text-center text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-3 text-center text-sm text-gray-700 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Create one now
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full px-4 py-3.5 rounded-xl border bg-white/40 dark:bg-gray-900/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-gray-800/60 transition-all ${
                  formik.touched.email && formik.errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200/60 dark:border-gray-700/60'
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

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className={`w-full px-4 py-3.5 rounded-xl border bg-white/40 dark:bg-gray-900/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/60 dark:focus:bg-gray-800/60 transition-all ${
                  formik.touched.password && formik.errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200/60 dark:border-gray-700/60'
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

          <div>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md font-semibold text-white rounded-lg transition-all"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

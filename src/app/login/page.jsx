'use client'
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await fetch('https://practo-backend.vercel.app/api/onelogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user);
        
        switch(data.user.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'doctor':
            router.push('/doctor-dashboard');
            break;
          case 'clinic':
           if(data.user.status=="pending"){
        router.push(`/pending-request/${data.user.id}`);
        
      }else if(data.user.status=="rejected"){
        router.push(`/rejected/${data.user.id}`);

      }else{
              router.push('/clinic');

            }
            
            break;
          case 'patient':
            router.push('/patient-dashboard');
            break;
          case 'Receptionist':
            router.push('/receptionist-dashboard');
            break;
          default:
            router.push('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
        setShowErrorModal(true);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
      {/* Left Side - Animated Image (Hidden on mobile) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600"
      >
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="text-center w-full max-w-md"
        >
          <Image 
            src="/login.png"
            alt="Medical Illustration"
            width={500}
            height={500}
            className="w-full h-auto max-w-xs mx-auto rounded-xl drop-shadow-2xl"
            priority
          />
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-6">Welcome to HealthCare</h2>
          <p className="text-blue-100 mt-2 text-sm md:text-base">Your health is our priority</p>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-xl lg:rounded-2xl shadow-md lg:shadow-xl p-6 sm:p-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Sign in to access your account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Formik
            initialValues={{ 
              email: '', 
              password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-6 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center shadow-md text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Sign In
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </Form>
            )}
          </Formik>

          <div className="mt-5 text-center text-xs sm:text-sm">
            Don't have an account?{' '}
            <button 
              onClick={() => router.push('/register')} 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register here
            </button>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-500/20 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative border border-blue-100 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>
              
              <button
                onClick={() => setShowErrorModal(false)}
                className="absolute top-4 right-4 text-blue-400 hover:text-blue-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full shadow-inner">
                  <ExclamationTriangleIcon className="h-8 w-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800">Login Failed</h3>
                
                <p className="text-gray-600">
                  {error || 'The email or password you entered is incorrect. Please try again.'}
                </p>
                
                <div className="w-full pt-4">
                  <button
                    onClick={() => setShowErrorModal(false)}
                    className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
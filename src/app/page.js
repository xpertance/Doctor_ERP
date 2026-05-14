'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Splash() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Mouse tracking for subtle background glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    // Keep auto-redirect but extend a little bit so they can interact if they want
    const timer = setTimeout(() => {
      router.push('/login');
    }, 4000); 

    return () => clearTimeout(timer);
  }, [router]);

  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleProceed = () => {
    router.push('/login');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500"
    >
      <Head>
        <title>DOC ERP | Smart Healthcare</title>
        <meta name="description" content="DOC ERP - Smart Healthcare Operating System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Subtle Interactive Glow */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
          x: useTransform(smoothX, value => value * 0.15),
          y: useTransform(smoothY, value => value * 0.15),
        }}
      />

      <motion.div 
        className={`relative z-10 flex flex-col items-center transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Simple Interactive Logo */}
        <motion.div 
          className="relative mb-6 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProceed}
        >
          <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-6 rounded-3xl shadow-xl flex items-center justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        </motion.div>

        {/* Text */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">
          DOC ERP
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium tracking-wide text-center px-4 mb-10">
          Smart Healthcare Operating System
        </p>

        {/* Simple Button */}
        <motion.button 
          className="group flex items-center space-x-2 px-8 py-3 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProceed}
        >
          <span>Enter Platform</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}

'use client';
// components/layout/DashboardLayout.jsx
import { useState ,useEffect} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/navigation'
import { ROLES } from '@/constants/roles';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
 useEffect(() => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (!token || !userStr) {
        router.push('/login')
        return
      }
      
       try {
         const user = JSON.parse(userStr)
         console.log(user)
  
     
        if (user.role !== ROLES.RECEPTIONIST) {
          router.push('/login')
        }
      } catch (error) {
        console.error('Invalid user data in localStorage')
        router.push('/login')
      }
    }, [])
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}

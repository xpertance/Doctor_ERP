// components/layout/DashboardLayout.jsx
'use client';
import { useState ,useEffect} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/navigation'

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
  
     
        if (user.role !== "Receptionist") {
          router.push('/login')
        }
      } catch (error) {
        console.error('Invalid user data in localStorage')
        router.push('/login')
      }
    }, [router])
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
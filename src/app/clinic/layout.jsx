 'use client'; 
 import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Building2,
  Stethoscope,
  User
} from 'lucide-react';
import clsx from 'clsx';

export default function ClinicLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [clinicData, setClinicData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/login');
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      setClinicData(user);
      if (user.role !== "clinic") {
        router.push('/login');
      }
      // if(user.status=="pending"){
      //   router.push(`/pending-request/${user.id}`);
        
      // }else if(user.status=="rejected"){
      //   router.push(`/rejected/${user.id}`);

      // }
    } catch (error) {
      console.error('Invalid user data in localStorage');
      router.push('/login');
    }
  }, [router]);
console.log("asdf",clinicData)
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/clinic', id: 'dashboard' },
    { icon: Users, label: 'Doctors', href: '/clinic/doctors', id: 'doctors' },
    { icon: UserPlus, label: 'Receptionists', href: '/clinic/receptionists', id: 'receptionists' },
     { icon: User, label: 'Patients', href: '/clinic/patients', id: 'patients' },
    { icon: ImageIcon, label: 'Manage Images', href: '/clinic/images', id: 'images' },
    { icon: Settings, label: 'Settings', href: '/clinic/settings', id: 'settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      
{/* Animated Desktop Sidebar */}
<motion.div
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
  className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:bg-white lg:shadow-xl lg:block"
>
  <div className="flex h-16 items-center justify-around px-6 border-b border-gray-200/50">
    <div className="w-10 h-10 bg-white shadow-xl rounded-lg flex items-center justify-center">
      <Building2 className="w-5 h-5 text-blue-600" />
    </div>
    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      HealthByte
    </h1>
  </div>
  <nav className="mt-8 px-4">
    {sidebarItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
          }`}
        >
          <Icon className="w-5 h-5 mr-3" />
          <span className="font-medium">{item.label}</span>
        </Link>
      );
    })}
  </nav>

  <div className="absolute bottom-6 left-4 right-4">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          {clinicData?.logo ? (
            <img src={clinicData.logo} alt="Clinic" className="rounded-full w-full h-full object-cover" />
          ) : (
            <Building2 className="w-5 h-5" />
          )}
        </div>
        <div>
          <p className="font-semibold">{clinicData?.name || 'Clinic Name'}</p>
          <p className="text-sm opacity-90">{clinicData?.email || 'clinic@example.com'}</p>
        </div>
      </div>
    </div>
  </div>
</motion.div>


{/* Mobile Sidebar */}
{sidebarOpen && (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      onClick={() => setSidebarOpen(false)}
    />
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl p-4 lg:hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-blue-600">HealthByte</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  </>
)}


      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden md:flex items-center ml-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search doctors, receptionists..."
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    {clinicData?.profileImage ? (
                      <img src={clinicData.profileImage} alt="Clinic" className="rounded-full w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{clinicData?.name || 'Clinic Name'}</p>
                    <p className="text-xs text-gray-500">Clinic Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{clinicData?.name || 'Clinic Name'}</p>
                      <p className="text-xs text-gray-500">{clinicData?.email || 'clinic@example.com'}</p>
                    </div>
                    <Link 
                      href="/clinic/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link 
                      href="/clinic/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <hr className="my-2" />
                    <button 
                      onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        router.push('/login');
                      }} 
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
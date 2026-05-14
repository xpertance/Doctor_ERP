'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROLES } from '@/constants/roles';
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
      if (user.role !== ROLES.CLINIC) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Invalid user data in localStorage');
      router.push('/login');
    }
  }, []);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/clinic', id: 'dashboard' },
    { icon: Users, label: 'Doctors', href: '/clinic/doctors', id: 'doctors' },
    { icon: UserPlus, label: 'Receptionists', href: '/clinic/receptionists', id: 'receptionists' },
    { icon: User, label: 'Patients', href: '/clinic/patients', id: 'patients' },
    { icon: Settings, label: 'Settings', href: '/clinic/settings', id: 'settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Animated Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-72 lg:bg-white/80 lg:backdrop-blur-xl lg:border-r lg:border-slate-200/60 lg:shadow-xl lg:shadow-slate-200/20 lg:block"
      >
        <div className="flex h-20 items-center px-8 border-b border-slate-200/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                HealthByte
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinic Admin</p>
            </div>
          </div>
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
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </motion.div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
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
      )}

      {/* Main content */}
      <div className="lg:ml-72 flex-1 flex flex-col min-h-screen">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors mr-4"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden md:flex items-center">
                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search doctors, patients..."
                    className="pl-11 pr-4 py-2.5 w-80 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 pl-3 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                >
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-bold text-slate-900">{clinicData?.name || 'Clinic Name'}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Clinic Admin</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 p-0.5 border-2 border-white">
                    {clinicData?.profileImage ? (
                      <img src={clinicData.profileImage} alt="Clinic" className="rounded-lg w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
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

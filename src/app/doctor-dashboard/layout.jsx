'use client';
import { useState, useEffect } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROLES } from '@/constants/roles';
import { 
  Stethoscope, Calendar, Users, Activity, Settings, Bell, Search, Menu, X, User, LogOut, ChevronDown, Clock, FileText
} from 'lucide-react';

export default function ClinicDashboardLayout({ children }) {
  const { doctor, loading } = useDoctor();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/login');
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      setUserData(user);
      if (user.role !== ROLES.DOCTOR) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Invalid user data in localStorage');
      router.push('/login');
    }
  }, []);

  const sidebarItems = [
    { icon: Activity, label: 'Overview', href: '/doctor-dashboard', id: 'overview' },
    { icon: Calendar, label: 'Appointments', href: '/doctor-dashboard/appointments', id: 'appointments' },
    { icon: Users, label: 'Patients', href: '/doctor-dashboard/patients', id: 'patients' },
    { icon: Calendar, label: 'Manage Leave', href: '/doctor-dashboard/leave', id: 'leave' },
    { icon: FileText, label: 'Medical Records', href: '/doctor-dashboard/records', id: 'records' },
    { icon: Settings, label: 'Profile', href: '/doctor-dashboard/profile', id: 'profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-around px-6 border-b border-gray-200/50">
          <div className="w-10 h-10 bg-white shadow-xl rounded-lg flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">HealthByte</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors">
            <X className="h-5 w-5" />
          </button>
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
                  isActive ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100">
                <Menu className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-gray-800 ml-4 hidden md:block">
                {pathname === '/doctor-dashboard/patients' ? 'Patient Management' : pathname === '/doctor-dashboard/appointments' ? "Doctor's Appointments" : (sidebarItems.find(i => i.href === pathname)?.label || 'Dashboard')}
              </h2>

              {pathname === '/doctor-dashboard' && (
                <div className="hidden md:flex items-center ml-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search patients, appointments..."
                      className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Top-Right Profile Dropdown */}
              <div className="relative">
                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
                    {doctor?.profileImage ? (
                      <img src={doctor.profileImage} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="hidden md:block text-left min-w-0">
                    <p className="text-sm font-medium text-gray-900 capitalize truncate">Dr. {doctor?.firstName || userData?.firstName || ''}</p>
                    <p className="text-xs text-gray-500 capitalize truncate">{doctor?.hospital || 'Clinic'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Dr. {doctor?.firstName || ''} {doctor?.lastName || ''}</p>
                      <p className="text-xs text-gray-500">{doctor?.email || ''}</p>
                    </div>
                    <Link href="/doctor-dashboard/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setProfileDropdownOpen(false)}>
                      <User className="w-4 h-4 mr-3" /> Profile
                    </Link>
                    <hr className="my-2" />
                    <button onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      router.push('/login');
                    }} className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 text-left">
                      <LogOut className="w-4 h-4 mr-3" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

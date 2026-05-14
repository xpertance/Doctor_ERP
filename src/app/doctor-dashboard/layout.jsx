'use client';
import { useState, useEffect } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROLES } from '@/constants/roles';
import { 
  Stethoscope, Calendar, Users, Activity, Settings, Search, Menu, X, User, LogOut, ChevronDown, Clock, FileText
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl shadow-slate-200/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-20 items-center px-8 border-b border-slate-200/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">HealthByte</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Doctor Portal</p>
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
                  isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
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
      <div className="lg:ml-72 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors mr-4">
                <Menu className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-slate-800 hidden md:block">
                {pathname === '/doctor-dashboard/patients' ? 'Patient Management' : pathname === '/doctor-dashboard/appointments' ? "Doctor's Appointments" : (sidebarItems.find(i => i.href === pathname)?.label || 'Dashboard')}
              </h2>
            </div>

            <div className="flex items-center space-x-6">
              {/* Top-Right Profile Dropdown */}
              <div className="relative">
                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center space-x-3 p-1.5 pl-3 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-bold text-slate-900 capitalize truncate">Dr. {doctor?.firstName || userData?.firstName || ''}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight capitalize truncate">{doctor?.hospital || 'Clinic Consultant'}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 p-0.5 border-2 border-white overflow-hidden">
                    {doctor?.profileImage ? (
                      <img src={doctor.profileImage} alt="Profile" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/60 py-2 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">Dr. {doctor?.firstName || ''} {doctor?.lastName || ''}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{doctor?.email || ''}</p>
                    </div>
                    <Link href="/doctor-dashboard/profile" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors" onClick={() => setProfileDropdownOpen(false)}>
                      <User className="w-4 h-4 mr-3 text-slate-400" /> Profile
                    </Link>
                    <hr className="my-2 border-slate-100" />
                    <button onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      router.push('/login');
                    }} className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left">
                      <LogOut className="w-4 h-4 mr-3" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

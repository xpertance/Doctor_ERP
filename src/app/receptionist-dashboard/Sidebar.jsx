'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL } from '@/utils/api';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  CreditCard,
  Home,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/receptionist-dashboard', icon: Home },
  { name: 'Add Patient', href: '/receptionist-dashboard/patients/add', icon: UserPlus },
  { name: 'View Patients', href: '/receptionist-dashboard/patients', icon: Users },
  { name: 'Appointments', href: '/receptionist-dashboard/appointments', icon: Calendar },
  { name: 'Billing', href: '/receptionist-dashboard/Billing', icon: CreditCard },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [userName, setUserName] = useState('MediReception');

  useEffect(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const localUser = JSON.parse(userStr || '{}');
    const activeUser = user || localUser;
    
    if (activeUser.clinicName) {
      setUserName(`${activeUser.clinicName} - Receptionist`);
    } else if (activeUser.firstName) {
      setUserName(`${activeUser.firstName} - Receptionist`);
    }

    const fetchLatestProfile = async () => {
      try {
        const staffId = activeUser._id || activeUser.id;
        if (!staffId) return;

        const res = await fetch(`${API_BASE_URL}/api/v1/clinic/update-receptionist/${staffId}`);
        const result = await res.json();
        
        if (result.success && result.data.staff && result.data.staff.clinicName) {
          setUserName(`${result.data.staff.clinicName} - Receptionist`);
        }
      } catch (e) {
        console.error("Sidebar Live Fetch Error:", e);
      }
    };
    fetchLatestProfile();
  }, [user]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl shadow-slate-200/20 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center px-8 h-20 border-b border-slate-200/60">
          <Link href="/receptionist-dashboard" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3 min-w-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent truncate max-w-[150px]">
                HealthByte
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Front Office</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden ml-auto p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}

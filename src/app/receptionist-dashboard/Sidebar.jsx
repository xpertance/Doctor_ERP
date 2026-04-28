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
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/receptionist-dashboard" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-base font-bold text-gray-800 truncate max-w-[180px]">
              {userName}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
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

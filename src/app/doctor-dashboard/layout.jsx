
'use client';

import { useState ,useEffect} from 'react';
import { useDoctor } from '@/context/DoctorContext';
import Link from 'next/link';
import { usePathname ,useRouter} from 'next/navigation';
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  Activity, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  User,
  LogOut,
  ChevronDown,
  Clock,
  FileText,
  CreditCard
} from 'lucide-react';

export default function ClinicDashboardLayout({ children }) {
      const { doctor, loading } = useDoctor();
    const router =useRouter();
    const [userData,setUserData]=useState(null);
    useEffect(() => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (!token || !userStr) {
        router.push('/login')
        return
      }
      
      try {
        const user = JSON.parse(userStr)
        setUserData(user);
        console.log(user)
        if (user.role !== "doctor") {
          router.push('/login')
        }
      } catch (error) {
        console.error('Invalid user data in localStorage')
        router.push('/login')
      }
    }, [router])
    console.log("userdata",userData)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const sidebarItems = [
    { icon: Activity, label: 'Overview', href: '/doctor-dashboard', id: 'overview' },
    { icon: Calendar, label: 'Appointments', href: '/doctor-dashboard/appointments', id: 'appointments' },
    { icon: Users, label: 'Patients', href: '/doctor-dashboard/patients', id: 'patients' },
    { icon: Users, label: 'Receptionist', href: '/doctor-dashboard/receptionist', id: 'schedule' },
   
    { icon: CreditCard, label: 'Billing', href: '/doctor-dashboard/billing', id: 'billing' },
     { icon: FileText, label: 'Medical Records', href: '/doctor-dashboard/records', id: 'records' },
    { icon: Settings, label: 'Profile', href: '/doctor-dashboard/profile', id: 'profile' },
  ];

  const ProfilePage = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="-mt-16 mb-4 sm:mb-0">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Dr. {doctor.doctor.firstName}</h1>
              <p className="text-gray-600">Cardiologist</p>
              <p className="text-sm text-gray-500 mt-1">Member since January 2020</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value="Dr. Sarah Johnson" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input 
                  type="text" 
                  value="Cardiologist" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value="sarah.johnson@heartcare.com" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  value="+1 (555) 123-4567" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Address</label>
                <input 
                  type="text" 
                  value="123 Medical Center Dr, Healthcare City, HC 12345" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input 
                  type="text" 
                  value="MD123456789" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input 
                  type="number" 
                  value="15" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical School</label>
                <input 
                  type="text" 
                  value="Harvard Medical School" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Board Certification</label>
                <input 
                  type="text" 
                  value="American Board of Internal Medicine" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Clinic Hours */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Clinic Hours</h2>
            <div className="space-y-3">
              {[
                { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
                { day: 'Saturday', hours: 'Closed' },
                { day: 'Sunday', hours: 'Closed' }
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-700">{day}</span>
                  <span className="text-gray-600">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Patients</span>
                <span className="text-2xl font-bold text-blue-600">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Month</span>
                <span className="text-2xl font-bold text-green-600">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today's Appointments</span>
                <span className="text-2xl font-bold text-orange-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-yellow-500">4.9</span>
                  <span className="text-gray-400 ml-1">★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors text-left">
                Change Password
              </button>
              <button className="w-full bg-green-50 text-green-700 px-4 py-3 rounded-lg hover:bg-green-100 transition-colors text-left">
                Backup Data
              </button>
              <button className="w-full bg-purple-50 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors text-left">
                Export Reports
              </button>
              <button className="w-full bg-gray-50 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                Privacy Settings
              </button>
            </div>
          </div>

          {/* Save Changes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Save Changes
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-around px-6 border-b border-gray-200/50">
          <div className="w-10 h-10 bg-white shadow-xl rounded-lg flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            HealthByte
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
          >
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

        {/* Doctor Info Card */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
             
                <img src={doctor?.doctor.profileImage} alt="" className='rounded-full h-full' />
              </div>
              <div>
                <p className="font-semibold capitalize">Dr. {doctor?.doctor.firstName} {doctor?.doctor.lastName}</p>
                <p className="text-sm opacity-90">{doctor?.doctor.specialty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    placeholder="Search patients, appointments..."
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
                  <img src={doctor?.doctor.profileImage} alt="" className='rounded-full h-full' />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 capitalize">Dr. {doctor?.doctor.firstName} {doctor?.doctor.lastName}</p>
                    <p className="text-xs text-gray-500 capitalize">{doctor?.doctor.hospital}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Dr. {doctor?.doctor.firstName} {doctor?.doctor.lastName}</p>
                      <p className="text-xs text-gray-500">{doctor?.doctor.email}</p>
                    </div>
                    <Link 
                      href="/doctor-dashboard/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link 
                      href="/doctor-dashboard/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <hr className="my-2" />
                    <button  onClick={() => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');// 🔐 Clear the token
    router.push('/login');      // 🚀 Redirect to login
  }} className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 text-left">
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
          {pathname === '/clinic-dashboard/profile' ? <ProfilePage /> : children}
        </main>
      </div>
    </div>
  );
}
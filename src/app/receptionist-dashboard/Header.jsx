'use client';
// app/components/Layout/Header.jsx
import { useState } from 'react'
import { BellIcon, Bars3Icon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation'

export default function Header({ onMenuClick }) {
  const router = useRouter()
  const [notifications] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()

  const getPageTitle = (path) => {
    if (path === '/receptionist-dashboard') return 'Dashboard';
    if (path.includes('/patients/add')) return 'Add Patient';
    if (path.includes('/patients')) return 'View Patients';
    if (path.includes('/appointments/add')) return 'Book Appointment';
    if (path.includes('/appointments')) return 'Appointments';
    if (path.includes('/Billing')) return 'Billing';
    if (path.includes('/Messages')) return 'Messages';
    return 'Dashboard';
  };

  const handleLogout = () => {
    // Perform logout actions here (clear tokens, etc.)
    // For example:
    localStorage.removeItem('token')
       localStorage.removeItem('user')
    
    // Redirect to login page
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Dashboard Title & Date (Desktop) */}
          <div className="hidden lg:flex flex-col ml-4 min-w-[200px]">
            <h2 className="text-xl font-bold text-gray-800 leading-tight">{getPageTitle(pathname)}</h2>
            <p className="text-xs text-gray-500 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Search bar - Only show on Dashboard */}
        {(pathname === '/receptionist-dashboard') ? (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const term = e.target.search.value;
              if (term.trim()) {
                router.push(`/receptionist-dashboard/patients?search=${encodeURIComponent(term)}`);
              }
            }}
            className="flex-1 max-w-lg mx-4"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="search"
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search patients, appointments..."
              />
            </div>
          </form>
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-4">

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="text-sm text-gray-700">Good morning</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">R</span>
              </div>
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => { setShowUserMenu(false); router.push('/receptionist-dashboard/profile'); }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center border-b border-gray-100"
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

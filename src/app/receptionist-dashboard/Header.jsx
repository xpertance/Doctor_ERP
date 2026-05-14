'use client';
// app/components/Layout/Header.jsx
import { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation'

export default function Header({ onMenuClick }) {
  const router = useRouter()
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
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="flex items-center justify-between h-20 px-8">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors mr-4"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Dashboard Title & Date (Desktop) */}
          <div className="hidden lg:flex flex-col min-w-[200px]">
            <h2 className="text-xl font-bold text-slate-800 leading-tight">{getPageTitle(pathname)}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
            className="flex-1 max-w-lg mx-8 group"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                name="search"
                type="text"
                className="block w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all shadow-sm"
                placeholder="Search patients, appointments..."
              />
            </div>
          </form>
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-6">

          {/* User menu */}
          <div className="relative group">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-1.5 pl-3 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-slate-900">Reception Desk</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Front Office</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 p-0.5 border-2 border-white">
                <span className="text-white text-sm font-bold">R</span>
              </div>
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200/60 z-50 overflow-hidden py-2 transform origin-top-right transition-all">
                <div className="py-1">
                  <button
                    onClick={() => { setShowUserMenu(false); router.push('/receptionist-dashboard/profile'); }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center"
                  >
                    <UserIcon className="h-4 w-4 mr-3 text-slate-400" />
                    My Profile
                  </button>
                  <div className="border-t border-slate-100 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

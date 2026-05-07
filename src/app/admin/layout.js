'use client';
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ROLES } from '@/constants/roles';
import { 
  Users, 
  Home, 
  Bell, 
  Search, 
  Menu, 
  X,
  UserPlus,
  Activity,
  BarChart3,
  LogOut,
  ChevronRight,
  Sparkles,
  FileText,
  Settings as SettingsIcon
} from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter();
  const [userdata, setuserdata] = useState({ name: 'Admin User', email: 'admin@healthbyte.com' });

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Doctors', href: '/admin/doctors', icon: Users },
    { name: 'Add Doctor', href: '/admin/doctors/add', icon: UserPlus },
    { name: 'Prescription Template', href: '/admin/prescription-template', icon: FileText },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Clinics', href: '/admin/clinics-manage', icon: Activity },
  ]

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (!token || !userStr) {
      router.push('/login')
      return
    }
    
    try {
      const user = JSON.parse(userStr)
      setuserdata(user)
      if (user.role !== ROLES.ADMIN) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Invalid user data in localStorage')
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30"></div>
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-blue-100
        transform transition-all duration-300 ease-out lg:translate-x-0 shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between px-6 border-b border-blue-50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl blur-md opacity-30"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  HealthByte
                </h1>
                <p className="text-xs text-blue-500 font-medium">Admin Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
            >
              <X className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-3">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                              (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center px-4 py-4 text-sm font-semibold rounded-2xl
                           transition-all duration-200 ease-out hover:scale-[1.02] transform
                           ${isActive 
                             ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                             : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                           }`}
                >
                  <div className={`p-2.5 rounded-xl mr-4 transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 shadow-sm' 
                      : 'bg-blue-100 group-hover:bg-blue-200'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isActive ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                  <span className="flex-1">{item.name}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
                    isActive 
                      ? 'rotate-90 text-white' 
                      : 'text-gray-400 group-hover:translate-x-1 group-hover:text-blue-500'
                  }`} />
                </a>
              )
            })}
          </nav>

          <div className="p-4 border-t border-blue-50">
            <button 
              onClick={() => {
                localStorage.removeItem('token'); 
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="flex w-full items-center px-4 py-4 text-sm font-semibold text-red-600 rounded-2xl
                         transition-all duration-200 ease-out hover:bg-red-50 hover:scale-[1.02] transform"
            >
              <div className="p-2.5 rounded-xl mr-4 bg-red-100 group-hover:bg-red-200">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              <span className="flex-1">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm">
          <div className="flex h-20 items-center justify-between px-6">
            <div className="flex items-center flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-2xl hover:bg-blue-50 transition-all duration-200 group mr-4"
              >
                <Menu className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
              </button>
              
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-12 pr-6 py-4 bg-white border-2 border-blue-100 rounded-2xl text-gray-900 placeholder-blue-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-3 rounded-2xl hover:bg-blue-50 transition-all duration-200 group">
                <Bell className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-md">
                  3
                </span>
              </button>
              
              <div className="relative group cursor-pointer">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                  <span className="text-white font-bold text-sm">
                    {userdata?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                
                {/* Profile Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-50 transform origin-top-right group-hover:translate-y-0 translate-y-2">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{userdata?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{userdata?.email}</p>
                  </div>
                  <a href="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <SettingsIcon className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                    Settings
                  </a>
                  <div className="border-t border-gray-50 my-1"></div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token'); 
                      localStorage.removeItem('user');
                      router.push('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center group/logout"
                  >
                    <LogOut className="h-4 w-4 mr-3 group-hover/logout:scale-110 transition-transform" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 relative">
          <div className="bg-white rounded-3xl border border-blue-100 shadow-xl min-h-[calc(100vh-8rem)] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-48 translate-x-48 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-50 to-transparent rounded-full translate-y-48 -translate-x-48 opacity-50"></div>
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

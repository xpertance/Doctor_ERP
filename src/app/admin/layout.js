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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60
        transform transition-all duration-300 ease-out lg:translate-x-0 shadow-xl shadow-slate-200/20
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center px-8 border-b border-slate-200/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  HealthByte
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SuperAdmin Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
            >
              <X className="h-5 w-5 text-slate-600 group-hover:text-blue-700" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                              (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 mb-2 text-sm font-semibold rounded-xl
                           transition-all duration-200
                           ${isActive 
                             ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                             : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                           }`}
                >
                  <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                </a>
              )
            })}
          </nav>

          <div className="p-4 border-t border-slate-200/60">
            <button 
              onClick={() => {
                localStorage.removeItem('token'); 
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="flex w-full items-center px-4 py-3.5 text-sm font-bold text-red-600 rounded-xl
                         transition-all duration-200 ease-out hover:bg-red-50 hover:scale-[1.02] transform"
            >
              <div className="p-2 rounded-lg mr-3 bg-red-100 group-hover:bg-red-200 transition-colors">
                <LogOut className="h-4 w-4 text-red-600" />
              </div>
              <span className="flex-1">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          <div className="flex h-20 items-center justify-between px-8">
            <div className="flex items-center flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-2xl hover:bg-slate-100 transition-all duration-200 group mr-4"
              >
                <Menu className="h-6 w-6 text-slate-600 group-hover:text-blue-700" />
              </button>
              
              <div className="relative flex-1 max-w-2xl group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Global Search..."
                  className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                           transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative group cursor-pointer">
                <div className="flex items-center space-x-3 p-1.5 pl-3 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-slate-900 truncate">{userdata?.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">SuperAdmin</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 p-0.5 border-2 border-white">
                    <span className="text-white font-bold text-sm">
                      {userdata?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 rotate-90 group-hover:translate-y-0.5 transition-transform" />
                </div>
                
                {/* Profile Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-200/60 z-50 transform origin-top-right group-hover:translate-y-0 translate-y-2 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{userdata?.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{userdata?.email}</p>
                  </div>
                  <a href="/admin/settings" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                    <SettingsIcon className="h-4 w-4 mr-3 text-slate-400" />
                    Settings
                  </a>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token'); 
                      localStorage.removeItem('user');
                      router.push('/login');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center group/logout"
                  >
                    <LogOut className="h-4 w-4 mr-3 group-hover/logout:scale-110 transition-transform" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/10 min-h-[calc(100vh-10rem)] p-8 relative overflow-hidden">
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

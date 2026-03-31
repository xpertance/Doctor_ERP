// 'use client'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { 
//   Users, 
//   Home, 
//   Settings, 
//   Bell, 
//   Search, 
//   Menu, 
//   X,
//   UserPlus,
//   Activity,
//   BarChart3,
//   LogOut
// } from 'lucide-react'

// export default function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//    const router = useRouter();
// //     useEffect(() => {
// //     const token = localStorage.getItem('token')
// //     const user =localStorage.getItem('user')
// //     console.log(user)
// //     if (!token && !user.role=="admin") {
// //       router.push('/login') // 👈 Redirect if token not found
// //     }
// //   }, [router])
// const [userdata,setuserdata]=useState();
// useEffect(() => {
//   const token = localStorage.getItem('token')
//   const userStr = localStorage.getItem('user')
  
//   if (!token || !userStr) {
//     router.push('/login')
//     return
//   }
  
//   try {
//     const user = JSON.parse(userStr)
//     setuserdata(user)
//     if (user.role !== "admin") {
//       router.push('/login')
//     }
//   } catch (error) {
//     console.error('Invalid user data in localStorage')
//     router.push('/login')
//   }
// }, [router])
// console.log(userdata?.name);
//     // const user = JSON.parse(userStr)
// // const user = JSON.parse(localStorage.getItem('user'));

// //  console.log("asdf",user)
//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: Home },
//     { name: 'Doctors', href: '/admin/doctors', icon: Users },
//     { name: 'Add Doctor', href: '/admin/doctors/add', icon: UserPlus },
//     { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
//     { name: 'Clinics', href: '/admin/clinics-manage', icon: Activity },
//     // { name: 'Settings', href: '/admin/settings', icon: Settings },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-white/20
//         transform transition-transform duration-300 ease-in-out lg:translate-x-0
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         <div className="flex h-full flex-col">
//           {/* Logo */}
//           <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200/50">
//             <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               HealthByte
//             </h1>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 space-y-2">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               return (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl
//                            text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50
//                            transition-all duration-200 ease-in-out"
//                 >
//                   <Icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
//                   {item.name}
//                 </a>
//               )
//             })}
//           </nav>

//           {/* User Profile */}
//           <div className="p-4 border-t border-gray-200/50">
//             <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer">
//               <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
//                 <span className="text-white font-semibold text-sm">AD</span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900 truncate">{userdata?.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{userdata?.email}</p>
//               </div>
//             </div>
//             {/* <button className="mt-2 w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-colors">
//               <LogOut className="mr-2 h-4 w-4" />
//               Sign out
//             </button> */}
//             <button
//   onClick={() => {
//     localStorage.removeItem('token'); 
//     localStorage.removeItem('user');// 🔐 Clear the token
//     router.push('/login');      // 🚀 Redirect to login
//   }}
//   className="mt-2 w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-colors"
// >
//   <LogOut className="mr-2 h-4 w-4" />
//   Sign out
// </button>

//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Top bar */}
//         <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/20">
//           <div className="flex h-16 items-center justify-between px-6">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
//               >
//                 <Menu className="h-5 w-5" />
//               </button>
              
//               {/* Search */}
//               <div className="relative ml-4 flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search doctors..."
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl
//                            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
//                            transition-all duration-200"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="relative p-2 rounded-xl hover:bg-gray-100/50 transition-colors">
//                 <Bell className="h-5 w-5 text-gray-600" />
//                 <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
//               </button>
              
//               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
//                 <span className="text-white font-semibold text-sm">AD</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'
import { useState,useEffect } from 'react'
import { usePathname ,useRouter} from 'next/navigation'
import { 
  Users, 
  Home, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  UserPlus,
  Activity,
  BarChart3,
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // const [userdata] = useState({ name: 'Admin User', email: 'admin@healthbyte.com' })
  const pathname = usePathname()
  const router=useRouter();
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Doctors', href: '/admin/doctors', icon: Users },
    { name: 'Add Doctor', href: '/admin/doctors/add', icon: UserPlus },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Clinics', href: '/admin/clinics-manage', icon: Activity },
  ]
const [userdata,setuserdata]=useState({ name: 'Admin User', email: 'admin@healthbyte.com' });
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
    if (user.role !== "admin") {
      router.push('/login')
    }
  } catch (error) {
    console.error('Invalid user data in localStorage')
    router.push('/login')
  }
}, [router])
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30"></div>
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-blue-100
        transform transition-all duration-300 ease-out lg:translate-x-0 shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
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

          {/* Navigation */}
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

          {/* User Profile */}
          <div className="p-4 border-t border-blue-50">
            <div className="relative group">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer border border-blue-100">
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {userdata?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{userdata?.name}</p>
                  <p className="text-xs text-blue-600 truncate">{userdata?.email}</p>
                </div>
              </div>
              
              {/* Sign out button */}
              <button    onClick={() => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');// 🔐 Clear the token
    router.push('/login');      // 🚀 Redirect to login
   }} className="mt-3 w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 group border border-gray-200 hover:border-red-200">
                <LogOut className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm">
          <div className="flex h-20 items-center justify-between px-6">
            <div className="flex items-center flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-2xl hover:bg-blue-50 transition-all duration-200 group mr-4"
              >
                <Menu className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
              </button>
              
              {/* Search */}
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search doctors, clinics, analytics..."
                  className="w-full pl-12 pr-6 py-4 bg-white border-2 border-blue-100 rounded-2xl text-gray-900 placeholder-blue-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-3 rounded-2xl hover:bg-blue-50 transition-all duration-200 group">
                <Bell className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-md">
                  3
                </span>
              </button>
              
              {/* User Avatar */}
              <div className="relative group cursor-pointer">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                  <span className="text-white font-bold text-sm">
                    {userdata?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 relative">
          <div className="bg-white rounded-3xl border border-blue-100 shadow-xl min-h-[calc(100vh-8rem)] p-8 relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-48 translate-x-48 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-50 to-transparent rounded-full translate-y-48 -translate-x-48 opacity-50"></div>
            
            <div className="relative z-10">
              {children || (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                    Welcome to HealthByte Admin
                  </h2>
                  <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                    Manage your healthcare platform with our modern, intuitive dashboard designed for efficiency and clarity.
                  </p>
                  <div className="mt-8 flex justify-center space-x-4">
                    <div className="px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100">
                      <span className="text-blue-600 font-medium">🩺 Healthcare Management</span>
                    </div>
                    <div className="px-6 py-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <span className="text-indigo-600 font-medium">📊 Advanced Analytics</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
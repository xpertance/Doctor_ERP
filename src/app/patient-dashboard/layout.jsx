// // 'use client'

// // import { useState,useEffect } from 'react'
// // import { usePathname } from 'next/navigation'
// // import { FiHome, FiCalendar, FiFileText, FiPieChart, FiSettings, FiUser, FiMenu, FiX } from 'react-icons/fi'
// // import { FaHeartbeat, FaClinicMedical } from 'react-icons/fa'
// // import { useRouter } from 'next/navigation'
// // import Link from 'next/link'
// // import { 

// //   LogOut
// // } from 'lucide-react'
// // export default function DashboardLayout({ children }) {
// //   const [sidebarOpen, setSidebarOpen] = useState(false)
// //     const router = useRouter();
// //   const pathname = usePathname()
// // useEffect(() => {
// //       const token = localStorage.getItem('token')
// //       const userStr = localStorage.getItem('user')
      
// //       if (!token || !userStr) {
// //         router.push('/login')
// //         return
// //       }
      
// //        try {
// //          const user = JSON.parse(userStr)
// //          console.log(user)
  
     
// //         if (user.role !== "patient") {
// //           router.push('/login')
// //         }
// //       } catch (error) {
// //         console.error('Invalid user data in localStorage')
// //         router.push('/login')
// //       }
// //     }, [router])
// //   const navItems = [
// //     { name: 'Overview', href: '/patient-dashboard', icon: <FiHome size={20} /> },
// //     { name: 'Appointments', href: '/patient-dashboard/appointments', icon: <FiCalendar size={20} /> },
// //     { name: 'Prescriptions', href: '/patient-dashboard/prescriptions', icon: <FaClinicMedical size={20} /> },
// //     { name: 'Medical Records', href: '/patient-dashboard/medical-records', icon: <FiFileText size={20} /> },
// //     { name: 'Health Data', href: '/patient-dashboard/health-data', icon: <FaHeartbeat size={20} /> },
// //     { name: 'Settings', href: '/patient-dashboard/settings', icon: <FiSettings size={20} /> },
// //   ]

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       {/* Mobile sidebar backdrop */}
// //       {sidebarOpen && (
// //         <div 
// //           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside 
// //         className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
// //       >
// //         <div className="flex flex-col h-full">
// //           {/* Sidebar header */}
// //           <div className="flex items-center justify-between p-4 border-b">
// //             <div className="flex items-center space-x-2">
// //               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
// //                 <FiUser className="text-white" />
// //               </div>
// //               <span className="font-semibold text-lg">Patient Portal</span>
// //             </div>
// //             <button 
// //               className="lg:hidden text-gray-500 hover:text-gray-700"
// //               onClick={() => setSidebarOpen(false)}
// //             >
// //               <FiX size={24} />
// //             </button>
// //           </div>

// //           {/* Sidebar navigation */}
// //           <nav className="flex-1 overflow-y-auto p-4">
// //             <ul className="space-y-2">
// //               {navItems.map((item) => (
// //                 <li key={item.name}>
// //                   <Link
// //                     href={item.href}
// //                     className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
// //                     onClick={() => setSidebarOpen(false)}
// //                   >
// //                     <span className={pathname === item.href ? 'text-blue-600' : 'text-gray-500'}>
// //                       {item.icon}
// //                     </span>
// //                     <span>{item.name}</span>
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </nav>

// //           {/* Sidebar footer */}
// //           <div className="p-4 border-t">
// //             <div className="text-sm text-gray-500">
// //               <button
// //   onClick={() => {
// //     localStorage.removeItem('token'); 
// //     localStorage.removeItem('user');// 🔐 Clear the token
// //     router.push('/login');      // 🚀 Redirect to login
// //   }}
// //   className="mt-2 w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-colors"
// // >
// //   <LogOut className="mr-2 h-4 w-4" />
// //   Sign out
// // </button>
// //             </div>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main content */}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         {/* Top navigation */}
// //         <header className="bg-white shadow-sm z-10">
// //           <div className="flex items-center justify-between px-6 py-4">
// //             <button 
// //               className="lg:hidden text-gray-500 hover:text-gray-700"
// //               onClick={() => setSidebarOpen(true)}
// //             >
// //               <FiMenu size={24} />
// //             </button>

// //             <div className="flex items-center space-x-4">
// //               <div className="relative">
// //                 <button className="text-gray-500 hover:text-gray-700">
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// //                   </svg>
// //                   <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
// //                 </button>
// //               </div>
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
// //                   <FiUser className="text-blue-600" />
// //                 </div>
// //                 <span className="font-medium">John Doe</span>
// //               </div>
// //               <Link href="/">
// //                 Home
// //               </Link>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Main content area */}
// //         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   )
// // }

// 'use client'
 
// import { useState,useEffect } from 'react'
// import { usePathname } from 'next/navigation'
// import { FiHome, FiCalendar, FiFileText, FiPieChart, FiSettings, FiUser, FiMenu, FiX } from 'react-icons/fi'
// import { FaHeartbeat, FaClinicMedical } from 'react-icons/fa'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import {
 
//   LogOut
// } from 'lucide-react'
// export default function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//     const router = useRouter();
//   const pathname = usePathname()
// useEffect(() => {
//       const token = localStorage.getItem('token')
//       const userStr = localStorage.getItem('user')
     
//       if (!token || !userStr) {
//         router.push('/login')
//         return
//       }
     
//        try {
//          const user = JSON.parse(userStr)
//          console.log(user)
 
     
//         if (user.role !== "patient") {
//           router.push('/login')
//         }
//       } catch (error) {
//         console.error('Invalid user data in localStorage')
//         router.push('/login')
//       }
//     }, [router])
//   const navItems = [
//     { name: 'Overview', href: '/patient-dashboard', icon: <FiHome size={20} /> },
//     { name: 'Appointments', href: '/patient-dashboard/appointments', icon: <FiCalendar size={20} /> },
//     { name: 'Prescriptions', href: '/patient-dashboard/prescriptions', icon: <FaClinicMedical size={20} /> },
//     { name: 'Medical Records', href: '/patient-dashboard/medical-records', icon: <FiFileText size={20} /> },
//     { name: 'Health Data', href: '/patient-dashboard/health-data', icon: <FaHeartbeat size={20} /> },
//     { name: 'Settings', href: '/patient-dashboard/settings', icon: <FiSettings size={20} /> },
//   ]
 
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
 
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Sidebar header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
//                 <FiUser className="text-white" />
//               </div>
//               <span className="font-semibold text-lg">Patient Portal</span>
//             </div>
//             <button
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <FiX size={24} />
//             </button>
//           </div>
 
//           {/* Sidebar navigation */}
//           <nav className="flex-1 overflow-y-auto p-4">
//             <ul className="space-y-2">
//               {navItems.map((item) => (
//                 <li key={item.name}>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                     onClick={() => setSidebarOpen(false)}
//                   >
//                     <span className={pathname === item.href ? 'text-blue-600' : 'text-gray-500'}>
//                       {item.icon}
//                     </span>
//                     <span>{item.name}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
 
//           {/* Sidebar footer */}
//           <div className="p-4 border-t">
//             <div className="text-sm text-gray-500">
//               <button
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
//             </div>
//           </div>
//         </div>
//       </aside>
 
//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
// {/* Top navigation */}
// <header className="bg-white shadow-sm z-10">
//   <div className="flex items-center justify-between px-6 py-4">
//     <button
//       className="lg:hidden text-gray-500 hover:text-gray-700"
//       onClick={() => setSidebarOpen(true)}
//     >
//       <FiMenu size={24} />
//     </button>
 
//     <div className="flex items-center space-x-4">
//       {/* Notification and user profile remain unchanged */}
//       <div className="relative">
//         <button className="text-gray-500 hover:text-gray-700">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//           </svg>
//           <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
//         </button>
//       </div>
//       <div className="flex items-center space-x-2">
//         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//           <FiUser className="text-blue-600" />
//         </div>
//         <span className="font-medium">John Doe</span>
//       </div>
//     </div>
   
//     {/* Modern Find Doctors button */}
//     <Link
//       href="/doctors"
//       className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-white transition-all duration-300 ease-out rounded-full group"
//     >
//       <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"></span>
//       <span className="absolute bottom-0 right-0 block w-44 h-44 mb-32 mr-4 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-blue-800 opacity-30 group-hover:rotate-90 ease"></span>
//       <span className="relative flex items-center text-sm">
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//         Book Appointment
//       </span>
//     </Link>
//   </div>
// </header>
//         {/* Main content area */}
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }


'use client'
 
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FiHome, FiCalendar, FiFileText, FiPieChart, FiSettings, FiUser, FiMenu, FiX, FiBell } from 'react-icons/fi'
import { FaHeartbeat, FaClinicMedical } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut } from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
     
    if (!token || !userStr) {
      router.push('/login')
      return
    }
     
    try {
      const user = JSON.parse(userStr)
      console.log(user)
      
      if (user.role !== "patient") {
        router.push('/login')
      }
    } catch (error) {
      console.error('Invalid user data in localStorage')
      router.push('/login')
    }
  }, [router])

  const navItems = [
    { name: 'Overview', href: '/patient-dashboard', icon: <FiHome size={20} /> },
    { name: 'Appointments', href: '/patient-dashboard/appointments', icon: <FiCalendar size={20} /> },
    { name: 'Prescriptions', href: '/patient-dashboard/prescriptions', icon: <FaClinicMedical size={20} /> },
    { name: 'Medical Records', href: '/patient-dashboard/medical-records', icon: <FiFileText size={20} /> },
    // { name: 'Health Data', href: '/patient-dashboard/health-data', icon: <FaHeartbeat size={20} /> },
    { name: 'Settings', href: '/patient-dashboard/settings', icon: <FiSettings size={20} /> },
  ]
 
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
 
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="relative p-6 border-b border-gray-100/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <FiUser className="text-white w-5 h-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Patient Portal
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">Healthcare Dashboard</p>
                </div>
              </div>
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <FiX size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
 
          {/* Sidebar navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center space-x-4 p-4 rounded-2xl font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]' 
                      : 'text-gray-700 hover:bg-gray-50/80 hover:text-gray-900 hover:transform hover:scale-[1.01]'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl opacity-90"></div>
                  )}
                  <div className={`relative z-10 p-2 rounded-lg ${
                    isActive ? 'bg-white/20' : 'bg-gray-100/50 group-hover:bg-gray-200/70'
                  } transition-all duration-200`}>
                    <span className={isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}>
                      {item.icon}
                    </span>
                  </div>
                  <span className="relative z-10 text-sm font-semibold">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-4 w-2 h-2 bg-white rounded-full opacity-80"></div>
                  )}
                </Link>
              )
            })}
          </nav>
 
          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-100/50">
           
            
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200 group"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>
 
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="relative bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20 z-30">
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-blue-50/30"></div>
          <div className="relative flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu size={20} className="text-gray-600" />
              </button>
              
              <div className="hidden sm:block">
                <h2 className="text-lg font-semibold text-gray-800">
                  Welcome back, John! 👋
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
 
            
            <div className="gap-6">
            <button className="relative mr-6 p-3 rounded-xl hover:bg-gray-100/50 transition-all duration-200 group">
                <FiBell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500/20 rounded-full animate-ping"></span>
              </button>
            {/* Modern Book Appointment button */}
            <Link
              href="/doctors"
              className="relative group inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 ease-out rounded-2xl hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </span>
              <div className="absolute inset-0 rounded-2xl shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300"></div>
            </Link>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
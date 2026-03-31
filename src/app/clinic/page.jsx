'use client'

import {
  Stethoscope,
  Users,
  Calendar,
  ClipboardList,
  Bell
} from 'lucide-react'

export default function ClinicDashboard() {
  const stats = [
    {
      name: 'Total Doctors',
      value: '18',
      icon: Stethoscope,
      iconColor: 'from-blue-500 to-blue-600',
      change: '+2 this month',
    },
    {
      name: 'Receptionists',
      value: '6',
      icon: Users,
      iconColor: 'from-green-500 to-green-600',
      change: '+1 new hire',
    },
    {
      name: 'Appointments Today',
      value: '47',
      icon: Calendar,
      iconColor: 'from-purple-500 to-purple-600',
      change: '12 upcoming',
    },
    {
      name: 'Pending Tasks',
      value: '9',
      icon: ClipboardList,
      iconColor: 'from-orange-500 to-orange-600',
      change: '3 urgent',
    }
  ]

  const appointments = [
    { id: 1, name: 'Dr. Smith', time: '10:00 AM', type: 'Checkup' },
    { id: 2, name: 'Dr. Johnson', time: '11:30 AM', type: 'Follow-up' },
    { id: 3, name: 'Dr. Lee', time: '2:15 PM', type: 'Consultation' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clinic Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of clinic performance</p>
        </div>
        {/* <button className="relative p-2 bg-white rounded-full border hover:bg-gray-50">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button> */}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h2>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.iconColor}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments List */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
            <a href="/clinic/appointments" className="text-sm text-blue-600 hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{appt.name}</p>
                    <p className="text-sm text-gray-500">{appt.time} • {appt.type}</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Confirmed</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/clinic/doctors" className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:scale-[1.02] transition-transform">
              <Stethoscope className="w-5 h-5 mr-3" />
              <span className="font-medium">Manage Doctors</span>
            </a>
            <a href="/clinic/receptionists" className="flex items-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:scale-[1.02] transition-transform">
              <Users className="w-5 h-5 mr-3" />
              <span className="font-medium">Manage Receptionists</span>
            </a>
            <a href="/clinic/reports" className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:scale-[1.02] transition-transform">
              <ClipboardList className="w-5 h-5 mr-3" />
              <span className="font-medium">View Reports</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

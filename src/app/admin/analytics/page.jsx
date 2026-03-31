'use client'
import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar,
  Activity,
  DollarSign,
  Clock,
  UserPlus,
  BarChart3,
  PieChart,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Heart,
  Stethoscope,
  Building2
} from 'lucide-react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const statsCards = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Doctors',
      value: '156',
      change: '+3.2%',
      trend: 'up',
      icon: Stethoscope,
      color: 'bg-green-500'
    },
    {
      title: 'Appointments',
      value: '1,249',
      change: '+8.1%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '$124,580',
      change: '-2.4%',
      trend: 'down',
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ]

  const chartData = {
    patientFlow: [
      { month: 'Jan', patients: 120, appointments: 89 },
      { month: 'Feb', patients: 132, appointments: 98 },
      { month: 'Mar', patients: 101, appointments: 76 },
      { month: 'Apr', patients: 134, appointments: 102 },
      { month: 'May', patients: 152, appointments: 118 },
      { month: 'Jun', patients: 169, appointments: 132 }
    ],
    departmentStats: [
      { name: 'Cardiology', value: 35, color: '#8B5CF6' },
      { name: 'Neurology', value: 25, color: '#06B6D4' },
      { name: 'Pediatrics', value: 20, color: '#10B981' },
      { name: 'Orthopedics', value: 15, color: '#F59E0B' },
      { name: 'Others', value: 5, color: '#EF4444' }
    ]
  }

  const recentActivities = [
    { id: 1, type: 'appointment', message: 'New appointment scheduled with Dr. Sarah Johnson', time: '2 minutes ago', icon: Calendar },
    { id: 2, type: 'patient', message: 'New patient registration: John Doe', time: '15 minutes ago', icon: UserPlus },
    { id: 3, type: 'revenue', message: 'Payment received: $350 from consultation', time: '1 hour ago', icon: DollarSign },
    { id: 4, type: 'doctor', message: 'Dr. Michael Chen updated availability', time: '2 hours ago', icon: Clock },
    { id: 5, type: 'appointment', message: 'Appointment completed: Jane Smith', time: '3 hours ago', icon: Activity }
  ]

  const topDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', appointments: 45, rating: 4.9 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', appointments: 38, rating: 4.8 },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', appointments: 32, rating: 4.7 },
    { id: 4, name: 'Dr. David Kim', specialty: 'Orthopedics', appointments: 29, rating: 4.6 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your hospital's performance and key metrics</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/80 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last period</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Flow Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Patient Flow</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {chartData.patientFlow.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(item.patients / 200) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{item.patients}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {chartData.departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{dept.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <activity.icon className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Doctors */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Doctors</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topDoctors.map((doctor, index) => (
              <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-xs text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{doctor.appointments}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Heart className="h-3 w-3 text-red-500 mr-1" />
                    {doctor.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm text-center">
          <Building2 className="h-8 w-8 mx-auto text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-xs text-gray-600">Departments</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm text-center">
          <Clock className="h-8 w-8 mx-auto text-green-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">24/7</p>
          <p className="text-xs text-gray-600">Available</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm text-center">
          <Eye className="h-8 w-8 mx-auto text-purple-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">95%</p>
          <p className="text-xs text-gray-600">Satisfaction</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm text-center">
          <Activity className="h-8 w-8 mx-auto text-orange-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">99.9%</p>
          <p className="text-xs text-gray-600">Uptime</p>
        </div>
      </div>
    </div>
  )
}
// app/dashboard/page.js
import QuickActionCards from './components/QuickActionCards';
import StatsCards from './components/Stats';
import RecentPatients from './components/TodaysPatients';
import TodaysAppointments from './components/TodaysPatients';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Manage patients, appointments, and daily tasks</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Action Cards */}
      <QuickActionCards />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <RecentPatients />
        
        {/* Today's Appointments */}
        <TodaysAppointments />
      </div>
    </div>
  );
}
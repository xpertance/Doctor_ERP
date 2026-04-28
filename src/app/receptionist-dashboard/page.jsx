'use client';
import React from 'react';
import DashboardStats from './components/DashboardStats';
import DashboardQuickActions from './components/DashboardQuickActions';
import TodaysAppointments from './components/TodaysPatients';
import FollowUpMonitor from './components/FollowUpMonitor';
import DoctorStatusRoster from './components/DoctorStatusRoster';
import {
  Settings,
  Bell,
  Search,
  CalendarPlus
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RestructuredDashboard() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 space-y-8 animate-in fade-in duration-500">


      {/* 1. Key Stats & Primary Action */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Performance Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9">
            <DashboardStats />
          </div>
          <div className="lg:col-span-3">
            <button
              onClick={() => router.push('/receptionist-dashboard/appointments/add')}
              className="w-full h-full min-h-[140px] flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-[2.5rem] font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 group"
            >
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md group-hover:bg-white/20 transition-colors">
                <CalendarPlus size={32} />
              </div>
              <span className="text-lg">Book Appointment</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick Action Operations (Add Patient, Appt, Bill) */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Fast Track Operations</h2>
        <DashboardQuickActions />
      </section>

      {/* 3. Main Operational Monitor (Unified Grid) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Today's Full Schedule (Primary) */}
        <div className="xl:col-span-12">
          <TodaysAppointments />
        </div>

        {/* Doctor Roster & Follow-up split */}
        <div className="xl:col-span-8">
          <DoctorStatusRoster />
        </div>

        <div className="xl:col-span-4">
          <FollowUpMonitor />
        </div>

      </div>

    </div>
  );
}

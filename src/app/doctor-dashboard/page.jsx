'use client'

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Users, Activity, Clock, TrendingUp, AlertCircle, Heart, Stethoscope, Loader2 } from 'lucide-react';

const DoctorAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [userId, setUserId] = useState('');

  // Fetch data from backend
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const data = JSON.parse(user);
      setUserId(data?.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all appointments for the doctor
        const appointmentsRes = await fetch(`https://practo-backend.vercel.app/api/appointment/fetchbydoctor/${userId}`);
        if (!appointmentsRes.ok) throw new Error('Failed to fetch appointments');
        const appointmentsData = await appointmentsRes.json();
        setAppointments(appointmentsData.data);

        // Fetch all patients (assuming you can get them from appointments)
        const uniquePatients = [...new Set(appointmentsData.data.map(a => a.patientId))];
        setPatients(uniquePatients);

      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Process data for analytics based on available appointments
  const processAnalyticsData = () => {
    if (appointments.length === 0) return {
      patientVisitsData: [],
      conditionsData: [],
      monthlyTrendsData: [],
      appointmentStatusData: []
    };

    // Group appointments by day of week
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const visitsByDay = days.map(day => {
      const dayAppointments = appointments.filter(a => {
        const date = new Date(a.appointmentDate);
        return date.toLocaleDateString('en-US', { weekday: 'short' }) === day;
      });
      return {
        day,
        visits: dayAppointments.length,
        consultations: dayAppointments.filter(a => a.status === 'completed').length
      };
    });

    // Extract conditions from appointments (assuming notes contain conditions)
    const conditionsCount = {};
    appointments.forEach(a => {
      if (a.patientNote) {
        const conditions = a.patientNote.split(',').map(c => c.trim());
        conditions.forEach(c => {
          conditionsCount[c] = (conditionsCount[c] || 0) + 1;
        });
      }
    });

    const topConditions = Object.entries(conditionsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        value: count,
        color: getRandomColor()
      }));

    // Group by month
    const monthlyData = {};
    appointments.forEach(a => {
      const date = new Date(a.appointmentDate);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { patients: new Set(), revenue: 0 };
      }
      monthlyData[month].patients.add(a.patientId);
      monthlyData[month].revenue += a.consultationFee || 0;
    });

    const monthlyTrends = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      patients: data.patients.size,
      revenue: data.revenue
    }));

    // Improved appointment status processing
    const statusCounts = appointments.reduce((acc, a) => {
      const status = a.status?.toLowerCase() || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Map to standard status names with better handling of different status names
    const statusData = [
      { status: 'Completed', count: statusCounts.completed || statusCounts.checkedin || statusCounts.done || 0, color: '#10B981' },
      { status: 'Scheduled', count: statusCounts.scheduled || statusCounts.booked || statusCounts.pending || 0, color: '#3B82F6' },
      { status: 'Cancelled', count: statusCounts.cancelled || statusCounts.canceled || 0, color: '#EF4444' },
      { status: 'No Show', count: statusCounts.noshow || statusCounts['no-show'] || statusCounts.missed || 0, color: '#6B7280' }
    ].filter(item => item.count > 0);  // Remove statuses with zero count

    return {
      patientVisitsData: visitsByDay,
      conditionsData: topConditions,
      monthlyTrendsData: monthlyTrends,
      appointmentStatusData: statusData,
      totalPatients: patients.length,
      todaysAppointments: {
        total: appointments.filter(a => isToday(new Date(a.appointmentDate))).length,
        remaining: appointments.filter(a => 
          isToday(new Date(a.appointmentDate)) && 
          (a.status === 'scheduled' || a.status === 'booked' || a.status === 'pending')
        ).length
      }
    };
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const getRandomColor = () => {
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const { 
    patientVisitsData, 
    conditionsData, 
    monthlyTrendsData, 
    appointmentStatusData,
    totalPatients,
    todaysAppointments
  } = processAnalyticsData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Stethoscope className="text-blue-600" />
                Doctor Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Practice insights derived from your appointments</p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Patients</p>
                <p className="text-3xl font-bold text-gray-800">{totalPatients}</p>
                <p className="text-green-600 text-sm font-medium flex items-center gap-1 mt-1">
                  <TrendingUp size={16} />
                  {Math.floor((totalPatients / 30) * 100)}% monthly growth
                </p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Appointments Today</p>
                <p className="text-3xl font-bold text-gray-800">{todaysAppointments?.total || 0}</p>
                <p className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-1">
                  <Calendar size={16} />
                  {todaysAppointments?.remaining || 0} remaining
                </p>
              </div>
              <Calendar className="text-green-500" size={32} />
            </div>
          </div>
          </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Patient Visits Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Patient Visits</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Total Visits" />
                <Bar dataKey="consultations" fill="#10B981" radius={[4, 4, 0, 0]} name="Consultations" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Common Conditions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Patient Conditions</h3>
            {conditionsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={conditionsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => (
                      <text 
                        x={0} 
                        y={0} 
                        fill="#333" 
                        textAnchor="middle" 
                        fontSize={10}
                        dominantBaseline="central"
                      >
                        {`${name.slice(0, 12)}${name.length > 12 ? '...' : ''}: ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                    labelLine={false}
                  >
                    {conditionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value} cases`,
                      props.payload.name
                    ]}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{
                      fontSize: '12px',
                      paddingLeft: '20px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No condition data available from appointment notes
              </div>
            )}
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Patient & Revenue Trends</h3>
            {monthlyTrendsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="patients" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    name="Patients"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No monthly trend data available
              </div>
            )}
          </div>

          {/* Appointment Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Status Distribution</h3>
            {appointmentStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={appointmentStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="count"
                    label={({ name, percent }) => (
                      <text 
                        x={0} 
                        y={0} 
                        fill="#333" 
                        textAnchor="middle" 
                        fontSize={10}
                        dominantBaseline="central"
                      >
                        {`${name}: ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                    labelLine={false}
                  >
                    {appointmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value} appointments`,
                      props.payload.status
                    ]}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{
                      fontSize: '12px',
                      paddingLeft: '20px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No appointment status data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAnalyticsDashboard;
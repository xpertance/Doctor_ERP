// components/dashboard/TodaysAppointments.jsx
import { Clock, User, Stethoscope } from 'lucide-react';

const todaysAppointments = [
  {
    id: 1,
    time: '09:00 AM',
    patient: 'Sarah Johnson',
    doctor: 'Dr. Smith',
    type: 'Consultation',
    status: 'confirmed'
  },
  {
    id: 2,
    time: '09:30 AM',
    patient: 'Michael Chen',
    doctor: 'Dr. Davis',
    type: 'Follow-up',
    status: 'confirmed'
  },
  {
    id: 3,
    time: '10:00 AM',
    patient: 'Emma Rodriguez',
    doctor: 'Dr. Wilson',
    type: 'Check-up',
    status: 'pending'
  },
  {
    id: 4,
    time: '10:30 AM',
    patient: 'David Wilson',
    doctor: 'Dr. Brown',
    type: 'Consultation',
    status: 'confirmed'
  },
  {
    id: 5,
    time: '11:00 AM',
    patient: 'Lisa Anderson',
    doctor: 'Dr. Taylor',
    type: 'Treatment',
    status: 'in-progress'
  }
];

export default function TodaysAppointments() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'in-progress':
        return '🔄';
      case 'cancelled':
        return '✗';
      default:
        return '●';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {todaysAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.time}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}>
                      <span className="mr-1">{getStatusIcon(appointment.status)}</span>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {appointment.patient}
                    </div>
                    <div className="flex items-center">
                      <Stethoscope className="w-4 h-4 mr-1" />
                      {appointment.doctor}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    Type: {appointment.type}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  View
                </button>
                <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {todaysAppointments.length === 0 && (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No appointments scheduled for today</p>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Total: {todaysAppointments.length} appointments</span>
            <span>•</span>
            <span>Next: {todaysAppointments[0]?.time || 'No upcoming'}</span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
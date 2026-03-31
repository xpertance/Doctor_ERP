'use client'

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  MoreVertical,
  User,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Stethoscope,
  Edit3,
  CheckCircle,
  ClipboardList,
  ThumbsUp
} from 'lucide-react';

const AppointmentsDashboard = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [newApp, setApp] = useState([]);
  const [receptinoistId, setId] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'confirmed', 'checkedIn', 'completed'

  useEffect(() => {
    const user = localStorage.getItem("user");
    const data = JSON.parse(user);
    setId(data._id);
  }, [])

  useEffect(() => {
    if (receptinoistId) {
      fetchAppointments(receptinoistId);
    }
  }, [receptinoistId]);

  const fetchAppointments = async (receptionistId) => {
    try {
      const res = await fetch("https://practo-backend.vercel.app/api/appointment/fetchtoreceptinist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receptionistId }),
      });

      const data = await res.json();
      setApp(data.appointments)
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      return [];
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    console.log(appointmentId)
    console.log(newStatus)
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("https://practo-backend.vercel.app/api/appointment/updateStatus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          appointmentId, 
          status: newStatus 
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setApp(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment._id === appointmentId 
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
      } else {
        console.error("Error updating status:", data.message);
        alert("Failed to update appointment status");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error.message);
      alert("Failed to update appointment status");
    } finally {
      setIsUpdatingStatus(false);
      setShowStatusDropdown(null);
    }
  };

  // Enhanced status styling
  const statusStyles = {
    confirmed: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600',
      icon: <Check className="w-4 h-4 text-emerald-500" />,
      border: 'border-emerald-500/20'
    },
    pending: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600',
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      border: 'border-amber-500/20'
    },
    cancelled: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-600',
      icon: <X className="w-4 h-4 text-rose-500" />,
      border: 'border-rose-500/20'
    },
    checkedIn: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-600',
      icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
      border: 'border-blue-500/20'
    },
    completed: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-600',
      icon: <ThumbsUp className="w-4 h-4 text-purple-500" />,
      border: 'border-purple-500/20'
    }
  };

  // Status options for dropdown
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'text-amber-600' },
    { value: 'confirmed', label: 'Confirmed', color: 'text-emerald-600' },
    { value: 'checkedIn', label: 'Checked In', color: 'text-blue-600' },
    { value: 'completed', label: 'Completed', color: 'text-purple-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-rose-600' }
  ];

  // Filter appointments based on search and filters
  const filteredAppointments = newApp.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.patientNote?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || appointment.doctorName === doctorFilter;
    
   const matchesTab = activeTab !== 'all' || appointment.status === 'pending';
  
  return matchesSearch && matchesStatus && matchesDoctor && matchesTab;
  });

  // Get confirmed appointments
  const confirmedAppointments = newApp.filter(app => app.status === 'confirmed');
  
  // Get checked-in appointments
  const checkedInAppointments = newApp.filter(app => app.status === 'checkedIn');

  // Get completed appointments
  const completedAppointments = newApp.filter(app => app.status === 'completed');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = newApp.length > 0 ? Math.max(...newApp.map(a => a.id)) + 1 : 1;
    
    const newAppt = {
      id: newId,
      patient: {
        name: newAppointment.patientName,
        phone: newAppointment.patientPhone,
        email: newAppointment.patientEmail,
      },
      doctor: newAppointment.doctor,
      date: newAppointment.date,
      time: newAppointment.time,
      reason: newAppointment.reason,
      notes: newAppointment.notes,
      status: 'pending',
    };
  
    setApp([...newApp, newAppt]);
    setShowNewAppointmentModal(false);
    setNewAppointment({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      doctor: 'Dr. Michael Chen',
      date: '',
      time: '',
      reason: '',
      notes: ''
    });
  };

  const handleStatusDropdownToggle = (appointmentId) => {
    setShowStatusDropdown(showStatusDropdown === appointmentId ? null : appointmentId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showStatusDropdown && !event.target.closest('.status-dropdown')) {
        setShowStatusDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusDropdown]);

  const renderAppointmentsList = (appointments) => {
    return (
      <div className="divide-y divide-gray-200/30">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div 
              key={appointment._id || index} 
              className={`relative transition-all duration-200 ${
                expandedAppointment === appointment._id || showStatusDropdown === appointment._id 
                  ? 'bg-blue-50/20' 
                  : 'hover:bg-blue-50/10'
              }`}
              style={{
                minHeight: showStatusDropdown === appointment._id ? '200px' : 'auto'
              }}
            >
              <div className="grid grid-cols-12 gap-4 items-center p-4 md:p-5">
                <div className="col-span-12 md:col-span-3 flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-white/80 shadow-sm">
                      <User className="text-blue-600 w-5 h-5" />
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${statusStyles[appointment.status]?.border || 'border-gray-300'}`}></span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{appointment.patientName}</p>
                    <p className="text-xs text-gray-500/90 flex items-center gap-1.5 mt-1">
                      <Phone className="w-3 h-3 flex-shrink-0 text-blue-500/70" />
                      <span className="truncate">{appointment.patientNumber}</span>
                    </p>
                  </div>
                </div>
                
                <div className="col-span-6 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="text-indigo-500/80 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">
                      {appointment.doctorName}
                    </span>
                  </div>
                </div>
                
                <div className="col-span-6 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-500/80 w-4 h-4 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{appointment.appointmentDate}</p>
                      <p className="text-xs text-gray-500/90 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-500/70" />
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block col-span-2">
                  <p className="text-sm text-gray-600/90 truncate">
                    {appointment.patientNote || 'N/A'}
                  </p>
                </div>
                
                <div className="col-span-6 md:col-span-2 relative">
                  <div className="status-dropdown">
                    <button
                      onClick={() => handleStatusDropdownToggle(appointment._id)}
                      disabled={isUpdatingStatus}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all hover:shadow-sm disabled:opacity-50 ${statusStyles[appointment.status]?.bg || 'bg-gray-100'} ${statusStyles[appointment.status]?.text || 'text-gray-600'} border ${statusStyles[appointment.status]?.border || 'border-gray-300'}`}
                    >
                      {statusStyles[appointment.status]?.icon || <Clock className="w-4 h-4" />}
                      {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Unknown'}
                      <ChevronDown size={12} />
                    </button>
                    
                    {showStatusDropdown === appointment._id && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200/70 z-30 overflow-hidden">
                        {statusOptions.map((status) => (
                          <button
                            key={status.value}
                            onClick={() => updateAppointmentStatus(appointment._id, status.value)}
                            disabled={isUpdatingStatus || appointment.status === status.value}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${status.color}`}
                          >
                            {statusStyles[status.value]?.icon}
                            {status.label}
                            {appointment.status === status.value && (
                              <Check className="w-3 h-3 ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-span-6 md:col-span-1 flex justify-end">
                  <button 
                    className="p-1.5 text-gray-400/90 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100/50"
                    onClick={() => setExpandedAppointment(expandedAppointment === appointment._id ? null : appointment._id)}
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {expandedAppointment === appointment._id && (
                <div className="px-6 pb-4 border-t border-gray-200/30 bg-blue-50/10">
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Patient Information</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Email:</span> {appointment.patientEmail || 'N/A'}</p>
                        <p><span className="font-medium">Phone:</span> {appointment.patientNumber}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Appointment Details</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Notes:</span> {appointment.patientNote || 'No additional notes'}</p>
                        <p><span className="font-medium">Duration:</span> 30 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-xl bg-blue-100/30 border border-blue-200/30 flex items-center justify-center mb-4 shadow-inner">
              <Search className="text-blue-500/80 w-6 h-6" />
            </div>
            <h4 className="text-lg font-medium text-gray-700 mb-1">No appointments found</h4>
            <p className="text-sm text-gray-500/90">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm p-6 mb-6 border border-white/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
                <p className="text-sm text-gray-500/90">Manage patient appointments and schedules</p>
              </div>
            </div>
           
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm p-5 mb-6 border border-white/80">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-blue-500/80 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search patients, doctors, or reasons..."
                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-white/80 hover:bg-white rounded-xl transition-all border border-gray-200/70 text-blue-600 text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Filter size={18} />
              Filters
              {filtersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {filtersOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-200/50">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 bg-white/50"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="checkedIn">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Doctor</label>
                <select
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 bg-white/50"
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                >
                  <option value="all">All Doctors</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm border border-white/80 overflow-hidden">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50/50'}`}
          >
            All Appointments
          </button>
          <button
            onClick={() => setActiveTab('confirmed')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'confirmed' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-emerald-50/50'}`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setActiveTab('checkedIn')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'checkedIn' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50/50'}`}
          >
            Checked In
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'completed' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-purple-50/50'}`}
          >
            Completed
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6">
          {activeTab === 'all' && (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-white/80">
              <div className="p-5 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">All Appointments</h3>
                  <div className="text-xs text-blue-600 font-medium bg-blue-100/30 px-3 py-1.5 rounded-full border border-blue-200/50">
                    {filteredAppointments.length} {filteredAppointments.length === 1 ? 'appointment' : 'appointments'}
                  </div>
                </div>
              </div>
              {renderAppointmentsList(filteredAppointments)}
            </div>
          )}

          {activeTab === 'confirmed' && (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-white/80">
              <div className="p-5 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-emerald-600 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-800">Confirmed Appointments</h3>
                  </div>
                  <div className="text-xs text-emerald-600 font-medium bg-emerald-100/30 px-3 py-1.5 rounded-full border border-emerald-200/50">
                    {confirmedAppointments.length} confirmed
                  </div>
                </div>
              </div>
              {renderAppointmentsList(confirmedAppointments)}
            </div>
          )}

          {activeTab === 'checkedIn' && (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-white/80">
              <div className="p-5 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="text-blue-600 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-800">Checked In Patients</h3>
                  </div>
                  <div className="text-xs text-blue-600 font-medium bg-blue-100/30 px-3 py-1.5 rounded-full border border-blue-200/50">
                    {checkedInAppointments.length} checked in
                  </div>
                </div>
              </div>
              {renderAppointmentsList(checkedInAppointments)}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-white/80">
              <div className="p-5 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="text-purple-600 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-800">Completed Appointments</h3>
                  </div>
                  <div className="text-xs text-purple-600 font-medium bg-purple-100/30 px-3 py-1.5 rounded-full border border-purple-200/50">
                    {completedAppointments.length} completed
                  </div>
                </div>
              </div>
              {renderAppointmentsList(completedAppointments)}
            </div>
          )}
        </div>

        {/* New Appointment Modal */}
        {showNewAppointmentModal && (
          <div className="fixed inset-0 z-30 flex justify-center items-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">New Appointment</h3>
                  <button 
                    onClick={() => setShowNewAppointmentModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100/50 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      name="patientName"
                      value={newAppointment.patientName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={newAppointment.patientPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="patientEmail"
                      value={newAppointment.patientEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                    <select
                      name="doctor"
                      value={newAppointment.doctor}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                      required
                    >
                      <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                      <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newAppointment.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={newAppointment.time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <input
                    type="text"
                    name="reason"
                    value={newAppointment.reason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewAppointmentModal(false)}
                    className="px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all"
                  >
                    Create Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
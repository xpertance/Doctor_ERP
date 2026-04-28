'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
  ThumbsUp,
  ChevronLeft,
  FileText,
  ChevronRight,
  CalendarDays
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { appointmentService } from '@/utils/appointmentService';
import { doctorService } from '@/utils/doctorService';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

const AppointmentsDashboard = () => {
  // State management
  const searchParams = useSearchParams();
  const initialDate = searchParams.get('date') || '';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(!!initialDate);
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(initialDate);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [token, setToken] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'booked', 'checked_in', 'completed'
  const [billingModalOpen, setBillingModalOpen] = useState(false);
  const [billingAppointment, setBillingAppointment] = useState(null);
  const [billingVisit, setBillingVisit] = useState(null);
  const [billingItems, setBillingItems] = useState([
    { type: 'consultation', name: 'Consultation Fee', amount: 500 }
  ]);
  const [billingDiscount, setBillingDiscount] = useState(0);
  const [billingTax, setBillingTax] = useState(0);
  const [isGeneratingBill, setIsGeneratingBill] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    doctor: 'Dr. Michael Chen',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });

  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleSaveReschedule = async () => {
    if (!rescheduleDate || !rescheduleTime) {
      toast.error("Please select a date and time slot");
      return;
    }
    setRescheduleLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/appointment/reschedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          appointmentId: rescheduleAppt._id,
          appointmentDate: rescheduleDate,
          timeSlot: rescheduleTime
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Appointment rescheduled!");
        setRescheduleAppt(null);
        fetchAppointments();
      } else {
        toast.error(data.message || "Failed to reschedule");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error rescheduling appointment");
    } finally {
      setRescheduleLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    
    const fetchInitialData = async () => {
      try {
        const res = await doctorService.getDoctors(storedToken);
        if (res.success) setAllDoctors(res.data.doctors);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    if (storedToken) fetchInitialData();
  }, []);

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token, pagination.page, doctorFilter, dateFilter, activeTab]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: 10,
        ...(activeTab !== 'all' && { status: activeTab }),
        ...(doctorFilter !== 'all' && { doctorId: doctorFilter }),
        ...(dateFilter && { date: dateFilter })
      };

      const res = await appointmentService.getAppointments(params, token);
      if (res.success) {
        setAppointments(res.data.appointments);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await appointmentService.updateStatus(appointmentId, newStatus, token);
      if (res.success) {
        toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
        fetchAppointments(); // Refresh list to get latest state
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleOpenBilling = async (appointment) => {
    try {
      setBillingAppointment(appointment);
      setBillingModalOpen(true);
      
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/v1/visit/list?appointmentId=${appointment._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success && data.data.visits?.length > 0) {
        const visit = data.data.visits[0];
        setBillingVisit(visit);
        
        try {
          const billRes = await fetch(`${API_BASE_URL}/api/v1/billing/list?visitId=${visit._id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const billData = await billRes.json();
          
          if (billData.success && billData.data.bills?.length > 0) {
            const existingBill = billData.data.bills[0];
            setBillingItems(existingBill.items.map(item => ({
              type: item.type,
              name: item.name,
              amount: item.amount
            })));
            setBillingDiscount(existingBill.discount || 0);
            setBillingTax(existingBill.tax || 0);
          } else {
            const fee = appointment.doctorId?.consultantFee || 500;
            setBillingItems([
              { type: 'consultation', name: 'Consultation Fee', amount: fee }
            ]);
            setBillingDiscount(0);
            setBillingTax(0);
          }
        } catch (billErr) {
          console.error("Error fetching existing bill:", billErr);
          const fee = appointment.doctorId?.consultantFee || 500;
          setBillingItems([
            { type: 'consultation', name: 'Consultation Fee', amount: fee }
          ]);
        }
      } else {
        toast.error("Could not find a completed visit for this appointment.");
        setBillingModalOpen(false);
      }
    } catch (err) {
      console.error("Open Billing Error:", err);
      toast.error("Failed to load visit data.");
      setBillingModalOpen(false);
    }
  };

  const handleGenerateInvoice = async () => {
    setIsGeneratingBill(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/v1/billing/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          visit_id: billingVisit._id,
          items: billingItems.map(item => ({
            ...item,
            amount: Number(item.amount) || 0
          })),
          discount: Number(billingDiscount),
          tax: Number(billingTax)
        })
      });
      
      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("JSON parse error on billing create:", text);
        toast.error("Failed to process billing response.");
        setIsGeneratingBill(false);
        return;
      }
      
      if (data.success) {
        toast.success("Bill generated successfully!");
        setBillingModalOpen(false);
      } else {
        toast.error(data.message || "Failed to generate bill.");
      }
    } catch (err) {
      console.error("Generate Bill Error:", err);
      toast.error("An error occurred while generating the bill.");
    } finally {
      setIsGeneratingBill(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    const reason = prompt("Please enter the reason for cancellation:");
    if (reason === null) return; // User cancelled the prompt
    if (!reason.trim()) {
      toast.error("Cancellation reason is required");
      return;
    }

    setIsUpdatingStatus(true);
    try {
      const res = await appointmentService.cancelAppointment(appointmentId, reason, token);
      if (res.success) {
        toast.success("Appointment cancelled successfully");
        fetchAppointments();
      }
    } catch (error) {
      toast.error(error.message || "Failed to cancel appointment");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Enhanced status styling
  const statusStyles = {
    booked: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600',
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      border: 'border-amber-500/20'
    },
    checked_in: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-600',
      icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
      border: 'border-blue-500/20'
    },
    in_progress: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-600',
      icon: <Stethoscope className="w-4 h-4 text-indigo-500" />,
      border: 'border-indigo-500/20'
    },
    completed: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600',
      icon: <ThumbsUp className="w-4 h-4 text-emerald-500" />,
      border: 'border-emerald-500/20'
    },
    cancelled: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-600',
      icon: <X className="w-4 h-4 text-rose-500" />,
      border: 'border-rose-500/20'
    }
  };

  // Status options for dropdown
  const statusOptions = [
    { value: 'booked', label: 'Booked', color: 'text-amber-600' },
    { value: 'checked_in', label: 'Checked In', color: 'text-blue-600' },
    { value: 'in_progress', label: 'In Progress', color: 'text-indigo-600' },
    { value: 'completed', label: 'Completed', color: 'text-emerald-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-rose-600' }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const patientName = `${appointment.patientId?.firstName || ''} ${appointment.patientId?.lastName || ''}`;
    const doctorName = `${appointment.doctorId?.firstName || ''} ${appointment.doctorId?.lastName || ''}`;
    
    return patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           appointment.reason?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get booked appointments
  const bookedAppointments = filteredAppointments.filter(app => app.status === 'booked');
  
  // Get checked-in appointments
  const checkedInAppointments = filteredAppointments.filter(app => app.status === 'checked_in');

  // Get completed appointments
  const completedAppointments = filteredAppointments.filter(app => app.status === 'completed');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id || 0)) + 1 : 1;
    
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
  
    setAppointments([...appointments, newAppt]);
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
      <>
        <div className="divide-y divide-gray-200/30">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div 
                key={appointment._id || index} 
                onDoubleClick={() => setExpandedAppointment(expandedAppointment === appointment._id ? null : appointment._id)}
                className={`relative transition-all duration-200 cursor-pointer select-none ${
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
                    {(activeTab === 'checked_in' || appointment.status === 'checked_in') && (
                      <span className="text-base font-black text-blue-600 mr-2 bg-blue-50 px-2 py-1 rounded-xl">
                        {appointment.queueNumber || (index + 1)}
                      </span>
                    )}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-white/80 shadow-sm">
                        <User className="text-blue-600 w-5 h-5" />
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${statusStyles[appointment.status]?.border || 'border-gray-300'}`}></span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate flex items-center gap-1.5">
                        {appointment.patientId?.firstName} {appointment.patientId?.lastName}
                        {appointment.isEmergency && (
                          <span className="px-1.5 py-0.5 bg-red-500 text-white font-black text-[8px] rounded-md uppercase tracking-wider animate-pulse flex items-center gap-0.5">
                            Urgent
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                          {appointment.patientId?.dateOfBirth ? 
                            new Date().getFullYear() - new Date(appointment.patientId.dateOfBirth).getFullYear() : 
                            'N/A'} Yrs
                        </span>
                        <p className="text-xs text-gray-500/90 flex items-center gap-1">
                          <Phone className="w-3 h-3 flex-shrink-0 text-blue-500/70" />
                          <span className="truncate">{appointment.patientId?.phoneNumber}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-6 md:col-span-2">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="text-indigo-500/80 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate">
                        Dr. {appointment.doctorId?.firstName} {appointment.doctorId?.lastName}
                      </span>
                    </div>
                  </div>
                  
                  <div className="col-span-6 md:col-span-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-blue-500/80 w-4 h-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500/90 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-500/70" />
                          {appointment.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block col-span-2">
                    <p className="text-sm text-gray-600/90 truncate">
                      {appointment.patientNote || 'N/A'}
                    </p>
                  </div>
                  
                  <div className="col-span-12 md:col-span-3">
                    <div className="flex flex-wrap gap-2 justify-end md:justify-start">
                      {/* Action Buttons based on status */}
                      {appointment.status === 'booked' && (
                        <button
                          onClick={() => handleStatusUpdate(appointment._id, 'checked_in')}
                          disabled={isUpdatingStatus}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1"
                        >
                          <Check size={14} />
                          Check-in
                        </button>
                      )}

                      {appointment.status === 'checked_in' && (
                        <button
                          onClick={() => handleStatusUpdate(appointment._id, 'in_progress')}
                          disabled={isUpdatingStatus}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1"
                        >
                          <ArrowRight size={14} />
                          Start
                        </button>
                      )}

                      {appointment.status === 'in_progress' && (
                        <button
                          onClick={() => handleStatusUpdate(appointment._id, 'completed')}
                          disabled={isUpdatingStatus}
                          className="px-3 py-1.5 bg-purple-50 text-purple-600 border border-purple-200 rounded-xl text-xs font-bold hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1"
                        >
                          <ThumbsUp size={14} />
                          Complete
                        </button>
                      )}

                      {/* Cancel Button for all non-final statuses */}
                      {!['completed', 'cancelled'].includes(appointment.status) && (
                        <>
                          <button
                            onClick={() => {
                              setRescheduleAppt(appointment);
                              setRescheduleDate(appointment.appointmentDate ? new Date(appointment.appointmentDate).toISOString().split('T')[0] : '');
                              setRescheduleTime(appointment.timeSlot || '');
                              
                              if (appointment.doctorId?._id) {
                                const targetDate = appointment.appointmentDate ? new Date(appointment.appointmentDate).toISOString().split('T')[0] : '';
                                doctorService.getAvailableSlots(appointment.doctorId._id, targetDate, token)
                                  .then(slots => {
                                     const list = slots.data?.slots || slots.slots || [];
                                     const activeSlots = list.filter(s => s.isAvailable !== false).map(s => s.slot || s);
                                     setAvailableSlots(activeSlots);
                                  })
                                  .catch(err => console.error(err));
                              }
                            }}
                            className="px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1"
                          >
                            <CalendarDays size={14} />
                            Reschedule
                          </button>

                          <button
                            onClick={() => handleCancel(appointment._id)}
                            disabled={isUpdatingStatus}
                            className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition-all flex items-center gap-1"
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </>
                      )}

                      {/* Display Final Status Badge if no actions available */}
                      {['completed', 'cancelled'].includes(appointment.status) && (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${statusStyles[appointment.status]?.bg} ${statusStyles[appointment.status]?.text} border ${statusStyles[appointment.status]?.border}`}>
                          {statusStyles[appointment.status]?.icon}
                          {appointment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      )}

                      {appointment.status === 'completed' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              window.open(`/prescription/pdf?id=${appointment._id}`);
                            }}
                            className="px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1"
                          >
                            <FileText size={14} />
                            Print Rx
                          </button>
                          
                          <button
                            onClick={() => handleOpenBilling(appointment)}
                            className="px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-xl text-xs font-bold hover:bg-green-600 hover:text-white transition-all flex items-center gap-1"
                          >
                            <FileText size={14} />
                            Generate Bill
                          </button>
                        </div>
                      )}
                    </div>
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

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="bg-white/50 backdrop-blur-md px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-medium">{pagination.total}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                disabled={pagination.page === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1">
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      pagination.page === i + 1
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: Math.min(pagination.totalPages, prev.page + 1) }))}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
      )}

      {rescheduleAppt && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 border border-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <CalendarDays className="text-indigo-600" />
                   Reschedule
                </h3>
                <button onClick={() => setRescheduleAppt(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                   <X size={20} />
                </button>
             </div>
             
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Patient</label>
                   <p className="text-sm font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                      {rescheduleAppt.patientId?.firstName} {rescheduleAppt.patientId?.lastName}
                   </p>
                </div>
                
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">New Date</label>
                   <input 
                      type="date"
                      value={rescheduleDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                         setRescheduleDate(e.target.value);
                         if (rescheduleAppt.doctorId?._id) {
                            doctorService.getAvailableSlots(rescheduleAppt.doctorId._id, e.target.value, token)
                              .then(slots => {
                                 const list = slots.data?.slots || slots.slots || [];
                                 const activeSlots = list.filter(s => s.isAvailable !== false).map(s => s.slot || s);
                                 setAvailableSlots(activeSlots);
                              })
                              .catch(err => console.error(err));
                         }
                      }}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm transition-all outline-none"
                   />
                </div>

                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Available Slots</label>
                   {availableSlots.length === 0 ? (
                      <p className="text-xs text-amber-600 font-bold bg-amber-50 px-4 py-3 rounded-2xl border border-amber-100">
                         No slots available on this date.
                      </p>
                   ) : (
                      <div className="grid grid-cols-3 gap-2 max-h-[150px] overflow-y-auto p-1 custom-scrollbar">
                         {availableSlots.map((slot) => (
                            <button
                               key={slot}
                               type="button"
                               onClick={() => setRescheduleTime(slot)}
                               className={`px-2 py-2 rounded-xl text-xs font-bold border transition-all ${
                                  rescheduleTime === slot 
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-500'
                               }`}
                            >
                               {slot}
                            </button>
                         ))}
                      </div>
                   )}
                </div>
                
                <button
                   onClick={handleSaveReschedule}
                   disabled={rescheduleLoading || !rescheduleTime}
                   className="w-full mt-6 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-bold rounded-2xl hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                   {rescheduleLoading ? 'Saving...' : 'Confirm Reschedule'}
                </button>
             </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Primary Action Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, doctors, or reasons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            />
          </div>

          {/* Quick Filter/Sort */}
          <div className="w-full lg:w-72">
            <select
              value={doctorFilter}
              onChange={(e) => {
                setDoctorFilter(e.target.value);
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium shadow-sm cursor-pointer appearance-none"
            >
              <option value="all">All Doctors</option>
              {allDoctors.map(doc => (
                <option key={doc._id} value={doc._id}>Dr. {doc.firstName} {doc.lastName}</option>
              ))}
            </select>
          </div>

          {/* Book Appointment Button */}
          <Link
            href="/receptionist-dashboard/appointments/add"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-100 hover:shadow-xl active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Book Appointment
          </Link>
        </div>

        {/* Results Summary & Table Area */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">
                {pagination.total} Total Appointments
              </span>
              <span className="text-xs text-gray-400 font-medium">
                (Showing {appointments.length} records)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              <button 
                onClick={() => alert('Exporting data...')}
                className="inline-flex items-center px-4 py-2 text-xs font-bold text-gray-600 hover:text-blue-600 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 mr-2 rotate-45" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm border border-white/80 overflow-hidden">
          <button
            onClick={() => handleTabChange('all')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50/50'}`}
          >
            All Appointments
          </button>
          <button
            onClick={() => handleTabChange('booked')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'booked' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-amber-50/50'}`}
          >
            Booked
          </button>
          <button
            onClick={() => handleTabChange('checked_in')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'checked_in' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50/50'}`}
          >
            Checked In
          </button>
          <button
            onClick={() => handleTabChange('completed')}
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

          {activeTab === 'booked' && (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-white/80">
              <div className="p-5 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="text-amber-600 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-800">Booked Appointments</h3>
                  </div>
                  <div className="text-xs text-amber-600 font-medium bg-amber-100/30 px-3 py-1.5 rounded-full border border-amber-200/50">
                    {bookedAppointments.length} booked
                  </div>
                </div>
              </div>
              {renderAppointmentsList(bookedAppointments)}
            </div>
          )}

          {activeTab === 'checked_in' && (
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

        {/* Billing Generation Modal */}
        {billingModalOpen && billingAppointment && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Generate Invoice</h2>
                <button onClick={() => setBillingModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
              </div>

              {/* Summary details */}
              <div className="bg-blue-50/50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Patient Name</p>
                  <p className="text-base font-bold text-gray-800">
                    {billingAppointment.patientId?.firstName} {billingAppointment.patientId?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Doctor</p>
                  <p className="text-base font-semibold text-gray-700">
                    Dr. {billingAppointment.doctorId?.firstName} {billingAppointment.doctorId?.lastName}
                  </p>
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-800">Billing Items</h3>
                  <button
                    type="button"
                    onClick={() => setBillingItems([...billingItems, { type: 'other', name: '', amount: 0 }])}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>

                {billingItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-3">
                      <select
                        value={item.type}
                        onChange={(e) => {
                          const updated = [...billingItems];
                          updated[index].type = e.target.value;
                          setBillingItems(updated);
                        }}
                        className="w-full p-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 outline-none cursor-pointer"
                      >
                        <option value="consultation">Consultation</option>
                        <option value="lab">Lab Test</option>
                        <option value="medicine">Pharmacy</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <input
                        type="text"
                        placeholder="Item Description..."
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...billingItems];
                          updated[index].name = e.target.value;
                          setBillingItems(updated);
                        }}
                        className="w-full p-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Amt"
                        value={item.amount}
                        onChange={(e) => {
                          const updated = [...billingItems];
                          updated[index].amount = parseFloat(e.target.value) || 0;
                          setBillingItems(updated);
                        }}
                        className="w-full p-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 outline-none"
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => setBillingItems(billingItems.filter((_, i) => i !== index))}
                          className="text-rose-500 hover:text-rose-700"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount and Tax */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3 mb-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Discount (₹)</label>
                  <input
                    type="number"
                    value={billingDiscount}
                    onChange={(e) => setBillingDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Tax (₹)</label>
                  <input
                    type="number"
                    value={billingTax}
                    onChange={(e) => setBillingTax(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 outline-none text-xs"
                  />
                </div>
              </div>

              {/* Final calculation summary */}
              <div className="border-t border-gray-100 pt-3 mb-4 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Payable</span>
                <span className="text-2xl font-black text-gray-800">
                  ₹{(billingItems.reduce((sum, i) => sum + i.amount, 0) + billingTax - billingDiscount).toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBillingModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-gray-700 font-bold hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleGenerateInvoice}
                  disabled={isGeneratingBill}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isGeneratingBill ? "Generating..." : "Finalize & Save Bill"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsDashboard;

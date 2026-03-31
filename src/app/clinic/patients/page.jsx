'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Eye, Edit, Trash2, X, User, Mail, Phone, Calendar, VenetianMask, 
  MapPin, Shield, Stethoscope, AlertCircle, FileText, Activity, Pill, 
  Printer, CheckCircle, MoreHorizontal, Plus, List, Droplet, PenLine, Info, Clock
} from 'lucide-react';
import { Dialog } from '@headlessui/react';

// Helper Components
const InfoCard = ({ icon, title, value, className = '' }) => (
  <div className={`bg-white p-4 rounded-xl border border-gray-200 shadow-xs ${className}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
    </div>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusColors = {
    'Completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-gray-100 text-gray-800'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const TimelineItem = ({ date, title, description, active = false }) => (
  <div className="relative">
    <div className={`absolute -left-7 top-1 w-4 h-4 rounded-full border-4 ${active ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`} />
    <div className="text-sm text-gray-500">{formatDate(date)}</div>
    <h6 className="font-medium text-gray-800 mt-1">{title}</h6>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);

const MedicationCard = ({ name, dosage, frequency, remaining, lastTaken }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <h5 className="font-bold text-gray-800">{name}</h5>
      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{dosage}</span>
    </div>
    <div className="space-y-2 text-sm">
      <p className="text-gray-600 flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-gray-400" />
        {frequency}
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <Pill className="w-3.5 h-3.5 text-gray-400" />
        {remaining} remaining
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <CheckCircle className="w-3.5 h-3.5 text-gray-400" />
        Last taken: {lastTaken}
      </p>
    </div>
    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
      <button className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-100 transition">
        Log Dose
      </button>
      <button className="text-xs text-gray-500 hover:text-gray-700 transition">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Utility Functions
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const calculateAge = (dobString) => {
  const dob = new Date(dobString);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const addDays = (dateString, days) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

// Icon mapping for sections
const sectionIcons = {
  "Personal Info": User,
  "Treatment": Stethoscope,
  "Prescription": Pill,
  "Tablets List": List
};

// Sample data
const medicationSchedule = [
  { time: '08:00 AM', medication: 'Ibuprofen', dosage: '200mg', status: 'Taken' },
  { time: '12:00 PM', medication: 'Amoxicillin', dosage: '500mg', status: 'Upcoming' },
  { time: '06:00 PM', medication: 'Ibuprofen', dosage: '200mg', status: 'Upcoming' },
  { time: '10:00 PM', medication: 'Amoxicillin', dosage: '500mg', status: 'Upcoming' }
];

export default function PatientsPage() {
const [clinicId,setId]=useState();
 const [patients,setPatients] = useState([
  ]);
 useEffect(() => {
    const data = localStorage.getItem('user');
    console.log("D", data);
    const dum=JSON.parse(data);
    setId(dum.id);
  }, []);
  useEffect(()=>{
    const fetchPatients=async()=>{
      const res= await fetch(`https://practo-backend.vercel.app/api/clinic/fetch-patients/${clinicId}`);
      const data =await res.json();
      console.log("sdf",data);
      setPatients(data.data)
    }
    fetchPatients();
  },[clinicId])

  console.log(clinicId);
 

  const [searchTerm, setSearchTerm] = useState("");
  const [treatmentFilter, setTreatmentFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalSection, setModalSection] = useState("Personal Info");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef();


 
  const uniqueTreatments = useMemo(() => {
    return [...new Set(patients.map((p) => p.treatment))];
  }, [patients]);

  const uniqueDoctors = useMemo(() => {
    return [...new Set(patients.map((p) => p.doctor))];
  }, [patients]);

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    return patients
      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((p) => p.name)
      .slice(0, 5);
  }, [searchTerm, patients]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  const sections = ["Personal Info", "Treatment", "Prescription", "Tablets List"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
        
        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) rgba(59, 130, 246, 0.1);
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Patients</h1>
          <p className="text-gray-600">Manage all patient records and details</p>
        </div>

        {/* Search & Filters */}
 

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Gender</th>
                <th className="text-left px-6 py-3">Phone Number</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-left px-6 py-3">Blood Type</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p,index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-800">{p.firstName}</td>
                  <td className="px-6 py-3">{p.gender}</td>
                  <td className="px-6 py-3">{p.phone}</td>
                  <td className="px-6 py-3">{p.email}</td>
                  <td className="px-6 py-3 flex gap-3">
                   {p.bloodType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {patients.length === 0 && (
            <div className="text-center text-gray-500 py-10">No patients found.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedPatient} onClose={() => setSelectedPatient(null)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {selectedPatient && (
            <Dialog.Panel className="bg-white max-w-6xl w-full shadow-2xl grid grid-cols-1 md:grid-cols-4 overflow-hidden rounded-2xl transform transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] scale-95 hover:scale-100">
              {/* Sidebar */}
              <aside className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 space-y-6 sticky top-0 h-[80vh] overflow-y-auto rounded-l-2xl border-r border-white/10 backdrop-blur-md scrollbar-thin">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold truncate max-w-[80%]">{selectedPatient.name}</h3>
                    <p className="text-sm text-white/80 mt-1">Patient ID: #{selectedPatient.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    aria-label="Close modal"
                    className="p-1.5 rounded-full hover:bg-white/20 transition transform hover:rotate-90 duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Patient Summary Card */}
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Age</p>
                      <p className="font-medium">{calculateAge(selectedPatient.dob)} years</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Droplet className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Blood Type</p>
                      <p className="font-medium">{selectedPatient.bloodType || 'O+'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation */}
                <nav className="space-y-1.5">
                  {sections.map((section) => {
                    const Icon = sectionIcons[section] || Info;
                    return (
                      <button
                        key={section}
                        onClick={() => setModalSection(section)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                          ${
                            modalSection === section
                              ? 'bg-white text-blue-600 font-semibold shadow-lg'
                              : 'hover:bg-white/10 focus:bg-white/10 focus:outline-none text-white/90 hover:text-white'
                          }`}
                      >
                        <Icon className={`w-4 h-4 ${modalSection === section ? 'text-blue-600' : 'text-white/70'}`} />
                        {section}
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Content Area */}
              <main className="col-span-3 p-8 bg-gradient-to-br from-gray-50 to-white overflow-y-auto max-h-[80vh] rounded-r-2xl scrollbar-thin">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Personal Info Section */}
                  {modalSection === "Personal Info" && (
                    <section className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                          <User className="w-5 h-5 text-blue-600" />
                          Personal Information
                        </h4>
                        <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-blue-100 transition">
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard icon={<Mail className="w-4 h-4" />} title="Email" value={selectedPatient.email} />
                        <InfoCard icon={<Phone className="w-4 h-4" />} title="Phone" value={selectedPatient.phone} />
                        <InfoCard icon={<Calendar className="w-4 h-4" />} title="Date of Birth" value={selectedPatient.dob} />
                        <InfoCard icon={<VenetianMask className="w-4 h-4" />} title="Gender" value={selectedPatient.gender} />
                        <InfoCard 
                          icon={<MapPin className="w-4 h-4" />} 
                          title="Address" 
                          value={selectedPatient.address} 
                          className="md:col-span-2" 
                        />
                      </div>
                      
                      <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 mt-6">
                        <h5 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Emergency Contact
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Name</p>
                            <p className="font-medium">{selectedPatient.emergencyContact?.name || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Relationship</p>
                            <p className="font-medium">{selectedPatient.emergencyContact?.relation || 'Not specified'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium">{selectedPatient.emergencyContact?.phone || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Treatment Section */}
                  {modalSection === "Treatment" && (
                    <section className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-blue-600" />
                          Treatment Details
                        </h4>
                        <StatusBadge status={selectedPatient.status || 'In Progress'} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard 
                          icon={<AlertCircle className="w-4 h-4" />} 
                          title="Diagnosis" 
                          value={selectedPatient.treatment} 
                          className="md:col-span-2 bg-rose-50 border-rose-100"
                        />
                        <InfoCard icon={<User className="w-4 h-4" />} title="Attending Physician" value={selectedPatient.doctor} />
                        <InfoCard icon={<Calendar className="w-4 h-4" />} title="Admission Date" value={formatDate(selectedPatient.date)} />
                        <InfoCard icon={<Clock className="w-4 h-4" />} title="Duration" value="2 weeks" />
                        <InfoCard 
                          icon={<FileText className="w-4 h-4" />} 
                          title="Notes" 
                          value={selectedPatient.notes || 'No additional notes'} 
                          className="md:col-span-2" 
                        />
                      </div>
                      
                      <div className="mt-8">
                        <h5 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-600" />
                          Treatment Timeline
                        </h5>
                        <div className="relative pl-6 border-l-2 border-blue-200 space-y-6">
                          <TimelineItem 
                            date="2023-10-15" 
                            title="Initial Consultation" 
                            description="Patient presented with symptoms, initial tests ordered"
                          />
                          <TimelineItem 
                            date="2023-10-18" 
                            title="Diagnosis Confirmed" 
                            description="Test results confirmed the initial diagnosis"
                            active
                          />
                          <TimelineItem 
                            date="2023-10-20" 
                            title="Treatment Plan Started" 
                            description="Prescribed medication and therapy regimen"
                          />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Prescription Section */}
                  {modalSection === "Prescription" && (
                    <section className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                          <Pill className="w-5 h-5 text-blue-600" />
                          Medical Prescription
                        </h4>
                        <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-blue-100 transition">
                          <Printer className="w-3.5 h-3.5" />
                          Print
                        </button>
                      </div>
                      
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-blue-600 text-white p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm opacity-80">Prescription #RX-{Math.floor(Math.random() * 10000)}</p>
                              <h5 className="font-bold text-lg">Dr. {selectedPatient.doctor}</h5>
                            </div>
                            <div className="text-right">
                              <p className="text-sm opacity-80">Date Issued</p>
                              <p className="font-medium">{formatDate(selectedPatient.date)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="mb-6">
                            <h6 className="text-sm font-semibold text-gray-500 mb-2">INDICATIONS</h6>
                            <p className="text-gray-700">{selectedPatient.prescription || 'No specific indications noted.'}</p>
                          </div>
                          
                          <div className="mb-6">
                            <h6 className="text-sm font-semibold text-gray-500 mb-3">MEDICATIONS</h6>
                            <div className="space-y-4">
                              {selectedPatient.tablets.map((tablet, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                    <Pill className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{tablet}</p>
                                    <p className="text-sm text-gray-500">Take 1 tablet daily with food</p>
                                  </div>
                                  <div className="text-sm text-gray-500">30 tablets</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-4">
                            <h6 className="text-sm font-semibold text-gray-500 mb-2">ADDITIONAL INSTRUCTIONS</h6>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              <li>Complete the full course of medication</li>
                              <li>Avoid alcohol during treatment</li>
                              <li>Follow up in 2 weeks</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            <p>Valid until: {formatDate(addDays(selectedPatient.date, 30))}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-white rounded-md border border-gray-300 flex items-center justify-center">
                              <PenLine className="w-3 h-3 text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">Electronic Signature</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Tablets List Section */}
                  {modalSection === "Tablets List" && (
                    <section className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                          <Pill className="w-5 h-5 text-blue-600" />
                          Medication List
                        </h4>
                        <div className="flex items-center gap-2">
                          <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-blue-100 transition">
                            <Plus className="w-3.5 h-3.5" />
                            Add Medication
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedPatient.tablets.map((tablet, idx) => (
                          <MedicationCard 
                            key={idx}
                            name={tablet}
                            dosage="500mg"
                            frequency="Twice daily"
                            remaining={Math.floor(Math.random() * 10) + 5}
                            lastTaken="2 hours ago"
                          />
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <h5 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Medication Schedule
                        </h5>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-y-auto max-h-96 scrollbar-thin">
                          <div className="grid grid-cols-4 text-sm font-medium text-gray-500 border-b border-gray-200">
                            <div className="p-3">Time</div>
                            <div className="p-3">Medication</div>
                            <div className="p-3">Dosage</div>
                            <div className="p-3">Status</div>
                          </div>
                          {medicationSchedule.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-4 text-sm border-b border-gray-200 last:border-0 hover:bg-gray-50">
                              <div className="p-3 font-medium">{item.time}</div>
                              <div className="p-3">{item.medication}</div>
                              <div className="p-3">{item.dosage}</div>
                              <div className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  item.status === 'Taken' 
                                    ? 'bg-green-100 text-green-800' 
                                    : item.status === 'Missed' 
                                      ? 'bg-rose-100 text-rose-800' 
                                      : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </main>
            </Dialog.Panel>
          )}
        </div>
      </Dialog>
    </div>
  );
}
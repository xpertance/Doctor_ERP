// 'use client'
// import { useState, useEffect } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Phone, 
//   Mail, 
//   Star, 
//   Calendar, 
//   Award, 
//   MapPin, 
//   Edit, 
//   Eye, 
//   ChevronDown, 
//   ChevronUp,
//   Filter,
//   MoreVertical,
//   Stethoscope,
//   BadgePlus,
//   FileText,
//   UserCheck,
//   Clock
// } from 'lucide-react';
// import Link from 'next/link';

// const statusColors = {
//   Active: 'bg-emerald-100 text-emerald-800',
//   'On Leave': 'bg-amber-100 text-amber-800',
//   'In Surgery': 'bg-purple-100 text-purple-800',
//   'On Vacation': 'bg-blue-100 text-blue-800'
// };

// export default function DoctorsPage() {
//   const [query, setQuery] = useState('');
//   const [expandedDoctor, setExpandedDoctor] = useState(null);
//   const [actionMenu, setActionMenu] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [isLoading, setIsLoading] = useState(true);

//   const filters = ['All', 'Cardiologist', 'Dermatologist'];

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     const data = JSON.parse(savedUser);
//     fetchDoctors(data?.id);
//   }, []);

//   const fetchDoctors = async (id) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`https://practo-backend.vercel.app/api/clinic/fetch-doctor-clinicId/${id}`);
//       if (!response.ok) throw new Error('Failed to fetch doctors');
//       const data = await response.json();
      
//       const transformedDoctors = data.doctor.map(doc => ({
//         id: doc._id || doc.id,
//         name: `${doc.firstName} ${doc.lastName}`,
//         specialty: doc.specialty,
//         experience: `${doc.experience} Years`,
//         rating: 4.5,
//         location: doc.homeAddress,
//         availability: doc.available?.days || ['Mon', 'Wed', 'Fri'],
//         degrees: doc.qualifications || [],
//         fee: `₹${doc.consultantFee}`,
//         status: doc.status || "Active",
//         phone: doc.phone,
//         email: doc.email,
//         image: doc.profileImage || '/doctors/default-doctor.jpg',
//         bio: `Specialist in ${doc.specialty} with ${doc.experience} years of experience at ${doc.hospital}.`,
//         languages: ['English', 'Hindi']
//       }));
      
//       setDoctors(transformedDoctors);
//     } catch (err) {
//       console.error('Error fetching doctors:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredDoctors = doctors.filter((d) => {
//     const matchesSearch = 
//       d.name.toLowerCase().includes(query.toLowerCase()) ||
//       d.specialty.toLowerCase().includes(query.toLowerCase()) ||
//       d.location.toLowerCase().includes(query.toLowerCase());
    
//     const matchesFilter = 
//       activeFilter === 'All' || 
//       d.status === activeFilter || 
//       d.specialty === activeFilter;
    
//     return matchesSearch && matchesFilter;
//   });

//   const toggleExpand = (id) => {
//     setExpandedDoctor(expandedDoctor === id ? null : id);
//   };

//   const toggleActionMenu = (id) => {
//     setActionMenu(actionMenu === id ? null : id);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header with Stats */}
//       <div className="mb-8">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Management</h1>
//             <p className="text-gray-500 mt-1">Manage your medical professionals and their profiles</p>
//           </div>
//           <div className="flex gap-3">
//             <Link href="/clinic/doctors/schedule">
//               <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-xs">
//                 <Calendar className="w-5 h-5" />
//                 <span>View Schedules</span>
//               </button>
//             </Link>
//             <Link href="/clinic/doctors/add">
//               <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm">
//                 <BadgePlus className="w-5 h-5" />
//                 <span>Add Doctor</span>
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-xs">
//             <p className="text-sm text-blue-600">Total Doctors</p>
//             <h3 className="text-2xl font-bold text-gray-900 mt-1">{doctors.length}</h3>
//           </div>
//           <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 shadow-xs">
//             <p className="text-sm text-green-600">Active Today</p>
//             <h3 className="text-2xl font-bold text-gray-900 mt-1">
//               {doctors.filter(d => d.status === 'Active').length}
//             </h3>
//           </div>
//           <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-xs">
//             <p className="text-sm text-purple-600">Specialties</p>
//             <h3 className="text-2xl font-bold text-gray-900 mt-1">
//               {[...new Set(doctors.map(d => d.specialty))].length}
//             </h3>
//           </div>
//           <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 shadow-xs">
//             <p className="text-sm text-amber-600">On Leave</p>
//             <h3 className="text-2xl font-bold text-gray-900 mt-1">
//               {doctors.filter(d => d.status === 'On Leave').length}
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="text-gray-400 w-5 h-5" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search doctors by name, specialty or location..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//             />
//           </div>
//           <div className="relative">
           
//             <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200 hidden">
//               {filters.map(filter => (
//                 <button
//                   key={filter}
//                   className={`w-full text-left px-4 py-2 text-sm ${activeFilter === filter ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
//                   onClick={() => setActiveFilter(filter)}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Filter Chips */}
        
//       </div>

//       {/* Doctor List */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : filteredDoctors.length > 0 ? (
//         <div className="space-y-4">
//           {filteredDoctors.map((doc) => (
//             <div key={doc.id} className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:shadow-sm">
//               {/* Compact View */}
//               <div className="p-5">
//                 <div className="flex items-start gap-4">
//                   <div className="relative">
//                     <img
//                       src={doc.image}
//                       alt={doc.name}
//                       className="w-16 h-16 rounded-xl object-cover border border-gray-200"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/doctors/default-doctor.jpg';
//                       }}
//                     />
//                     <span className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
//                       {doc.status}
//                     </span>
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <Stethoscope className="w-4 h-4 text-blue-600" />
//                           <span className="text-blue-600 font-medium">{doc.specialty}</span>
//                           <span className="text-gray-400">•</span>
//                           <div className="flex items-center">
//                             <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
//                             <span className="text-gray-700 ml-1">{doc.rating}</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex gap-2">
//                         <button 
//                           onClick={() => toggleExpand(doc.id)}
//                           className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
//                         >
//                           {expandedDoctor === doc.id ? 
//                             <ChevronUp className="w-5 h-5" /> : 
//                             <ChevronDown className="w-5 h-5" />
//                           }
//                         </button>
//                         <div className="relative">
//                           <button 
//                             onClick={() => toggleActionMenu(doc.id)}
//                             className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
//                           >
//                             <MoreVertical className="w-5 h-5" />
//                           </button>
//                           {actionMenu === doc.id && (
//                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
//                               <div className="py-1">
//                                 <Link href={`/clinic/doctors/${doc.id}/edit`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
//                                   <Edit className="w-4 h-4 mr-2 text-blue-600" />
//                                   Edit Profile
//                                 </Link>
//                                 <Link href={`/clinic/doctors/${doc.id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
//                                   <Eye className="w-4 h-4 mr-2 text-blue-600" />
//                                   View Details
//                                 </Link>
//                                 <a
//                                   href={`tel:${doc.phone}`}
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                                 >
//                                   <Phone className="w-4 h-4 mr-2 text-blue-600" />
//                                   Call Doctor
//                                 </a>
//                                 <a
//                                   href={`mailto:${doc.email}`}
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                                 >
//                                   <Mail className="w-4 h-4 mr-2 text-blue-600" />
//                                   Send Email
//                                 </a>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {doc.availability.map(day => (
//                         <span key={day} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full flex items-center">
//                           <Clock className="w-3 h-3 mr-1" />
//                           {day}
//                         </span>
//                       ))}
//                       <span className="bg-green-50 text-green-600 text-xs px-2.5 py-1 rounded-full">
//                         {doc.fee} consultation
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Expanded View */}
//               {expandedDoctor === doc.id && (
//                 <div className="border-t border-gray-200 bg-blue-50/30 p-5">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="col-span-2">
//                       <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                         <FileText className="text-blue-600" />
//                         Professional Information
//                       </h3>
//                       <p className="text-gray-700 mb-4">{doc.bio}</p>
                      
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-white p-3 rounded-lg border border-gray-200">
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">Qualifications</h4>
//                           <p className="text-gray-700">{doc.degrees.join(', ')}</p>
//                         </div>
//                         <div className="bg-white p-3 rounded-lg border border-gray-200">
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">Experience</h4>
//                           <p className="text-gray-700">{doc.experience}</p>
//                         </div>
//                         <div className="bg-white p-3 rounded-lg border border-gray-200">
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">Languages</h4>
//                           <p className="text-gray-700">{doc.languages.join(', ')}</p>
//                         </div>
//                         <div className="bg-white p-3 rounded-lg border border-gray-200">
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
//                           <div className="flex items-center">
//                             <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
//                             <span className="text-gray-700">{doc.rating}/5</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                         <UserCheck className="text-blue-600" />
//                         Contact Information
//                       </h3>
//                       <div className="space-y-3">
//                         <div className="bg-white p-3 rounded-lg border border-gray-200">
//                           <div className="flex items-center">
//                             <Phone className="w-5 h-5 text-blue-500 mr-2" />
//                             <a href={`tel:${doc.phone}`} className="text-blue-600 hover:underline">{doc.phone}</a>
//                           </div>
//                         </div>
//                         <div className="bg-white p-3 rounded-lg border border-gray-200">
//                           <div className="flex items-center">
//                             <Mail className="w-5 h-5 text-blue-500 mr-2" />
//                             <a href={`mailto:${doc.email}`} className="text-blue-600 hover:underline">{doc.email}</a>
//                           </div>
//                         </div>
//                         <div className="bg-white p-3 rounded-lg border border-gray-200">
//                           <div className="flex items-center">
//                             <MapPin className="w-5 h-5 text-blue-500 mr-2" />
//                             <span className="text-gray-700">{doc.location}</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="mt-6 space-y-2">
//                         <Link href={`/clinic/doctors/${doc.id}/edit`}>
//                           <button className="w-full flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
//                             <Edit className="w-5 h-5" />
//                             Edit Profile
//                           </button>
//                         </Link>
//                         <Link href={`/clinic/doctors/${doc.id}`}>
//                           <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
//                             <Eye className="w-5 h-5" />
//                             View Full Profile
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xs text-center">
//           <Search className="mx-auto h-12 w-12 text-gray-400" />
//           <h3 className="mt-3 text-lg font-medium text-gray-900">No doctors found</h3>
//           <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
//           <div className="mt-6">
//             <Link href="/clinic/doctors/add">
//               <button className="inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
//                 <Plus className="w-5 h-5" />
//                 Add New Doctor
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client'
import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Star, 
  Calendar, 
  Award, 
  MapPin, 
  Edit, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  Filter,
  MoreVertical,
  Stethoscope,
  BadgePlus,
  FileText,
  UserCheck,
  Clock,
  Trash2,
  X
} from 'lucide-react';
import Link from 'next/link';

const statusColors = {
  Active: 'bg-emerald-100 text-emerald-800',
  'On Leave': 'bg-amber-100 text-amber-800',
  'In Surgery': 'bg-purple-100 text-purple-800',
  'On Vacation': 'bg-blue-100 text-blue-800'
};

// Modal component definition
const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function DoctorsPage() {
  const [query, setQuery] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filters = ['All', 'Cardiologist', 'Dermatologist'];

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const data = JSON.parse(savedUser);
    fetchDoctors(data?.id);
  }, []);

  const fetchDoctors = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://practo-backend.vercel.app/api/clinic/fetch-doctor-clinicId/${id}`);
      if (!response.ok) throw new Error('Failed to fetch doctors');
      const data = await response.json();
      
      const transformedDoctors = data.doctor.map(doc => ({
        id: doc._id || doc.id,
        name: `${doc.firstName} ${doc.lastName}`,
        specialty: doc.specialty,
        experience: `${doc.experience} Years`,
        rating: 4.5,
        location: doc.homeAddress,
        availability: doc.available?.days || ['Mon', 'Wed', 'Fri'],
        degrees: doc.qualifications || [],
        fee: `₹${doc.consultantFee}`,
        status: doc.status || "Active",
        phone: doc.phone,
        email: doc.email,
        image: doc.profileImage || '/doctors/default-doctor.jpg',
        bio: `Specialist in ${doc.specialty} with ${doc.experience} years of experience at ${doc.hospital}.`,
        languages: ['English', 'Hindi'],
        gender: doc.gender,
        dateOfBirth: doc.dateOfBirth,
        licenseNumber: doc.licenseNumber,
        hospital: doc.hospital,
        hospitalAddress: doc.hospitalAddress,
        sessionTime: doc.sessionTime,
        supSpeciality: doc.supSpeciality
      }));
      
      setDoctors(transformedDoctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch = 
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.location.toLowerCase().includes(query.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'All' || 
      d.status === activeFilter || 
      d.specialty === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleDeleteDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://practo-backend.vercel.app/api/clinic/delete-doctor/${selectedDoctor.id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete doctor');
      
      setDoctors(doctors.filter(d => d.id !== selectedDoctor.id));
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Error deleting doctor:', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Management</h1>
            <p className="text-gray-500 mt-1">Manage your medical professionals and their profiles</p>
          </div>
          <div className="flex gap-3">
            
            <Link href="/clinic/doctors/add">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                <BadgePlus className="w-5 h-5" />
                <span>Add Doctor</span>
              </button>
            </Link>
          </div>
        </div>

      
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search doctors by name, specialty or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200 hidden">
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`w-full text-left px-4 py-2 text-sm ${activeFilter === filter ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="space-y-4">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:shadow-sm">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/doctors/default-doctor.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Dr. {doc.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600 font-medium">{doc.specialty}</span>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-gray-700 ml-1">{doc.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleViewDetails(doc)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteDoctor(doc)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Doctor"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {doc.availability.map(day => (
                        <span key={day} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {day}
                        </span>
                      ))}
                      <span className="bg-green-50 text-green-600 text-xs px-2.5 py-1 rounded-full">
                        {doc.fee} consultation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xs text-center">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-3 text-lg font-medium text-gray-900">No doctors found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          <div className="mt-6">
            {/* <Link href="/clinic/doctors/add">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="w-5 h-5" />
                Add New Doctor
              </button>
            </Link> */}
          </div>
        </div>
      )}
{/* Doctor Details Modal */}
{showModal && selectedDoctor && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Blurred Background Overlay */}
    <div 
      className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    />
    
    {/* Modal Content */}
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Doctor Image */}
          <div className="lg:w-1/3">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-1">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-full aspect-square rounded-xl object-cover border border-gray-200 shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/doctors/default-doctor.jpg';
                }}
              />
            </div>
          </div>
          
          {/* Doctor Information */}
          <div className="lg:w-2/3">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Dr. {selectedDoctor.name}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[selectedDoctor.status]}`}>
                  {selectedDoctor.status}
                </span>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedDoctor.specialty}
                </span>
                {selectedDoctor.supSpeciality && (
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {selectedDoctor.supSpeciality}
                  </span>
                )}
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-600 mb-2">Email</h4>
                <a href={`mailto:${selectedDoctor.email}`} className="text-blue-700 hover:text-blue-800 font-medium hover:underline">
                  {selectedDoctor.email}
                </a>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <h4 className="text-sm font-semibold text-green-600 mb-2">Phone</h4>
                <a href={`tel:${selectedDoctor.phone}`} className="text-green-700 hover:text-green-800 font-medium hover:underline">
                  {selectedDoctor.phone}
                </a>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <h4 className="text-sm font-semibold text-purple-600 mb-2">Date of Birth</h4>
                <p className="text-purple-700 font-medium">{selectedDoctor.dateOfBirth}</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
                <h4 className="text-sm font-semibold text-pink-600 mb-2">Gender</h4>
                <p className="text-pink-700 font-medium">{selectedDoctor.gender}</p>
              </div>
            </div>
            
            {/* Professional Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="text-blue-600 w-5 h-5" />
                  </div>
                  Professional Information
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedDoctor.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Qualifications</h4>
                    <p className="text-gray-800 font-medium">{selectedDoctor.degrees.join(', ')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Experience</h4>
                    <p className="text-gray-800 font-medium">{selectedDoctor.experience}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">License Number</h4>
                    <p className="text-gray-800 font-medium">{selectedDoctor.licenseNumber || 'Not specified'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Session Time</h4>
                    <p className="text-gray-800 font-medium">{selectedDoctor.sessionTime || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              
              {/* Location Information */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="text-green-600 w-5 h-5" />
                  </div>
                  Location Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Home Address</h4>
                    <p className="text-gray-800 font-medium">{selectedDoctor.location}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Hospital</h4>
                    <p className="text-gray-800 font-medium">{selectedDoctor.hospital}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Hospital Address</h4>
                    <p className="text-gray-800 font-medium">{selectedDoctor.hospitalAddress || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              
              {/* Availability */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-green-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="text-blue-600 w-5 h-5" />
                  </div>
                  Availability
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedDoctor.availability.map(day => (
                    <span key={day} className="bg-blue-200 text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-300">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedDoctor && (
        <Modal onClose={() => setShowDeleteConfirm(false)}>
          <div className="p-6 max-w-md mx-auto">
            <div className="text-center">
              <Trash2 className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="mt-3 text-lg font-medium text-gray-900">Delete Doctor</h3>
              <p className="mt-2 text-gray-500">
                Are you sure you want to delete Dr. {selectedDoctor.name}? This action cannot be undone.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
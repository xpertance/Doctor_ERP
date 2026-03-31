// // 'use client'
// // import { useDoctor } from '@/context/DoctorContext';
// // import React, { useState } from 'react';
// // import { 
// //   User, 
// //   Mail, 
// //   Phone, 
// //   MapPin, 
// //   Calendar, 
// //   Award, 
// //   BookOpen, 
// //   Clock, 
// //   Star, 
// //   Edit, 
// //   Save, 
// //   X, 
// //   Camera,
// //   Stethoscope,
// //   GraduationCap,
// //   Building,
// //   Users,
// //   Activity,
// //   FileText
// // } from 'lucide-react';

// // const DoctorProfilePage = () => {
// //     const { doctor, loading } = useDoctor();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [activeTab, setActiveTab] = useState('overview');
// //   console.log("data",doctor.doctor);
// //   const [doctorData, setDoctorData] = useState({
// //     personalInfo: {
// //       firstName: doctor.doctor.firstName,
// //       lastName: doctor.doctor.lastName,
// //       title: 'MD, MBBS, FRCS',
// //       specialty:  doctor.doctor.specialty,
// //       subSpecialty: 'Interventional Cardiology',
// //       email:  doctor.doctor.email,
// //       phone:  doctor.doctor.phone,
// //       address:  doctor.doctor.hospitalAddress,
// //       dateOfBirth:  doctor.doctor.dateOfBirth,
// //       gender: 'Female',
// //       languages: ['English', 'Spanish', 'French'],
// //       profileImage:  doctor.doctor.profileImage
// //     },
// //     professionalInfo: {
// //       licenseNumber:  doctor.doctor.licenseNumber,
// //       yearsOfExperience:  doctor.doctor.experience,
// //       currentHospital: doctor.doctor.hospital,
// //       department: 'Cardiology Department',
// //       position:  doctor.doctor.specialty,
// //       workingHours: 'Monday - Friday: 9:00 AM - 5:00 PM',
// //       emergencyAvailable: true,
// //       consultationFee: doctor.doctor.consultantFee
// //     },
// //     education: [
// //       {
// //         degree: 'MD in Cardiology',
// //         institution: 'Harvard Medical School',
// //         year: '2015',
// //         grade: 'Magna Cum Laude'
// //       },
// //       {
// //         degree: 'MBBS',
// //         institution: 'Johns Hopkins University',
// //         year: '2011',
// //         grade: 'First Class Honors'
// //       }
// //     ],
// //     certifications: [
// //       {
// //         name: 'Board Certified Cardiologist',
// //         issuedBy: 'American Board of Cardiology',
// //         year: '2016',
// //         validUntil: '2026'
// //       },
// //       {
// //         name: 'Advanced Cardiac Life Support (ACLS)',
// //         issuedBy: 'American Heart Association',
// //         year: '2023',
// //         validUntil: '2025'
// //       }
// //     ],
// //     achievements: [
// //       'Best Doctor Award 2023 - Metropolitan Medical Center',
// //       'Published 25+ research papers in peer-reviewed journals',
// //       'Speaker at International Cardiology Conference 2023',
// //       'Leadership Award for Patient Care Excellence 2022'
// //     ],
// //     statistics: {
// //       totalPatients: 1250,
// //       successfulProcedures: 450,
// //       yearsExperience: 12,
// //       rating: 4.9,
// //       reviews: 186
// //     }
// //   });

// //   const [formData, setFormData] = useState(doctorData);

// //   const handleEdit = () => {
// //     setIsEditing(true);
// //     setFormData({ ...doctorData });
// //   };

// //   const handleSave = () => {
// //     setDoctorData({ ...formData });
// //     setIsEditing(false);
// //   };

// //   const handleCancel = () => {
// //     setFormData({ ...doctorData });
// //     setIsEditing(false);
// //   };

// //   const handleInputChange = (section, field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [section]: {
// //         ...prev[section],
// //         [field]: value
// //       }
// //     }));
// //   };

// //   const handleArrayInputChange = (section, index, field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [section]: prev[section].map((item, i) => 
// //         i === index ? { ...item, [field]: value } : item
// //       )
// //     }));
// //   };

// //   const TabButton = ({ id, label, icon: Icon }) => (
// //     <button
// //       onClick={() => setActiveTab(id)}
// //       className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
// //         activeTab === id
// //           ? 'bg-blue-100 text-blue-700 border border-blue-200'
// //           : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
// //       }`}
// //     >
// //       <Icon className="w-4 h-4" />
// //       {label}
// //     </button>
// //   );

// //   const InfoCard = ({ title, children, icon: Icon }) => (
// //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
// //         <div className="flex items-center gap-2">
// //           <Icon className="w-5 h-5 text-blue-600" />
// //           <h3 className="font-semibold text-gray-900">{title}</h3>
// //         </div>
// //       </div>
// //       <div className="p-6">{children}</div>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50">

// 'use client'
// import { useDoctor } from '@/context/DoctorContext';
// import React, { useState, useEffect } from 'react';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Calendar, 
//   Award, 
//   BookOpen, 
//   Clock, 
//   Star, 
//   Edit, 
//   Save, 
//   X, 
//   Camera,
//   Stethoscope,
//   GraduationCap,
//   Building,
//   Users,
//   Activity,
//   FileText
// } from 'lucide-react';

// const DoctorProfilePage = () => {
//   const { doctor, loading } = useDoctor();
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [doctorData, setDoctorData] = useState(null);

//   useEffect(() => {
//     if (!loading && doctor?.doctor) {
//       setDoctorData({
//         personalInfo: {
//           firstName: doctor.doctor.firstName || '',
//           lastName: doctor.doctor.lastName || '',
//           title: 'MD, MBBS, FRCS',
//           specialty: doctor.doctor.specialty || '',
//           subSpecialty: doctor.doctor.supSpeciality || 'Interventional Cardiology',
//           email: doctor.doctor.email || '',
//           phone: doctor.doctor.phone || '',
//           address: doctor.doctor.hospitalAddress || '',
//           dateOfBirth: doctor.doctor.dateOfBirth || '',
//           gender: doctor.doctor.gender,
//           workingDays:doctor.doctor.available.days || [],
//           profileImage: doctor.doctor.profileImage || ''
//         },
//         professionalInfo: {
//           licenseNumber: doctor.doctor.licenseNumber || '',
//           yearsOfExperience: doctor.doctor.experience || 0,
//           currentHospital: doctor.doctor.hospital || '',
//           department: doctor.doctor.specialty,
//           position: doctor.doctor.specialty || '',
//           workingHours:doctor.doctor.available.time || 'Monday - Friday: 9:00 AM - 5:00 PM',
//           emergencyAvailable: true,
//           consultationFee: doctor.doctor.consultantFee || 0
//         },
//         education: [
//           {
//             degree: 'MD in Cardiology',
//             institution: 'Harvard Medical School',
//             year: '2015',
//             grade: 'Magna Cum Laude'
//           },
//           {
//             degree: 'MBBS',
//             institution: 'Johns Hopkins University',
//             year: '2011',
//             grade: 'First Class Honors'
//           }
//         ],
//         certifications: [
//           {
//             name: 'Board Certified Cardiologist',
//             issuedBy: 'American Board of Cardiology',
//             year: '2016',
//             validUntil: '2026'
//           },
//           {
//             name: 'Advanced Cardiac Life Support (ACLS)',
//             issuedBy: 'American Heart Association',
//             year: '2023',
//             validUntil: '2025'
//           }
//         ],
//         achievements: [
//           'Best Doctor Award 2023 - Metropolitan Medical Center',
//           'Published 25+ research papers in peer-reviewed journals',
//           'Speaker at International Cardiology Conference 2023',
//           'Leadership Award for Patient Care Excellence 2022'
//         ],
//         statistics: {
//           totalPatients: 1250,
//           successfulProcedures: 450,
//           yearsExperience: 12,
//           rating: 4.9,
//           reviews: 186
//         }
//       });
//     }
//   }, [doctor, loading]);

//   const [formData, setFormData] = useState(null);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setFormData({ ...doctorData });
   
//   };
// const updateDoctorProfile = async (doctorId, updatedData) => {
//     try {
//       const response = await fetch(`https://practo-backend.vercel.app/api/doctor/update-by-id/${doctorId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to update doctor profile');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error updating doctor profile:', error);
//       throw error;
//     }
 

// };

//  const handleSave = async () => {
//     setError(null);
//     try {
//       setIsSaving(true);
      
//       // Prepare the data to send to the backend
//       const updatedData = {
//         firstName: formData.personalInfo.firstName,
//         lastName: formData.personalInfo.lastName,
//         specialty: formData.personalInfo.specialty,
//         email: formData.personalInfo.email,
//         phone: formData.personalInfo.phone,
//         hospitalAddress: formData.personalInfo.address,
//         dateOfBirth: formData.personalInfo.dateOfBirth,
//         gender: formData.personalInfo.gender,
//         available: {
//           days: formData.personalInfo.workingDays,
//           time: formData.professionalInfo.workingHours
//         },
//         licenseNumber: formData.professionalInfo.licenseNumber,
//         experience: formData.professionalInfo.yearsOfExperience,
//         hospital: formData.professionalInfo.currentHospital,
//         consultantFee: formData.professionalInfo.consultationFee
//       };

//       // Call the API to update the data
//       const updatedDoctor = await updateDoctorProfile(doctor.doctor._id, updatedData);
      
//       // Update local state with the response
//       setDoctorData({ ...formData });
//       console.log("Profile updated successfully:", updatedDoctor);
      
//       // Exit edit mode
//       setIsEditing(false);
//     } catch (error) {
//       setError("Failed to update profile. Please try again.");
//       console.error("Failed to update profile:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };


// //   const handleSave = () => {
// //     setDoctorData({ ...formData });
// //      console.log("updated data is:",doctorData)
// //     setIsEditing(false);
    
// //   };

// useEffect(() => {
//   if (doctorData) {
//     console.log("Doctor data updated:", doctorData);
//   }
// }, [doctorData]);
//   const handleCancel = () => {
//     setFormData({ ...doctorData });
//     setIsEditing(false);
//   };

//   const handleInputChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleArrayInputChange = (section, index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   const TabButton = ({ id, label, icon: Icon }) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
//         activeTab === id
//           ? 'bg-blue-100 text-blue-700 border border-blue-200'
//           : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//       }`}
//     >
//       <Icon className="w-4 h-4" />
//       {label}
//     </button>
//   );

//   const InfoCard = ({ title, children, icon: Icon }) => (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//         <div className="flex items-center gap-2">
//           <Icon className="w-5 h-5 text-blue-600" />
//           <h3 className="font-semibold text-gray-900">{title}</h3>
//         </div>
//       </div>
//       <div className="p-6">{children}</div>
//     </div>
//   );

//   if (loading || !doctorData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading doctor profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
//                   {doctorData.personalInfo.profileImage ? (
//                     <img 
//                       src={doctorData.personalInfo.profileImage} 
//                       alt="Profile" 
//                       className="w-20 h-20 rounded-full object-cover"
//                     />
//                   ) : (
//                     <User className="w-10 h-10 text-blue-600" />
//                   )}
//                 </div>
//                 {isEditing && (
//                   <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
//                     <Camera className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 capitalize">
//                   Dr. {doctorData.personalInfo.firstName} {doctorData.personalInfo.lastName}
//                 </h1>
//                 <p className="text-gray-600">{doctorData.personalInfo.title}</p>
//                 <p className="text-blue-600 font-medium">{doctorData.personalInfo.specialty}</p>
//                 <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
//                   <span className="flex items-center gap-1">
//                     <Building className="w-4 h-4" />
//                     {doctorData.professionalInfo.currentHospital}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-4 h-4" />
//                     {doctorData.professionalInfo.yearsOfExperience} years experience
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               {!isEditing ? (
//                 <button
//                   onClick={handleEdit}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Edit Profile
//                 </button>
//               ) : (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleCancel}
//                     className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     <Save className="w-4 h-4" />
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Patients</p>
//                 <p className="text-2xl font-bold text-blue-600">{doctorData.statistics.totalPatients}</p>
//               </div>
//               <Users className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Successful Procedures</p>
//                 <p className="text-2xl font-bold text-green-600">{doctorData.statistics.successfulProcedures}</p>
//               </div>
//               <Activity className="w-8 h-8 text-green-600" />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Patient Rating</p>
//                 <div className="flex items-center gap-1">
//                   <p className="text-2xl font-bold text-yellow-600">{doctorData.statistics.rating}</p>
//                   <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                 </div>
//               </div>
//               <Star className="w-8 h-8 text-yellow-600" />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Reviews</p>
//                 <p className="text-2xl font-bold text-purple-600">{doctorData.statistics.reviews}</p>
//               </div>
//               <FileText className="w-8 h-8 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6 border-b">
//           <TabButton id="overview" label="Overview" icon={User} />
//           <TabButton id="education" label="Education" icon={GraduationCap} />
//           <TabButton id="professional" label="Professional Info" icon={Stethoscope} />
//           <TabButton id="achievements" label="Achievements" icon={Award} />
//         </div>

//         {/* Tab Content */}
//         <div className="space-y-6">
//           {activeTab === 'overview' && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <InfoCard title="Personal Information" icon={User}>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={formData.personalInfo.firstName}
//                           onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       ) : (
//                         <p className="text-gray-900 capitalize">{doctorData.personalInfo.firstName}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={formData.personalInfo.lastName}
//                           onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       ) : (
//                         <p className="text-gray-900 capitalize">{doctorData.personalInfo.lastName}</p>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.personalInfo.specialty}
//                         onChange={(e) => handleInputChange('personalInfo', 'specialty', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <p className="text-gray-900">{doctorData.personalInfo.specialty}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     {isEditing ? (
//                       <input
//                         type="email"
//                         value={formData.personalInfo.email}
//                         onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-4 h-4 text-gray-400" />
//                         <p className="text-gray-900">{doctorData.personalInfo.email}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                     {isEditing ? (
//                       <input
//                         type="tel"
//                         value={formData.personalInfo.phone}
//                         onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 text-gray-400" />
//                         <p className="text-gray-900">{doctorData.personalInfo.phone}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                     {isEditing ? (
//                       <textarea
//                         value={formData.personalInfo.address}
//                         onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
//                         rows={2}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="flex items-start gap-2">
//                         <MapPin className="w-4 h-4 text-gray-400 mt-1" />
//                         <p className="text-gray-900">{doctorData.personalInfo.address}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
//                     <div className="flex flex-wrap gap-2">
//                       {doctorData.personalInfo.workingDays.map((language, index) => (
//                         <span
//                           key={index}
//                           className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
//                         >
//                           {language}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </InfoCard>

//               <InfoCard title="Professional Details" icon={Stethoscope}>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.professionalInfo.licenseNumber}
//                         onChange={(e) => handleInputChange('professionalInfo', 'licenseNumber', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <p className="text-gray-900">{doctorData.professionalInfo.licenseNumber}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Current Hospital</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.professionalInfo.currentHospital}
//                         onChange={(e) => handleInputChange('professionalInfo', 'currentHospital', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <p className="text-gray-900 capitalize">{doctorData.professionalInfo.currentHospital}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.professionalInfo.department}
//                         onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <p className="text-gray-900">{doctorData.professionalInfo.department}</p>
//                     )}
//                   </div>

//                   {/* <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.professionalInfo.position}
//                         onChange={(e) => handleInputChange('professionalInfo', 'position', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <p className="text-gray-900">{doctorData.professionalInfo.position}</p>
//                     )}
//                   </div> */}

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={formData.professionalInfo.workingHours}
//                         onChange={(e) => handleInputChange('professionalInfo', 'workingHours', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-4 h-4 text-gray-400" />
//                         <p className="text-gray-900">{doctorData.professionalInfo.workingHours}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
//                     {isEditing ? (
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
//                         <input
//                           type="number"
//                           value={formData.professionalInfo.consultationFee}
//                           onChange={(e) => handleInputChange('professionalInfo', 'consultationFee', parseInt(e.target.value))}
//                           className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>
//                     ) : (
//                       <p className="text-gray-900 text-lg font-semibold text-green-600">
//                         ₹ {doctorData.professionalInfo.consultationFee}
//                       </p>
//                     )}
//                   </div>

//                   {/* <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-gray-700">Emergency Available</span>
//                     <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       doctorData.professionalInfo.emergencyAvailable 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {doctorData.professionalInfo.emergencyAvailable ? 'Yes' : 'No'}
//                     </div>
//                   </div> */}
//                 </div>
//               </InfoCard>
//             </div>
//           )}

//           {activeTab === 'education' && (
//             <div className="space-y-6">
//               <InfoCard title="Education" icon={GraduationCap}>
//                 <div className="space-y-6">
//                   {doctorData.education.map((edu, index) => (
//                     <div key={index} className="border-l-4 border-blue-500 pl-4">
//                       <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
//                       <p className="text-blue-600 font-medium">{edu.institution}</p>
//                       <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
//                         <span className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           {edu.year}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Award className="w-4 h-4" />
//                           {edu.grade}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </InfoCard>

//               <InfoCard title="Certifications" icon={BookOpen}>
//                 <div className="space-y-4">
//                   {doctorData.certifications.map((cert, index) => (
//                     <div key={index} className="bg-gray-50 rounded-lg p-4">
//                       <h4 className="font-semibold text-gray-900">{cert.name}</h4>
//                       <p className="text-gray-600">{cert.issuedBy}</p>
//                       <div className="flex items-center justify-between mt-2 text-sm">
//                         <span className="text-gray-500">Issued: {cert.year}</span>
//                         <span className="text-green-600 font-medium">Valid until: {cert.validUntil}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </InfoCard>
//             </div>
//           )}

//           {activeTab === 'professional' && (
//             <InfoCard title="Professional Experience" icon={Stethoscope}>
//               <div className="space-y-6">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
//                   <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Role</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-600">Position</p>
//                       <p className="font-medium text-gray-900">{doctorData.professionalInfo.position}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Department</p>
//                       <p className="font-medium text-gray-900">{doctorData.professionalInfo.department}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Hospital</p>
//                       <p className="font-medium text-gray-900">{doctorData.professionalInfo.currentHospital}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Experience</p>
//                       <p className="font-medium text-gray-900">{doctorData.professionalInfo.yearsOfExperience} years</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="bg-white border border-gray-200 rounded-lg p-4">
//                       <h5 className="font-medium text-gray-900">Primary Specialty</h5>
//                       <p className="text-blue-600 font-medium">{doctorData.personalInfo.specialty}</p>
//                     </div>
//                     <div className="bg-white border border-gray-200 rounded-lg p-4">
//                       <h5 className="font-medium text-gray-900">Sub-specialty</h5>
//                       <p className="text-green-600 font-medium">{doctorData.personalInfo.subSpecialty}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </InfoCard>
//           )}

//           {activeTab === 'achievements' && (
//             <InfoCard title="Achievements & Awards" icon={Award}>
//               <div className="space-y-4">
//                 {doctorData.achievements.map((achievement, index) => (
//                   <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//                     <Award className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
//                     <p className="text-gray-900 font-medium">{achievement}</p>
//                   </div>
//                 ))}
//               </div>
//             </InfoCard>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfilePage;



'use client'
import { useDoctor } from '@/context/DoctorContext';
import React, { useState, useEffect, useCallback } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen, 
  Clock, 
  Star, 
  Edit, 
  Save, 
  X, 
  Camera,
  Stethoscope,
  GraduationCap,
  Building,
  Users,
  Activity,
  FileText
} from 'lucide-react';

// Move components outside to prevent re-creation
const TabButton = React.memo(({ id, label, icon: Icon, activeTab, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
      activeTab === id
        ? 'bg-blue-100 text-blue-700 border border-blue-200'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
));

const InfoCard = React.memo(({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
));

const DoctorProfilePage = () => {
  const { doctor, loading } = useDoctor();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [doctorData, setDoctorData] = useState(null);
  const [formData, setFormData] = useState(null);

  // Fixed useEffect - removed formData dependency and added proper initialization check
  useEffect(() => {
    if (!loading && doctor?.doctor && !doctorData) {
      const initialData = {
        personalInfo: {
          firstName: doctor.doctor.firstName || '',
          lastName: doctor.doctor.lastName || '',
          title: 'MD, MBBS, FRCS',
          specialty: doctor.doctor.specialty || '',
          subSpecialty: doctor.doctor.supSpeciality || 'Interventional Cardiology',
          email: doctor.doctor.email || '',
          phone: doctor.doctor.phone || '',
          address: doctor.doctor.hospitalAddress || '',
          dateOfBirth: doctor.doctor.dateOfBirth || '',
          gender: doctor.doctor.gender,
          workingDays: doctor.doctor.available?.days || [],
          profileImage: doctor.doctor.profileImage || ''
        },
        professionalInfo: {
          licenseNumber: doctor.doctor.licenseNumber || '',
          yearsOfExperience: doctor.doctor.experience || 0,
          currentHospital: doctor.doctor.hospital || '',
          department: doctor.doctor.specialty,
          position: doctor.doctor.specialty || '',
          workingHours: doctor.doctor.available?.time || 'Monday - Friday: 9:00 AM - 5:00 PM',
          emergencyAvailable: true,
          consultationFee: doctor.doctor.consultantFee || 0
        },
        education: [
          {
            degree: 'MD in Cardiology',
            institution: 'Harvard Medical School',
            year: '2015',
            grade: 'Magna Cum Laude'
          },
          {
            degree: 'MBBS',
            institution: 'Johns Hopkins University',
            year: '2011',
            grade: 'First Class Honors'
          }
        ],
        certifications: [
          {
            name: 'Board Certified Cardiologist',
            issuedBy: 'American Board of Cardiology',
            year: '2016',
            validUntil: '2026'
          },
          {
            name: 'Advanced Cardiac Life Support (ACLS)',
            issuedBy: 'American Heart Association',
            year: '2023',
            validUntil: '2025'
          }
        ],
        achievements: [
          'Best Doctor Award 2023 - Metropolitan Medical Center',
          'Published 25+ research papers in peer-reviewed journals',
          'Speaker at International Cardiology Conference 2023',
          'Leadership Award for Patient Care Excellence 2022'
        ],
        statistics: {
          totalPatients: 1250,
          successfulProcedures: 450,
          yearsExperience: 12,
          rating: 4.9,
          reviews: 186
        }
      };
      
      setDoctorData(initialData);
      setFormData(initialData);
    }
  }, [doctor, loading]); // Removed formData from dependencies

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    // Create a fresh copy of doctorData for editing
    setFormData(JSON.parse(JSON.stringify(doctorData)));
  }, [doctorData]);

  const updateDoctorProfile = async (doctorId, updatedData) => {
    try {
      const response = await fetch(`https://practo-backend.vercel.app/api/doctor/update-by-id/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update doctor profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating doctor profile:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    setError(null);
    try {
      setIsSaving(true);
      
      const updatedData = {
        firstName: formData.personalInfo.firstName,
        lastName: formData.personalInfo.lastName,
        specialty: formData.personalInfo.specialty,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        hospitalAddress: formData.personalInfo.address,
        dateOfBirth: formData.personalInfo.dateOfBirth,
        gender: formData.personalInfo.gender,
        available: {
          days: formData.personalInfo.workingDays,
          time: formData.professionalInfo.workingHours
        },
        licenseNumber: formData.professionalInfo.licenseNumber,
        experience: formData.professionalInfo.yearsOfExperience,
        hospital: formData.professionalInfo.currentHospital,
        consultantFee: formData.professionalInfo.consultationFee
      };

      const updatedDoctor = await updateDoctorProfile(doctor.doctor._id, updatedData);
      
      // Update doctorData with the new form data
      setDoctorData(JSON.parse(JSON.stringify(formData)));
      console.log("Profile updated successfully:", updatedDoctor);
      
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = useCallback(() => {
    // Reset form data to original doctor data
    setFormData(JSON.parse(JSON.stringify(doctorData)));
    setIsEditing(false);
    setError(null);
  }, [doctorData]);

  // Optimized handleInputChange to prevent unnecessary re-renders
  const handleInputChange = useCallback((section, field, value) => {
    setFormData(prev => {
      // Only update if the value has actually changed
      if (prev[section][field] === value) {
        return prev;
      }
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  }, []);

  const handleArrayInputChange = useCallback((section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  if (loading || !doctorData || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  const currentData = isEditing ? formData : doctorData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  {currentData.personalInfo.profileImage ? (
                    <img 
                      src={currentData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-blue-600" />
                  )}
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  Dr. {currentData.personalInfo.firstName} {currentData.personalInfo.lastName}
                </h1>
                <p className="text-gray-600">{currentData.personalInfo.title}</p>
                <p className="text-blue-600 font-medium">{currentData.personalInfo.specialty}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {currentData.professionalInfo.currentHospital}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentData.professionalInfo.yearsOfExperience} years experience
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">{currentData.statistics.totalPatients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Procedures</p>
                <p className="text-2xl font-bold text-green-600">{currentData.statistics.successfulProcedures}</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Rating</p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold text-yellow-600">{currentData.statistics.rating}</p>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reviews</p>
                <p className="text-2xl font-bold text-purple-600">{currentData.statistics.reviews}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          <TabButton id="overview" label="Overview" icon={User} activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="education" label="Education" icon={GraduationCap} activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="professional" label="Professional Info" icon={Stethoscope} activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="achievements" label="Achievements" icon={Award} activeTab={activeTab} onClick={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InfoCard title="Personal Information" icon={User}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.personalInfo.firstName}
                          onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 capitalize">{currentData.personalInfo.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.personalInfo.lastName}
                          onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 capitalize">{currentData.personalInfo.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.personalInfo.specialty}
                        onChange={(e) => handleInputChange('personalInfo', 'specialty', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{currentData.personalInfo.specialty}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900">{currentData.personalInfo.email}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900">{currentData.personalInfo.phone}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    {isEditing ? (
                      <textarea
                        value={formData.personalInfo.address}
                        onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <p className="text-gray-900">{currentData.personalInfo.address}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
                    <div className="flex flex-wrap gap-2">
                      {currentData.personalInfo.workingDays.map((day, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="Professional Details" icon={Stethoscope}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.professionalInfo.licenseNumber}
                        onChange={(e) => handleInputChange('professionalInfo', 'licenseNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{currentData.professionalInfo.licenseNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Hospital</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.professionalInfo.currentHospital}
                        onChange={(e) => handleInputChange('professionalInfo', 'currentHospital', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 capitalize">{currentData.professionalInfo.currentHospital}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.professionalInfo.department}
                        onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{currentData.professionalInfo.department}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.professionalInfo.workingHours}
                        onChange={(e) => handleInputChange('professionalInfo', 'workingHours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900">{currentData.professionalInfo.workingHours}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
                    {isEditing ? (
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.professionalInfo.consultationFee}
                          onChange={(e) => handleInputChange('professionalInfo', 'consultationFee', parseInt(e.target.value) || 0)}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 text-lg font-semibold text-green-600">
                        ₹ {currentData.professionalInfo.consultationFee}
                      </p>
                    )}
                  </div>
                </div>
              </InfoCard>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              <InfoCard title="Education" icon={GraduationCap}>
                <div className="space-y-6">
                  {currentData.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </InfoCard>

              <InfoCard title="Certifications" icon={BookOpen}>
                <div className="space-y-4">
                  {currentData.certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                      <p className="text-gray-600">{cert.issuedBy}</p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span className="text-gray-500">Issued: {cert.year}</span>
                        <span className="text-green-600 font-medium">Valid until: {cert.validUntil}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>
          )}

          {activeTab === 'professional' && (
            <InfoCard title="Professional Experience" icon={Stethoscope}>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Role</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Position</p>
                      <p className="font-medium text-gray-900">{currentData.professionalInfo.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-medium text-gray-900">{currentData.professionalInfo.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hospital</p>
                      <p className="font-medium text-gray-900">{currentData.professionalInfo.currentHospital}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium text-gray-900">{currentData.professionalInfo.yearsOfExperience} years</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900">Primary Specialty</h5>
                      <p className="text-blue-600 font-medium">{currentData.personalInfo.specialty}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900">Sub-specialty</h5>
                     <p className="text-green-600 font-medium">{currentData.personalInfo.subSpecialty}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Working Schedule</h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Working Days</h5>
                        <div className="flex flex-wrap gap-2">
                          {currentData.personalInfo.workingDays.map((day, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Working Hours</h5>
                        <p className="text-gray-700">{currentData.professionalInfo.workingHours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Consultation Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">₹{currentData.professionalInfo.consultationFee}</p>
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{currentData.statistics.rating}</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`w-3 h-3 rounded-full ${currentData.professionalInfo.emergencyAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <p className="text-sm text-gray-600">
                          {currentData.professionalInfo.emergencyAvailable ? 'Available for Emergency' : 'Not Available for Emergency'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <InfoCard title="Awards & Recognition" icon={Award}>
                <div className="space-y-4">
                  {currentData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Award className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-900">{achievement}</p>
                    </div>
                  ))}
                </div>
              </InfoCard>

              <InfoCard title="Professional Statistics" icon={Activity}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{currentData.statistics.totalPatients}</p>
                    <p className="text-sm text-gray-600">Total Patients Treated</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{currentData.statistics.successfulProcedures}</p>
                    <p className="text-sm text-gray-600">Successful Procedures</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-8 h-8 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{currentData.statistics.rating}</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{currentData.statistics.reviews}</p>
                    <p className="text-sm text-gray-600">Patient Reviews</p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="Research & Publications" icon={BookOpen}>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Recent Publications</h4>
                    <div className="space-y-3">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-gray-900">
                          "Advances in Minimally Invasive Cardiac Procedures"
                        </h5>
                        <p className="text-sm text-gray-600">Journal of Cardiology - 2023</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-gray-900">
                          "Patient Outcomes in Interventional Cardiology"
                        </h5>
                        <p className="text-sm text-gray-600">Medical Research Quarterly - 2023</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-gray-900">
                          "Innovation in Cardiac Care: A 10-Year Review"
                        </h5>
                        <p className="text-sm text-gray-600">International Medical Review - 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </InfoCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TabButton.displayName = 'TabButton';
InfoCard.displayName = 'InfoCard';

export default DoctorProfilePage;
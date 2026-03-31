'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  Pill,
  Download as DownloadIcon,
  X,
} from 'lucide-react';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://practo-backend.vercel.app/api/patients/fetchAll');
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        setPatients(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Transform patient data for display
  const transformPatientData = (patient) => {
    return {
      id: patient._id,
      name: `${patient.firstName} ${patient.lastName}`,
      age: calculateAge(patient.dateOfBirth),
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      lastVisit: patient.updatedAt,
      doctor: 'Dr. Smith',
      registrationDate: patient.createdAt,
      bloodGroup: patient.bloodGroup,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
      currentMedications: patient.currentMedications,
    };
  };

  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  // Filter and sort patients
  const filteredPatients = patients
    .map(transformPatientData)
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = !filterGender || patient.gender === filterGender;

      return matchesSearch && matchesGender;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        const response = await fetch(
          `https://practo-backend.vercel.app/api/patients/delete/${patientId}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete patient');
        }

        setPatients(patients.filter((p) => p._id !== patientId));
      } catch (err) {
        alert(`Error deleting patient: ${err.message}`);
      }
    }
  };

  const openPatientModal = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleDownloadPDF = () => {
    alert(`Downloading ${selectedPatient.name}'s medical records as PDF`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative font-sans">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">Manage all patient records and information</p>
        </div>
        <Link
          href="/receptionist-dashboard/patients/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Patient
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Gender Filter */}
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="age-asc">Age (Low-High)</option>
            <option value="age-desc">Age (High-Low)</option>
            <option value="lastVisit-desc">Recent Visit</option>
            <option value="registrationDate-desc">Recent Registration</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPatients.length)}{' '}
              of {filteredPatients.length} patients
            </span>
          </div>
          <button className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedPatients.length > 0 ? (
                paginatedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-blue-600">
                            {patient.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">
                            {patient.age} years, {patient.gender}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {patient.phone}
                        </div>
                        {patient.email && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {patient.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openPatientModal(patient)}
                          className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/dashboard/patients/${patient.id}/edit`}
                          className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patient Details Modal */}
      <AnimatePresence>
        {showModal && selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto border border-blue-100/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-blue-100/30">
                <h3 className="text-2xl font-bold text-blue-900">
                  {selectedPatient.name}'s Medical Records
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="text-blue-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Patient Information */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100/30"
>
  <h4 className="text-lg font-semibold text-blue-900 mb-4">Patient Information</h4>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p className="text-sm text-blue-700/80">Full Name</p>
      <p className="font-medium text-blue-900">{selectedPatient.name}</p>
    </div>
    <div>
      <p className="text-sm text-blue-700/80">Age & Gender</p>
      <p className="font-medium text-blue-900">
        {selectedPatient.age} years, {selectedPatient.gender}
      </p>
    </div>
    <div>
      <p className="text-sm text-blue-700/80">Blood Group</p>
      <p className="font-medium text-blue-900">
        {selectedPatient.bloodGroup || 'Not specified'}
      </p>
    </div>
    <div>
      <p className="text-sm text-blue-700/80">Last Visit</p>
      <p className="font-medium text-blue-900">
        {new Date(selectedPatient.lastVisit).toLocaleDateString()}
      </p>
    </div>
    <div>
      <p className="text-sm text-blue-700/80">Treating Doctor</p>
      <p className="font-medium text-blue-900">
        {selectedPatient.doctor || 'Dr. Smith'}
      </p>
    </div>
  </div>
</motion.div>
                {/* Prescriptions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-5 border border-blue-100/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-blue-900">Prescriptions</h4>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                    >
                      
                      
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        title: 'Current Prescription',
                        date: '12 Nov 2023',
                        medication: 'Paracetamol 500mg',
                        dosage: '1 tablet every 6 hours',
                        duration: '5 days',
                      },
                      {
                        id: 2,
                        title: 'Previous Prescription',
                        date: '5 Oct 2023',
                        medication: 'Ibuprofen 400mg',
                        dosage: '1 tablet every 8 hours',
                        duration: '7 days',
                      },
                    ].map((prescription) => (
                      <motion.div
                        key={prescription.id}
                        whileHover={{ scale: 1.02 }}
                        className="border border-blue-100/30 rounded-xl p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Pill className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="font-medium text-blue-900">{prescription.title}</span>
                          </div>
                          <span className="text-sm text-blue-700/80">{prescription.date}</span>
                        </div>
                        <div className="mt-3 pl-7">
                          <p className="text-sm text-blue-900 mb-2">
                            <span className="font-medium">Medication:</span> {prescription.medication}
                          </p>
                          <p className="text-sm text-blue-900 mb-2">
                            <span className="font-medium">Dosage:</span> {prescription.dosage}
                          </p>
                          <p className="text-sm text-blue-900">
                            <span className="font-medium">Duration:</span> {prescription.duration}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    {(!selectedPatient.prescriptions || selectedPatient.prescriptions.length === 0) && (
                      <p className="text-sm text-blue-700/80 text-center">No prescriptions available</p>
                    )}
                  </div>
                </motion.div>

                {/* Medical Reports */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-5 border border-blue-100/30"
                >
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Medical Reports</h4>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        title: 'Blood Test Report',
                        date: '15 Nov 2023',
                        type: 'Complete Blood Count',
                        results: 'Normal range',
                      },
                      {
                        id: 2,
                        title: 'X-Ray Report',
                        date: '10 Oct 2023',
                        type: 'Chest X-Ray',
                        results: 'No abnormalities detected',
                      },
                    ].map((report) => (
                      <motion.div
                        key={report.id}
                        whileHover={{ scale: 1.02 }}
                        className="border border-blue-100/30 rounded-xl p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="font-medium text-blue-900">{report.title}</span>
                          </div>
                          <span className="text-sm text-blue-700/80">{report.date}</span>
                        </div>
                        <div className="mt-3 pl-7">
                          <p className="text-sm text-blue-900 mb-2">
                            <span className="font-medium">Test Type:</span> {report.type}
                          </p>
                          <p className="text-sm text-blue-900 mb-2">
                            <span className="font-medium">Results:</span> {report.results}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                          >
                            <DownloadIcon className="w-4 h-4 mr-1" />
                            Download Report
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                    {(!selectedPatient.reports || selectedPatient.reports.length === 0) && (
                      <p className="text-sm text-blue-700/80 text-center">No medical reports available</p>
                    )}
                  </div>
                </motion.div>

                {/* Medical History */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-5 border border-blue-100/30"
                >
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Medical History</h4>
                  <div className="space-y-2">
                    {selectedPatient.medicalHistory ? (
                      <p className="text-sm text-blue-900">{selectedPatient.medicalHistory}</p>
                    ) : (
                      <p className="text-sm text-blue-700/80">No medical history recorded</p>
                    )}
                  </div>
                </motion.div>

                {/* Allergies */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-5 border border-blue-100/30"
                >
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Allergies</h4>
                  <div className="space-y-2">
                    {selectedPatient.allergies ? (
                      <p className="text-sm text-blue-900">{selectedPatient.allergies}</p>
                    ) : (
                      <p className="text-sm text-blue-700/80">No known allergies</p>
                    )}
                  </div>
                </motion.div>

                {/* Current Medications */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl p-5 border border-blue-100/30"
                >
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Current Medications</h4>
                  <div className="space-y-2">
                    {selectedPatient.currentMedications ? (
                      <p className="text-sm text-blue-900">{selectedPatient.currentMedications}</p>
                    ) : (
                      <p className="text-sm text-blue-700/80">No current medications</p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex justify-between items-center border-t border-blue-100/30">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeModal}
                  className="px-4 py-2 border border-blue-200 text-blue-900 rounded-xl hover:bg-blue-100/50 transition-colors"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadPDF}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors"
                >
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download as PDF
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

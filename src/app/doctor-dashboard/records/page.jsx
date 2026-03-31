"use client";

import { useState } from 'react';
import {
  FileText,
  User,
  Calendar,
  Stethoscope,
  HeartPulse,
  Pill,
  ClipboardList,
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  Plus,
  X,
  Save,
  UserPlus
} from 'lucide-react';

export default function MedicalRecords() {
  // Sample medical records data
  const [records, setRecords] = useState([
    {
      id: 'MR-2024-001',
      patientName: 'John Smith',
      patientId: 'PT-001',
      date: '2024-06-10',
      visitType: 'Annual Checkup',
      diagnosis: 'Hypertension (I10)',
      medications: 'Lisinopril 10mg daily',
      notes: 'Patient reports occasional dizziness. BP 140/90. Recommended lifestyle changes.'
    },
    {
      id: 'MR-2024-002',
      patientName: 'Sarah Johnson',
      patientId: 'PT-002',
      date: '2024-06-11',
      visitType: 'Follow-up',
      diagnosis: 'Type 2 Diabetes (E11.9)',
      medications: 'Metformin 500mg BID, Insulin Glargine 10 units nightly',
      notes: 'A1C improved to 6.8%. Continue current regimen.'
    },
    {
      id: 'MR-2024-003',
      patientName: 'Michael Davis',
      patientId: 'PT-003',
      date: '2024-06-08',
      visitType: 'Emergency',
      diagnosis: 'Acute bronchitis (J20.9)',
      medications: 'Azithromycin 500mg daily x5 days, Albuterol inhaler PRN',
      notes: 'Patient presented with productive cough and fever. Chest X-ray clear.'
    },
    {
      id: 'MR-2024-004',
      patientName: 'Emily Wilson',
      patientId: 'PT-004',
      date: '2024-06-05',
      visitType: 'New Patient',
      diagnosis: 'Migraine (G43.909)',
      medications: 'Sumatriptan 50mg PRN, Propranolol 20mg BID',
      notes: 'Patient reports 2-3 migraines per month. Started prophylaxis.'
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New record form state
  const [newRecord, setNewRecord] = useState({
    patientName: '',
    patientId: '',
    date: '',
    visitType: '',
    diagnosis: '',
    medications: '',
    notes: ''
  });

  // Filter records based on search term
  const filteredRecords = records.filter(record => 
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open view record modal
  const openViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  // Open new record modal
  const openNewRecordModal = () => {
    setNewRecord({
      patientName: '',
      patientId: '',
      date: '',
      visitType: '',
      diagnosis: '',
      medications: '',
      notes: ''
    });
    setIsNewRecordModalOpen(true);
  };

  // Close modals
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedRecord(null);
  };

  const closeNewRecordModal = () => {
    setIsNewRecordModalOpen(false);
    setNewRecord({
      patientName: '',
      patientId: '',
      date: '',
      visitType: '',
      diagnosis: '',
      medications: '',
      notes: ''
    });
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save new record
  const saveNewRecord = () => {
    const recordId = `MR-2024-${String(records.length + 1).padStart(3, '0')}`;
    const newRecordData = {
      ...newRecord,
      id: recordId
    };
    
    setRecords(prev => [...prev, newRecordData]);
    closeNewRecordModal();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with Medical Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 border-b border-blue-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <ClipboardList className="text-blue-600 mr-3" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">Medical Records Dashboard</h1>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <Download className="mr-2" size={16} /> Export
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <Printer className="mr-2" size={16} /> Print
            </button>
            <button 
              onClick={openNewRecordModal}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Plus className="mr-2" size={16} /> New Record
            </button>
          </div>
        </div>

        {/* Medical Practice Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">{records.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="text-blue-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Records This Month</p>
                <p className="text-2xl font-bold text-green-600">24</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="text-green-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Active Diagnoses</p>
                <p className="text-2xl font-bold text-purple-600">18</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <HeartPulse className="text-purple-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Prescriptions</p>
                <p className="text-2xl font-bold text-yellow-600">32</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Pill className="text-yellow-600" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search patients, records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            <Filter className="mr-2" size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Record #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Visit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.patientId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.visitType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.diagnosis}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button 
                      onClick={() => openViewModal(record)}
                      className="text-blue-600 hover:text-blue-800 mr-3 transition-colors duration-200"
                    >
                      <Eye className="inline mr-1" size={16} /> View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                      <Download className="inline" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Medical Record Details Modal */}
{isViewModalOpen && selectedRecord && (
  <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
      <div className="flex justify-between items-center border-b border-gray-200 p-6 sticky top-0 bg-white z-10">
        <div className="flex items-center">
          <FileText className="text-blue-600 mr-3" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Medical Record Details</h2>
        </div>
        <button 
          onClick={closeViewModal} 
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="p-6">
        {/* Medical Practice Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Stethoscope className="mr-2 text-blue-600" size={20} />
            Medical Practice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Dr. Smith Medical Center</p>
              <p className="text-gray-600">123 Healthcare Avenue</p>
              <p className="text-gray-600">Medical City, MC 12345</p>
            </div>
            <div>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-gray-600">NPI: 1234567890</p>
            </div>
          </div>
        </div>

        {/* Patient Information Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="mr-2 text-green-600" size={20} />
                Patient Information
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">Name:</span> {selectedRecord.patientName}</p>
                <p className="text-gray-700"><span className="font-medium">Patient ID:</span> {selectedRecord.patientId}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="mr-2 text-blue-600" size={20} />
                Visit Information
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">Record #:</span> {selectedRecord.id}</p>
                <p className="text-gray-700"><span className="font-medium">Date:</span> {selectedRecord.date}</p>
                <p className="text-gray-700"><span className="font-medium">Visit Type:</span> {selectedRecord.visitType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <HeartPulse className="mr-2 text-purple-600" size={20} />
            Diagnosis
          </h3>
          <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-xs">
            <p className="text-gray-800 font-medium">{selectedRecord.diagnosis}</p>
          </div>
        </div>

        {/* Medications Card */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Pill className="mr-2 text-yellow-600" size={20} />
            Prescribed Medications
          </h3>
          <div className="bg-white p-4 rounded-lg border border-yellow-100 shadow-xs">
            <p className="text-gray-800 whitespace-pre-line">{selectedRecord.medications}</p>
          </div>
        </div>

        {/* Clinical Notes Card */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <ClipboardList className="mr-2 text-gray-600" size={20} />
            Clinical Notes
          </h3>
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs">
            <p className="text-gray-800 whitespace-pre-line">{selectedRecord.notes}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 sticky bottom-0">
        <button 
          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
        >
          <Printer className="mr-2" size={16} /> Print
        </button>
        <button 
          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
        >
          <Download className="mr-2" size={16} /> Download
        </button>
        <button 
          onClick={closeViewModal}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      {/* New Medical Record Modal */}
      {isNewRecordModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-200 p-6 sticky top-0 bg-white z-10">
              <div className="flex items-center">
                <UserPlus className="text-green-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Create New Medical Record</h2>
              </div>
              <button 
                onClick={closeNewRecordModal} 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Patient Information Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="mr-2 text-blue-600" size={20} />
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                    <input
                      type="text"
                      value={newRecord.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter patient full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
                    <input
                      type="text"
                      value={newRecord.patientId}
                      onChange={(e) => handleInputChange('patientId', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., PT-001"
                    />
                  </div>
                </div>
              </div>

              {/* Visit Information Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="mr-2 text-green-600" size={20} />
                  Visit Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visit Date</label>
                    <input
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visit Type</label>
                    <select
                      value={newRecord.visitType}
                      onChange={(e) => handleInputChange('visitType', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select visit type</option>
                      <option value="Annual Checkup">Annual Checkup</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Emergency">Emergency</option>
                      <option value="New Patient">New Patient</option>
                      <option value="Consultation">Consultation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Medical Information Card */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <HeartPulse className="mr-2 text-purple-600" size={20} />
                  Medical Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                    <input
                      type="text"
                      value={newRecord.diagnosis}
                      onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter diagnosis with ICD code (e.g., Hypertension (I10))"
                    />
                  </div>
                </div>
              </div>

              {/* Medications Card */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Pill className="mr-2 text-yellow-600" size={20} />
                  Prescribed Medications
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
                  <textarea
                    value={newRecord.medications}
                    onChange={(e) => handleInputChange('medications', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter prescribed medications with dosage and frequency"
                  />
                </div>
              </div>

              {/* Clinical Notes Card */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ClipboardList className="mr-2 text-gray-600" size={20} />
                  Clinical Notes
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Clinical Notes</label>
                  <textarea
                    value={newRecord.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter detailed clinical notes, observations, and recommendations"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 sticky bottom-0">
              <button 
                onClick={closeNewRecordModal}
                className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={saveNewRecord}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                <Save className="mr-2" size={16} /> Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
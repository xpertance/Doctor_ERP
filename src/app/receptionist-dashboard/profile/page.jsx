'use client';
import { useState, useEffect } from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { API_BASE_URL } from '@/utils/api';

export default function ReceptionistProfilePage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        const user = JSON.parse(userStr || '{}');
        const staffId = user.id || user._id;

        let initialFirstName = user.firstName || '';
        let initialLastName = user.lastName || '';

        if (user.name) {
          const parts = user.name.trim().split(/\s+/);
          initialFirstName = parts[0] || 'Receptionist';
          initialLastName = parts.slice(1).join(' ') || '';
        }

        if (!staffId) {
          setProfileData({
            firstName: initialFirstName || 'Receptionist',
            lastName: initialLastName,
            email: user.email || '',
            phone: user.phoneNumber || user.phone || 'N/A',
            role: user.role || 'Receptionist',
          });
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/clinic/update-receptionist/${staffId}`);
        const result = await res.json();
        
        if (result.success && result.data.staff) {
          const staff = result.data.staff;
          setProfileData({
            firstName: staff.firstName || initialFirstName || 'Receptionist',
            lastName: staff.lastName || initialLastName || '',
            email: staff.email || user.email || '',
            phone: staff.phone || staff.phoneNumber || user.phoneNumber || user.phone || 'N/A',
            role: staff.role || user.role || 'Receptionist',
          });
        } else {
          setProfileData({
            firstName: initialFirstName || 'Receptionist',
            lastName: initialLastName,
            email: user.email || '',
            phone: user.phoneNumber || user.phone || 'N/A',
            role: user.role || 'Receptionist',
          });
        }
      } catch (error) {
        console.error("Profile Load Error:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profileData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm font-medium">Loading credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 font-sans">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="p-6 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-16">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md border flex items-center justify-center text-3xl font-bold text-blue-600">
              {profileData.firstName?.[0] || 'R'}{profileData.lastName?.[0] || ''}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-800">{profileData.firstName || 'Receptionist'} {profileData.lastName || ''}</h1>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block text-blue-600 font-bold">{profileData.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-bold">First Name</label>
            <p className="text-sm font-semibold text-slate-800 mt-1">{profileData.firstName || 'Receptionist'}</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-bold">Last Name</label>
            <p className="text-sm font-semibold text-slate-800 mt-1">{profileData.lastName || 'N/A'}</p>
          </div>
        </div>
        <div className="pt-2">
          <label className="text-xs text-slate-400 font-bold flex items-center gap-1"><Mail size={12} /> Email</label>
          <p className="text-sm font-semibold text-slate-800 mt-1">{profileData.email}</p>
        </div>
        <div className="pt-2">
          <label className="text-xs text-slate-400 font-bold flex items-center gap-1"><Phone size={12} /> Phone</label>
          <p className="text-sm font-semibold text-slate-800 mt-1">{profileData.phone || profileData.phoneNumber || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

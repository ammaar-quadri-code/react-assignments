import React, { useState } from 'react';
import { UserCheck, Trash2, Send } from 'lucide-react';
import Footer from '../components/Footer';

export default function CredentialsTable() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Frontend Developer',
    experience: '',
    securityPasscode: '',
  });

  const [records, setRecords] = useState([
    {
      fullName: 'Ammaar Quadri',
      email: 'ammaar@example.com',
      role: 'Full Stack MERN Lead',
      experience: '3 Years',
      securityPasscode: 'SEC-9081',
      submittedAt: new Date().toLocaleTimeString(),
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log submitted credentials as required
    console.log('--- Form Credentials Submitted ---');
    console.log(formData);

    const newRecord = {
      ...formData,
      submittedAt: new Date().toLocaleTimeString(),
    };

    setRecords((prev) => [newRecord, ...prev]);

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      role: 'Frontend Developer',
      experience: '',
      securityPasscode: '',
    });
  };

  const handleDelete = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-6xl mx-auto px-6 py-10 w-full space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonGreen">
            User Credentials Vault
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            useState & useEffect Assignment: Enter at least 5 credential fields, log to console, and render dynamic neon table rows.
          </p>
        </div>

        {/* 5-Credential Input Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1128] border border-neonCyan/40 rounded-2xl p-6 shadow-cyanGlow space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-neonCyan mb-1">1. Full Name</label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ammaar Quadri"
                className="w-full bg-[#181a38] border border-gray-700 focus:border-neonCyan rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neonCyan mb-1">2. Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ammaar@hub.com"
                className="w-full bg-[#181a38] border border-gray-700 focus:border-neonCyan rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neonCyan mb-1">3. System Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#181a38] border border-gray-700 focus:border-neonCyan rounded-xl px-4 py-2.5 text-neonGreen text-sm focus:outline-none"
              >
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Architect">Backend Architect</option>
                <option value="Full Stack Lead">Full Stack Lead</option>
                <option value="Security Auditor">Security Auditor</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-neonCyan mb-1">4. Experience (Years)</label>
              <input
                required
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="w-full bg-[#181a38] border border-gray-700 focus:border-neonCyan rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neonCyan mb-1">5. Security Passcode</label>
              <input
                required
                type="password"
                name="securityPasscode"
                value={formData.securityPasscode}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#181a38] border border-gray-700 focus:border-neonCyan rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-neonCyan to-neonGreen text-black font-bold text-sm hover:opacity-90 transition-all shadow-cyanGlow"
              >
                <Send size={16} /> Submit Credentials
              </button>
            </div>
          </div>
        </form>

        {/* Credentials Display Table */}
        <div className="bg-[#0e1026] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#131530]">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <UserCheck className="text-neonCyan" /> Active Submissions Log
            </h2>
            <span className="text-xs font-mono text-neonPink">Count: {records.length} records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#17193b] text-xs font-mono uppercase text-neonCyan border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Passcode Key</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono text-xs">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-6 text-center text-gray-500">
                      No records logged yet. Fill out the form above!
                    </td>
                  </tr>
                ) : (
                  records.map((row, index) => (
                    <tr key={index} className="hover:bg-neonCyan/5 transition-colors">
                      <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.fullName}</td>
                      <td className="py-3 px-4 text-gray-300">{row.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full border border-neonGreen/40 bg-neonGreen/10 text-neonGreen text-[11px]">
                          {row.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{row.experience} Yrs</td>
                      <td className="py-3 px-4 text-neonPink">••••{row.securityPasscode.slice(-3) || 'KEY'}</td>
                      <td className="py-3 px-4 text-gray-500">{row.submittedAt}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
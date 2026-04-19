import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/UI';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: ''
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleContinue = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.dob) {
      setError('Please select your date of birth');
      return;
    }
    if (!formData.gender) {
      setError('Please select your gender');
      return;
    }
    register(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-[#ff6b00] p-6 pb-10 rounded-b-3xl">
        <button onClick={() => navigate('/login')} className="text-white/80 mb-4 flex items-center gap-1">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Complete Your Profile</h1>
        <p className="text-white/80 mt-1">Help us know you better</p>
      </div>

      <div className="flex-1 px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
          <div>
            <label className="block text-gray-600 mb-2 font-medium">Full Name</label>
            <Input
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 font-medium">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 font-medium">Gender</label>
            <div className="flex gap-3">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  onClick={() => handleChange('gender', g)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                    formData.gender === g
                      ? 'border-[#ff6b00] bg-orange-50 text-[#ff6b00]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>

      <div className="p-6 bg-white">
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
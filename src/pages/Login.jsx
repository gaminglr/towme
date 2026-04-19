import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/UI';

export default function Login() {
  const { setUser, goToRegister } = useApp();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (phone.length !== 10) {
      setError('Enter valid 10-digit phone number');
      return;
    }
    setError('');
    setUser({ phone });
    goToRegister();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-[#ff6b00] p-6 pb-16 rounded-b-3xl">
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome to TowMe</h1>
        <p className="text-white/80 mt-1">Enter your phone to continue</p>
      </div>

      <div className="flex-1 px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <label className="block text-gray-600 mb-2 font-medium">Phone Number</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-lg">+91</span>
            <Input
              type="tel"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="flex-1"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </div>

      <div className="p-6 bg-white">
        <Button onClick={handleContinue} disabled={phone.length !== 10}>
          Continue
        </Button>
      </div>
    </div>
  );
}
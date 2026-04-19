import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Card } from '../components/UI';

export default function Payment() {
  const { booking, driver, setPayment, goToConfirmed, navigate } = useApp();
  const [selected, setSelected] = useState('cash');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setPayment({ method: selected, status: 'pending' });
    setTimeout(() => {
      setPayment({ method: selected, status: 'completed' });
      setProcessing(false);
      goToConfirmed();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-[#ff6b00] p-6 pb-10 rounded-b-3xl">
        <button 
          onClick={() => navigate('/fare')}
          className="text-white/80 mb-4 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Payment</h1>
        <p className="text-white/80 mt-1">Choose payment method</p>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        <Card>
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">Payable Amount</p>
            <p className="text-4xl font-bold text-[#ff6b00]">₹{driver.fare}</p>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
          <div className="space-y-3">
            <div 
              onClick={() => setSelected('cash')}
              className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer ${selected === 'cash' ? 'border-[#ff6b00] bg-orange-50' : 'border-gray-200'}`}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
                💵
              </div>
              <div>
                <p className="font-semibold">Cash</p>
                <p className="text-gray-500 text-sm">Pay with cash on delivery</p>
              </div>
              {selected === 'cash' && (
                <div className="ml-auto text-[#ff6b00]">✓</div>
              )}
            </div>

            <div 
              onClick={() => setSelected('online')}
              className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer ${selected === 'online' ? 'border-[#ff6b00] bg-orange-50' : 'border-gray-200'}`}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                📱
              </div>
              <div>
                <p className="font-semibold">Online</p>
                <p className="text-gray-500 text-sm">Pay via UPI/Card/Wallet</p>
              </div>
              {selected === 'online' && (
                <div className="ml-auto text-[#ff6b00]">✓</div>
              )}
            </div>
          </div>
        </Card>

        {selected === 'online' && (
          <Card>
            <p className="text-gray-500 text-sm text-center">
              Simulating online payment...
            </p>
          </Card>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button onClick={handlePay} disabled={processing}>
          {processing ? 'Processing...' : `Pay ₹${driver.fare}`}
        </Button>
      </div>
    </div>
  );
}

export function Button({ children, onClick, variant = 'primary', className = '', disabled = false, full = true }) {
  const base = 'py-4 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50';
  const variants = {
    primary: 'bg-[#ff6b00] text-white hover:bg-[#e55f00]',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border-2 border-[#ff6b00] text-[#ff6b00] bg-white hover:bg-orange-50',
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled || false}
      className={`${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '', onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg p-4 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function Input({ placeholder, value, onChange, type = 'text', className = '' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 outline-none transition-all ${className}`}
    />
  );
}

export function SelectCard({ selected, onClick, children }) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        selected 
          ? 'border-[#ff6b00] bg-orange-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      {children}
    </div>
  );
}

export function LoadingDots() {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="w-3 h-3 bg-[#ff6b00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-3 h-3 bg-[#ff6b00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-3 h-3 bg-[#ff6b00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}
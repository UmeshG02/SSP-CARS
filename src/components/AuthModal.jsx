import React, { useState } from 'react';
import { X, Mail, Lock, ShieldCheck, User } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isRegister && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onAuthSuccess({
        name: isRegister ? name : 'Alexander Sterling',
        email: email,
        isLoggedIn: true
      });
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[420px] rounded-3xl glassmorphism border border-white/10 p-8 shadow-glass-glow animate-fade-in z-10 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent-cyan/10 blur-[60px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-luxury border border-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo Title */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex p-2.5 rounded-2xl bg-gradient-to-tr from-accent-cyan to-accent-green text-black mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-luxury font-extrabold text-2xl text-white tracking-wider uppercase">
            {isRegister ? 'Create Profile' : 'Verify Account'}
          </h2>
          <p className="text-xs text-gray-500 font-mono">
            {isRegister ? 'Register your secure buyer credentials' : 'Sign in to access your pre-approved limit'}
          </p>
        </div>

        {/* Form */}
        {success ? (
          <div className="h-48 flex flex-col items-center justify-center text-center space-y-3">
            <ShieldCheck className="w-12 h-12 text-accent-green animate-bounce" />
            <span className="font-luxury font-bold text-sm text-white uppercase tracking-wider">
              {isRegister ? 'Profile Constructed' : 'Decryption Complete'}
            </span>
            <p className="text-xs text-gray-500">Decrypting buyer wallet credentials...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl border border-accent-neon/20 bg-accent-neon/5 text-[11px] font-semibold text-accent-neon tracking-wide text-center">
                {error}
              </div>
            )}

            {isRegister && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white font-medium"
                  />
                  <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Secure Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white font-medium"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Passkey Code</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white font-mono"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury mt-2"
            >
              {isRegister ? 'Publish Credentials' : 'Request Decryption'}
            </button>

            {/* Toggle footer */}
            <div className="text-center pt-4 border-t border-white/5 mt-4 text-[10px] text-gray-500">
              {isRegister ? 'Already registered?' : 'Construct new buyer credentials?'}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                }}
                className="text-accent-cyan hover:text-white ml-1 font-bold underline transition-luxury"
              >
                {isRegister ? 'Decrypt here' : 'Construct here'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API verification and unlock premium features
    localStorage.setItem('fuse_premium_unlocked', 'true');
    
    // Optional: Auto-redirect after a delay
    // const timer = setTimeout(() => navigate('/report'), 5000);
    // return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-green-100 animate-fade-in">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-slate-600 mb-8">
          Thank you for your purchase. Your premium vehicle health report has been successfully unlocked.
        </p>
        <Link 
          to="/report" 
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
        >
          View My Report <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Success;
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface Props {
  productName: string;
}

const AffiliateBox: React.FC<Props> = ({ productName }) => {
  return (
    <div className="mt-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-300 uppercase font-semibold">Need parts?</p>
        <p className="font-bold">Find {productName} on Amazon</p>
      </div>
      <a 
        href={`https://www.amazon.com/s?k=${encodeURIComponent(productName)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-2 px-4 rounded flex items-center gap-2 text-sm transition"
      >
        <ShoppingCart className="h-4 w-4" />
        Shop Now
      </a>
    </div>
  );
};

export default AffiliateBox;

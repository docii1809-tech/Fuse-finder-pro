import React from 'react';
import { AnalysisResult } from '../types';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface Props {
  result: AnalysisResult | null;
}

const ResultPanel: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  const getSeverityColor = (s: string) => {
    switch (s) {
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  const getIcon = (s: string) => {
    switch (s) {
      case 'low': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'medium': return <Info className="h-6 w-6 text-yellow-600" />;
      case 'high': return <AlertTriangle className="h-6 w-6 text-orange-600" />;
      case 'critical': return <XCircle className="h-6 w-6 text-red-600" />;
      default: return <Info className="h-6 w-6" />;
    }
  };

  return (
    <div className={`rounded-xl border p-6 mt-6 ${getSeverityColor(result.severity)}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          {getIcon(result.severity)}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">{result.title}</h3>
          <span className="inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-white/50 border border-current mb-3">
            Severity: {result.severity}
          </span>
          <p className="mb-4 text-sm md:text-base leading-relaxed opacity-90">
            {result.description}
          </p>
          <div className="bg-white/60 p-4 rounded-lg">
            <h4 className="font-bold text-sm uppercase opacity-75 mb-1">Recommendation</h4>
            <p className="font-medium">{result.recommendation}</p>
          </div>
          <div className="mt-2 text-xs opacity-60 text-right">
            AI Confidence: {(result.confidence * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;

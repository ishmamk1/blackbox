import React, { useContext, useState } from 'react';
import { AppContext } from '@/store/appContext';

const IntruderAlert = () => {
    // const { state, actions } = useContext(AppContext);
  
  // Expose username on an API route
  const Accordion = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left text-gray-700 hover:bg-gray-50"
      >
        <span className="font-medium">Click to expand</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4 border-t">
          <p className="text-gray-700">
            This is the content that appears when the accordion is expanded.
            You can put any content here.
          </p>
        </div>
      </div>
    </div>
  );
    }
};

export default IntruderAlert;

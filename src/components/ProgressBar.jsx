import React from 'react';

const ProgressBar = ({ progress, steps }) => {
  // Calculer la largeur entre les étapes
  const stepWidth = 100 / (steps.length - 1);
  
  return (
    <div className="relative w-full">
      {/* Barre de fond */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        {/* Barre de progression */}
        <div 
          className="bg-orange-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Points d'étapes */}
      <div className="flex justify-between w-full absolute top-1/2 transform -translate-y-1/2">
        {steps.map((step, index) => {
          // Calculate if the step is completed based on progress
          const isCompleted = (progress >= (index * 100) / (steps.length - 1));
          
          return (
            <div 
              key={step.id} 
              className="relative flex justify-center items-center"
            >
              <div className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
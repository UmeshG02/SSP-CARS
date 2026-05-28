import React, { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (car) => {
    if (compareList.find(c => c.id === car.id)) {
      return { success: false, message: `${car.make} ${car.model} is already added to comparison.` };
    }
    if (compareList.length >= 3) {
      return { success: false, message: 'You can compare a maximum of 3 vehicles at once.' };
    }
    setCompareList(prev => [...prev, car]);
    return { success: true, message: `${car.make} ${car.model} added to comparison.` };
  };

  const removeFromCompare = (carId) => {
    setCompareList(prev => prev.filter(c => c.id !== carId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (carId) => {
    return compareList.some(c => c.id === carId);
  };

  return (
    <ComparisonContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

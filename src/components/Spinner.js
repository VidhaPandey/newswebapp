import React from 'react';
import loading from './loading.gif'; // Make sure you have a loading.gif file in the same directory

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
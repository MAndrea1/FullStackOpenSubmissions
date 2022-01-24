import React from 'react';

const DisplayFilter = ({handleFilter}) => {
  return <div>
      filter shown with <input type="text" onChange={handleFilter} />
  </div>;
};

export default DisplayFilter;

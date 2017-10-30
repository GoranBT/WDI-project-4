import React from 'react';
import AutoComplete from './AutoComplete';

const Location = ({ index, handleLocationChange, getAutocompleteInfo, name, cost, address, location }) => {

  return (
    <div>
      <AutoComplete getAutocompleteInfo={getAutocompleteInfo} value={location} index={index} />
      <input
        placeholder="name"
        className="form-control"
        value={name}
        onChange={(e) => handleLocationChange(index, 'name', e.target.value)}
        name="name"
      />
      <input
        placeholder="cost"
        className="form-control"
        value={cost}
        onChange={(e) => handleLocationChange(index, 'cost', e.target.value)}
        name="cost"
      />
      <input
        placeholder="address"
        className="form-control"
        value={address}
        onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
        name="cost"
      />
    </div>
  );
};

export default Location;

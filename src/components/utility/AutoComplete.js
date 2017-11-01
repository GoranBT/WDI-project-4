/* global google */
import React from 'react';

const AutoComplete = ({ getAutocompleteInfo }) => {

  function initAutocomplete(input) {
    if(!input) return false;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      // getAutocompleteInfo is a method that we pass in as props
      getAutocompleteInfo(place);
    });
  }

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="locations"
        name="locations"
        ref={(element) => initAutocomplete(element)}
      />
    </div>
  );
};

export default AutoComplete;

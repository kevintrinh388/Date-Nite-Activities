/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, FormControl } from 'react-bootstrap';

function SearchBar() {
  const [address, setAdress] = useState('');
  const [search, setSearch] = useState('');

  const handleSelect = async (value) => {
    console.log(value);
    setSearch(value);
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAdress}
        onSelect={handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <Form className="d-flex">
              <FormControl
                type="search"
                className="me-2"
                aria-label="Search"
                {...getInputProps({ placeholder: 'Search...' })}
              />
            </Form>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default SearchBar;

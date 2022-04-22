/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Searchbar(props) {
  const [address, setAddress] = useState('');
  const [search, setSearch] = useState('Atlanta');
  const {
    searchButton, userLocation,
  } = props;

  const handleSelect = async (value) => {
    console.log(value);
    setSearch(value);
    setAddress(value);
  };

  const searchPlace = () => {
    console.log(search);
    userLocation.current = search;
    searchButton();
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <Paper
              component="form"
              sx={{
                p: '2px 4px', display: 'flex', alignItems: 'center', width: 450, marginLeft: '15px', marginTop: '15px',
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search google maps' }}
                {...getInputProps({ placeholder: 'Search...' })}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchPlace}>
                <SearchIcon />
              </IconButton>
            </Paper>
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#ec95b5' : '#fff',
                  position: 'relative',
                  top: '10px',
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

export default Searchbar;

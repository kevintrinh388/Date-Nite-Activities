/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Searchbar(props) {
  const [address, setAdress] = useState('');
  const [search, setSearch] = useState('');
  const { searchButton, userLocation } = props;

  const handleSelect = async (value) => {
    console.log(value);
    setSearch(value);
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
        onChange={setAdress}
        onSelect={handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <Paper
              component="form"
              sx={{
                p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,
              }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu" />
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
                  backgroundColor: suggestion.active ? '#E4717A' : '#fff',
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

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Filter from './Filter';

function Searchbar(props) {
  const [address, setAddress] = useState('');
  const [search, setSearch] = useState('');
  const {
    searchButton, userLocation, searchTerm, searchPrice, searchRating,
  } = props;
  const [modalShow, setModalShow] = useState(false);

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
      <Filter
        show={modalShow}
        onHide={() => setModalShow(false)}
        searchTerm={searchTerm}
        searchPrice={searchPrice}
        searchRating={searchRating}
      />
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
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => setModalShow(true)}>
                <FilterAltIcon />
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

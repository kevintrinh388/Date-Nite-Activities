/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';

export default function MapDisplay({ value }) {
    return (
        <div>
            <iframe title="google-map" className="map" src={value} />
        </div>
    );
}
MapDisplay.defaultProps = {
    value: '',
};

MapDisplay.propTypes = {
    value: PropTypes.string,
};

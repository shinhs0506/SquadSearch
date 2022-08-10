import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Map, Marker, GoogleApiWrapper, InfoWindow,
} from 'google-maps-react';
import Geocode from 'react-geocode';
import PropTypes from 'prop-types';

console.log('api key is : ', process.env.REACT_APP_GOOGLE_MAP_API_KEY);
console.log('api key is : ', process.env);

function MapWrapper({ google }) {
    const events = useSelector((state) => state.event.events);
    const [coords, setCoords] = useState([]);

    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    Geocode.setApiKey('AIzaSyDTyAjDVBwxWqhsb3DHVE7vlPw0JIp1Ees');
    Geocode.setRegion('ca');
    Geocode.setLocationType('ROOFTOP');

    function findCoords() {
        const arr = events.map((event) => Geocode.fromAddress(event.location).then((res) => ({
            coord: res.results[0].geometry.location,
            name: event.name,
            location: event.location,
            date: event.date,
            photo: event.photo,
            _id: event._id,
        })));
        Promise.all(arr.map((a) => a.catch((error) => null))).then((res) => {
            setCoords(res);
        });
    }

    useEffect(() => {
        findCoords();
    }, [events]);

    const handleMapClick = () => {
        setShowInfoWindow(false);
        setActiveMarker(null);
    };

    const handleMarkerClick = (props, marker) => {
        setShowInfoWindow(true);
        setActiveMarker(marker);
        setSelectedPlace(props);
    };

    return coords && (
        <Map
          google={google}
          style={{
              width: '100%', height: '100%', position: 'relative', margin: 'auto',
          }}
          zoom={14}
          initialCenter={{ lat: 49.2827, lng: -123.1207 }}
          onClick={handleMapClick}
        >
            { coords.map((coord) => (
                coord && (
                <Marker
                  key={coord._id}
                  position={coord.coord}
                  onClick={handleMarkerClick}
                  name={coord.name}
                  _id={coord._id}
                  location={coord.location}
                  date={coord.date}
                  photo={coord.photo}
                />
                )
            ))}
            { selectedPlace
            && (
            <InfoWindow
              marker={activeMarker}
              visible={showInfoWindow}
            >
                <div>
                    <p>
                        {' '}
                        { selectedPlace.name }
                        {' '}
                    </p>
                    <p>
                        {' '}
                        { selectedPlace.location }
                        {' '}
                    </p>
                    <p>
                        {' '}
                        { selectedPlace.date }
                        {' '}
                    </p>
                    { selectedPlace.photo && <img src={selectedPlace.photo} alt="location" /> }

                </div>
            </InfoWindow>
            )}
        </Map>
    );
}

MapWrapper.propTypes = {
    google: PropTypes.shape({
        /* eslint react/forbid-prop-types: 0 */
        map: PropTypes.objectOf(PropTypes.object),
    }),
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDTyAjDVBwxWqhsb3DHVE7vlPw0JIp1Ees',
})(MapWrapper);

import React, {useState, useEffect} from 'react';
import './css/MasterLocationPage/MasterLocationPage.css';
import axios from "axios";
import {useOutletContext} from "react-router-dom";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";

const MasterLocationPage = () => {
    let currentMaster = useOutletContext();
    const mapContainerStyle = {
        width: "100%",
        height: "400px",
        borderRadius: "10px",
    };

    const [address, setAddress] = useState({});
    const [states, setStates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        salonName: '',
        zipCode: '',
        stateName: '',
        cityName: '',
        streetAddress: '',
    });
    const [mapCenter, setMapCenter] = useState({lat: 40.7128, lng: -74.0060});
    const [markerPosition, setMarkerPosition] = useState(null);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDlWzlBtLizMbDDFSeR-iBaCsmTL89BM6o", // Replace with your API Key
    });

    const geocodeAddress = (address) => {
        const fullAddress = `${address.streetAddress}, ${address.cityName}, ${address.stateName}, ${address.zipCode}`;
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=AIzaSyB2rFDD5t6wHQeHrVwozz3P3fFY1QRAtkQ`;
        axios.get(geocodingUrl)
            .then((response) => {
                if (response.data.results.length > 0) {
                    const location = response.data.results[0].geometry.location;
                    setMapCenter(location);  // Set map center to geocoded location
                    setMarkerPosition(location);  // Set marker position on the map
                }
            })
            .catch((error) => {
                console.log("Error geocoding address:", error);
            });
    };

    useEffect(() => {
        if (!currentMaster) {
            currentMaster = {master_id: 1};
        }
        axios.get(`http://localhost:5000/api/salons/master/${currentMaster.master_id}`)
            .then((response) => {
                setAddress(response.data);
                geocodeAddress({
                    streetAddress: response.data.address,
                    cityName: response.data.City.name,
                    stateName: response.data.City.State.name,
                    zipCode: response.data.zip_code
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentMaster]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/states')
            .then((response) => {
                setStates(response.data);
            })
            .catch((error) => {
                console.log('Error fetching states:', error);
            });
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        console.log(address)
        setNewAddress({
            salonName: address.name || '',
            zipCode: address.zip_code || '',
            stateName: address.City.State.name || '',
            cityName: address.City.name || '',
            streetAddress: address.address || '',
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveAddress = () => {
        const addressData = {
            name: newAddress.salonName,
            zip_code: newAddress.zipCode,
            stateName: newAddress.stateName,
            cityName: newAddress.cityName,
            address: newAddress.streetAddress,
            master_id: 1
        };

        if (address.salon_id) {
            axios
                .put(`http://localhost:5000/api/salons/${address.salon_id}`, addressData)
                .then((response) => {
                    setAddress(response.data);
                    setIsModalOpen(false);
                    geocodeAddress(
                        {
                            streetAddress: response.data.address,
                            cityName: addressData.cityName,
                            stateName: addressData.stateName,
                            zipCode: response.data.zip_code
                        }
                    )
                })
                .catch((error) => {
                    console.log('Error updating salon:', error);
                });
        } else {
            axios
                .post(`http://localhost:5000/api/address/saveAddress`, addressData)
                .then((response) => {
                    setAddress(response.data.salon);
                    setIsModalOpen(false);
                    geocodeAddress(
                        {
                            streetAddress: response.data.salon.address,
                            cityName: response.data.salon.City.name,
                            stateName: response.data.salon.City.State.name,
                            zipCode: response.data.salon.zip_code
                        }
                    )
                })
                .catch((error) => {
                    console.log('Error saving new salon:', error);
                });
        }
    };

    const handleInputChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="masterLocationPage">
            <div className="map">
                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={15}
                    >
                        {markerPosition && <Marker position={markerPosition}/>}
                    </GoogleMap>
                )}
                <div className="map-marker">
          <span className="map-popup" onClick={handleOpenModal}>
            {address.address || 'Add address'}
          </span>
                </div>
            </div>

            {isModalOpen && (
                <div className="modalMasterOverlay">
                    <div className="modalMasterLocation">
                        <button className="close-button" onClick={handleCloseModal}>×</button>
                        <h2>Add address</h2>
                        <div className="form-group">
                            <label>ZIP code</label>
                            <input
                                type="text"
                                name="zipCode"
                                value={newAddress.zipCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <select
                                name="stateName"
                                value={newAddress.stateName}
                                onChange={handleInputChange}
                            >
                                <option value="">Select state</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="cityName"
                                value={newAddress.cityName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Street address</label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={newAddress.streetAddress}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button onClick={handleSaveAddress}>Save</button>
                            <button onClick={handleCloseModal}>Clear</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterLocationPage;
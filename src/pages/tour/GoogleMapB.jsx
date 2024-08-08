import React from "react";
import {useState,useEffect, useRef} from 'react';
import '../../components/css/tour/Map.css';
import {
    GoogleMap,    
    useJsApiLoader,
    MarkerF,
} from "@react-google-maps/api";


const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 37.5665,
    lng: 126.9780,
};
const libraries = ["places"];

function GoogleMapB({address}) {   
    console.log(address);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBRZQy7nY-LfiTF9w9GdgQE81CvnGAKp9I",
        libraries,
    });
        
    let query = React.useMemo(() => {
        return address;
    }, [address]);

    const [map, setMap] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);
    let mapKey = React.useMemo(() => 
        `${address}`, [address]
    );    

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);

        // PlacesService 객체 생성
        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            query: query,
            region: 'kr' 
        };    
        service.textSearch(request, (results, status) => {
            if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results
            ) {                    
                const newMarkers = results.map((place) => {
                    const photoUrl = place.photos && place.photos[0] ? place.photos[0].getUrl() : null;              
                    return {
                        position: place.geometry.location,
                        name: place.name,
                        address: place.formatted_address,
                        photo: photoUrl,
                    };
                });   
                                 
                setMarkers(newMarkers);
                
                if (newMarkers.length > 0) {
                    map.setCenter(newMarkers[0].position);
                    const bounds = new window.google.maps.LatLngBounds();
                    newMarkers.forEach(marker => bounds.extend(marker.position));
                    map.fitBounds(bounds);

                    const listener = window.google.maps.event.addListener(map, "bounds_changed", function() {
                        this.setZoom(Math.min(map.getZoom(), 15));
                        window.google.maps.event.removeListener(listener);
                    });
                }
            }                                    
        });                
        // 장소 검색 요청
    },[query]);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);
        
    return isLoaded ? (
        <GoogleMap
            key={mapKey}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            {markers.map((marker,index)=>(
                <MarkerF key={index} position={marker.position} title={marker.name} 
                onMouseOver={() => {
                    // info Window marker 정보 표시
                    const infowindow = new window.google.maps.InfoWindow({
                    content: `<div>
                                <h3>${marker.name}</h3>
                                <p>${marker.address}</p>
                                ${marker.photo ? `<img src="${marker.photo}" alt="${marker.name}" style="width:100px;height:100px;"/>` : ''}
                                </div>`,
                    });
                    infowindow.open(map, new window.google.maps.Marker({ position: marker.position, map }));
                }}>
                    
                </MarkerF>
            ))}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default GoogleMapB;

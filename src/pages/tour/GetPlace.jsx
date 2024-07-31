import React from "react";
import {useState} from 'react';
import {
    GoogleMap,    
    useJsApiLoader,
    MarkerF,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const center = {
    lat: 37.5665,
    lng: 126.9780,
};

const radius = 5000;

const libraries = ["places"];

function GetPlace({search, category, filteredData}) {        
    let query = "반려동물 동반 ";
    if (search === '') {
        query = "서울역"; 
    } else {
        if (category === 1) {
            query += "명소 " + search;
        } else if(category === 2) {
            query += "레스토랑 " + search; 
        }
    }
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBRZQy7nY-LfiTF9w9GdgQE81CvnGAKp9I",
        libraries,
    });
    const [map, setMap] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);
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
        // 장소 검색 요청
        service.textSearch(request, (results, status) => {
            if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results
            ) {
                // 검색된 장소에 대한 마커 추가
                const newMarkers = results.map((place) => ({
                    position: place.geometry.location,
                    name: place.name,
                    address: place.formatted_address,
                    photo: place.photos && place.photos[0] ? place.photos[0].getUrl() : null,
                }));
                filteredData = newMarkers;
                setMarkers(newMarkers);
                
                if (newMarkers.length > 0) {
                    map.setCenter(newMarkers[0].position);
                    const bounds = new window.google.maps.LatLngBounds();
                    newMarkers.forEach(marker => bounds.extend(marker.position));
                    map.fitBounds(bounds);
                }
            }                    
        });
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            {markers.map((marker,index)=>(
                <MarkerF key={index} position={marker.position} title={marker.name} 
                onClick={() => {
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

export default GetPlace;

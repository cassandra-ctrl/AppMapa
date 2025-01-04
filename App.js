import * as React from 'react';
import * as Location from 'expo-location';

import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import axios from 'axios';

const API_KEY = 'Qe72ADLzMxndwOELG75g2UalODdS1EwO';

const App = () => {
  const [origin, setOrigin] = React.useState({
    //longuitud y latitus donde queremos que inicie nuestro mapa
    latitude: 19.349274,
    longitude: -99.16412266711431,
  });

  const [destination, setDestination] = React.useState({
    //longuitud y latitus donde queremos que termine nuestro mapa
    latitude: 19.420232,
    longitude: -99.182107,
  });


  //Permisos del usuario
  React.useEffect(() => {
    getLocationPermission();
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso denegado')
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);


  }

  //consume api tom tom
  const [route, setRoute] = React.useState([]);

  React.useEffect(() => {
    fetchRoute();
  }, [origin, destination]);

  const fetchRoute = async () => {
    try {
      const response = await axios.get(
        `https://api.tomtom.com/routing/1/calculateRoute/${origin.latitude},${origin.longitude}:${destination.latitude},${destination.longitude}/json`,
        {
          params: {
            key: API_KEY,
            routeType: 'fastest',
            travelMode: 'car',
          },
        }
      );
      const coordinates = response.data.routes[0].legs[0].points.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
      }));
      setRoute(coordinates);
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <UrlTile
          urlTemplate={`https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${API_KEY}`}
          maximumZ={20}
        />
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(e) => setOrigin(e.nativeEvent.coordinate)}
        />
        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
        />
        <Polyline coordinates={route} strokeColor="blue" strokeWidth={4} />
      </MapView>
    </View>
  );
};

//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;

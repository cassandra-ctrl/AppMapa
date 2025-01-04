
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//importamos la biblioteca de maps
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location'

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

  React.useEffect(() => {
    getLocationPermission();
  }, [])
  //Preguntamos al usuario si podemos acceder a su ubicacion actual
  //Es async porque necesitamos los permisos para poder continuar
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


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      //anadimos una marca a nuestra coordenada de origen y destino
      ><Marker
          draggable
          coordinate={origin}
          //donde tiren el pin, vamos a recibir la latitud y longitud
          onDragEnd={direction => setOrigin(direction.nativeEvent.coordinate)}
        />

        <Marker
          draggable
          coordinate={destination}
          //donde tiren el pin, vamos a recibir la latitud y longitud
          onDragEnd={direction => setDestination(direction.nativeEvent.coordinate)}
        />
        {/* <MapViewDirections
          origin= {origin}
          destination={destination}
          apikey={}
        /> */}
        <Polyline
          //conecta la direccion de inicia a final 
          coordinates={[origin, destination]}
          strokeColor='purple'
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  map: {
    width: '100%',
    height: '100%'
  }


});





export default App;

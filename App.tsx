import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Coordinate , MapPressEvent } from './functions/type';
import { Picker } from '@react-native-picker/picker';
import { fetchDirections } from './functions/directionsApi';

const MapScreen = () => {

  const [transportationMode, setTransportationMode] = useState<'Car' | 'Public Transport'>('Car');
  const [points, setPoints] = useState<Coordinate[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  
  useEffect(() => {
    if (points.length === 2) {
      handleFetchDirections();
    }
  }, [points, transportationMode]);

  const handleFetchDirections = async () => {
    await fetchDirections(points, setRouteCoordinates);
    // console.log('get direction or rerun');
  };

  const handleMapPress = (event: MapPressEvent) => {
    if (points.length < 2) {
      setPoints([...points, event.nativeEvent.coordinate]);
    }
    // console.log('map pressed');
  };

  const clearPointsAndRoute = () => {
    setPoints([]);
    setRouteCoordinates([]);
    // console.log('cleared')
  };

  const initialRegion = {
    latitude: 12.8797,
    longitude: 121.7740,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={transportationMode}
        onValueChange={(itemValue) => setTransportationMode(itemValue)}
      >
        <Picker.Item label="Car" value="Car" />
        <Picker.Item label="Public Transport" value="Public Transport" />
      </Picker>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={initialRegion}
      >
        {points.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
          />
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
      <View style={styles.controls}>
        <TouchableOpacity onPress={clearPointsAndRoute} style={styles.button}>
          <Text>Clear Points</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
});

export default MapScreen;

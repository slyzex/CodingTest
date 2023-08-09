export interface Coordinate {
    latitude: number;
    longitude: number;
  }
  
  export interface DecodedCoordinate {
    latitude: number;
    longitude: number;
    
  }
  export interface MapPressEvent {
    nativeEvent: {
      coordinate: Coordinate;
    };
  }
  
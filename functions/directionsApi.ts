import { Coordinate } from "./type";
import { decodePolyline } from "./polylineUtils";

export const fetchDirections = async (points: Coordinate[], setRouteCoordinates: (coordinates: Coordinate[]) => void) => {
    if (points.length !== 2) return;
  
    const origin = points[0];
    const destination = points[1];
    const apiKey = 'AIzaSyCgN7F39U0AsSNXuVVtkz0x4KWMfLHZDLQ';
  
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`
      );
  
      const data = await response.json();
  
      if (data.status === 'OK') {
        const polylinePoints = data.routes[0].overview_polyline.points;
        const decodedCoordinates = decodePolyline(polylinePoints);
        setRouteCoordinates(decodedCoordinates);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };
  
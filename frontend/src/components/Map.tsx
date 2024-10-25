import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Coordinate } from "../types";
import { useMemo } from "react";
import { LatLngExpression } from "leaflet";

interface MapProps {
  points?: Coordinate[];
}

function midpoint(a: Coordinate, b: Coordinate): [number, number] {
  const aLatitude = (a.latitude * Math.PI) / 180.0;
  const bLatitude = (b.latitude * Math.PI) / 180.0;
  const aLongitude = (a.longitude * Math.PI) / 180.0;
  const bLongitude = (b.longitude * Math.PI) / 180.0;
  const Bx = Math.cos(bLatitude) * Math.cos(bLongitude - aLongitude);
  const By = Math.cos(bLatitude) * Math.sin(bLongitude - aLongitude);
  const latitude = Math.atan2(
    Math.sin(aLatitude) + Math.sin(bLatitude),
    Math.sqrt((Math.cos(aLatitude) + Bx) * (Math.cos(aLatitude) + Bx) + By * By)
  );
  const longitude = aLongitude + Math.atan2(By, Math.cos(aLatitude) + Bx);

  return [(latitude / Math.PI) * 180, (longitude / Math.PI) * 180];
}

export default function Map({ points }: MapProps) {
  const markers = useMemo(
    () =>
      (points ?? []).map(({ latitude, longitude, name }, index) => (
        <Marker
          key={`marker-${index}`}
          position={[latitude, longitude]}
          title={name}
        />
      )),
    [points]
  );

  const bounds = useMemo(() => {
    if (!points) {
      return undefined;
    }

    return points.map(
      ({ latitude, longitude }) => [latitude, longitude] as [number, number]
    );
  }, [points]);

  const center = useMemo<LatLngExpression>(() => {
    if (points && points.length == 2) {
      return midpoint(points[0], points[1]);
    }

    return [0, 0];
  }, [points]);

  return (
    <MapContainer
      center={center}
      zoom={5}
      bounds={bounds}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

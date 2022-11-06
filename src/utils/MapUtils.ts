import { LatLng } from 'react-native-maps';

const getLatLngFromLocation = ({latitude, longitude} : LatLng&any): LatLng => ({latitude, longitude});
const generateLocationURL =
 ({ latitude, longitude }: LatLng & any) =>
	  `https://www.google.com/maps/@${latitude},${longitude}z`;

export { getLatLngFromLocation, generateLocationURL };

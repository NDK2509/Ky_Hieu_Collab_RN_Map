import { LatLng, Region } from 'react-native-maps';

const getLatLngFromLocation = ({latitude, longitude} : LatLng&any): LatLng => ({latitude, longitude});

const generateLocationURL =
 ({ latitude, longitude }: LatLng & any) =>
	  `https://www.google.com/maps/@${latitude},${longitude}z`;

const animateToRegion = (
	mapRef: any,
	region: Region,
	duration: number,
	callback?: (region: Region) => void,
) => {
	mapRef?.current?.animateToRegion(region, duration);
	if (callback) callback(region);
}; 

export { getLatLngFromLocation, generateLocationURL, animateToRegion };

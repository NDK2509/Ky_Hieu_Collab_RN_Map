import Geolocation from '@react-native-community/geolocation';
import { GeolocationResponse } from '@react-native-community/geolocation/lib/typescript/NativeRNCGeolocation';
import { Address, LatLng } from 'react-native-maps';

const currentLocationHandler = (
	callback: (position: GeolocationResponse) => void,
) => {
	Geolocation.requestAuthorization(
		() => {
			Geolocation.getCurrentPosition(
				position => {
					callback(position);
				},
				e => console.log('Geolocation current position error: ', e.message),
			);
		},
		e => console.log('Location authorization error: ', e.message),
	);
};

const getAddressFromLatLng = async (
	mapRef: any,
	{ latitude, longitude }: LatLng & any,
): Promise<Address & { subThoroughfare?: string }> => {
	return await mapRef?.current?.addressForCoordinate({ latitude, longitude });
};


export { currentLocationHandler, getAddressFromLatLng };

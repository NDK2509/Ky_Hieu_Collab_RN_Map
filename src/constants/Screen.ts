import {Dimensions, Platform, StatusBar} from 'react-native';

const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS == 'android' ? StatusBar.currentHeight : 0;

export {DEVICE_HEIGHT, DEVICE_WIDTH, STATUSBAR_HEIGHT};

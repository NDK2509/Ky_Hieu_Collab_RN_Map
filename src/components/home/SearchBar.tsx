import { StyleSheet, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Region } from "react-native-maps"
import { PLACES_API_KEY } from "../../constants/Google"

const style = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 3,
    width: '90%',
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    padding: 5,
    borderRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#8888',
  },
})
export default (props: { mapRef: any, markerChangePositionHandler: (region: Region) => void }) => {
  return (
    <View style={style.searchContainer}>
      <GooglePlacesAutocomplete
        styles={{ textInput: style.input }}
        query={{
          key: PLACES_API_KEY,
          language: "en"
        }}
        placeholder="Search a place..."
        fetchDetails={true}
        GooglePlacesDetailsQuery={{ fields: 'geometry' }}
        onPress={(data, details = null) => {
          console.log('data', data);
          console.log('details', details);
          console.log(JSON.stringify(details?.geometry?.location));
          const location = details?.geometry?.location;
          const region = {
            latitude: location?.lat,
            longitude: location?.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }
          props.markerChangePositionHandler(region as Region)
          props.mapRef?.current?.animateToRegion(
            region,
            500,
          );
        }}
      />
    </View>
  )
}
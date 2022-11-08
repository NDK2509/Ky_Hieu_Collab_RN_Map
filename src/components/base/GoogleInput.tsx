import { StyleSheet, View, ViewStyle } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Region } from "react-native-maps";
import { PLACES_API_KEY } from "../../constants/Google";
import { CLOSED_VIEW_DELTA } from "../../constants/Location";
import { animateToRegion } from "../../utils/MapUtils";

interface GoogleInputProps {
  mapRef: any,
  placeholder: string,
  style?: ViewStyle, 
  onChoosePlace: ( region: Region ) => void
}
const style = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
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
export default (props: GoogleInputProps) => {
  return (
    <View style={[style.searchContainer, props.style]}>
      <GooglePlacesAutocomplete
        styles={{ textInput: style.input }}
        query={{
          key: PLACES_API_KEY,
          language: "en"
        }}
        placeholder={props.placeholder}
        fetchDetails={true}
        GooglePlacesDetailsQuery={{ fields: 'geometry' }}
        onPress={(data, details) => {
          const location = details?.geometry?.location;
          const region = {
            latitude: location?.lat,
            longitude: location?.lng,
            ...CLOSED_VIEW_DELTA
          } as Region
          props.onChoosePlace(region)
          animateToRegion(props.mapRef, region, 500)
        }}
      />
    </View>
  )
}

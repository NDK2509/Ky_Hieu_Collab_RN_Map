import { useRef, useState } from "react"
import { StyleSheet, ToastAndroid, View } from "react-native"
import { LatLng, Marker, Region } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { GOOGLE_API_KEY } from "../../constants/Google"
import { DEFAULT_DELTA, DEFAULT_REGION } from "../../constants/Location"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/Screen"
import { useCurrentLocation } from "../../hooks"
import colors from "../../theme/colors"
import { getLatLngFromLocation } from "../../utils/MapUtils"
import GoogleInput from "../base/GoogleInput"
import Map from "../base/Map"

const style = StyleSheet.create({
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: DEVICE_HEIGHT - 80,
    width: DEVICE_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  inputOrigin: {
    top: 3,
    width: "90%",
    zIndex: 1
  },
  inputDestination: {
    top: 70,
    width: "90%"
  }
})
export default () => {

  const [currentLatLng] = useCurrentLocation()
  const [origin, setOrigin] = useState<LatLng>(currentLatLng)
  const [destination, setDestination] = useState<LatLng>()
  // const [currentRegion, setCurrentRegion] = useState<Region>(DEFAULT_REGION)
  const [currentRegion, setCurrentRegion] = useState<Region>({
    ...currentLatLng as LatLng,
    ...DEFAULT_DELTA
  })

  const mapRef = useRef<any>(null)

  return (
    <View style={style.mapContainer}>
      <Map
        ref={mapRef}
        initialRegion={currentRegion}
        showDefaultMarker={false}
        onRegionChange={setCurrentRegion}
        zoomControlEnabled={true}
      >

        {
          origin && <Marker coordinate={origin} />
        }
        {
          destination && <Marker coordinate={destination} pinColor="green" />
        }
        {
          origin && destination &&
          <MapViewDirections
            apikey={GOOGLE_API_KEY}
            origin={getLatLngFromLocation(origin)}
            destination={destination}
            strokeWidth={5}
            strokeColor={colors.primary}
            onError={() => ToastAndroid.showWithGravity("Can't direct to this location!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)}
          />
        }
      </Map>
      <GoogleInput
        mapRef={mapRef}
        onChoosePlace={(region) => setOrigin(getLatLngFromLocation(region))}
        style={style.inputOrigin}
        placeholder="Enter the origin place..."
      />
      <GoogleInput
        mapRef={mapRef}
        onChoosePlace={(region) => setDestination(getLatLngFromLocation(region))}
        style={style.inputDestination}
        placeholder="Enter the destination place..."
      />
    </View>
  )
}
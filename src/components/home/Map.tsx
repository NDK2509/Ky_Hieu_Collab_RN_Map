import { StyleSheet, Text, ToastAndroid, View } from "react-native"
import MapView, { Callout, LatLng, MapPressEvent, Marker, MarkerDragStartEndEvent, MarkerPressEvent, PoiClickEvent, PROVIDER_GOOGLE, Region } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faDirections, faLocation } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { GOOGLE_API_KEY } from "../../constants/Google"
import { DEFAULT_DELTA, DEFAULT_REGION } from "../../constants/Location"
import { getCurrentLocation } from "../../utils/LocationUtils"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/Screen"
import { getLatLngFromLocation } from "../../utils/MapUtils"
import ShareLocationModal from "./ShareLocationModal"
import SearchBar from "./SearchBar"
import MapOptions from "./MapOptions"
import colors from "../../theme/colors"
// import axios from "axios"

const style = StyleSheet.create({
  container: {
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})

export default () => {

  const [currentPointedRegion, setCurrentPointedRegion] = useState<Region>(DEFAULT_REGION)
  const [isDirected, setIsDirected] = useState<boolean>(false)
  const [destination, setDestination] = useState<LatLng>({ latitude: 37.3317876, longitude: -122.0054812 })
  const [isClickedToShare, setIsClickedToShare] = useState<boolean>(false)

  const directionRef = useRef<any>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    getCurrentLocation(
      ({ coords }) => {
        console.log("Current: ", coords);
        const region = {
          ...getLatLngFromLocation(coords),
          ...DEFAULT_DELTA
        }
        mapRef?.current?.animateToRegion(region, 500)
        setCurrentPointedRegion(region);
      }
    );
  }, []);

  //get address from gg api
  // useEffect(() => {
  //   axios
  //     .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${currentPointedRegion.latitude},${currentPointedRegion.longitude}&key=${GOOGLE_API_KEY}`)
  //     .then(res => console.log("address info: ", res.data))
  //     .catch(e => console.log(e))
  // }, [])
  // console.log("", );
  const changeRegionHandler = (region: Region) => {
    setCurrentPointedRegion(region)
  }
  const pressMapHandler = (e: MapPressEvent) => {
    setCurrentPointedRegion({ ...currentPointedRegion, ...e.nativeEvent.coordinate })
  }
  const poiClickHandler = (e: PoiClickEvent) => {
    setCurrentPointedRegion({ ...currentPointedRegion, ...e.nativeEvent.coordinate })
  }
  const markerDragEndHandler = (e: MarkerDragStartEndEvent) => {
    const coords = e.nativeEvent.coordinate
    setCurrentPointedRegion({ ...currentPointedRegion, latitude: coords.latitude, longitude: coords.longitude })
  }
  const markerPressHandler = (e: MarkerPressEvent) => { setCurrentPointedRegion({ ...currentPointedRegion, ...e.nativeEvent.coordinate }) }
  return (
    <View style={style.mapContainer}>
      <MapView
        ref={mapRef}
        style={style.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentPointedRegion}
        // showsUserLocation={true}
        // userInterfaceStyle={"dark"}
        onPress={pressMapHandler}
        onRegionChange={changeRegionHandler}
        onMarkerDragEnd={markerDragEndHandler}
        onPoiClick={poiClickHandler}
        onMarkerPress={markerPressHandler}
      >
        <Marker
          draggable
          coordinate={getLatLngFromLocation(currentPointedRegion)}
        >
          <Callout>
            <Text>{`${currentPointedRegion.latitude}, ${currentPointedRegion.longitude}`}</Text>
          </Callout>
        </Marker>

        {
          isDirected && (
            <>
              <MapViewDirections
                ref={directionRef}
                apikey={GOOGLE_API_KEY}
                origin={getLatLngFromLocation(currentPointedRegion)}
                destination={destination}
                strokeWidth={5}
                strokeColor={colors.primary}
                onError={async () => ToastAndroid.showWithGravity("Can't direct to this location!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)} />
              <Marker coordinate={destination} pinColor="green" />
            </>

          )
        }
      </MapView>
      <SearchBar mapRef={mapRef} markerChangePositionHandler={setCurrentPointedRegion} />
      <MapOptions data={[
        {
          icon: faLocation,
          onPress: () => getCurrentLocation(
            ({ coords }) => {
              console.log("Current: ", coords);
              const region = {
                ...getLatLngFromLocation(coords),
                ...DEFAULT_DELTA
              }
              mapRef?.current?.animateToRegion(region, 800)
              setCurrentPointedRegion(region);
            }
          )
        },
        {
          icon: faPaperPlane,
          onPress: () => {
            setIsClickedToShare(!isClickedToShare)
          }
        },
        {
          icon: faDirections,
          onPress: () => {
            mapRef?.current?.animateToRegion({ destination, ...DEFAULT_DELTA }, 800)
            setIsDirected(!isDirected)
          }
        }
      ]}
        iconColor={colors.primary}
      />
      {
        isClickedToShare && <ShareLocationModal mapRef={mapRef} onPressOverlay={() => setIsClickedToShare(false)} latLng={getLatLngFromLocation(currentPointedRegion)} />
      }
    </View>
  )
}
import { StyleSheet, ToastAndroid, View } from "react-native"
import { LatLng, MapPressEvent, Marker, MarkerDragStartEndEvent, MarkerPressEvent, PoiClickEvent, Region } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faDirections, faLocation, faSatellite } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { GOOGLE_API_KEY } from "../../constants/Google"
import { DEFAULT_DELTA, DEFAULT_REGION, CLOSED_VIEW_DELTA } from "../../constants/Location"
import { currentLocationHandler } from "../../utils/LocationUtils"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/Screen"
import { animateToRegion, getLatLngFromLocation } from "../../utils/MapUtils"
import ShareLocationModal from "./ShareLocationModal"
import MapOptions from "./MapOptions"
import colors from "../../theme/colors"
import Map from "../base/Map"
import GoogleInput from "../base/GoogleInput"
import { useCurrentLocation } from "../../hooks"

const style = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: DEVICE_HEIGHT - 80,
    width: DEVICE_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  input: {
    top: 3,
    width: "90%"
  }
})

export default () => {

  const [currentPointedRegion, setCurrentPointedRegion] = useState<Region>(DEFAULT_REGION)
  const [isDirected, setIsDirected] = useState<boolean>(false)
  const [currentLatLng, getCurrentLatLng] = useCurrentLocation()
  const [destination] = useState<LatLng>(currentLatLng)
  const [isClickedToShare, setIsClickedToShare] = useState<boolean>(false)
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard")

  const mapRef = useRef<any>(null)

  useEffect(() => {
    const region = {
      ...currentLatLng as LatLng,
      ...DEFAULT_DELTA
    }
    animateToRegion(mapRef, region, 500, setCurrentPointedRegion)
    // currentLocationHandler(
    //   ({ coords }) => {
    //     console.log("Current: ", coords);
    //     const region = {
    //       ...getLatLngFromLocation(coords),
    //       ...DEFAULT_DELTA
    //     }
    //     animateToRegion(mapRef, region, 500, setCurrentPointedRegion)
    //   }
    // );
  }, []);

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
      <Map
        ref={mapRef}
        initialRegion={currentPointedRegion}
        mapType={mapType}
        // showsUserLocation={true}
        // userInterfaceStyle={"dark"}
        onPress={pressMapHandler}
        // onRegionChange={setCurrentPointedRegion}
        onMarkerDragEnd={markerDragEndHandler}
        onPoiClick={poiClickHandler}
        onMarkerPress={markerPressHandler}
        zoomControlEnabled={true}
        showDefaultMarker
      >
        {
          isDirected && (
            <>
              <MapViewDirections
                // ref={directionRef}
                apikey={GOOGLE_API_KEY}
                origin={getLatLngFromLocation(currentPointedRegion)}
                destination={destination}
                strokeWidth={5}
                strokeColor={colors.primary}
                onError={() => ToastAndroid.showWithGravity("Can't direct to this location!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)} />
              <Marker coordinate={destination} pinColor="green" />
            </>

          )
        }
      </Map>
      <GoogleInput
        mapRef={mapRef}
        onChoosePlace={setCurrentPointedRegion}
        style={style.input}
        placeholder="Search a place..."
      />
      <MapOptions data={[
        {
          icon: faLocation,
          onPress: () => {
            getCurrentLatLng()
            const region = {
              ...currentLatLng,
              ...DEFAULT_DELTA
            }
            animateToRegion(mapRef, region, 800, setCurrentPointedRegion)
          }

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
            if (!isDirected)
              animateToRegion(
                mapRef,
                { ...destination, ...CLOSED_VIEW_DELTA },
                800
              )
            setIsDirected(!isDirected)
          }
        },
        {
          icon: faSatellite,
          onPress: () => {
            setMapType(prev => {
              return prev === "standard" ? "satellite" : "standard"
            })
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
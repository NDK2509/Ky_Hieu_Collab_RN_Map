import React, { LegacyRef } from "react"
import { StyleSheet } from "react-native"
import MapView, { Callout, MapViewProps, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { Text } from "react-native-svg"
import { getLatLngFromLocation } from "../../utils/MapUtils"

const style = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
export default React.forwardRef((props : MapViewProps & { showDefaultMarker?: boolean }, ref) => {
  return (
    <MapView
      // provider={PROVIDER_GOOGLE}
      {...props}
      style={style.map}
      ref={ref as LegacyRef<any>}
    >
      {props.showDefaultMarker &&
        <Marker
          draggable
          coordinate={getLatLngFromLocation(props.initialRegion)}
        >
          <Callout>
            <Text>{`${props.initialRegion?.latitude}, ${props.initialRegion?.longitude}`}</Text>
          </Callout>
        </Marker>
      }
      {props.children}
    </MapView>
  )
})
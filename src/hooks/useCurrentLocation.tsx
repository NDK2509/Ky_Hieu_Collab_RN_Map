import { useCallback, useEffect, useState } from "react"
import { LatLng, Region } from "react-native-maps"
import { currentLocationHandler } from "../utils/LocationUtils"

export default () => {
  const [currentLocation, setCurrentLocation] = useState<LatLng>()
  const [toggle, setToggle] = useState<boolean>(false)
  useEffect(() => {
    currentLocationHandler(({coords}) => {
      setCurrentLocation(coords)
    })
  }, [toggle])
  const getCurrentLocation = useCallback(() => setToggle(!toggle), [])
  return [currentLocation, getCurrentLocation]
}
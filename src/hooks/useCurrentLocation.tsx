import { useEffect, useState } from "react"
import { LatLng } from "react-native-maps"
import { DEFAULT_REGION } from "../constants/Location"
import { currentLocationHandler } from "../utils/LocationUtils"
import { getLatLngFromLocation } from "../utils/MapUtils"
import useToggle from "./useToggle"

export default (): [LatLng, () => void] => {
  const [currentLocation, setCurrentLocation] = useState<LatLng>(getLatLngFromLocation(DEFAULT_REGION))
  const [toggle, toggleFn] = useToggle()
  useEffect(() => {
    currentLocationHandler(({coords}) => {
      setCurrentLocation(coords)
    })
  }, [toggle])
  return [currentLocation as LatLng, toggleFn]
}
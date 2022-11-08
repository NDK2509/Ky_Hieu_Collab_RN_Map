import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useEffect, useState } from "react"
import { Share, StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native"
import { Address, LatLng } from "react-native-maps"
import { getAddressFromLatLng } from "../../utils/LocationUtils"
import colors from "../../theme/colors"
import { generateLocationURL } from "../../utils/MapUtils"

const style = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: colors.overlay,
    height: "100%",
    width: "100%"
  },
  content: {
    backgroundColor: "white",
    width: "80%",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: {
    width: "80%",
    height: "80%",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    color: colors.primary,
  },
  btn: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8
  },
  desc: {
    marginTop: 10,
    padding: 10
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  }
})
export default (props: { mapRef: any, latLng: LatLng, onPressOverlay?: () => void }) => {
  const [address, setAddress] = useState<Address & { subThoroughfare?: string } | null>(null)
  const link = generateLocationURL(props.latLng)

  const share = async () => {
    await Share.share({
      title: 'Share the location that you have pinned!',
      message: link
    })
  }
  useEffect(() => {
    const getAddress = async () => {
      const address = await getAddressFromLatLng(props.mapRef, props.latLng)
      setAddress(address)
    }
    getAddress()
  }, [])

  return (
    <TouchableOpacity style={[style.overlay, style.center]} onPress={props.onPressOverlay}>
      <View style={style.content}>
        <View style={style.main}>
          <TextInput value={link} style={style.input} />
          <TouchableOpacity style={[style.btn, style.center]} onPress={share}>
            <FontAwesomeIcon icon={faPaperPlane} size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={style.desc}>
          <Text>{`${address?.subThoroughfare}, ${address?.thoroughfare}, ${address?.subAdministrativeArea}, ${address?.administrativeArea}, ${address?.postalCode}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
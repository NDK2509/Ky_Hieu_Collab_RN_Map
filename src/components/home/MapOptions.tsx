import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { FlatList, StyleSheet, TouchableOpacity } from "react-native"
import colors from "../../theme/colors"

const style = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 4,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "white"
  }
})
interface MapOptionProps {
  icon: IconDefinition,
  onPress?: () => void
}
const MapOption = (props: MapOptionProps&{color?: string}) => {
  return (
    <TouchableOpacity style={style.option} onPress={props.onPress}>
      <FontAwesomeIcon icon={props.icon} color={props.color} size={25} />
    </TouchableOpacity>
  )
}
export default (props: { data: Array<MapOptionProps>, iconColor?: string }) => {
  const _renderItem = ({ item }: { item: MapOptionProps }) => <MapOption {...item} color={props.iconColor} />
  return (
    <FlatList style={style.container} data={props.data} renderItem={_renderItem} />
  )
}
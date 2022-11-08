import { faHome, faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { HomeScreen } from "../screens"
import DirectionScreen from "../screens/DirectionScreen"
import colors from "../theme/colors"
import BottomTab from "./BottomTab"

const MainNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: colors.primary, tabBarShowLabel: false}}>
      <BottomTab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({color}) => <FontAwesomeIcon icon={faHome} color={color}/>}}/>
      <BottomTab.Screen name="Direction" component={DirectionScreen} options={{tabBarIcon: ({color}) => <FontAwesomeIcon icon={faLocationArrow} color={color}/>}}/>
    </BottomTab.Navigator>
  )
}
export default MainNavigator
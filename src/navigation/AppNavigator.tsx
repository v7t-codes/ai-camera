import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CameraScreen } from "@/screens/CameraScreen";
import { GalleryScreen } from "@/screens/GalleryScreen";

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Camera"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 
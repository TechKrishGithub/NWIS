import "react-native-gesture-handler";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./routes/DrawerNavigator";
import SiteActiveYes from "./pages/SiteActiveYes";
import Login from "./pages/Login";
import PinGeneration from "./pages/PinGeneration";
import PinAccess from "./pages/PinAccess";
import BottomNavigations from "./routes/BottomNavigator";
import { View,Text,Image } from "react-native";
import WiseLogo from './assets/wiselogo.png'
import YesNoQuestion from "./pages/SampleForPractice";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

const Stack = createStackNavigator();

const DrawerStack = () => (
  <Stack.Navigator>
     <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    
     <Stack.Screen
      name="PinGeneration"
      component={PinGeneration}
      options={{ headerShown: false }}
    />

   <Stack.Screen
      name="PinAccess"
      component={PinAccess}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
     <Stack.Screen name="Site Active" component={SiteActiveYes} />
     <Stack.Screen name="Active" component={YesNoQuestion} />

     <Stack.Screen 
     name="Inspection" 
     options={{
          headerTitle:()=>
          {
            return(
              <View >
              <Text style={{color:'#000',fontWeight:'bold'}}>Wetland Site Inspection Form</Text>
              </View>
            )
          },
          headerStyle:
          {
            borderBottomColor:'#ccc',
            borderBottomWidth:0.5
          }
     }}
      
     component={BottomNavigations}
     />
  </Stack.Navigator>
);

export default function App() {
  useEffect(() => {
    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}
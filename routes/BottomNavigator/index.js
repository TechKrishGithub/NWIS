import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from 'react-native-safe-area-context';
import GeneralInformation from "../../pages/Inspection/GeneralInformation";
import SiteInformation from "../../pages/Inspection/SiteInformation";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Text } from "react-native-paper";
import React,{useEffect} from 'react'

const Top = createMaterialTopTabNavigator();

const TopNavigations = ({route}) => {
  const {
    wetDetails,
    checkSaved
  }=route.params;

  return (
      <Top.Navigator
        screenOptions={{
          tabBarStyle: {
            borderBottomColor: '#ccc',
            borderBottomWidth: 0.8
          },
          animationEnabled: true, // Enable screen transition animation
          tabBarAnimationEnabled: true, // Enable tab bar item animation
        }}
      >

        <Top.Screen
          name='General Information'
          component={GeneralInformation}
          initialParams={{ wetDetails,checkSaved }} 
          options={{
            headerShown: false,
            // tabBarIcon: ({ color, focused }) => (
            //   <MaterialCommunityIcons name="information" size={focused ? 24 : 20} color= {focused ? 'blue' : 'gray'}  />
            // ),
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ fontWeight: 'bold', color: focused ? 'blue' : 'gray' }}>General Information</Text>
            ),
           
          }}
        />

        <Top.Screen
          name='SiteInformation'
          component={SiteInformation}
          initialParams={{ wetDetails,checkSaved }} 
          options={{
            headerShown: false,
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ fontWeight: 'bold', color: focused ? 'blue' : 'gray' }}>Site Information</Text>
            ),
            // tabBarIcon: ({ color, focused }) => (
            //   <MaterialIcons name="location-on" size={focused ? 24 : 20} color={focused ? 'blue' : 'gray'} />
            // ),
          }}
        />
      </Top.Navigator>
    
  )
}

export default TopNavigations;

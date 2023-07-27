import React from "react";
import { 
  View,
  Text,
  Image
} from "react-native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Entypo
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import myLogo from "../../assets/logo-removebg-preview.png"
import WiseLogo from "../../assets/wise_logo.png";
import WiseLogooo from "../../assets/weislogooo.png";
import {
  Logout,
} from "../../pages/index";
import BottomNavigations from "../BottomNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dashboard from "../../pages/DashboardTest";



const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
  
    <Drawer.Navigator
    drawerType="slide"
      drawerContent={(props) => {
        return (
          <SafeAreaView>

  <TouchableOpacity style={{padding: 5,paddingLeft:15}}>
  <Ionicons
    name="arrow-back-sharp"
    size={24}
    color="black"
    onPress={() => props.navigation.goBack()}
  />
  </TouchableOpacity>

            <View
              style={{
                width: "100%",                
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              
              <View>
               
                
              <Image
                source={myLogo}
                style={{
                  height: 120,
                  width: 120
                }}
              />
              </View>
              <Text
                 style={{
                  fontSize:12,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#156235"
                }}

              >
              Republic Of Uganda
              </Text>
           
              <Text
                style={{
                  marginVertical: 6,
                  fontWeight: "bold",
                  fontSize:13,
                  color: "#156235"
                }}
              >
              National Wetland Information System
              </Text>
            </View>

            <DrawerItemList {...props} />
            <View
              style={{
                height: 100,
                width: "100%",
                justifyContent: "center",
                borderTopColor: "#f4f4f4",
                borderTopWidth: 1,
              }}
            >
              <Image
                source={WiseLogooo}
                style={{
                  height:120,
                  width: 160,
                  marginTop:80,
                  marginLeft:25
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f7ffff",
          width: 280,
        },
        headerStyle: {
          backgroundColor: "#0D47a4",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >

<Drawer.Screen
        name="Dashboard"
        options={{
          // headerTitleAlign:'center',
          headerTitle:()=>
          {
            return(
              <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}> Dashboard</Text>
            )
           
          },
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: () => (
            <Ionicons name="home" size={20} color="#808080" />
          ),
          headerRight: () => (
            <Image
              source={WiseLogooo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={Dashboard}
      />

        {/* <Drawer.Screen
        name="Inspection"
        options={{
          drawerLabel: "Inspection",
          title: "Inspection",
          drawerIcon: () => (
            <MaterialCommunityIcons name="tablet-dashboard" size={20} color="#808080" />
          ),
          headerTitleAlign:'center',
          headerTitle:()=>
          {
            return(
              <View >
              <Text style={{color:'#fff',fontWeight:'bold',textAlign:'center',fontSize:10}}>WETLANDS MANAGEMENT DEPARTMENT</Text>
              <Text style={{color:'#fff',fontWeight:'bold',textAlign:'center',fontSize:10}}>Wetland Site Inspection Form</Text>
              </View>
            )
           
          },
          headerRight: () => (
            <Image
              source={WiseLogo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={BottomNavigations}
      /> */}
      
    
      <Drawer.Screen
        name="Logout"
        options={{
          headerTitle:()=>
          {
            return(
              <Text style={{color:'#fff',fontWeight:'bold',fontSize:17,marginRight:20}}>Logout</Text>
            )
           
          },
          drawerLabel: "Logout",
          title: "Logout",
          drawerIcon: () => (
            <AntDesign name="logout"  size={20} color="#808080" />
          ),
        }}
        component={Logout}
      />
      
    </Drawer.Navigator>
 
  );
};

export default DrawerNavigator;
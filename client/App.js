import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import SettingsScreen from "./Set";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import LoginScreen from "./Login";
import AddExpenseScreen from "./Addexp";
import HomeScreen from "./screens/Homescreen";
import ProfileScreen from "./screens/Profilescreen";
import { AuthProvider } from "./Authcontext";
import { useAuth } from "./Authcontext";
import StatsScreen from "./screens/Statsscreen";
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#04293A",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'chart-bar' : 'chart-bar';
          }


          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
      {/* <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
        }}
        
      /> */}
       
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: 'stats',
        }}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  const {user} = useAuth();  
  useEffect(() => {
    // This effect will run whenever the authentication state changes (user logs in or out)
    console.log('Authentication state changed. User:', user);
  }, [user]); 

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#04293A",
          },
          headerShown: false,
          headerLeft: () => (
            <MaterialCommunityIcons
              name="menu"
              size={30}
              color="#fff"
              style={{ marginLeft: 10 }}
              onPress={() => {
              }}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="bell"
              size={30}
              color="#fff"
              style={{ marginRight: 10 }}
              onPress={() => {
              }}
            />
          ),
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </>
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
  
        <Stack.Screen
          name="AddExpenseScreen"
          component={AddExpenseScreen}
          options={{
            title: 'Add Expense',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
        };  

const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};


export default AppWrapper;





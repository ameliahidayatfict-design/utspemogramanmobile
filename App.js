
import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Cart from './screens/Cart';
import ProductDetail from './screens/ProductDetail';
import Settings from './screens/Settings';
import About from './screens/About';

// Menggunakan satu CartContext dari folder utama
import { CartProvider, useCart } from './CartContext';

// Membuat Navigator
const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// STACK NAVIGATION
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          title: 'Detail Produk',
        }}
      />
    </Stack.Navigator>
  );
}

// TAB NAVIGATION
function MainTabs() {
  const { cart } = useCart();

  // Menghitung jumlah produk dalam keranjang
  const totalItems = cart.reduce(
    (total, item) => total + (item.jumlah || 1),
    0
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2864E8',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 62,
          paddingTop: 5,
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          tabBarBadge:
            totalItems > 0 ? totalItems : undefined,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// DRAWER NAVIGATION
function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: 'bold',
        },
        headerTintColor: '#222222',
        drawerActiveTintColor: '#2864E8',
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={MainTabs}
        options={{
          title: 'Beranda',
          drawerLabel: 'Beranda',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Pengaturan',
          drawerLabel: 'Pengaturan',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="About"
        component={About}
        options={{
          title: 'Tentang Aplikasi',
          drawerLabel: 'Tentang Aplikasi',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// APLIKASI UTAMA
export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen
            name="Login"
            component={Login}
          />

          <RootStack.Screen
            name="Main"
            component={MainDrawer}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

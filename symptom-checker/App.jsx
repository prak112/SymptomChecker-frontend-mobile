/**
 * Node modules
 */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

/**
 * Components
 */
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * Screens
 */
import Home from './screens/Home';
import Profile from './screens/Profile';
import History from './screens/History';
import FAQs from './screens/FAQs';


// Create navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator Component
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
      }}
    >
      <Drawer.Screen 
        name="HomeStack" 
        component={HomeStackNavigator}
        options={{ 
          title: 'Home',
          drawerLabel: 'Home'
        }} 
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile}
        options={{ 
          drawerLabel: 'User Profile'
        }} 
      />
      <Drawer.Screen 
        name="History" 
        component={History}
        options={{ 
          drawerLabel: 'Search History'
        }} 
      />
      <Drawer.Screen 
        name="FAQs" 
        component={FAQs}
        options={{ 
          drawerLabel: 'FAQs'
        }} 
      />
    </Drawer.Navigator>
  );
}

// Stack Navigator Component
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ 
          headerShown: false, // Hide header for Home screen as Drawer header will be shown
          cardStyle: {
            backgroundColor: '#beeced',
          }
        }} 
      />
      {/* Stack screens to add here */}
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <DrawerNavigator />
        <Footer />
      </NavigationContainer>
    </PaperProvider>
  );
}


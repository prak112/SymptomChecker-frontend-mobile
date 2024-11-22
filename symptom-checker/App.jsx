/**
 * Node modules
 */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Components
 */
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Screens
 */
import Home from './screens/Home';
import Profile from './screens/Profile';
import History from './screens/History';
import FAQs from './screens/FAQs';
import LogoutModal from './screens/auth/LogoutModal';
import AuthenticationModal from './screens/auth/AuthenticationModal';

/**
 * Context
 */
import { UserContext, UserProvider } from './contexts/UserContext';
import { invalidateUserSession } from './api/auth';


// Create navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Modal Wrapper
function ModalWrapper({ route }) {
  const navigation = useNavigation()
  const [showAuth, setShowAuth] = useState(true)
  const [showLogout, setShowLogout] = useState(true)

  // toggle modal visibility
  useEffect(() => {
    switch (route.name) {
      case 'Login':
        setShowAuth(true);
        setShowLogout(false);
        break;
      case 'Logout':
        setShowLogout(true);
        setShowAuth(false);
        break;
      case 'Home':
      default:
        setShowLogout(false);
        setShowAuth(false);
        break;
    }
  }, [route.name]);

  const handleAuthModal = () => {
    setShowAuth(false);
    navigation.navigate('Home');
    console.log('AuthModal Visible status : ', showAuth)
  };

  const handleLogoutModal = () => {
    setShowLogout(false);
    navigation.navigate('Home');
    console.log('LogoutModal Visible status : ', showLogout)
  };


  if(route.name === 'Login') {
    return (
      <AuthenticationModal
        visible={showAuth}
        hideModal={handleAuthModal}
      />
    )
  } else if(route.name === 'Logout') {
    return (
      <LogoutModal
        visible={showLogout}
        hideModal={handleLogoutModal}
      />
    )
  }

  return null;
}


// Drawer Navigator Component
function DrawerNavigator({ modalVisible, handleModal }) {
  const { user } = useContext(UserContext);

  return (
    // <UserProvider>
      <Drawer.Navigator
        screenOptions={{
          header: () => <Header />,
          drawerStyle: {
            backgroundColor: '#bcd',
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
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen 
          name="History" 
          component={History}
          options={{ 
            drawerLabel: 'Search History'
          }} 
        />
        <Drawer.Screen name="FAQs" component={FAQs} />
        {/* Auth screens */}
        {!user ? (
          <Drawer.Screen name="Login" component={ModalWrapper} />
        ) : (
          <Drawer.Screen name="Logout" component={ModalWrapper} />
        )}
      </Drawer.Navigator>
    // </UserProvider>
  );
}

// Stack Navigator Component
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ 
          headerShown: false, // Hide header for Home screen as Drawer Navigator is opened
          cardStyle: {
            backgroundColor: '#beeced',
          }
        }} 
      />
      <Stack.Screen 
        name="Login" 
        component={ModalWrapper} 
        options={{ 
          headerShown: false, // Hide header for Home screen as Drawer Navigator is opened
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
  const { user, setUser } = useContext(UserContext);

  // retrieve authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('authenticatedUser')
        if (user) {
          console.log('User context value set. Username : ', user.username)
          setUser(user)
        }
      } catch (error) {
        console.error('Error fetching user data : ', error)
        setUser(null)
      }
    }
    fetchUser()
  }, []);


  return (
    <SafeAreaView style={styles.container}>
        <PaperProvider>
          <ErrorBoundary>
            <UserProvider>
              <NavigationContainer>
                <View style={styles.content}>
                  <StatusBar style="auto" />
                  <DrawerNavigator />
                </View>
                <Footer />
              </NavigationContainer>
            </UserProvider>
          </ErrorBoundary>
        </PaperProvider>
    </SafeAreaView>
  );
}

/**
 * Styles for App
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 200, // prevent content from being hidden behind footer
  }
});

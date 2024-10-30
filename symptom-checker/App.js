/**
 * Node modules
 */
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Context Providers
 */
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

/**
 * Components and Screens 
 */
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';


/**
 * Styles - App <View />
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEB50', // Zinc yellow color
    alignItems: 'center',
    justifyContent: 'flex-start',
    // pointerEvents: 'box-only',
  },
});

/**
 * The main App component that sets up the application's structure.
 * It includes a header, home content, and footer within a navigation container.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
  };

  return (
    <PaperProvider>
      <NavigationContainer>
      <StatusBar />
        <View style={ styles.container }>
          <Header toggleDrawer={toggleDrawer} />
          <Home />
          <Footer />
        </View>
      </NavigationContainer>
    </PaperProvider>

  );
}

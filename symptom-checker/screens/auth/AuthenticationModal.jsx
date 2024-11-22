/**
 * Node modules
 */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { 
  Modal, 
  Portal, 
  Text, 
  TextInput, 
  Button, 
  Surface,
  Icon,
  IconButton 
} from 'react-native-paper';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Context
 */
import { UserContext } from '@/contexts/UserContext';

/**
 * API service calls
 */
import { 
  createGuestUser, 
  registerUser, 
  authenticateUser, 
} from '@/api/auth';
import { useNavigation } from '@react-navigation/native';




/**
 * AuthenticationModal component renders a modal for user authentication.
 * It allows users to switch between login and sign-up forms.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.visible - Determines if the modal is visible.
 * @param {Function} props.hideModal - Function to hide the modal.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function AuthenticationModal({ visible, hideModal }) {
  const { setUser } = useContext(UserContext)
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation()

  // handle user auth events
  const handleSubmit = async() => {
    isLogin 
      ? await handleAuthentication()
      : await handleRegistration()
  }

  // user logs in to the service
  const handleAuthentication = async() => {
    try {
      const authorizedUser = await authenticateUser(credentials)
      await AsyncStorage.setItem('authenticatedUser', authorizedUser)
      setUser(authorizedUser)
      console.log('Authenticated User : ', authorizedUser)
      navigation.navigate('Home')
      hideModal()
    } catch (error) {
      console.error('Error during authentication:', error);
      Alert.alert('Authentication Error', error.message)
      throw error;
    }
  }

  // user signs up for the service
  const handleRegistration = async() => {
    try {
      if(credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const registeredUser = await registerUser({
        username: credentials.username,
        password: credentials.password
      });
      console.log('Registered User : ', registeredUser)
      navigation.navigate('Login')
      hideModal()
    } catch (error) {
      console.error('Error during registration : ', error)
      throw error;
    }
  }

  // guest user auto-registered and auto-authenticated
  const handleGuestLogin = async() => {
    const guestUser = await createGuestUser()
    await AsyncStorage.setItem('authenticatedUser', guestUser)
    setUser(guestUser)
    navigation.navigate('Home')
    hideModal()
  }


  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Surface style={styles.surface}>            
            <Text variant="headlineMedium" style={styles.title}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>

            <TextInput
              label="Username"
              value={credentials.username}
              onChangeText={(text) => setCredentials({ ...credentials, username: text })}
              mode="outlined"
              autoCapitalize="none"
              autoComplete='off'
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={credentials.password}
              onChangeText={(text) => setCredentials({ ...credentials, password: text })}
              mode="outlined"
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye' : 'eye-off'}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
              autoComplete='off'
              style={styles.input}
            />

            {!isLogin && (
              <TextInput
                label="Confirm Password"
                value={credentials.confirmPassword}
                onChangeText={(text) => 
                  setCredentials({ ...credentials, confirmPassword: text })
                }
                mode="outlined"
                secureTextEntry={secureTextEntry}
                right={
                  <TextInput.Icon
                    icon={secureTextEntry ? 'eye' : 'eye-off'}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  />
                }
                style={styles.input}
              />
            )}

            {/* Data disclaimer */}
            <Text style={styles.disclaimerText}>
              <Icon
                  source="shield-lock-outline"
                  size={24}
                  color="#666"
              />
                All your data is always end-to-end encrypted.
            </Text>
            
            {/* Auth buttons */}
            <Button 
              mode="contained" 
              onPress={handleSubmit}
              style={styles.submitButton}
              icon={isLogin ? "account-check-outline" : "account-arrow-right-outline"}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>

            <Button 
              mode="text" 
              onPress={() => setIsLogin(!isLogin)}
              style={styles.switchButton}
            >
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Login"}
            </Button>

            <Button
              mode="contained"
              onPress={handleGuestLogin}
              style={styles.guestButton}
              icon="account-clock-outline"
            >
              Continue As Guest
            </Button>
            
          </Surface>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}


/**
 * Styles
 */
const screenWidth = Dimensions.get('screen')

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'space-around',
    padding: 40,
    maxWidth: screenWidth * 0.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  surface: {
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  disclaimerText: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#666',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 16,
  },
  switchButton: {
    marginTop: 8,
  },
  guestButton: {
    marginTop: 8,
    backgroundColor: '#a16ce6'
  }
});


AuthenticationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};
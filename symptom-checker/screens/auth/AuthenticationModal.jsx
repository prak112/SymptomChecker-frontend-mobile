/**
 * Node modules
 */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Modal, 
  Portal, 
  Text, 
  TextInput, 
  Button, 
  Surface,
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
  invalidateUserSession 
} from '@/api/auth';


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
    // email: '',
    password: '',
    confirmPassword: ''
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // handle user auth events
  const handleSubmit = async() => {
    isLogin 
      ? await handleAuthentication()
      : await handleRegistration()
  }

  const handleRegistration = async() => {
    try {
      if(credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      await registerUser({
        username: credentials.username,
        password: credentials.password
      });
    } catch (error) {
      console.error('Error during registration : ', error)
      throw error;
    }
  }

  const handleAuthentication = async() => {
    try {
      const authorizedUser = await authenticateUser(credentials)
      //setUser
      await AsyncStorage.setItem('authenticatedUser', authorizedUser.username)
      setUser(authorizedUser.username)
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    }
  }

  const handleGuestLogin = async() => {
    createGuestUser()
    hideModal()
  }

  const handleLogout = async() => {
    invalidateUserSession()
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

            {/* {!isLogin && (
              <TextInput
                label="Email"
                value={credentials.email}
                onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            )} */}

            <TextInput
              label="Username"
              value={credentials.username}
              onChangeText={(text) => setCredentials({ ...credentials, username: text })}
              mode="outlined"
              autoCapitalize="none"
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
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
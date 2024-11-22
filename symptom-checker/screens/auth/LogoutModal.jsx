/**
 * Node modules
 */
import React, { useContext, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { 
    Modal, 
    Portal, 
    Text, 
    Button, 
    Surface,
    Icon, 
    Divider
} from 'react-native-paper';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// context
import { UserContext } from '@/contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { invalidateUserSession } from '@/api/auth';

/**
 * LogoutModal component for the mobile application.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {Function} props.hideModal - Function to hide the modal
 * 
 * @returns {JSX.Element} The LogoutModal component
 */
export default function LogoutModal({ visible, hideModal }) {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);

    /**
     * Clears local storage, call server endpoint to clear JWT cookie. 
     * In UserContext, reset user state and redirect to 'Home'.
     */
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authenticatedUser');
            await invalidateUserSession();
            setUser(null)
            hideModal()
            navigation.navigate('Home')
            console.log('logout successful')
            // alert notification
        } catch (error) {
            console.error('Error during logout:', error);
            // alert notification
        }
    };

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
                            Confirm Logout
                        </Text>

                        {/* Data disclaimer */}
                        <Text style={styles.disclaimerText}>
                            <Icon
                                source="shield-lock-outline"
                                size={24}
                                color="#666"
                            />
                            All your data is always end-to-end encrypted.
                        </Text>

                        <Divider />

                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                onPress={handleLogout}
                                style={styles.logoutButton}
                                icon="logout"
                            >
                                Logout
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={hideModal}
                                style={styles.cancelButton}
                            >
                                Cancel
                            </Button>
                        </View>

                    </Surface>
                </KeyboardAvoidingView>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        margin: 20,
    },
    surface: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    title: {
        marginBottom: 16,
        color: '#d32f2f', // dark red color
        textAlign: 'center',
    },
    disclaimerText: {
        textAlign: 'center',
        marginVertical: 16,
        color: '#666',
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
        marginTop: 16,
    },
    logoutButton: {
        backgroundColor: '#d32f2d',
    },
    cancelButton: {
        borderColor: '#666',
        backgroundColor: '#343111'
    },
});

LogoutModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
};

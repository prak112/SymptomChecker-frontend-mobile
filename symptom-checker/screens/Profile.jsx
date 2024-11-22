/**
 * Node modules
 */
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';

/**
 * Context
 */
import { UserContext } from '@/contexts/UserContext';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


/**
 * Profile screen renders user information.
 */
export default function Profile() {
    const { user } = useContext(UserContext)
    const navigation = useNavigation()

    const handleRedirect = () => {
        if (user && user.username) {
            navigation.navigate('Logout')
        } else {
            navigation.navigate('Login')
        }
    }

    return(
        <View style={styles.container}>
            <Text>
                Welcome! <br/>
                Username : { user ? user.username : 'Not logged in' } <br/>
                Joined on : { user ? user.registrationTime : 'Not logged in' }
            </Text>
           <Button 
                mode="contained" 
                onPress={handleRedirect}
                style={user ? styles.logoutButton : styles.loginButton}
                icon={user ? "logout" : "login"}
            >
                {user ? 'Logout' : 'Login'}
            </Button>
        </View>
    )
}

/**
 * Styles
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#beed', 
        flex: 1, 
        justifyContent: 'space-around',
        alignItems: 'center', 
    },
    loginButton: {
        marginTop: 16,
    },
    logoutButton: {
        backgroundColor: '#d32f2d',
    },
})

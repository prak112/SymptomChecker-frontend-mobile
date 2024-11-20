/**
 * Node modules
 */
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';

/**
 * Context
 */
import { UserContext } from '@/contexts/UserContext';


/**
 * Profile screen renders user information.
 */
export default function Profile() {
    const { user } = useContext(UserContext)
    return(
        <View style={styles.container}>
            <Text>
                Welcome! <br/>
                Username : { user ? user.username : 'Not logged in' } <br/>
                Joined on : { user ? user.registrationTime : 'Not logged in' }
            </Text>
        </View>
    )
}

/**
 * Styles
 */
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'space-around',
        alignItems: 'center', 
    }
})

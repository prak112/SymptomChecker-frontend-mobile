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
                User information goes here!
                Username : { user.toUpperCase() }
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

/**
 * Node modules
 */
import { View, Text, StyleSheet } from 'react-native';

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

/**
 * Profile screen renders user information.
 */
export default function Profile() {
    return(
        <View style={styles.container}>
            <Text>
                User information goes here!
            </Text>
        </View>
    )
}
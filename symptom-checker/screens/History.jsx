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
 * History screen renders user history with symptoms searched and its related top diagnosis.
 */
export default function Profile() {
    return(
        <View style={styles.container}>
            <Text>
                User History goes here!
            </Text>
        </View>
    )
}
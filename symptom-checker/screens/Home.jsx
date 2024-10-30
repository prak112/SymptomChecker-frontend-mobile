/**
 * Node modules
 */
import { View, Text } from "react-native";


/**
 * Styles - Home
 */
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'space-around' 
    }
})

/**
 * Home component renders the main view for the home screen.
 */
export default function Home() {
    return (
        <View style={styles.container}>
            <Text>
                Symptom Form goes here!
            </Text>
        {/* <SymptomForm /> */}
        </View>
    );
  }
  
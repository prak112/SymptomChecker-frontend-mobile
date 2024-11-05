/**
 * Node modules
 */
import { View, Text, StyleSheet } from "react-native";

/**
 * Screens
 */
import SymptomForm from "./SymptomForm";

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
 * Home screen renders the main view for the home screen.
 */
export default function Home() {
    return (
        <View style={styles.container}>
            <SymptomForm />
        </View>
    );
  }
  
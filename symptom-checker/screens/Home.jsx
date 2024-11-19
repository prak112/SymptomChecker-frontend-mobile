/**
 * Node modules
 */
import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

/**
 * Screens
 */
import SymptomForm from "./SymptomForm";
import AuthenticationModal from "./auth/AuthenticationModal";
import ErrorBoundary from "@/components/ErrorBoundary";


/**
 * Home component renders the main screen of the application.
 * It includes a button to show the authentication modal and symptom form.
 */
export default function Home() {
    const [showAuth, setShowAuth] = useState(true)
    const handleHideModal = () => setShowAuth(false)
    
    return (
        <ErrorBoundary>
            <View style={styles.container}>
                <AuthenticationModal 
                    visible={showAuth}
                    hideModal={handleHideModal}
                />
                <SymptomForm />
            </View>
        </ErrorBoundary>
    );
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
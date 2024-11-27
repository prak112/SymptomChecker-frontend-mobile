import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

export default function WaitingDiagnosis({ handleReturn }) {
    return (
        <View style={styles.outerBox}>
            <View style={styles.centeredDiv}>
                <Text style={styles.title}>Communicating with ICD API...</Text>
                <ActivityIndicator color="purple" />
                <Text style={styles.body}>Loading results...</Text>
                <ScrollView>
                    <Text style={styles.listItem}>General Assessment ~15-30 secs</Text>
                    <Text style={styles.listItem}>Specific Assessment ~1-2secs</Text>
                    <Text style={styles.listItem}>General Panel ~30-45secs</Text>
                    <Text style={styles.listItem}>Specific Panel ~1-5secs</Text>
                </ScrollView>
                <Button 
                  mode="outlined"
                  buttonColor="#FA8072"
                  textColor="#fff"
                  onPress={handleReturn}
                >
                  Cancel
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredDiv: {
        paddingTop: 20,
        margin: '0 auto'
    },
    outerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '50%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    body: {
        fontSize: 16
    },
    listItem: {
        fontSize: 14,
        marginBottom: 10
    }
});

WaitingDiagnosis.propTypes = {
    handleReturn: PropTypes.func.isRequired
};
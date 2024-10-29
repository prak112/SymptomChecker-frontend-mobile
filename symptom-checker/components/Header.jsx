/**
 * Node Modules
 */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native';


const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Symptom Checker</Text>
            {/* <NavigationComponent />  - To Be Implemented*/} 
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    logo: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;
/**
 * Node Modules
 */
// import React, { useContext } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

// context
// import { UserContext } from '../contexts/UserContext';

// Adjust responsiveness with DimensionAPI
const { width: screenWidth } = Dimensions.get('window')
const scale = screenWidth / 375; // Base width for scaling

/**
 * Styles - Header
 */
/**
 * Determines the title size based on the screen width.
 *
 * @returns {number} The font size for the title.
 */
const getTitleSize = () => {
    if (screenWidth < 360) return 16;
    if (screenWidth < 400) return 18;
    if (screenWidth < 600) return 20;
    return 32;
};

const styles = StyleSheet.create({
    header: {
        width: screenWidth,
        elevation: 4,
        backgroundColor: '#100',
        gap: 8,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleText: {
        fontSize: getTitleSize(),
        color: "#87CEEB" // Sky blue
    },
    avatar: {
        backgroundColor: '#FFF',
    }
});


/**
 * Header component for the mobile application.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.toggleDrawer - Function to toggle the navigation drawer
 * @returns {JSX.Element} The Header component
 */
export default function Header() {
    const navigation = useNavigation();
    const route = useRoute();
    //   const { user } = useContext(UserContext);
    const user = null

    return (
        <Appbar.Header style={styles.header}>
            {/* Show menu button if drawer can be opened */}
            {navigation.canGoBack() ? (
                <Appbar.BackAction 
                    onPress={() => navigation.goBack()} 
                    testID="menu-button"
                />
            ) : (
                <Appbar.Action
                    icon="menu"
                    onPress={() => navigation.openDrawer()}
                    testID="menu-button"
                />
            )}

            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />

            <Appbar.Content
                title="Symptom Checker"
                titleStyle={styles.titleText}                
                style={styles.title}
            />

            {user?.username ? (
                <Appbar.Action
                    icon={({ size, color }) => (
                        <Avatar.Text
                            size={size}
                            label={user.username[0].toUpperCase()}
                            style={styles.avatar}
                        />
                    )}
                    onPress={() => navigation.navigate('Profile')}
                    testID="profile-button"
                />
            ) : (
                <Appbar.Action
                    icon="account"
                    onPress={() => navigation.navigate('Profile')}
                    testID="profile-button"
                />
            )}
        </Appbar.Header>
    );
}



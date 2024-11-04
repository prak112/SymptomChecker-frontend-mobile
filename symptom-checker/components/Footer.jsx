/**
 * Node modules
 */
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


/**
 * Styles - Footer and content
 */
const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f5f5f5',
    padding: 16,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  disclaimerSection: {
    marginBottom: 16,
  },
  disclaimerTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  disclaimerText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
  },
  authorSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

/**
 * Footer component for the mobile application.
 * 
 * @returns {JSX.Element} The Footer component
 */
export default function Footer() {
  const handleGitHubPress = () => {
    Linking.openURL('https://github.com/prak112/ICD11-SymptomChecker');
  };

  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <View style={styles.disclaimerSection}>
        <Text style={styles.disclaimerTitle}>DISCLAIMER</Text>
        <Divider />

        <Text style={styles.disclaimerText}>
          This is a work-in-progress project. This tool can produce false results.
          It is intended for informational and learning purposes only.
          It is not a substitute for professional medical advice, diagnosis or treatment.
          If you think you may have a medical emergency, immediately call your doctor or dial 112.
        </Text>
      </View>

      <Divider />

      <View style={styles.authorSection}>
        <Icon 
          name="github" 
          size={32} 
          color="#000"
          onPress={handleGitHubPress}
        />
        <Text style={styles.copyrightText}>
          Copyright © {currentYear} ICD Symptom Checker | Prakirth Govardhanam
        </Text>
      </View>
      
      <Divider />
    </View>
  );
}



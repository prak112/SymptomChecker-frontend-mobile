/**
 * Node modules
 */
import { View, Text, StyleSheet, ScrollView } from 'react-native';


/**
 * Styles
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#beed',
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    faqItem: {
        marginBottom: 20,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    answer: {
        fontSize: 14,
        marginTop: 5,
        textAlign: 'justify'
    },
});


/**
 * FAQs screen renders a list of frequently asked questions and their answers.
 * 
 * @returns {JSX.Element} A ScrollView containing FAQ items.
 */
export default function FAQs() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Frequently Asked Questions</Text>
            <View style={styles.faqItem}>
                <Text style={styles.question}>Q: What is Symptom Checker?</Text>
                <Text style={styles.answer}>A: Symptom Checker is a tool (<em>check the Disclaimer below</em>) that helps you understand your symptoms and find potential diagnosis.</Text>
            </View>
            <View style={styles.faqItem}>
                <Text style={styles.question}>Q: How do I use Symptom Checker?</Text>
                <Text style={styles.answer}>A: Simply enter your symptoms and select the type of diagnosis you prefer to get a list of possible conditions.</Text>
            </View>
            {/* Add more FAQs as needed */}
        </ScrollView>
    );
};


/**
 * Node modules
 */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
    Card, TextInput, Button, Chip, Text, Searchbar,
    List, Portal, Dialog, HelperText, Icon, IconButton
} from 'react-native-paper';

/**
 * Service functions
 */
import { getGeneralDiagnosis, getSpecificDiagnosis } from '@/api/symptoms'

/**
 * Components
 */
import WaitingDiagnosis from './WaitingDiagnosis';
import Diagnosis from './Diagnosis';


/**
 * SymptomForm screen allows users to input, search, and manage symptoms.
 * It also provides functionality to submit symptoms for diagnosis.
 *
 * @function
 * @name SymptomForm
 *
 * @description
 * This component includes:
 * - Input field for adding symptoms.
 * - Search bar for searching symptoms.
 * - Display of added symptoms as chips.
 * - Sections for general and specific assessments.
 * - Button to submit symptoms for diagnosis.
 * - Display of diagnosis results.
 *
 * @state {Array} symptoms - List of added symptoms.
 * @state {string} inputSymptom - Current input value for a new symptom.
 * @state {string} searchQuery - Current search query for symptoms.
 * @state {Array} searchResults - List of search results for symptoms.
 * @state {boolean} showSearch - Flag to show or hide the search results dialog.
 * @state {Object|null} diagnosis - Diagnosis result from the API.
 *
 * @function handleAddSymptom - Adds a new symptom to the list.
 * @function handleRemoveSymptom - Removes a symptom from the list.
 * @function onChangeSearch - Handles changes to the search query.
 * @function handleDiagnose - Submits symptoms for diagnosis and sets diagnosis result.
 */
export default function SymptomForm() {
    const [symptoms, setSymptoms] = useState([]);
    const [inputSymptom, setInputSymptom] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [diagnosis, setDiagnosis] = useState(null);
    const navigation = useNavigation()
    const inputRef = useRef(null)

    // Autofocus cursor in TextInput
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    // Symptom assessment types
    const assessmentTypeButtons = {
        GeneralAssessment : ' Multiple diagnosis for each symptom',
        SpecificAssessment : ' Top diagnosis (scored by ICD) for each symptom',
        GeneralPanel : ' Multiple consolidated diagnosis for all symptoms',
        SpecificPanel : ' Top consolidated diagnosis (scored by ICD) for all symptoms',
    }

    // Handle adding a new symptom
    const handleAddSymptom = () => {
        inputSymptom.trim()
        setSymptoms([...symptoms, inputSymptom.trim()])
        setInputSymptom('')
    };

    // Handle removing a symptom
    const handleRemoveSymptom = (symptomToRemove) => {
        setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
    };

    // Handle search query changes
    const onChangeSearch = (query) => {
        setSearchQuery(query);
        // Implement search logic here
        // This should filter through predefined symptoms list
        // or make an API call to get matching symptoms
    };

    // Handle redirection to FAQs screen
    const handleInfoButton = () => {
        navigation.navigate('FAQs');
    }

    // Handle diagnosis submission
    const handleDiagnose = async (diagnosisType) => {
        try {
            let diagnosisData = []
            diagnosisType = diagnosisType.toLowerCase()
            setIsLoading(true)

            const symptomsPayload = {
                symptoms: symptoms,
                analysis: diagnosisType
            }
            console.log('Diagnosis type : ', diagnosisType.toLowerCase())
            console.log('User Symptoms : ', symptoms)

            if(diagnosisType.includes('general')) {
                diagnosisData = await getGeneralDiagnosis(symptomsPayload)
                console.log('General Diagnosis data : ', diagnosisData)
            }
            if(diagnosisType.includes('specific')) {
                diagnosisData = await getSpecificDiagnosis(symptomsPayload)
                console.log('Specific Diagnosis data : ', diagnosisData)
            }
            setDiagnosis(diagnosisData);

            setTimeout(() => {
                setIsLoading(false)
                setSubmitted(true)
            }, 2000)

        } catch (error) {
            console.error('Error recieving diagnosis:', error);
        }
    };

    const returnSymptomForm = () => {
        setIsLoading(false);
        setSubmitted(false);
        navigation.navigate('Home')
    }

    /**
     * Conditional rendering of <Waiting /> or <Diagnosis /> or <SymptomForm />
     */
    if(isLoading) {
        console.log('Render loading screen...');
        return <WaitingDiagnosis handleReturn={returnSymptomForm}/>
    }

    if(submitted) {
        console.log('Render Diagnosis screen...');
        return (
            <ScrollView style={styles.container}>
            {diagnosis.map((diagnosisBySymptom, index) => 
                <Card key={index} style={styles.diagnosisCard}>
                    <Diagnosis 
                        data={diagnosisBySymptom} 
                        handleReturn={returnSymptomForm} 
                    />
                </Card>
            )}
            </ScrollView>
        )
    }

    console.log('Rendering SymptomForm screen...')
    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    {/* Symptom Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={inputRef}
                            mode="outlined"
                            label="Enter symptom"
                            value={inputSymptom}
                            onChangeText={(inputSymptom) => setInputSymptom(inputSymptom)}
                            onSubmitEditing={handleAddSymptom}
                            style={styles.input}
                            returnKeyType="done"
                            blurOnSubmit={false}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Symptom Search */}
                    {/* <Searchbar
                        placeholder="Search symptoms"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchBar}
                        onFocus={() => setShowSearch(true)}
                    /> */}

                    {/* Symptom Chips */}
                    <View style={styles.chipContainer}>
                        {symptoms.map((symptom, index) => (
                            <Chip
                                key={index}
                                onClose={() => handleRemoveSymptom(symptom)}
                                style={styles.chip}
                            >
                                {symptom}
                            </Chip>
                        ))}
                    </View>

                    <Text variant="titleLarge" style={styles.title}>
                        Choose diagnosis type
                    </Text>
                    {/* Assessment Sections */}
                    <View style={styles.assessmentContainer}>
                        {Object.entries(assessmentTypeButtons).map(([type, description]) => (
                            <Card key={type} style={styles.assessmentCard}>
                            <Button
                                key={type}
                                buttonColor='#c299f2'
                                textColor='#2c1154'
                                onPress={() => handleDiagnose(type)}
                                style={styles.assessmentCard}
                            >
                                {type}  
                            </Button>
                            <HelperText
                                type='info'
                            >
                                <IconButton
                                    icon="information"
                                    mode="contained"
                                    size={16}
                                    iconColor='#6fd1b2'
                                    onPress={handleInfoButton}
                                />
                                {description}
                            </HelperText>
                            </Card>
                        ))}
                    </View>
                </Card.Content>
            </Card>

            {/* Search Results Dialog */}
            {/* <Portal>
                <Dialog visible={showSearch} onDismiss={() => setShowSearch(false)}>
                    <Dialog.Content>
                        {searchResults.map((result, index) => (
                            <List.Item
                                key={index}
                                title={result}
                                onPress={() => {
                                    setSymptoms([...symptoms, result]);
                                    setShowSearch(false);
                                    setSearchQuery('');
                                }}
                            />
                        ))}
                    </Dialog.Content>
                </Dialog>
            </Portal> */}
        </ScrollView>
    );
}

/**
 * Styles
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        padding: 32,
    },
    card: {
        marginBottom: 16,
    },
    title: {
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 8,
    },
    searchBar: {
        marginBottom: 16,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    chip: {
        margin: 4,
    },
    assessmentContainer: {
        marginBottom: 16,
    },
    assessmentCard: {
        textAlign: 'center',
        padding: 16,
        marginBottom: 8,
    },
    diagnoseButton: {
        marginTop: 16,
    },
    diagnosisCard: {
        marginTop: 16,
    },
});
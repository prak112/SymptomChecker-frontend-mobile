/**
 * Node modules
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';

/**
 * Components
 */
import TopDiagnosis from './TopDiagnosis';
import OtherDiagnosis from './OtherDiagnosis';


/**
 * Renders a Diagnosis component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The diagnosis data.
 * @param {Function} props.handleReturn - The function to handle returning.
 * @returns {JSX.Element} The rendered Diagnosis component.
 */
export default function Diagnosis({ data, handleReturn }) {
  const symptom = data.symptom;
  const topResult = data.topResult;
  const includedResults = data.includedResults;
  const excludedResults = data.excludedResults;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text variant="titleMedium">{symptom}</Text>
        <br/>
        <TopDiagnosis 
          label={topResult.label}
          score={topResult.score}
          detail={topResult.detail}
          url={topResult.url}  
        />
        <br/>
        <OtherDiagnosis 
          resultSet={!includedResults ? null : includedResults}
          title='Suggested Diagnosis' 
        />
        <br/>
        <OtherDiagnosis 
          resultSet={!excludedResults ? null : excludedResults} 
          title='Excluded Diagnosis'
        />
        <Button
          icon="arrow-left"
          mode="outlined"
          compact={true}
          onPress={handleReturn}
        >
          Check Again ?
        </Button>
        <Text style={styles.totalResults}>
          Total Results : {includedResults.label.length + excludedResults.label.length}
        </Text>
      </Card>
    </ScrollView>
  );
}

Diagnosis.propTypes = {
  data: PropTypes.shape({
    symptom: PropTypes.string.isRequired,
    topResult: PropTypes.object.isRequired,
    includedResults: PropTypes.object,
    excludedResults: PropTypes.object,
  }).isRequired,
  handleReturn: PropTypes.func.isRequired,
};

// Adjust responsiveness with DimensionAPI
const { width: screenWidth } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    padding: 32,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    marginBottom: '5vh',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: screenWidth * 0.9,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  totalResults: {
    display: 'flex', 
    justifyContent: 'flex-end',
  }
});
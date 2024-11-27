/**
 * Node modules
 */
import React from 'react';
import { Text, View, Linking } from 'react-native';
import { Button, Divider, Chip } from 'react-native-paper';
import PropTypes from 'prop-types';


export default function OtherDiagnosis({ resultSet, title }) {
    const [displayLimit, setDisplayLimit] = React.useState(5);
    const stripHtmlTags = (htmlString) => {
        return htmlString.replace(/<[^>]*>/g, '');
    };

    const showMore = () => {
        setDisplayLimit(prevLimit => prevLimit + 5);
    };
    const displayedResults = resultSet.label.slice(0, displayLimit);

    if(!resultSet) {
        return (
            <>
            <Text 
                variant="titleSmall"
                adjustsFontSizeToFit
                style={{ color: '#beed' }}
            >
                No Additional Diagnosis
            </Text>
            </>
        );
    }
    else {
        return (
            <>
            <Divider/>
                <Text 
                    variant="titleSmall"
                    adjustsFontSizeToFit
                    style={{ color: '#beed' }}
                >
                    {title}
                </Text>
            <Divider/>
            {displayedResults.map((label, index) => (
                <Chip 
                    key={index}
                    mode="outlined"
                    onPress={() => Linking.openURL(resultSet.url[index])}
                    icon="open-in-new"
                >
                    {`${stripHtmlTags(label)} : ${resultSet.score[index]}%`}
                </Chip>
                
            ))}
            {displayLimit < resultSet.label.length && (
                <Button
                    onPress={showMore}
                    mode="outline"
                    size="medium"
                    icon="chevron-down"
                />
            )}
            </>
        )
    }
};

OtherDiagnosis.propTypes = {
    resultSet: PropTypes.shape({
        label: PropTypes.array,
        score: PropTypes.array,
        url: PropTypes.array,
    }),
    title: PropTypes.string.isRequired,
};


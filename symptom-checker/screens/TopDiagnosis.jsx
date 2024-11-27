/**
 * Node modules
 */
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native-paper'
import { Linking, Dimensions, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function TopDiagnosis({ label, score, detail, url }) {
    const stripHtmlTags = (htmlString) => {
        return htmlString.replace(/<[^>]*>/g, '');
    };

    return (
        <View>
            <Text style={styles.label}>{stripHtmlTags(label)}</Text>
            <Text style={styles.score}>{score ? `${score}%` : null}</Text>
            <Text style={styles.detail}>{stripHtmlTags(detail)}</Text>
            <Button 
                mode="outlined" 
                icon="launch"
                compact={true}
                dark={false}
                size="medium"
                onPress={() => Linking.openURL(url)}
            >
                Read More
            </Button>
        </View>
    )
}

TopDiagnosis.propTypes = {
    label: PropTypes.string,
    score: PropTypes.number,
    detail: PropTypes.string,
    url: PropTypes.string
}

// Adjust responsiveness with DimensionAPI
const { width: screenWidth } = Dimensions.get('window')
const scale = screenWidth / 375; // Base width for scaling

// styles
const styles = {
    label: {
        fontSize: 16 * scale,
        fontWeight: 'bold',
        width: screenWidth * 0.8,
        ellipsizeMode: 'head'
    },
    score: {
        fontSize: 14 * scale,
        color: 'gray',
        width: screenWidth * 0.2,
        ellipsizeMode: 'middle'
    },
    detail: {
        fontSize: 12 * scale,
        color: 'darkgray',
        width: screenWidth * 0.8,
        ellipsizeMode: 'tail'
    }
};
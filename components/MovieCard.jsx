import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const MovieCard = ({ movie, onPress }) => {
    const { id, title, overview, poster_path, release_date } = movie;
    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <Card style={styles.card} onPress={() => onPress(id)}>
            <Card.Cover source={{ uri: posterUrl }} style={styles.cardCover} />
            <View style={styles.textOverlay}>
                <Title style={styles.title}>{title}</Title>
                <Paragraph style={styles.overview}>{truncateText(overview, 100)}</Paragraph>
                <Paragraph style={styles.releaseDate}>Release Date: {release_date}</Paragraph>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        height: 500,
        width: 350,
    },
    cardCover: {
        height: '100%',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    overview: {
        marginBottom: 10,
        color: 'white',
    },
    releaseDate: {
        fontStyle: 'italic',
        color: 'white',
    },
});

export default MovieCard;

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image, Button } from 'react-native';
import axios from 'axios';

const MovieDetailsScreen = ({ route, navigation }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { movieId } = route.params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: 'bc1250e71dfee020b4f147ad56240af9',
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Movie details could not be fetched.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <View style={styles.container}>
      <Text>{error}</Text>
      <Button title="Back to Movies" onPress={() => navigation.popToTop()} />
    </View>;
  }

  if (!movieDetails) {
    return <View style={styles.container}>
      <Text>Movie details are not available.</Text>
      <Button title="Back to Movies" onPress={() => navigation.popToTop()} />
    </View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.releaseDate}>Release Date: {movieDetails.release_date}</Text>
      <Text style={styles.rating}>Rating: {movieDetails.vote_average}</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
      <Button title="Back to Movies" onPress={() => navigation.popToTop()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  releaseDate: {
    fontSize: 16,
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    marginTop: 5,
  },
  overview: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default MovieDetailsScreen;

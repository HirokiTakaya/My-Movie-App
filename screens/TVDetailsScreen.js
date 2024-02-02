import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const TVDetailsScreen = ({ route, navigation }) => {
  const { tvId } = route.params;
  const [tvDetails, setTvDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvId}`, {
          params: { api_key: 'bc1250e71dfee020b4f147ad56240af9' } 
        });
        setTvDetails(response.data);
      } catch (error) {
        console.error('Error while fetching TV show details:', error);
        setError('Unable to fetch TV show details.');
        // Added logging for debugging
        console.log(error.response ? error.response.data : error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVDetails();
  }, [tvId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <View style={styles.errorContainer}><Text>{error}</Text></View>;
  }

  if (!tvDetails) {
    return <View style={styles.errorContainer}><Text>TV show details are not available.</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Button title="Back to TV List" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>{tvDetails.name}</Text>
      <Image style={styles.image} source={{ uri: `${IMAGE_BASE_URL}${tvDetails.poster_path}` }} />
      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={styles.description}>{tvDetails.overview}</Text>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  
});

export default TVDetailsScreen;

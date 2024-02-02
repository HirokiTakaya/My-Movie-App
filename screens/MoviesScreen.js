import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image, 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';


const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('now_playing');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/movie/${selectedCategory}`;
        const apiKey = "bc1250e71dfee020b4f147ad56240af9";
        const response = await axios.get(url, { params: { api_key: apiKey } });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flex: 1 }}>
          <ModalDropdown
            options={['Now Playing', 'Popular', 'Top Rated', 'Upcoming']}
            defaultValue="Select Category"
            onSelect={(index, value) => {
              setSelectedCategory(value.toLowerCase().replace(/\s+/g, '_'));
            }}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownDropdown}
          />
          <FlatList
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.movieItem}
                onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
              >
                <Image
                  source={{ uri: IMAGE_BASE_URL + item.poster_path }}
                  style={styles.movieImage}
                />
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                  <Text style={styles.movieDetail}>{item.release_date}</Text>
                  <Text style={styles.movieDetail}>Popularity: {item.popularity}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? 25 : 0, 
  },
  selectorContainer: {
    backgroundColor: '#fff', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdown: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 40, 
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownDropdown: {
    width: '90%',
    marginTop: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  movieItem: {
    flexDirection: 'row',
    backgroundColor: '#fff', 
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    elevation: 3, 
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  movieDetail: {
    fontSize: 14,
    color: '#666',
  },
});

export default MoviesScreen;
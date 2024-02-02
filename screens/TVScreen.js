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
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const TVScreen = () => {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('airing_today');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTVShows = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${selectedCategory}`, {
          params: { api_key: 'bc1250e71dfee020b4f147ad56240af9' } 
        });
        setTvShows(response.data.results);
      } catch (err) {
        console.error('Error fetching TV shows:', err);
        setError('There was an error retrieving TV shows.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShows();
  }, [selectedCategory]);

  const handleSelectCategory = (index, value) => {
    const categoryMap = {
      'Airing Today': 'airing_today',
      'On The Air': 'on_the_air',
      'Popular': 'popular',
      'Top Rated': 'top_rated'
    };
    setSelectedCategory(categoryMap[value]);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <ModalDropdown
            options={['Airing Today', 'On The Air', 'Popular', 'Top Rated']}
            defaultValue="Select Category"
            onSelect={handleSelectCategory}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownDropdown}
          />
          <FlatList
            data={tvShows}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('TVDetails', { tvId: item.id })}
                style={styles.itemContainer}
              >
                <Image
                  source={{ uri: IMAGE_BASE_URL + item.poster_path }}
                  style={styles.itemImage}
                />
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                 
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
  },
  itemContainer: {
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 2,
    elevation: 3, 
  },
  itemImage: {
    width: 100,
    height: 150,
    borderRadius: 5, 
    marginRight: 10, 
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center', 
  },
  itemText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
  },
  dropdown: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10, 
  },
  dropdownText: {
    fontSize: 16, 
    color: '#333', 
  },
  dropdownDropdown: {
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 10, 
    paddingHorizontal: 10, 
  },
  error: {
    fontSize: 16, 
    color: 'red', 
    textAlign: 'center', 
    margin: 10, 
  },
  
});




export default TVScreen;
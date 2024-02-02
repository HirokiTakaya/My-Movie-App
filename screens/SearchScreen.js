
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('multi');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${searchType}`, {
        params: { api_key: 'bc1250e71dfee020b4f147ad56240af9', query },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching search results.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToDetails = (item) => {
  
    if (item.media_type === 'tv' || searchType === 'tv') {
      navigation.navigate('TVDetails', { tvId: item.id });
    } else if (item.media_type === 'movie' || searchType === 'movie') {
      navigation.navigate('MovieDetails', { movieId: item.id });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setQuery}
          value={query}
          placeholder="Search for movies or TV shows..."
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>{searchType.toUpperCase()}</Text>
        </TouchableOpacity>
        <Button title="Search" onPress={handleSearch} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Picker
              selectedValue={searchType}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setSearchType(itemValue)}
            >
              <Picker.Item label="All" value="multi" />
              <Picker.Item label="Movies" value="movie" />
              <Picker.Item label="TV Shows" value="tv" />
            </Picker>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToDetails(item)} style={styles.itemContainer}>
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.title || item.name}</Text>
                <TouchableOpacity onPress={() => navigateToDetails(item)} style={styles.detailButton}>
                  <Text style={styles.detailButtonText}>More Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'space-around', 
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd', 
    borderRadius: 5, 
    padding: 10,
    marginRight: 10, 
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8, 
  },
  textContainer: {
    flex: 1,
    marginLeft: 10, 
    justifyContent: 'center', 
  },
  detailButton: {
    backgroundColor: '#007AFF', 
    borderRadius: 8, 
    marginTop: 10,
    padding: 10,
  },
  detailButtonText: {
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold', 
  },
  errorText: {
    fontSize: 16,
    color: 'red', 
    textAlign: 'center', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20, // 角丸
    padding: 35,
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});


export default SearchScreen;

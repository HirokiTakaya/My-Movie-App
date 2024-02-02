import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesScreen from './screens/MoviesScreen';
import TVScreen from './screens/TVScreen';
import SearchScreen from './screens/SearchScreen';
import MovieDetailsScreen from './screens/MovieDetail';
import TVDetailsScreen from './screens/TVDetailsScreen';
import SearchStack1 from './screens/SearchStack'; // 上記で作成した SearchStackScreen

const MoviesStack = createStackNavigator();
const MoviesStackScreen = () => (
  <MoviesStack.Navigator>
    <MoviesStack.Screen name="Movies" component={MoviesScreen} />
    <MoviesStack.Screen name="MovieDetails" component={MovieDetailsScreen} />
  </MoviesStack.Navigator>
);

const TVStack = createStackNavigator();
const TVStackScreen = () => (
  <TVStack.Navigator>
    <TVStack.Screen name="TV" component={TVScreen} />
    <TVStack.Screen name="TVDetails" component={TVDetailsScreen} />
  </TVStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={SearchScreen} />
   
  </SearchStack.Navigator>
);

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="MoviesTab" component={MoviesStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="TVTab" component={TVStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="SearchTab" component={SearchStack1} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

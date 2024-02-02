
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './SearchScreen';
import MovieDetailsScreen from './MovieDetail'; 
import TVScreen from './TVScreen';
import TVDetails from './TVDetailsScreen';
const SearchStack = createStackNavigator();


export const SearchStackScreen = () => (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="MovieDetails" component={MovieDetailsScreen} />
     
      <SearchStack.Screen name="TVDetails" component={TVDetails} />
    </SearchStack.Navigator>
  );
  
export default SearchStackScreen

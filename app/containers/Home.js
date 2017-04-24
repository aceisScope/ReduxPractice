import React, { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

const {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet,
} = ReactNative

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { searching: false, ingredientsInput: '' }
  }

  searchPressed() {
    this.setState({searching:true});
    this.props.fetchRecipes('bacon').then(() => {
      this.setState({searching: false});
    });
    //this.props.fetchRecipes(this.state.ingredientsInput);
  }

  recipes() {
    return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key] )
  }

  render() {
    return (
      <View style = {styles.scene}>
        <View style = {styles.searchSection}>
          <TextInput style = {styles.searchInput}
            returnKeyType = 'search'
            placeholder = 'Ingredients'
            onChangeText = { (ingredientsInput) => this.setState({ingredientsInput}) }
            value = {this.state.ingredientsInput}
          />
          <TouchableHighlight onPress = {() => this.searchPressed()} style = {styles.searchButton}>
            <Text>Fetch Recipes</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style = {styles.scrollSection}>
          { !this.state.searching && this.recipes().map((recipe) => {
            return <View key = {recipe.href}>
              <Image source = {{uri: recipe.thumbnail}} style={styles.resultImage} />
              <Text style={styles.resultText}>{recipe.title}</Text>
            </View>
          })}
          { this.state.searching ? <Text> Searching... </Text> : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20,
  },
  searchSection: {
    height: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 7,
  },
  searchButton: {
    flex: 3,
  },
  scrollSection: {
    flex: 8,
  },
  resultImage: {
    height: 150,
  },
  resultText: {
    backgroundColor: 'white',
    color: 'black',
    height: 20
  },
});

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes
  }
}

export default connect(mapStateToProps)(Home);

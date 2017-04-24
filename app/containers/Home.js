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

  searchPressed() {
    this.props.fetchRecipes('bacon');
  }

  recipes() {
    return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key] )
  }

  render() {
    console.log(this.recipes());
    return (
      <View style = {styles.scene}>
        <View style = {styles.searchSection}>
          <TouchableHighlight onPress = {() => this.searchPressed()} style = {styles.searchButton}>
            <Text>Fetch Recipes</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style = {styles.scrollSection}>
          { this.recipes().map((recipe) => {
            return <View key = {recipe.href}>
              <Image source = {{uri: recipe.thumbnail}} style={styles.resultImage} />
              <Text style={styles.resultText}>{recipe.title}</Text>
            </View>
          })}
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
    padding: 5
  },
  scrollSection: {
    flex: 0.8,
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

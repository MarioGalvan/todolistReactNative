import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './common/card/Card';

const HomeConfig = {
  title: 'Mis tareas',
};
const Home = () => {
  return (
    <View style={styles.container}>
      <Text
       style={styles.mainTitle}>{HomeConfig.title}</Text>
      <Card />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  mainTitle: {
    fontSize: 25,
    color: '#191919',
    fontWeight: 600,
    fontFamily: 'Montserrat-Bold',
    margin: 10,
  },
});
export default Home;

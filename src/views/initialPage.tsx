import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {updateInitialData} from '../helpers/user';
const studentImage =
  'https://evernote.com/c/assets/marketing/campaigns/unidays/student-illo-v2-2.png';

const ViewInfo = {
  image: studentImage,
  title: 'Administra y prioriza tu tarea fácilmente',
  subtitle: 'Aumente su productividad gestionando sus tareas personales',
  buttonTitle: 'Empezar',
};

type InitialPageProps = {
  userId: string;
};

const InitialPage = (props: InitialPageProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
      }}>
      <Image source={{uri: studentImage}} style={{width: 350, height: 350}} />
      <Text style={styles.title}>{ViewInfo.title}</Text>
      <Text style={styles.subtitle}>{ViewInfo.subtitle}</Text>
      <TouchableHighlight
        style={styles.buttonRound}
        onPress={() => updateInitialData(props.userId, false)}>
        <Text style={styles.textButton}>{ViewInfo.buttonTitle}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  subtitle: {
    fontSize: 17,
    color: 'grey',
    margin: 15,
    width: 300,
    textAlign: 'center',
    paddingBottom: 40,
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonRound: {
    borderRadius: 100,
    backgroundColor: '#FDD260',
    padding: 12,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InitialPage;

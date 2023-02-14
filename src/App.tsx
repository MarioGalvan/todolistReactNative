import React, {useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {addInitialData} from './helpers/user';
import Home from './views/Home';
import InitialPage from './views/initialPage';
import {Provider as PaperProvider} from 'react-native-paper';
import { theme } from './helpers/theme';

function App(): JSX.Element {
  const [isFirstTime, setisFirstTime] = useState(false);
  const [userId, setuserId] = useState('');

  React.useEffect(() => {
    async function getDeviceId() {
      const deviceId = await DeviceInfo.syncUniqueId();
      return deviceId;
    }
    getDeviceId().then(deviceId => {
      setuserId(deviceId);
    });
  }, []);

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.data() === undefined) {
          addInitialData(userId);
          setisFirstTime(true);
        }
        setisFirstTime(documentSnapshot.data()?.initial);
      });
    return () => subscriber();
  }, [userId]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <StatusBar backgroundColor={theme.primaryColor} />
          {isFirstTime ? <InitialPage userId={userId} /> : <Home  userId={userId} />}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;

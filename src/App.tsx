import React, {useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {addInitialData} from './helpers/user';
import Home from './views/Home';
import InitialPage from './views/initialPage';

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
        console.log('User data: ', documentSnapshot.data());
      });
    return () => subscriber();
  }, [userId]);

  console.log('isFirstTime', isFirstTime);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <StatusBar backgroundColor="#FDD260" />
        {isFirstTime ? <InitialPage userId={userId} /> : <Home />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;

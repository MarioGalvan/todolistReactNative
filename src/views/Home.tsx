import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {HomeConfig, theme} from '../helpers/theme';
import {CardTask} from './CardTask';
import CardCommon from './common/card/Card';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

const Home = () => {
  const [notesData, setnotesData] = useState([]);
  const [visible, setVisible] = useState({
    type: 'add',
    visible: false,
    idEdit: '',
  });
  const [totalTask, settotalTask] = useState(0);
  const [taskToEdit, settaskToEdit] = useState();
  const isFocused = useIsFocused();
  const [userId, setuserId] = useState('');

  const hidden = () => {
    setVisible({
      type: 'add',
      visible: false,
      idEdit: '',
    });
  };

  const handleEdit = (id: string) => {
    setVisible({
      type: 'edit',
      visible: true,
      idEdit: id,
    });
  };

  React.useEffect(() => {
    async function getDeviceId() {
      const deviceId = await DeviceInfo.syncUniqueId();
      return deviceId;
    }
    getDeviceId().then(deviceId => {
      setuserId(deviceId);
      firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        let tasks = documentSnapshot.data()?.tasks;
        console.log('documentSnapshot.data()', documentSnapshot.data(), userId);
        settotalTask(tasks?.length ?? 0);
        setnotesData(tasks || []);
        console.log('User data: ', tasks);
      });
    });
  }, []);

  React.useEffect(() => {
    firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        let tasks = documentSnapshot.data()?.tasks;
        console.log('documentSnapshot.data()', documentSnapshot.data(), userId);
        settotalTask(tasks?.length ?? 0);
        setnotesData(tasks || []);
        console.log('User data: ', tasks);
      });
  }, [isFocused, userId]);

  React.useEffect(() => {
    if (visible.idEdit) {
      const task = notesData.find((item: any) => item.id == visible.idEdit);
      settaskToEdit(task);
    }
  }, [visible]);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.mainTitle}>
            {HomeConfig.title} ({totalTask})
          </Text>

          <Button
            style={{marginRight: 20, marginTop: 5}}
            textColor="#fff"
            buttonColor={theme.black}
            icon="plus"
            mode="outlined"
            onPress={() => {
              setVisible({
                type: 'add',
                visible: true,
                idEdit: '',
              });
            }}>
            Nueva
          </Button>
        </View>
        {visible?.visible ? (
          <CardTask
            task={taskToEdit}
            editing={visible.idEdit ? true : false}
            userId={userId}
            close={hidden}
            notesData={notesData}
          />
        ) : (
          <>
            {notesData.length > 0 ? (
              notesData.map((item: any, index) => {
                return (
                  <CardCommon
                    tasks={notesData}
                    userId={userId}
                    item={item}
                    handleEdit={handleEdit}
                  />
                );
              })
            ) : (
              <Text style={styles.dontTasks}>{HomeConfig.dontTasks}</Text>
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  mainTitle: {
    fontSize: 25,
    color: '#191919',
    fontFamily: 'Montserrat-Bold',
    margin: 20,
  },

  dontTasks: {
    fontSize: 25,
    color: '#191919',
    fontFamily: 'Montserrat',
    margin: 10,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 300,
  },

  cardForm: {
    marginLeft: 20,
    marginBottom: 10,
    width: 350,
    padding: 10,
    height: 350,
    backgroundColor: '#fff',
  },

  TextInput: {
    margin: 10,
    backgroundColor: '#fff',
  },
});
export default Home;

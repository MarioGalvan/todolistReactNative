import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {HomeConfig, theme} from '../helpers/theme';
import {CardTask} from './CardTask';
import CardCommon from './common/card/Card';
import firestore from '@react-native-firebase/firestore';

type HomeProps = {
  userId: string;
};
const Home = ({userId}: HomeProps) => {
  const [notesData, setnotesData] = useState([]);
  const [visible, setVisible] = useState({
    type: 'add',
    visible: false,
    idEdit: '',
  });
  const [totalTask, settotalTask] = useState(0);
  const [taskToEdit, settaskToEdit] = useState();

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
    firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        let tasks = documentSnapshot.data()?.tasks;
        settotalTask(tasks?.length ?? 0);
        setnotesData(tasks || []);
        console.log('User data: ', tasks);
      });
  }, []);

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
        {visible?.visible && visible?.type == 'add' ? (
          <CardTask userId={userId} close={hidden} />
        ) : (
          <>
            {notesData.length > 0 ? (
              notesData.map((item: any, index) => {
                return (
                  <CardCommon
                    tasks={notesData}
                    userId={userId}
                    item={item}
                    // id={item.id}
                    // content={item.content}
                    // name={item.name}
                    // responsable={item.responsable}
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

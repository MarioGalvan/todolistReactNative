import React, {useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {StyleSheet, ToastAndroid} from 'react-native';
import {HomeConfig, theme} from '../helpers/theme';
import {addTask, updateTaskByID} from '../helpers/user';

type CardTaskProps = {
  close: () => void;
  userId: string;
  editing: boolean;
  task: any;
  notesData: any;
};

export const CardTask = ({
  close,
  userId,
  editing,
  task,
  notesData,
}: CardTaskProps) => {
  const [errors, seterrors] = useState({
    message: '',
    status: false,
  });

  const [formData, setformData] = useState({
    name: '',
    responsable: '',
    content: '',
    status: false,
  });

  const handleChangeText = (text: string, input: string) => {
    setformData({
      ...formData,
      [input]: text,
    });
  };

  const onToggleSwitch = () => {
    setformData({
      ...formData,
      status: !formData.status,
    });
  };

  React.useEffect(() => {
    if (
      formData.name !== '' ||
      formData.responsable !== '' ||
      formData.content !== ''
    ) {
      seterrors({
        message: '',
        status: false,
      });
    }
  }, [formData]);

  React.useEffect(() => {
    if (editing && task) {
      setformData({
        name: task.name,
        responsable: task.responsable,
        content: task.content,
        status: task.status,
      });
    }
  }, [editing, task]);

  const showToastWithGravity = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.TOP,
      ToastAndroid.CENTER,
    );
  };

  return (
    <Card style={styles.cardForm} mode="elevated">
      <Card.Title
        title={!editing ? HomeConfig.add : HomeConfig.edit}
        titleStyle={{
          fontSize: 20,
          color: '#191919',
          fontFamily: 'Montserrat-Bold',
        }}
        right={props => (
          <IconButton
            {...props}
            icon="close"
            onPress={close}
            mode="contained-tonal"
          />
        )}
      />
      <TextInput
        onChangeText={text => handleChangeText(text, 'name')}
        style={styles.TextInput}
        value={formData.name}
        mode="flat"
        placeholder={HomeConfig.placeholder}
        right={<TextInput.Affix text="/100" />}
      />

      <TextInput
        onChangeText={text => handleChangeText(text, 'content')}
        style={styles.TextInput}
        value={formData.content}
        mode="flat"
        placeholder={HomeConfig.content}
        right={<TextInput.Affix text="/100" />}
      />

      <TextInput
        onChangeText={text => handleChangeText(text, 'responsable')}
        style={styles.TextInput}
        value={formData.responsable}
        mode="flat"
        placeholder={HomeConfig.placeholderResponsable}
        right={<TextInput.Affix text="/100" />}
      />

      {editing && (
        <>
          <Text>Estado de la tarea:</Text>

          <Switch
            value={formData.status ?? false}
            onValueChange={onToggleSwitch}
          />
        </>
      )}

      <Button
        icon="plus"
        mode="contained"
        style={{
          backgroundColor: theme.primaryColor,
          margin: 10,
        }}
        onPress={() => {
          if (
            formData.name === '' ||
            formData.responsable === '' ||
            formData.content === ''
          ) {
            seterrors({
              message: 'Todos los campos son obligatorios',
              status: true,
            });
            return;
          }
          if (editing) {
            let data:any = formData;
            data.id = task.id;
            updateTaskByID(userId, notesData, data).then(res => {
              console.log('res', res);
              if (res) {
                showToastWithGravity('Operación exitosa');
              } else {
                showToastWithGravity('Error al realizar la operación');
              }
            });
            return;
          }

          addTask(userId, formData).then(res => {
            console.log('res', res);
            if (res) {
              showToastWithGravity('Operación exitosa');
            } else {
              showToastWithGravity('Error al realizar la operación');
            }
          });
        }}>
        {!editing ? HomeConfig.add : HomeConfig.edit}
      </Button>

      {errors.status && <Text style={styles.errorText}>{errors.message}</Text>}
    </Card>
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
    fontWeight: 600,
    fontFamily: 'Montserrat-Bold',
    margin: 20,
  },

  dontTasks: {
    fontSize: 20,
    color: '#191919',
    fontFamily: 'Montserrat',
    margin: 10,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 200,
  },

  cardForm: {
    marginLeft: 20,
    marginBottom: 10,
    width: 350,
    padding: 10,
    height: 450,
    backgroundColor: '#fff',
    marginTop: 150,
  },

  TextInput: {
    margin: 10,
    backgroundColor: '#fff',
  },

  errorText: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
  },
});

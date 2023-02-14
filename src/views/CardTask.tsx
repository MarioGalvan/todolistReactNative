import React, {useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import {StyleSheet, ToastAndroid} from 'react-native';
import {HomeConfig, theme} from '../helpers/theme';
import {addTask} from '../helpers/user';

type CardTaskProps = {
  close: () => void;
  userId: string;
  editing: boolean;
};

export const CardTask = ({close, userId, editing}: CardTaskProps) => {
  const [errors, seterrors] = useState({
    message: '',
    status: false,
  });

  const [formData, setformData] = useState({
    name: '',
    responsable: '',
    content: '',
  });

  const handleChangeText = (text: string, input: string) => {
    setformData({
      ...formData,
      [input]: text,
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
        title={HomeConfig.add}
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
        mode="flat"
        placeholder={HomeConfig.placeholder}
        right={<TextInput.Affix text="/100" />}
      />

      <TextInput
        onChangeText={text => handleChangeText(text, 'content')}
        style={styles.TextInput}
        mode="flat"
        placeholder={HomeConfig.content}
        right={<TextInput.Affix text="/100" />}
      />

      <TextInput
        onChangeText={text => handleChangeText(text, 'responsable')}
        style={styles.TextInput}
        mode="flat"
        placeholder={HomeConfig.placeholderResponsable}
        right={<TextInput.Affix text="/100" />}
      />

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
          addTask(userId, formData).then(res => {
            console.log('res', res);
            if (res) {
              showToastWithGravity('Tarea agregada con éxito');
            } else {
              showToastWithGravity('Error al agregar la tarea');
            }
          });
        }}>
        {HomeConfig.buttontext}
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

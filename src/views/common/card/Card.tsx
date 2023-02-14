import * as React from 'react';
import {Card, IconButton, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {theme} from '../../../helpers/theme';
import {deleteTaskByID} from '../../../helpers/user';

type CardCommonProps = {
  userId: string;
  tasks: any;
  item: any;
  handleEdit: (id: string) => void;
};

const CardCommon = ({item, userId, tasks, handleEdit}: CardCommonProps) => {
  const {name, responsable, content, id, status} = item;
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={`${name} - ${responsable}`}
        titleStyle={{
          fontSize: 20,
          color: '#191919',
          fontFamily: 'Montserrat-Bold',
        }}
      />

      <Card.Content>
        <Text style={styles.textcontent}>{content}</Text>
        {/* <Text style={styles.textcontent}>Responsable: {responsable}</Text> */}
      </Card.Content>

      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          
          marginTop: 20,
          top: 10,
        }}>
        {item.status ? (
          <Text
            style={{
              color: theme.success,
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Completada
          </Text>
        ) : (
          <Text
            style={{
              color: theme.danger,
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Pendiente
          </Text>
        )}
      </Card.Content>

      <Card.Actions>
        <IconButton
          containerColor={theme.black}
          icon="delete"
          size={20}
          onPress={() => {
            deleteTaskByID(userId, id, tasks);
          }}
        />
        <IconButton
          containerColor="#fff"
          icon="pencil"
          iconColor={theme.primaryColor}
          size={23}
          onPress={() => {
            handleEdit(id);
          }}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    marginBottom: 10,
    width: 350,
    backgroundColor: '#fff',
  },

  textcontent: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Montserrat-Bold',
  },
});

export default CardCommon;

import firestore from '@react-native-firebase/firestore';

export const addInitialData = (deviceId: any) => {
  firestore()
    .collection('users')
    .doc(deviceId)
    .set({
      name: 'Test User',
      deviceId,
      initial: false,
    })
    .then(() => {
      console.log('User added!');
    })
    .catch(error => {
      console.log('Error adding user: ', error);
    });
};

export const updateInitialData = (deviceId: any, status: boolean) => {
  firestore()
    .collection('users')
    .doc(deviceId)
    .update({
      initial: status,
    })
    .then(() => {
      console.log('User updated!');
    })
    .catch(error => {
      console.log('Error updating user: ', error);
    });
};

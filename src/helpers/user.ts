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

export const addTask = (deviceId: any, task: any) => {
  task.id = firestore().collection('users').doc().id;
  let isOk = false;
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(deviceId)
      .update({
        tasks: firestore.FieldValue.arrayUnion(task),
      })
      .then(() => {
        console.log('Task added!');
        isOk = true;
        resolve(isOk);
      })
      .catch(error => {
        console.log('Error adding task: ', error);
        isOk = false;
        reject(isOk);
      });
  });
};

export const updateTask = (deviceId: any, task: any) => {
  let isOk = false;
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(deviceId)
      .update({
        tasks: firestore.FieldValue.arrayRemove(task),
      })
      .then(() => {
        console.log('Task updated!');
        isOk = true;
        resolve(isOk);
      })
      .catch(error => {
        console.log('Error updating task: ', error);
        isOk = false;
        reject(isOk);
      });
  });
};


export const deleteTaskByID = (deviceId: any, id: any, actualTask:any) => {
  let isOk = false;

  let task = actualTask.filter((item: any) => item.id !== id);
  console.log('task', task);

  
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(deviceId)
      .update({
        tasks: task
      })
      .then(() => {
        console.log('Task deleted!');
        isOk = true;
        resolve(isOk);
      })
      .catch(error => {
        console.log('Error deleting task: ', error);
        isOk = false;
        reject(isOk);
      });
  });
}
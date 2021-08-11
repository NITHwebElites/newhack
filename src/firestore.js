import firebase from './firebase';

const db = firebase.firestore();

export function listenToWeightCollection(id) {
  return db
    .collection('records')
    .where('userId', '==', id)
    .orderBy('createdAt', 'desc');
}

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();

  return {
    ...data,
    id: snapshot.id,
  };
}

export async function createWeightDocument(data) {
  const user = firebase.auth().currentUser;
  return db.collection('records').add({
    weight: data.weight,
    userId: user.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}
export async function updateWeightDocument(id, weight) {
  return db.collection('records').doc(id).update({
    weight: weight,
  });
}
export async function deleteWeightDocument(id) {
  return db.collection('records').doc(id).delete();
}

export function setUserProfileData(user) {
  return db.collection('users').doc(user.uid).set({
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

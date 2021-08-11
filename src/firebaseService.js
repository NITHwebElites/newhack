import firebase from './firebase';
import { setUserProfileData } from './firestore';

export function signout() {
  return firebase.auth().signOut();
}

export async function signup(email, password) {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await setUserProfileData(res.user);
  } catch (error) {
    throw error;
  }
}

export function signin(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

const GetFavList = async (user) => {
  try {

    if (!user?.primaryEmailAddress?.emailAddress) {
      throw new Error('Invalid user email address');
    }

    const docRef = doc(db, 'UserFavPet', user.primaryEmailAddress.emailAddress);
    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {
      console.log('Document found:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('Document not found, creating new document');
      await setDoc(docRef, {
        email: user.primaryEmailAddress.emailAddress,
        favorites: []
      });
    }
  } catch (error) {
    console.error('Error fetching or creating document:', error);
  }
};

const UpdateFav = async (user, favorites) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, {
      favorites: favorites
    })
  } catch (e) {
    console.log("pet didn't added to the favorites", e)
  }
}

export default {
  GetFavList,
  UpdateFav
};

import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


const firebaseConfig = {
	apiKey: "AIzaSyBMzVni9pUfegSLa-yYlvGhyiuA8pfHbGg",
	authDomain: "crwn-clothing-db-78abd.firebaseapp.com",
	projectId: "crwn-clothing-db-78abd",
	storageBucket: "crwn-clothing-db-78abd.appspot.com",
	messagingSenderId: "23556143733",
	appId: "1:23556143733:web:943281069e3e249c51d63c",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};
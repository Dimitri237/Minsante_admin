
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDuJaJes7GBGTfE0HQOXKoV-Mj1sZCbaFc",
    authDomain: "minesante-site.firebaseapp.com",
    projectId: "minesante-site",
    storageBucket: "minesante-site.appspot.com",
    messagingSenderId: "681109830652",
    appId: "1:681109830652:web:36bce468c22f13dbb01079"
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

async function uploadToFirebase(file, fileName) {
    const storageRef = ref(storage, `FlysoftMedia/images/${fileName}`);
    const uploadTask = uploadBytes(storageRef, file);

    try {
        await uploadTask;
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image :', error);
        throw error;
    }
}

// Initialisation de l'application Firebase


const firestore = getFirestore(firebaseApp);
const db = getFirestore(firebaseApp);

export {
    firebaseApp,
    firestore,
    db,
    uploadToFirebase
}
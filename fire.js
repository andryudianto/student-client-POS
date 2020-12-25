import firebaseconfig from './config'
import * as firebase from 'firebase'
import 'firebase/firestore'



class Fire {
    constructor(){
        if (!firebase.apps.length){
              // Initialize Firebase
            firebase.initializeApp(firebaseconfig);
        }
    }


    uploadPhotoAsync = async uri => {
        const path = `photos/${Date.now()}.jpg`
        return new Promise  (async (res, rej) => {
            const response = await fetch(uri)
            const file =  await response.blob()
            let upload = firebase.storage().ref(path).put(file)
            upload.on('state_changed', snapshot => {

            }, err => {
                rej(err)
            }, async () => {
                const url = await upload.snapshot.ref.getDownloadURL()
                res(url)
            })
        })
    }

    addPhoto = async (localUri, studentId) => {
        console.log(studentId, `<<<<<<<`)
        const remoteUri = await this.uploadPhotoAsync(localUri)
        return new Promise ((res, rej) => {
            firebase.database().ref('/photos').push({
                timestamp: this.timestamp,
                image: remoteUri,
                studentId
            })
            this.firestore.collection('photos').add({
                timestamp: this.timestamp,
                image: remoteUri,
                studentId
            })
            .then( ref => {
                res(ref)
            })
            .catch( err => {
                rej(err)
            })
        })
    }

    get firestore () {
        return firebase.firestore()
    }

    get timestamp(){
        return Date.now()
    }

}

Fire.shared = new Fire()
export default Fire
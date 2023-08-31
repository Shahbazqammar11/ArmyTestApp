var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const data = require('./data.json');

async function uploadData(){
    for(const doc of data){
        await db.collection('questions').add(doc);
    }
}

uploadData();
const fs = require('fs');
const firebaseAdmin = require('firebase-admin');
const { dirname, join } = require('path');

const ROOT_PATH = dirname(__dirname)

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require(join(ROOT_PATH, 'private/algerian-cities-db-firebase-adminsdk-lb1rk-a0f68fbb6f.json'))),
    databaseURL: "https://algerian-cities-db-default-rtdb.europe-west1.firebasedatabase.app"
});

const database = firebaseAdmin.database()
const data = JSON.parse(fs.readFileSync(join(ROOT_PATH, 'storage/algerian_cities.json')))

database.ref().set(data, error => {
    if (error)
        console.error(error);
    else
        console.log("Done");
})

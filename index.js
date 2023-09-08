const express = require("express");
const firebaseAdmin = require('firebase-admin');
const { join } = require('path');

const app = express();
const PORT = 8081;

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require(join(__dirname, 'private/algerian-cities-db-firebase-adminsdk-lb1rk-a0f68fbb6f.json'))),
    databaseURL: "https://algerian-cities-db-default-rtdb.europe-west1.firebasedatabase.app"
});

const database = firebaseAdmin.database()

app.get('/list', (req, res) => {
    const lang = req.query['lang'];

    database.ref().get()
        .then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const wilayasList = [];
                const wilayaCodes = Object.keys(data)
                    .map(value => parseInt(value))
                    .sort((a, b) => a - b)
                    .map(value => value.toString())

                for (let wilayaCode of wilayaCodes) {
                    if (wilayaCode.length < 2) wilayaCode = '0' + wilayaCode;
                    wilayasList.push(data[wilayaCode][lang == 'ar' ? 'wilaya_name_ar' : 'wilaya_name_ascii'])
                }

                res.send(wilayasList);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
})

app.get('/cities', (req, res) => {
    const wilayaCode = req.query['wilaya_code'];
    const lang = req.query['lang'];

    database.ref().get()
        .then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                if (data[wilayaCode] != null)
                    return res.send(data[wilayaCode][lang == 'ar' ? 'cities_ar' : 'cities_ascii'])

                return res.sendStatus(404)
            } else {
                res.sendStatus(404);
            }
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
})

app.get('/', (req, res) => {
    res.sendFile(join(ROOT_PATH, 'public/index.html'));
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(join(ROOT_PATH, 'public/favicon.ico'))
})

app.listen(PORT, () => {
    console.log(`Server running at: \`http://127.0.0.1:${PORT}\``)
})

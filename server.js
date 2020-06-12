const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());         //When we do "req.body"; body comes in a weird format, but this makes the object a lot more accessible.
app.use(cors());                    //This is used to remove the issue of chrome blocking access to our backend server because of security requirements.

const database = {
    users:[
        {
            id: '1234',
            name: 'abooga',
            password: 'cookies',
            entries: 0
        },
        {
            id: '123',
            name: 'abod',
            password: 'bananas',
            entries: 0
        }
    ],
    login: [
        {
            id: '123',
            name: 'abooga',
            hash: ''
        }
    ]
}

app.get('/', (req,res) => {
    res.json(database.users);
});

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            res.json(user);
            found = true;
        }
    });
    if(!found){
        res.status(400).json("No such user");   
    }
})

app.put('/image', (req,res) =>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if(!found){
        res.status(400).json("No such user");   
    }
})


// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });

app.post('/register', (req,res) => {
    const { email, name, id, entries, joined } = req.body;
    // bcrypt.hash(password, null, null, (err, hash) => {
    //     console.log(hash);
    // });
    database.users.push({
        name: name,
        email: email,
        id: id,
        entries: entries,
        joined: joined
    })
    res.json(database.users[database.users.length - 1]);
})

app.post('/signin', (req,res) =>{
    // bcrypt.compare(res.body.password, /* Get a hash from the login from the users' DB */'de3rewd' , function(err, result) {
    //     //result === false OR result === true;
    // });
    // if(req.body.password === database.users[0].password && req.body.name === database.users[0].name){
    //     res.json(database.users[0]);
    // }
    // else{
    //     res.status(400).send('Error logging in');
    // }
    res.json(req.body);
})

app.listen(3000);


/*
/ --> res = this is working
/signin --> POST = success/fail
/register -> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
/*
The `bcrypt` package in npm is a library for hashing passwords in a secure way. It provides a way to hash passwords and compare hashed passwords, which is essential for securely storing user passwords and verifying user credentials in web applications. 

### Installation

To install the `bcrypt` package, you can use npm:

```bash
npm install bcrypt
```

### Usage

Here are the basic steps for using `bcrypt` to hash and compare passwords:

#### Importing `bcrypt`

```javascript
*/
const bcrypt = require('bcrypt');
// ```

/*
#### Hashing a Password

When a user signs up or changes their password, you need to hash the password before storing it in your database. The `bcrypt.hash()` function is used for this purpose. It takes the plain text password and a salt (a random string added to the password to make it more secure) as arguments.

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10; // The cost factor (the higher, the more secure but slower)

// Password to hash
*/
const plainPassword = 'mysecretpassword';

// Hashing the password
bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    // Store hash in your password DB
    console.log('Hashed password:', hash);
});
// ```

/*
Alternatively, you can use the synchronous version:

```javascript
const hash = bcrypt.hashSync(plainPassword, saltRounds);
console.log('Hashed password:', hash);
```

#### Comparing a Password

When a user logs in, you need to compare the plain text password they provide with the hashed password stored in your database. The `bcrypt.compare()` function is used for this purpose.

```javascript
*/
const bcrypt = require('bcrypt');

// Password entered by the user
const enteredPassword = 'mysecretpassword';

// Hashed password stored in the database
const hashedPassword = '$2b$10$EixZaYVK1fsbw1Zfbx3OXe.P/cbyQJivYYPq1HSkzVHTUp0Yz5xW2'; // example hash

// Comparing the passwords
bcrypt.compare(enteredPassword, hashedPassword, function(err, result) {
    if (err) {
        console.error(err);
        return;
    }
    if (result) {
        console.log('Password match');
        // Passwords match
    } else {
        console.log('Password does not match');
        // Passwords do not match
    }
});
// ```

/*
Alternatively, you can use the synchronous version:

```javascript
*/
const result = bcrypt.compareSync(enteredPassword, hashedPassword);
if (result) {
    console.log('Password match');
} else {
    console.log('Password does not match');
}
// ```

/*
### Example: User Registration and Login

Here is an example of how you might use `bcrypt` in a simple Express application for user registration and login.

```javascript
*/
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Simulated database
const users = [];

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send('Cannot find user');
    }

    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.send('Login successful');
        } else {
            res.send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
// ```

/*
### Summary

- **Hashing**: Use `bcrypt.hash()` to hash passwords before storing them.
- **Comparing**: Use `bcrypt.compare()` to compare a plain text password with a hashed password.
- **Salt Rounds**: Determine the cost factor for the hashing process, balancing security and performance.

The `bcrypt` package is a robust and widely used solution for handling password security in Node.js applications.
*/
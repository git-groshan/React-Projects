/*
`bcryptjs` is an alternative to the `bcrypt` library for Node.js, providing similar functionality for hashing and comparing passwords. The primary difference is that `bcryptjs` is a pure JavaScript implementation, whereas `bcrypt` relies on native C++ bindings. This makes `bcryptjs` easier to install and use across different platforms, as it does not require compiling native code.

### Installation

You can install `bcryptjs` using npm:

```bash
npm install bcryptjs
```

### Usage

Here are the basic steps for using `bcryptjs` to hash and compare passwords:

#### Importing `bcryptjs`

```javascript
*/
const bcrypt = require('bcryptjs');
// ```
/*
#### Hashing a Password

To hash a password, you use the `bcrypt.hash()` function. This function takes the plain text password and a salt (a random string added to the password to make it more secure) as arguments.

```javascript
*/
const bcrypt = require('bcryptjs');
const saltRounds = 10; // The cost factor (the higher, the more secure but slower)

// Password to hash
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

// Alternatively, you can use the synchronous version:

// ```javascript
const hash = bcrypt.hashSync(plainPassword, saltRounds);
console.log('Hashed password:', hash);
// ```

/*
#### Comparing a Password

To compare a plain text password with a hashed password, you use the `bcrypt.compare()` function.

```javascript
*/
const bcrypt = require('bcryptjs');

// Password entered by the user
const enteredPassword = 'mysecretpassword';

// Hashed password stored in the database
const hashedPassword = '$2a$10$EixZaYVK1fsbw1Zfbx3OXe.P/cbyQJivYYPq1HSkzVHTUp0Yz5xW2'; // example hash

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

// Alternatively, you can use the synchronous version:

// ```javascript
const result = bcrypt.compareSync(enteredPassword, hashedPassword);
if (result) {
    console.log('Password match');
} else {
    console.log('Password does not match');
}
// ```
/*
### Example: User Registration and Login

Here is an example of how you might use `bcryptjs` in a simple Express application for user registration and login.

```javascript
*/
const express = require('express');
const bcrypt = require('bcryptjs');
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

`bcryptjs` is a robust and platform-independent solution for handling password security in Node.js applications, making it a convenient alternative to `bcrypt`, especially when dealing with environments where compiling native modules is problematic.
*/
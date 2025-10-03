/*
`jsonwebtoken` is a popular npm package used to create and verify JSON Web Tokens (JWTs) in Node.js applications. JWTs are a compact, URL-safe means of representing claims between two parties, often used for authentication and information exchange. They consist of three parts: Header, Payload, and Signature.

### Installation

To install `jsonwebtoken`, you can use npm:

```bash
*/
// npm install jsonwebtoken
// ```

/*
### Components of a JWT

1. **Header**: Contains metadata about the token, including the type of token (JWT) and the signing algorithm being used (e.g., HMAC SHA256 or RSA).

    ```json
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```

2. **Payload**: Contains the claims. This is where you can store data, such as the user ID and any other relevant information. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true
    }
    ```

3. **Signature**: Used to verify the message wasn’t changed along the way. It is created by taking the encoded header, the encoded payload, a secret, the algorithm specified in the header, and signing that.

    ```text
    HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret
    )
    ```

### Usage

#### Creating a JWT

You can create a JWT using the `sign` method provided by `jsonwebtoken`.

```javascript
*/
const jwt = require('jsonwebtoken');

const payload = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true
};

//const secret = 'your-256-bit-secret';
const options = { expiresIn: '1h' };

// const token = jwt.sign(payload, secret, options);
console.log('Generated Token:', token);
// ```

/*
#### Verifying a JWT

You can verify a JWT using the `verify` method. This method will decode the token and verify its signature.

```javascript
*/
const jwt = require('jsonwebtoken');
/*
// It is commented as we have already using same name variable above 
const token = 'your.jwt.token.here';
const secret = 'your-256-bit-secret';
*/
jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    console.log('Token is not valid:', err);
  } else {
    console.log('Decoded Token:', decoded);
  }
});
// ```

/*
#### Decoding a JWT

If you only want to decode the JWT without verifying its signature, you can use the `decode` method.

```javascript
*/
const jwt = require('jsonwebtoken');

const token = 'your.jwt.token.here';

const decoded = jwt.decode(token);
console.log('Decoded Token:', decoded);
// ```
/*
### Example: Authentication Middleware

Here’s how you might use `jsonwebtoken` in an Express middleware for authenticating API requests.

```javascript
*/
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secret = 'your-256-bit-secret';

// Middleware to check the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If there's no token

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // If the token is invalid
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
}

app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// ```
/*
### Claims

- **Registered Claims**: Predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. These include `iss` (issuer), `exp` (expiration time), `sub` (subject), `aud` (audience), etc.
- **Public Claims**: These can be defined at will but should be collision-resistant. They should be registered in the IANA JSON Web Token Registry or be defined as a URI to avoid name collisions.
- **Private Claims**: Custom claims created to share information between parties that agree on using them and are neither registered or public claims.

### Security Considerations

- **Secret Management**: Ensure that your secret key is stored securely and not exposed in your codebase.
- **Expiration**: Always set an expiration date for your tokens to limit the window of misuse.
- **Algorithm**: Make sure to use a secure algorithm (e.g., `HS256` or `RS256`).

### Summary

- **JWT Structure**: Comprises Header, Payload, and Signature.
- **Creating Tokens**: Use `jwt.sign()` to create tokens.
- **Verifying Tokens**: Use `jwt.verify()` to verify tokens.
- **Decoding Tokens**: Use `jwt.decode()` to decode tokens without verification.
- **Middleware**: Implement authentication middleware for protected routes.

`jsonwebtoken` is a powerful tool for managing authentication in your Node.js applications, providing a robust and flexible approach to handle user sessions and secure your API endpoints.
*/

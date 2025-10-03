/*

Express Validator is a middleware for the Express.js framework that allows you to validate and sanitize incoming request data. It's built on top of [validator.js](https://github.com/validatorjs/validator.js) and provides a convenient way to handle input validation and sanitization in your Express applications.

### Key Features

1. **Validation**: Check if the data meets certain criteria (e.g., is a valid email, is not empty).
2. **Sanitization**: Clean the data (e.g., trim whitespace, escape HTML).
3. **Error Handling**: Collect validation errors and handle them appropriately.

### Installation

You can install Express Validator using npm:

```bash
npm install express-validator
```

### Basic Usage

To use Express Validator, you need to import the necessary functions and apply them as middleware in your routes.

#### Example: Basic Validation

Here's a simple example of how to use Express Validator to validate a user registration form.

```javascript
 */
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If validation passed, proceed with user registration
  res.send('User registered successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// ```

/*

### Validation and Sanitization Methods

Express Validator provides a wide range of methods to validate and sanitize data.

#### Common Validation Methods

- `isEmail()`: Checks if the string is a valid email.
- `isLength({ min, max })`: Checks the length of the string.
- `isNumeric()`: Checks if the string contains only numbers.
- `notEmpty()`: Checks if the string is not empty.
- `isIn([array])`: Checks if the value is in a given array.

#### Common Sanitization Methods

- `trim()`: Trims whitespace from both ends of the string.
- `escape()`: Replaces `<`, `>`, `&`, `'`, `"` and `/` with their corresponding HTML entities.
- `toInt()`: Converts the string to an integer.
- `toFloat()`: Converts the string to a float.
- `normalizeEmail()`: Normalizes an email address.

#### Example: Validation and Sanitization

Here's an example that includes both validation and sanitization:

```javascript
*/

const express = require('express');
const { body, validationResult } = require('express-validator');

// const app = express();
app.use(express.json());

app.post('/submit', [
  body('username')
    .notEmpty().withMessage('Username is required')
    .trim().escape(),
  body('email')
    .isEmail().withMessage('Enter a valid email')
    .normalizeEmail(),
  body('age')
    .optional() // Age is optional
    .isInt({ min: 1 }).withMessage('Age must be a positive integer')
    .toInt(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If validation passed, proceed with form submission
  res.send('Form submitted successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// ```

/*
### Custom Validators and Sanitizers

You can also create custom validators and sanitizers if the built-in ones do not meet your needs.

#### Example: Custom Validator

```javascript
*/
const express = require('express');
const { body, validationResult } = require('express-validator');

// const app = express();
app.use(express.json());

app.post('/submit', [
  body('username')
    .notEmpty().withMessage('Username is required')
    .custom(value => {
      if (value === 'admin') {
        throw new Error('Username cannot be "admin"');
      }
      return true;
    }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If validation passed, proceed with form submission
  res.send('Form submitted successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// ```

/*
### Error Handling

Express Validator collects all validation errors and provides them in a standardized format, which you can then handle as needed.

#### Example: Custom Error Formatter

```javascript
*/
const express = require('express');
const { body, validationResult } = require('express-validator');

// const app = express();
app.use(express.json());

app.post('/submit', [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Enter a valid email')
], (req, res) => {
  const errors = validationResult(req).formatWith(({ msg, param }) => {
    return {
      field: param,
      message: msg
    };
  });

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send('Form submitted successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// ```
/*
### Summary

- **Validation**: Ensure data meets specific criteria.
- **Sanitization**: Clean data to prevent issues like SQL injection or XSS.
- **Error Handling**: Collect and format errors for user-friendly feedback.

Express Validator provides a comprehensive and flexible way to handle input validation and sanitization in your Express.js applications, helping you maintain robust and secure server-side code.
*/
# Dynamic Form Generator

A React-based dynamic form generator that allows users to define and preview forms in real-time using a JSON schema. The application includes a JSON editor and form preview functionality, supporting validation, clipboard copying, and dark mode toggle.

---

## Features

- Dynamic form generation based on a JSON schema.
- Real-time validation of form fields.
- Dark mode toggle for the entire app.
- Clipboard functionality to copy the JSON schema.
- Responsive layout for various screen sizes.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14 or higher
- **npm**: Version 6 or higher
- **Git**

---

## Setup Instructions

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/thakursachin05/dynamic-form-generator.git
cd dynamic-form-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## Running Tests

This project uses **Jest** and **React Testing Library** for unit tests and **Playwright** for end-to-end (E2E) tests.

### Run Unit Tests
```bash
npm test
```

### Run E2E Tests (Playwright)
1. Install Playwright:
   ```bash
   npx playwright install
   ```

2. Run E2E tests:
   ```bash
   npx playwright test
   ```

---

## Project Structure

```plaintext
src/
├── components/
│   ├── FormGenerator/             # Dynamic form generator component
│   ├── JSONEditor/                # JSON editor with validation and syntax highlighting
├── pages/
│   └── App.tsx                    # Main application entry point
├── shared/
│   └── models                     # interfaces 
├── tests/
│   ├── playwright/                # Playwright E2E test files
│   
jest.config.js                     # Jest configuration
playwright.config.ts               # Playwright configuration
```

---

## Features Overview

### **Dynamic Form Generator**
- Generates forms dynamically based on a JSON schema.
- Supports multiple field types (text, email, select, radio, checkbox, etc.).
- Real-time validation for required fields, patterns, min/max values, and more.

### **JSON Editor**
- Syntax highlighting using `AceEditor`.
- Real-time validation with error messages for invalid JSON.
- Clipboard functionality to copy JSON schema.

### **Dark Mode**
- Toggles the theme between light and dark modes.
- Applies styling across the entire app.

### **Example JSON Schema**

Below is an example JSON schema that defines a user registration form. This schema can be used in the JSON editor to dynamically generate the form in the app.

```json
{
  "formTitle": "User Registration Form",
  "formDescription": "Please fill out the form to register.",
  "fields": [
    {
      "id": "username",
      "type": "text",
      "label": "Username",
      "required": true,
      "placeholder": "Enter your username"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "password",
      "type": "password",
      "label": "Password",
      "required": true,
      "placeholder": "Enter a secure password"
    },
    {
      "id": "dob",
      "type": "date",
      "label": "Date of Birth",
      "required": false
    },
    {
      "id": "gender",
      "type": "radio",
      "label": "Gender",
      "required": true,
      "options": [
        { "value": "male", "label": "Male" },
        { "value": "female", "label": "Female" },
        { "value": "other", "label": "Other" }
      ]
    },
    {
      "id": "hobbies",
      "type": "checkbox",
      "label": "Hobbies",
      "required": false,
      "options": [
        { "value": "reading", "label": "Reading" },
        { "value": "traveling", "label": "Traveling" },
        { "value": "sports", "label": "Sports" }
      ]
    },
    {
      "id": "bio",
      "type": "textarea",
      "label": "Short Bio",
      "required": false,
      "placeholder": "Tell us about yourself..."
    },
    {
      "id": "profilePicture",
      "type": "file",
      "label": "Upload Profile Picture",
      "required": false
    }
  ]
}
```

---

### **Generated Form Preview**

Using the above schema, the following form will be generated:

1. **Text Input**: Username
2. **Email Input**: Email Address (validated for correct email format)
3. **Password Input**: Secure password
4. **Date Input**: Date of Birth
5. **Radio Buttons**: Gender selection
6. **Checkboxes**: Hobby selection
7. **Textarea**: Short Bio
8. **File Input**: Upload a profile picture

---

### **How to Use the Example Schema**

1. Copy the schema into the **JSON Editor** in the app.
2. Edit the JSON as needed for your form.
3. The form will dynamically update in the **Form Preview** section. 
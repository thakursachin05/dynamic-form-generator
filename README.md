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
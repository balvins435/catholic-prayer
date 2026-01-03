
# Sanctuary: Catholic Prayer & Readings - Setup Guide

Welcome to the setup guide for the Sanctuary app. Follow these steps to get the application running on your local machine using Visual Studio Code.

This project is built with React and TypeScript and is designed to run directly in the browser without a complex build process, using ES Modules and an import map.

## Prerequisites

1.  **Visual Studio Code**: You should have VS Code installed.
2.  **Live Server Extension**: This VS Code extension provides a simple local development server.
3.  **Google Gemini API Key**: The application requires an API key from Google to fetch prayers and readings.

---

## Step 1: Get Your Gemini API Key

Before you can run the app, you need a Google Gemini API key.

1.  Go to the [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Sign in with your Google account.
3.  Click on **"Create API key"**.
4.  Copy the generated API key. You will need it in the next step.

---

## Step 2: Add Your API Key to the Project

The application is configured to look for your API key in `index.html`.

1.  Open the project folder in VS Code.
2.  Open the `index.html` file.
3.  Find the `<script>` tag with the comment `// IMPORTANT: Add your Gemini API Key here`.
4.  Replace the placeholder `"YOUR_GEMINI_API_KEY_HERE"` with the actual API key you copied in Step 1.

**Example:**

```html
<!-- Before -->
<script>
  window.process = {
    env: {
      API_KEY: "YOUR_GEMINI_API_KEY_HERE"
    }
  };
</script>

<!-- After -->
<script>
  window.process = {
    env: {
      API_KEY: "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890" // Your actual key
    }
  };
</script>
```

5.  Save the `index.html` file.

---

## Step 3: Install the Live Server Extension

If you don't have the Live Server extension installed:

1.  In VS Code, go to the **Extensions** view (click the icon on the left sidebar or press `Ctrl+Shift+X`).
2.  Search for `Live Server`.
3.  Find the one by **Ritwick Dey** and click **Install**.

---

## Step 4: Run the Application

Now you are ready to launch the app.

1.  In the VS Code Explorer, right-click on the `index.html` file.
2.  Select **"Open with Live Server"** from the context menu.
3.  Your default web browser will open automatically with the application running (e.g., at an address like `http://127.0.0.1:5500/index.html`).

The app should now load, fetch the daily readings, and be fully functional. Enjoy your Sanctuary!

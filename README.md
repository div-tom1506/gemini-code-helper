# VS Code Gemini Code Helper Extension

## Overview

Gemini Code Helper is a powerful VS Code extension that leverages the Google Gemini API to provide AI-powered code explanations, suggestions, and insights for developers. It supports multiple programming languages and integrates seamlessly with the VS Code editor.

## Features

- [x] **AI-Powered Code Explanation:** Get detailed explanations for selected code snippets.

- [x] **Multi-Language Support:** Works with JavaScript, Python, Java, C++, and more.

- [x] **Dark-Themed UI:** A stylish, unique dark theme for an enhanced developer experience.

- [x] **Smart Review AI:** Inline code reviews with AI-driven suggestions.

- [x] **Google Gemini API Integration:** Uses Google Gemini Pro for generating responses.

## Installation

Clone the repository:

    git clone https://github.com/your-repo/vscode-api-tester.git
    cd vscode-api-tester
Open the project in VS Code:

    code .
**Set Up Google Gemini API Key**

Obtain your Google Gemini API Key from Google AI Studio.

Create a config.js file in the root directory and add:

`module.exports = {
    GEMINI_API_KEY: "your-api-key-here"
}`

Install dependencies and compile:

    npm install
    npm run compile
Run the extension in Development Mode:
Open the Debug Panel (`Ctrl + Shift + D`)
Select "Run Extension" and press F5
A new VS Code Extension Development Host window will open.

## How to Use

Select a code snippet in VS Code.

Press `Ctrl+Shift+P` and choose "**gemini code helper**".

View AI-generated explanations directly in the editor.

## Troubleshooting

401 Unauthorized (Invalid API Key)

Ensure the API Key is correct and added in .env.

Verify that Gemini API is enabled in Google Cloud Console.

If issues persist, regenerate a new API key.

## Documentation

**Google Gemini API Docs:** Google Gemini API

**VS Code API Docs:** VS Code API


## Contributing

If you want to improve this extension:

Fork the repository

Create a new branch for your feature or fix

Submit a pull request with your changes

## License

This project is licensed under the MIT License.

## Acknowledgements

Google for the Gemini API

The VS Code Extension API team

## Enjoying the extension?

If you find this useful, feel free to star ⭐ the repository and contribute!

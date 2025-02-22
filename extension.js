const vscode = require('vscode');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const API_KEY = null;
if (!API_KEY) {
    console.error("⚠️ API Key not found! Set GEMINI_API_KEY in .env or environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function getCodeExplanation(codeSnippet, language) {
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `Explain the following ${language} code:\n${codeSnippet}` }] }]
        });
        return result.response.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error fetching explanation:", error.response?.data || error.message);
        return "⚠️ Failed to get explanation. Please check your API key and try again.";
    }
}

function generateWebviewContent(codeSnippet, explanation, language) {
    return `
    <html>
    <head>
        <style>
            body { font-family: 'Fira Code', monospace; padding: 20px; background: #1e1e1e; color: #c9d1d9; }
            h2 { color: #58a6ff; text-align: center; }
            pre { background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 14px; }
            .explanation { margin-top: 20px; padding: 15px; background: #2d333b; border-left: 5px solid #58a6ff; color: #c9d1d9; font-size: 14px; line-height: 1.5; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h2>Code Explanation (${language})</h2>
        <pre>${codeSnippet}</pre>
        <div class="explanation">${explanation}</div>
    </body>
    </html>`;
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('geminiCodeHelper.explainCode', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('🚫 No active editor found.');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const language = editor.document.languageId || "programming";

        if (!selectedText) {
            vscode.window.showInformationMessage('ℹ️ Please select some code to generate an explanation.');
            return;
        }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: '⏳ Generating explanation...'
        }, async () => {
            const explanation = await getCodeExplanation(selectedText, language);
            const panel = vscode.window.createWebviewPanel(
                'codeExplanation',
                `Gemini Code Helper - ${language} Explanation`,
                vscode.ViewColumn.Beside,
                { enableScripts: true }
            );
            panel.webview.html = generateWebviewContent(selectedText, explanation, language);
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};

📖 How to Run BizIntel AI
Follow these steps to get the application running on your local machine.

1. Extract the Files
Right-click the bizintel_ai.zip file.

Select "Extract All" (or use 7-Zip/WinRAR).

Open the extracted folder. You should see app.py, templates/, and static/.

2. Install Python
If you don't have Python installed:

Download it from python.org.

CRITICAL: During installation, make sure to check the box that says "Add Python to PATH".

3. Install Required Libraries
You don't need to create a virtual environment if you want to keep it simple. Just install the dependencies globally.

Open your Command Prompt (cmd) or Terminal.

Navigate to your project folder (e.g., cd Desktop/bizintel_ai).

Run the following command:

Bash
pip install -r requirements.txt
This will automatically install Flask, Authlib, Requests, and any other needed tools.

4. Set Up Google Login (Optional)
If you want the "Login with Google" button to work:

Open app.py in a text editor (like Notepad or VS Code).

Find the lines for client_id and client_secret.

Replace them with your credentials from the Google Cloud Console.
If you skip this, the standard Email/Password login will still work.

5. Launch the Application
In your Command Prompt/Terminal (inside the project folder), type:

Bash
python app.py
You should see a message saying: * Running on http://127.0.0.1:5000

6. View the Site
Open your web browser (Chrome, Edge, or Brave).

Type localhost:5000 in the address bar and press Enter.

Welcome to BizIntel AI! 🚀

🔑 Admin Credentials for Testing
If you want to check the Admin Monitoring tools:

Go to: http://127.0.0.1:5000/admin-login

Email: admin@bizintel.ai

Password: admin123

💡 Troubleshooting
"Python is not recognized": This means you didn't check "Add to PATH" during installation. Re-install Python or add it manually to your System Variables.

"Port 5000 is in use": Close any other Python windows or apps (like AirPlay on Mac) that might be using that port.
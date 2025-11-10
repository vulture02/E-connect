EcoConnect - Community Recycling & Awareness Platform 🌍♻️
A full-stack web application connecting people who want to give away recyclable items with recycling centers or collectors.

📋 Table of Contents

Features
Tech Stack
Prerequisites
Installation & Setup

1. MongoDB Setup
2. Firebase Setup
3. Backend Setup
4. Frontend Setup


Running the Application
Project Structure
API Endpoints
Screenshots
Troubleshooting
Future Enhancements
Contributing
License


🎯 Features
Current Features

✅ User Authentication

Google Sign-In (Firebase)
Email/Password Registration & Login
Secure session management


✅ Post Management

Create recyclable item posts
View all community posts
Delete own posts
Category filtering (Plastic, Paper, E-waste, Metal, Glass, Other)
Search functionality


✅ User Dashboard

Track total posts created
View contribution count
Impact level badges (Beginner, Medium, High)
Personal post management


✅ Responsive Design

Mobile-friendly interface
Modern UI with Tailwind CSS
Smooth animations and transitions



In Development 🚧

📸 Image upload for waste items (Cloudinary integration)
📧 Email notifications to municipal authorities
📍 Location-based post filtering
🗺️ Google Maps integration


🛠️ Tech Stack
Frontend

React (v18.2.0) - UI library
Vite - Build tool & dev server
Tailwind CSS - Styling
React Router DOM - Navigation
Axios - HTTP client
Firebase - Authentication

Backend

Spring Boot (v3.5.7) - Java framework
Java (v21) - Programming language
MongoDB - NoSQL database
Spring Data MongoDB - Database integration
Lombok - Reduce boilerplate code
Maven - Dependency management

Database

MongoDB - Document-based NoSQL database


📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher) - Download
Java JDK (v17 or higher) - Download
Maven (v3.6 or higher) - Download
MongoDB (Local or Atlas account) - Download
IntelliJ IDEA (for backend) - Download
VS Code (for frontend) - Download
Firebase Account - Sign Up


🚀 Installation & Setup
1. MongoDB Setup
Option A: MongoDB Atlas (Cloud - Recommended)

Go to MongoDB Atlas
Create a free account
Create a new cluster (M0 Free tier)
Create a database user:

Username: ecoconnect_user
Password: (generate secure password)


Add IP address to whitelist:

Go to Network Access
Add IP: 0.0.0.0/0 (for development)


Get connection string:

Click "Connect" → "Drivers"
Copy connection string
Replace <password> with your actual password



Connection string format:
mongodb+srv://ecoconnect_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecoconnect?retryWrites=true&w=majority
Option B: Local MongoDB

Install MongoDB Community Server

Windows: Download .msi installer
macOS: brew install mongodb-community@7.0
Linux: Follow official guide


Start MongoDB service

bash   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # Start "MongoDB" service from Services app

Verify installation

bash   mongosh
   # Should connect to mongodb://127.0.0.1:27017

2. Firebase Setup

Create Firebase Project

Go to Firebase Console
Click "Add project"
Project name: EcoConnect
Disable Google Analytics (optional)


Add Web App

Click the web icon </>
App nickname: EcoConnect Web
Click "Register app"


Enable Authentication

Go to Authentication → Sign-in method
Enable Google provider
Enable Email/Password provider
Add authorized domain: localhost


Get Firebase Config

Go to Project Settings → General
Scroll to "Your apps" section
Copy the firebaseConfig object




3. Backend Setup
Step 1: Clone/Create Project
bash# Create project directory
mkdir EcoConnect
cd EcoConnect
```

#### Step 2: Create Spring Boot Project in IntelliJ

1. Open IntelliJ IDEA
2. File → New → Project
3. Select **Spring Initializr**
4. Configure:
   - **Name:** `E-connect-backend`
   - **Group:** `com.E_connect`
   - **Artifact:** `E-connect-backend`
   - **Java:** `21`
   - **Packaging:** `Jar`
5. Add Dependencies:
   - Spring Web
   - Spring Data MongoDB
   - Lombok
   - Spring Boot DevTools
6. Click **Create**

#### Step 3: Project Structure

Create the following package structure:
```
src/main/java/com/E_connect/E_connect/
├── config/
│   └── CorsConfig.java
├── controller/
│   ├── PostController.java
│   └── UserController.java
├── model/
│   ├── Post.java
│   └── User.java
├── repository/
│   ├── PostRepository.java
│   └── UserRepository.java
├── service/
│   ├── PostService.java
│   └── UserService.java
└── EConnectBackendApplication.java
Step 4: Configure application.properties
Create/edit src/main/resources/application.properties:
properties# Application Configuration
spring.application.name=EcoConnect
server.port=8080

# MongoDB Configuration
# For Atlas (replace with your connection string):
spring.data.mongodb.uri=mongodb+srv://ecoconnect_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecoconnect?retryWrites=true&w=majority

# For Local MongoDB:
# spring.data.mongodb.uri=mongodb://localhost:27017/ecoconnect

# Logging
logging.level.com.E_connect.E_connect=DEBUG
logging.level.org.springframework.data.mongodb=DEBUG

# Error Handling
server.error.include-message=always
server.error.include-binding-errors=always
Step 5: Add All Backend Files
Copy all the Java files I provided earlier:

Models (Post.java, User.java)
Repositories (PostRepository.java, UserRepository.java)
Services (PostService.java, UserService.java)
Controllers (PostController.java, UserController.java)
Config (CorsConfig.java)

Step 6: Run Backend

Open the project in IntelliJ
Wait for Maven to download dependencies
Click the green Run button
Or run: mvn spring-boot:run

Backend should start on: http://localhost:8080
Test endpoint: Open browser → http://localhost:8080/api/posts

Should return: [] (empty array)


4. Frontend Setup
Step 1: Create React Project
bash# Navigate to project root
cd EcoConnect

# Create React app with Vite
npm create vite@latest ecoconnect-frontend -- --template react

# Navigate into frontend
cd ecoconnect-frontend
Step 2: Install Dependencies
bash# Install core dependencies
npm install

# Install additional packages
npm install axios react-router-dom firebase

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
Step 3: Configure Tailwind CSS
Update tailwind.config.js:
javascript/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#059669',
      }
    },
  },
  plugins: [],
}
Update src/index.css:
css@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f3f4f6;
}
Step 4: Create Folder Structure
bashcd src

# Create folders
mkdir components pages

# Windows users:
# md components
# md pages
Step 5: Create Environment File
Create .env in the frontend root:
env# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Backend API URL
VITE_API_URL=http://localhost:8080/api
```

**Replace with your actual Firebase credentials!**

#### Step 6: Add All Frontend Files

Create these files with the code I provided earlier:

**Core Files:**
- `src/firebase.js`
- `src/api.js`
- `src/App.jsx`
- `src/main.jsx`

**Components:**
- `src/components/Navbar.jsx`
- `src/components/PostCard.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/components/Loader.jsx`

**Pages:**
- `src/pages/Home.jsx`
- `src/pages/Login.jsx`
- `src/pages/CreatePost.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/NotFound.jsx`

#### Step 7: Update .gitignore

Add to `.gitignore`:
```
# Environment variables
.env
.env.local

# Dependencies
node_modules

# Build
dist
dist-ssr

# Editor
.vscode/*
.idea
.DS_Store

🎮 Running the Application
Start Backend (Terminal 1)
bashcd E-connect-backend

# Using IntelliJ: Click green Run button

# Or using Maven:
mvn spring-boot:run
Backend runs on: http://localhost:8080
Start Frontend (Terminal 2)
bashcd ecoconnect-frontend

npm run dev
```

**Frontend runs on:** `http://localhost:5173`

### Access Application

Open browser and go to: **`http://localhost:5173`**

---

## 📁 Project Structure

### Complete Directory Structure
```
EcoConnect/
│
├── E-connect-backend/              # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/E_connect/E_connect/
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── PostController.java
│   │   │   │   │   └── UserController.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── Post.java
│   │   │   │   │   └── User.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── PostRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── PostService.java
│   │   │   │   │   └── UserService.java
│   │   │   │   └── EConnectBackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
└── ecoconnect-frontend/            # React Frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── PostCard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── Loader.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── CreatePost.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── NotFound.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── firebase.js
    │   └── api.js
    ├── .env
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── README.md

🔌 API Endpoints
Posts Endpoints
MethodEndpointDescriptionGET/api/postsGet all postsGET/api/posts/{id}Get post by IDGET/api/posts/user/{email}Get posts by userGET/api/posts/category/{category}Get posts by categoryPOST/api/postsCreate new postPUT/api/posts/{id}Update postDELETE/api/posts/{id}Delete postGET/api/posts/count/{email}Count user's posts
Users Endpoints
MethodEndpointDescriptionGET/api/usersGet all usersGET/api/users/{email}Get user by emailPOST/api/usersCreate/update userPOST/api/users/{email}/incrementIncrement contributionGET/api/users/{email}/contributionsGet contribution count

📸 Screenshots
Home Page
Browse all recyclable posts from the community.
Login Page
Secure authentication with Google or Email/Password.
Create Post
Post new recyclable items with details.
Dashboard
Track your contributions and manage posts.

🐛 Troubleshooting
Common Issues & Solutions
1. Backend Won't Start
Error: "Port 8080 already in use"
properties# Solution: Change port in application.properties
server.port=8081

# Update frontend api.js:
VITE_API_URL=http://localhost:8081/api
2. MongoDB Connection Failed
Error: "MongoTimeoutException"
bash# Check if MongoDB is running:
mongosh

# If not running:
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: Start MongoDB service
3. CORS Errors in Browser
Error: "CORS policy blocked"
java// Verify CorsConfig.java exists and has:
config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
Must restart backend after adding CORS config!
4. Firebase Authentication Errors
Error: "Firebase: Error (auth/invalid-api-key)"
bash# Solution:
1. Check .env file has correct Firebase credentials
2. Restart dev server: npm run dev
3. Clear browser cache
5. Tailwind CSS Not Working
Error: Styles not applying
bash# Solution:
1. Check index.css has @tailwind directives
2. Check tailwind.config.js content paths
3. Restart dev server
6. Environment Variables Not Loading
Error: undefined when accessing import.meta.env.VITE_*
bash# Solution:
1. Ensure variables start with VITE_
2. Restart dev server (MUST restart!)
3. Check .env is in frontend root

🎯 Usage Guide
For New Users

Sign Up

Click "Login" → "Don't have an account? Sign Up"
Enter name, email, password
Or use "Continue with Google"


Browse Posts

Home page shows all community posts
Use category filters (Plastic, Paper, etc.)
Use search bar to find specific items


Create Post

Click "Create Post" in navbar
Fill in title, description, category, location
Submit to share with community


Track Impact

Click "Dashboard" to see your statistics
View total posts and contribution count
Check your impact level badge




🚀 Future Enhancements
Planned Features

 Image Upload (Cloudinary integration)

Upload photos of waste items
Preview before posting
Cloud storage for images


 Email Notifications

Notify municipal authorities of new posts
HTML email templates
Automatic notifications on post creation


 Location Features

Google Maps integration
Location-based post filtering
Distance calculation


 Advanced Filtering

Filter by distance
Date range filtering
Multi-category selection


 User Profiles

Public user profiles
Contribution history
Achievement badges


 Real-time Updates

WebSocket integration
Live post updates
Chat/messaging system


 Mobile App

React Native mobile app
Push notifications
Camera integration




🤝 Contributing
Contributions are welcome! Here's how you can help:

Fork the repository
Create a feature branch

bash   git checkout -b feature/AmazingFeature

Commit your changes

bash   git commit -m 'Add some AmazingFeature'

Push to the branch

bash   git push origin feature/AmazingFeature

Open a Pull Request

Development Guidelines

Follow existing code style
Write clean, documented code
Test your changes thoroughly
Update README if needed


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors

Your Name -Amith P


🙏 Acknowledgments

Firebase for authentication services
MongoDB for database
Spring Boot for backend framework
React & Vite for frontend
Tailwind CSS for styling
All contributors and supporters


📞 Support
If you have any questions or issues:

📧 Email: amithp0210@gmail.com
🐛 Issues: GitHub Issues
💬 Discussions: GitHub Discussions


🌟 Show Your Support
Give a ⭐️ if this project helped you!

Happy Recycling! 🌍♻️💚

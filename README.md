Celata Demo Application
Overview
Celata is a React Native demo application demonstrating basic user authentication flows, profile management, and settings with persistent local storage. This app is built with Expo and uses AsyncStorage for local data persistence.

Features
Landing / Loading Page
Displays splash screen and logo on app startup with automatic navigation to login page after a delay.

Authentication

Login Page with email and password validation

Signup Page with username, email, phone number, and password inputs

Verification Page to enter a 6-digit PIN sent on signup

Logout functionality to clear current user session

Authentication Context managing signup, login, logout, verification, and user state

Home Page
Main app landing page post-login (implemented as a tab navigation screen).

User Profile Page
Allows user profile viewing and updates (username, phone, password).

Language Settings Page
Enables user to change the app language (placeholder for localization features).

CRUD Operations for User

Create user on signup (with PIN verification)

Update user profile info

Read current user data on app load

Logout (clearing user session)

Verification PIN Workflow

PIN is generated on signup and stored temporarily

User verifies the PIN to complete registration

PIN verification prevents unverified users from accessing the app

AsyncStorage Integration
Local storage is used for persisting users and session data to maintain login state across app restarts.

Tech Stack
React Native (Expo)

React Context API for state management

AsyncStorage for local data persistence

Expo Router for navigation

React Native components for UI

Folder Structure
bash
Copy
Edit
/assets              # Images and icons
/context             # AuthContext managing authentication logic
/screens             # App screens (Login, Signup, Verify, Home, Profile, Settings, Landing)
Usage
Clone the repository.

Run npm install or yarn to install dependencies.

Start the Expo development server with expo start.

Use an emulator or physical device to open the app.

Sign up to create a new user (a verification PIN will be generated and displayed for demo purposes).

Verify your account using the PIN.

Log in to access the app.

Explore profile editing, language settings, and logout.


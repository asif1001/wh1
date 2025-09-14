# WBA Dashboard - Shipment Management System

A comprehensive web-based dashboard for managing shipments, tasks, and complaints with Firebase integration and modern responsive design.

## 🚀 Features

- **Dashboard Overview**: Real-time analytics and key metrics
- **Shipment Monitor**: Track and manage shipments with detailed information
- **Task Manager**: Organize and monitor tasks with priority levels
- **Complaint Report**: Handle customer complaints and feedback
- **Responsive Design**: Mobile-first approach with modern UI
- **Firebase Integration**: Real-time database and authentication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0 or higher)
- **Git** for version control
- **Firebase CLI** for deployment
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/asif1001/wba-dashboard.git
cd wba-dashboard
```

### 2. Install Dependencies

This project uses CDN-based dependencies, but you can also install them locally:

```bash
# Optional: Install local development server
npm install -g http-server

# Or use Python's built-in server
python -m http.server 3000
```

### 3. Start Development Server

```bash
# Using Python (recommended)
python -m http.server 3000

# Or using Node.js http-server
http-server -p 3000

# Or using Live Server extension in VS Code
```

Access the application at `http://localhost:3000`

## 🔥 Firebase Configuration

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "wba-dashboard")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Add authorized domains if deploying to custom domain

### 3. Setup Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Choose **Start in test mode** (for development)
3. Select your preferred location
4. Create the following collections:
   - `shipments`
   - `tasks`
   - `complaints`
   - `users`

### 4. Get Firebase Configuration

1. Go to **Project Settings** > **General**
2. Scroll down to "Your apps" section
3. Click **Web app** icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 5. Environment Variables

Create a `firebase-config.js` file in your project root:

```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 6. Security Rules

Update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /shipments/{document} {
      allow read, write: if request.auth != null;
    }
    match /tasks/{document} {
      allow read, write: if request.auth != null;
    }
    match /complaints/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### GitHub Repository Setup

#### 1. Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: WBA Dashboard setup"

# Add remote origin
git remote add origin https://github.com/your-username/wba-dashboard.git

# Push to main branch
git push -u origin main
```

#### 2. Branch Management Guidelines

```bash
# Create development branch
git checkout -b development

# Create feature branches
git checkout -b feature/shipment-tracking
git checkout -b feature/task-management
git checkout -b bugfix/authentication-issue

# Merge workflow
git checkout development
git merge feature/shipment-tracking
git push origin development

# Production release
git checkout main
git merge development
git tag v1.0.0
git push origin main --tags
```

### Firebase Hosting Deployment

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login and Initialize

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Hosting: Configure files for Firebase Hosting
# - Use existing project
# - Public directory: . (current directory)
# - Single-page app: No
# - Automatic builds and deploys with GitHub: Yes (optional)
```

#### 3. Deploy

```bash
# Deploy to Firebase Hosting
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy with custom message
firebase deploy -m "Updated shipment tracking features"
```

### GitHub Pages Deployment (Alternative)

1. Go to repository **Settings** > **Pages**
2. Select source: **Deploy from a branch**
3. Choose **main** branch
4. Select **/ (root)** folder
5. Click **Save**

## 📁 Project Structure

```
wba-dashboard/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── shipments.html          # Shipment management
├── tasks.html             # Task management
├── complaints.html        # Complaint handling
├── add-shipment.html      # Add new shipment form
├── style.css              # Custom styles
├── firebase-config.js     # Firebase configuration
├── manifest.json          # PWA manifest
├── README.md              # Project documentation
├── .gitignore            # Git ignore rules
└── assets/               # Static assets
    ├── icons/
    └── images/
```

## 📦 Dependencies

### CDN Dependencies (Already Included)

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- AOS (Animate On Scroll) -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<!-- Feather Icons -->
<script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
```

### Optional Local Dependencies

```bash
# Development server
npm install -g http-server

# Firebase SDK (if using local imports)
npm install firebase

# Development tools
npm install -g firebase-tools
```

## 🎯 Usage Examples

### 1. User Authentication

```javascript
// Login example
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Login error:', error);
    }
});
```

### 2. Adding Shipments

```javascript
// Add shipment to Firestore
const addShipment = async (shipmentData) => {
    try {
        const docRef = await addDoc(collection(db, 'shipments'), {
            ...shipmentData,
            createdAt: new Date(),
            status: 'pending'
        });
        console.log('Shipment added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding shipment: ', error);
    }
};
```

### 3. Real-time Data Updates

```javascript
// Listen for shipment updates
const unsubscribe = onSnapshot(collection(db, 'shipments'), (snapshot) => {
    const shipments = [];
    snapshot.forEach((doc) => {
        shipments.push({ id: doc.id, ...doc.data() });
    });
    updateShipmentDisplay(shipments);
});
```

## 🔧 Configuration

### Default Login Credentials

- **Email**: `admin@wba.com`
- **Password**: `password123`

### Customization

1. **Colors**: Modify Tailwind classes or add custom CSS
2. **Logo**: Replace icon references in HTML files
3. **Branding**: Update titles and company names
4. **Features**: Add new pages following existing structure

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Check Firebase configuration
   - Verify project ID and API keys
   - Ensure Firestore rules allow access

2. **Authentication Issues**
   - Enable Email/Password in Firebase Console
   - Check authorized domains
   - Verify user exists in Firebase Auth

3. **Deployment Issues**
   - Check Firebase CLI installation
   - Verify project permissions
   - Ensure all files are committed to Git

### Debug Mode

Enable debug logging:

```javascript
// Add to your JavaScript files
console.log('Debug mode enabled');
firebase.firestore.setLogLevel('debug');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: support@wba.com
- **Documentation**: [Project Wiki](https://github.com/your-username/wba-dashboard/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/wba-dashboard/issues)

---

**Built with ❤️ by the WBA Team**
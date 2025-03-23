# 🌍 Globetrotter

**Globetrotter** is an interactive quiz game where players test their knowledge of famous global destinations through clues and challenges. Compete with friends, track high scores, and explore the world from your screen!

## 🚀 Features

- 🏆 **High Score Tracking**: Save and update your personal best.
- 🎭 **Dynamic Quizzes**: Randomized destination-based questions.
- 💡 **Fun Facts**: Learn interesting tidbits about each location.
- 🎨 **Attractive UI**: Smooth animations and engaging design.
- 📢 **Social Sharing**: Challenge friends by sharing your score.
- 🔒 **Authentication**: Secure login with NextAuth.js.

---

## 📂 Project Structure

```
└── amaymani-globetrotter/
    ├── README.md               # Project documentation
    ├── components.json         # Component metadata
    ├── jsconfig.json           # JavaScript configuration
    ├── next.config.mjs         # Next.js configuration
    ├── package.json            # Dependencies and scripts
    ├── postcss.config.mjs      # PostCSS configuration
    ├── public/                 # Static assets
    └── src/
        ├── components/         # UI components
        │   ├── Fact.js         # Displays interesting facts
        │   ├── Hero.js         # Landing page header
        │   ├── Navbar.js       # Navigation bar
        │   ├── Quiz.js         # Quiz logic and UI
        │   ├── ScoreCard.js    # Displays user scores
        │   ├── magicui/        # Special effects
        │   │   └── confetti.jsx # Celebration animation
        │   └── ui/             # Reusable UI elements
        │       ├── badge.jsx
        │       ├── bubble_effect.jsx
        │       ├── button.jsx
        │       ├── card.jsx
        │       ├── dialog.jsx
        │       └── input.jsx
        ├── lib/
        │   ├── mongo.js         # MongoDB connection
        │   └── utils.js         # Utility functions
        ├── models/
        │   └── user.js          # User model schema
        ├── pages/              # Next.js pages
        │   ├── _app.js         # App entry point
        │   ├── _document.js    # Custom document structure
        │   ├── index.js        # Home page
        │   └── api/            # Backend API routes
        │       ├── hello.js
        │       ├── highscore.js # High score management
        │       ├── invite.js    # Invitation links
        │       ├── login.js     # User login
        │       ├── random-dest.js # Random destination generator
        │       └── auth/
        │           └── [...nextauth].js # Authentication
        └── styles/
            └── globals.css     # Global styles
```

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, MongoDB, Mongoose
- **Authentication:** NextAuth.js
- **State Management:** React Hooks
- **Hosting:** Vercel/AWS
- **Styling:** Tailwind CSS, PostCSS

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
$ git clone https://github.com/your-username/globetrotter.git
$ cd globetrotter
```

### **2️⃣ Install Dependencies**
```sh
$ npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env.local` file in the root directory and add:
```
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### **4️⃣ Run the Application**
```sh
$ npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 API Endpoints

### **User High Score Management**
- **GET /api/highscore?email={email}** → Fetch user's high score.
- **POST /api/highscore** → Update high score (if higher).

### **Authentication**
- **POST /api/auth/login** → Login user.
- **GET /api/auth/session** → Fetch current session.

### **Quiz & Gameplay**
- **GET /api/random-dest** → Fetch a random quiz destination.

---

## 🎨 UI Highlights
- 🌟 **Confetti Effect** on high score achievements.
- 🎭 **Bubble Animations** for interactive elements.

---


## 📜 License
This project is licensed under the **MIT License** – feel free to modify and share!

---

## 💬 Feedback & Support
Have suggestions or issues? Reach out via:
- GitHub Issues
- Email: amaytripathi19@gmail.com

Happy Gaming! 🎉


# Ayomide & Adedayo — Wedding Website (React)

## 📁 Project Structure
```
wedding-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Details.jsx
│   │   ├── RSVP.jsx
│   │   ├── Wishes.jsx
│   │   ├── Gift.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

## 🚀 How to Run

### Step 1 — Install Node.js
Download from https://nodejs.org (choose the LTS version)

### Step 2 — Open the project in VS Code
File → Open Folder → select the `wedding-app` folder

### Step 3 — Open the terminal in VS Code
Terminal → New Terminal

### Step 4 — Install dependencies
```bash
npm install
```

### Step 5 — Start the dev server
```bash
npm start
```
The site will open automatically at http://localhost:3000

---

## 🔗 Connect Google Sheets

Open `src/components/RSVP.jsx` and replace line 5:
```js
const SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
with your actual Google Apps Script deployment URL.

---

## 🌐 Deploy to Netlify

### Option A — Drag & Drop (easiest)
1. Run `npm run build` in the terminal
2. This creates a `build/` folder
3. Go to app.netlify.com/drop
4. Drag the `build/` folder onto the page
5. Done — your site is live!

### Option B — Connect GitHub
1. Push this project to a GitHub repo
2. Go to netlify.com → New Site → Import from GitHub
3. Build command: `npm run build`
4. Publish directory: `build`
5. Deploy!

# Md. Farid Hossen Rehad Portfolio

Complete animated portfolio + admin dashboard built with React, Vite, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, JWT auth, Multer, and ImgBB.

## Create From Scratch Commands

```cmd
mkdir farid-portfolio
cd farid-portfolio
npm create vite@latest frontend -- --template react
mkdir backend
cd backend
npm init -y
```

## Install Commands

```cmd
cd backend
npm install express mongoose cors dotenv jsonwebtoken bcryptjs multer morgan

cd ..\frontend
npm install react-router-dom axios framer-motion lucide-react react-hook-form react-hot-toast
npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react vite
```

## MongoDB Setup

Local MongoDB:

```cmd
mongod --dbpath C:\data\db
```

Or use MongoDB Atlas and replace `MONGODB_URI` in `backend/.env`.

## Environment

`backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_clone
JWT_SECRET=change-this-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me-now
IMGBB_API_KEY=
CLIENT_URL=http://localhost:5173
```

`frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Commands

```cmd
cd backend
npm run dev
```

```cmd
cd frontend
npm run dev
```

Open:

- Public site: `http://localhost:5173`
- Admin: `http://localhost:5173/admin/login`
- API health: `http://localhost:5000/api/health`

Admin login uses `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The backend seeds the default admin and theme on startup.

## Project Structure

```text
backend/
  src/
    config/
      db.js
      imgbb.js
    controllers/
      authController.js
      projectController.js
      blogController.js
      certificateController.js
      storyController.js
      themeController.js
      uploadController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
      uploadMiddleware.js
    models/
      Admin.js
      Project.js
      Blog.js
      Certificate.js
      Story.js
      Theme.js
    routes/
      authRoutes.js
      projectRoutes.js
      blogRoutes.js
      certificateRoutes.js
      storyRoutes.js
      themeRoutes.js
      uploadRoutes.js
    utils/
      generateToken.js
      slugify.js
      seedAdmin.js
      seedTheme.js
    app.js
    server.js
  .env
  .env.example
  package.json

frontend/
  src/
    api/
      axiosInstance.js
    components/
      common/
      layout/
      home/
      dashboard/
    context/
      AuthContext.jsx
      ThemeContext.jsx
    pages/
      public/
      dashboard/
    routes/
      ProtectedRoute.jsx
    data/
      skills.js
      socials.js
    App.jsx
    main.jsx
    index.css
  .env
  .env.example
  package.json
  tailwind.config.js
```

## Production Build

```cmd
cd frontend
npm run build

cd ..\backend
npm start
```

## Deployment

Backend on Render or Railway:

1. Create a new Node web service from this repo.
2. Set root directory to `backend`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add all backend environment variables.
6. Use MongoDB Atlas for `MONGODB_URI`.
7. Add the deployed frontend URL to `CLIENT_URL`.

Frontend on Vercel:

1. Import the repo.
2. Set root directory to `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_API_URL=https://your-backend-domain.com/api`.

## Verification

Completed checks:

```cmd
cd frontend
npm run build
```

```cmd
cd backend
node -e "import('./src/app.js').then(() => console.log('backend app import ok'))"
```

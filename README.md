# 🚀 AI-Powered 3D Interactive Portfolio

A cutting-edge, professional portfolio website featuring a **3D interactive galaxy environment**, glassmorphism UI, and an **AI Chat Assistant** powered by **Groq (Llama 3.3)**.

![Portfolio Preview](https://via.placeholder.com/1200x600?text=3D+Galaxy+Portfolio+Preview)

## 🌟 Key Features
- **Interactive 3D Universe**: Explorable galaxy built with Three.js/Fiber, featuring parallax effects, floating station nodes, and smooth camera transitions.
- **AI Career Assistant**: A custom chat widget powered by **Groq** (Llama 3.3) that acts as your professional proxy, answering questions based strictly on your Supabase-stored resume.
- **Cinematic Scroll Sync**: The 3D camera smoothly zooms and pans as the user scrolls, creating a premium depth effect.
- **Dynamic Navigation**: 3D stations synchronized with HTML sections. Navbar links and 3D nodes use unified smooth-scroll logic.
- **Full Stack Architecture**: Production-ready FastAPI backend with Supabase (PostgreSQL) and a Vite-powered React frontend.

## 🛠️ Tech Stack

### **Frontend**
- **Core**: React 18, TypeScript, Vite
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Variable System)

### **Backend**
- **Framework**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Groq SDK (Llama 3.3 70B)
- **Production Server**: Gunicorn + Uvicorn

---

## 🚀 Quick Start

### **1. Prerequisites**
- Node.js (v18+)
- Python (3.10+)
- Supabase Account
- Groq API Key ([console.groq.com](https://console.groq.com/keys))

### **2. Supabase Configuration**
Create a table named `resume` in your Supabase project:
```sql
create table resume (
  type text primary key,
  name text,
  tagline text,
  about text,
  skills jsonb,
  projects jsonb,
  contact jsonb
);
```

### **3. Backend Setup**
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Unix: source venv/bin/activate
pip install -r requirements.txt
pip install groq
```
Create a `.env` in the `backend` folder:
```env
GROQ_API_KEY=your_groq_api_key
PORT=8005
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
```
Seed and Run:
```bash
python -m database.seed
python main.py
```

### **4. Frontend Setup**
```bash
cd frontend
npm install
```
Create a `.env` in the `frontend` folder:
```env
VITE_API_URL=http://localhost:8005/api
```
Run:
```bash
npm run dev
```

---

## 🌐 Deployment

### **Backend (Render)**
- **Runtime**: Python 3
- **Build Command**: `pip install -r requirements.txt && pip install groq`
- **Start Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`
- **Port**: 8005

### **Frontend (Vercel)**
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Install Command**: `npm install --legacy-peer-deps`
- **Env Var**: `VITE_API_URL` (Point to your Render URL)

---

## 📄 License
This project is licensed under the MIT License.

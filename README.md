# Sumer Academic Assistant 🏛️
### University of Baghdad Academic Portal

A high-performance, bilingual, multi-role academic management system built for the University of Baghdad, optimized for the Bologna Process.

## 🚀 Key Features

### 👤 Multi-Role Architecture
- **Student Portal**: Access courses, grades, weekly schedules, financial statements, and housing requests.
- **Lecturer Suite**: Manage attendance via dynamic QR codes, digital gradebooks (Bologna compliant), and research tracking.
- **Head of Department (Admin)**: Real-time department analytics, staff workload management, and quality assurance (ABET readiness).

### 🌍 Bilingual & Accessible
- Full **Arabic & English** support with instant RTL/LTR switching.
- High-contrast, accessibility-first design utilizing the **Cairo** font.

### 📊 Bologna Process Integration
- Real-time **ECTS (European Credit Transfer System)** tracking.
- Automated daily assessment calculations (40%) and final grade management (60%).
- "At-Risk" student detection based on attendance and performance.

### 🏛️ Campus Services
- **Smart Attendance**: Student presence recorded via one-time QR scanning.
- **Interactive Campus Map**: Navigate university facilities with MapLibre GL.
- **Service Modules**: Housing, Career Services, Research & Innovation, and Faculty HR.

## 🛠️ Technical Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Maps**: [MapLibre GL](https://maplibre.org/)
- **Language**: TypeScript

## ⚡ Performance Optimization

- **Edge Deployment Ready**: Configured for static export to be served from global Edge CDNs, reducing latency to <50ms.
- **Instant Navigation**: Utilizes Next.js prefetching and global concurrent loading states (`loading.tsx`) for a seamless UX.
- **Optimized Rendering**: Background mesh gradients and glassmorphism styling use `will-change` hints for smooth 60FPS transitions.

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📄 License
Custom proprietary software for the University of Baghdad academic ecosystem.

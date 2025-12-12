# 🌍 ZamTour - Kazakhstan Luxury Travel Platform

A premium, multilingual travel website showcasing the beauty of Kazakhstan with an intuitive admin panel for content management.

![ZamTour](https://img.shields.io/badge/Status-Active-success) ![React](https://img.shields.io/badge/React-19.2.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue) ![Supabase](https://img.shields.io/badge/Supabase-Integrated-green)

## ✨ Features

### 🌐 Multilingual Support
- **3 Languages**: English, Arabic (RTL), and Russian
- Seamless language switching with persistent preferences
- RTL layout support for Arabic

### 🏔️ Destination Management
- Browse 25+ curated destinations across Kazakhstan
- Category filtering (Essentials, Outdoors, Shopping, Culture)
- Advanced search functionality
- Interactive image galleries for each location
- Detailed destination pages with ratings and reviews

### 📦 Travel Packages
- Multiple package types: Couples, Family, Friends, Solo
- Standard and Premium tiers
- Detailed itineraries with day-by-day breakdowns
- Customizable pricing and features
- WhatsApp integration for booking inquiries

### 🔐 Admin Panel
- Secure password-protected access
- Real-time destination CRUD operations
- Package management and pricing control
- Gallery image management (upload/URL)
- WhatsApp contact number configuration
- Mobile-responsive admin interface

### 💾 Database Integration
- **Supabase** backend for data persistence
- Real-time data synchronization
- Automatic seeding of default content
- Error handling and fallback mechanisms

## 🛠️ Tech Stack

- **Frontend**: React 19.2.1 + TypeScript
- **Build Tool**: Vite 6.2.0
- **Routing**: React Router DOM 7.10.1
- **Backend**: Supabase (PostgreSQL + Storage)
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Iconify

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/salmanMugharbel/ZamTour.git
cd ZamTour
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Supabase

#### Create a Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

#### Set Up Database Tables
Run the SQL script in your Supabase SQL Editor:
```bash
# The schema is in supabase_schema.sql
```

#### Create Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app!

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
ZamTour/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page
│   ├── Explore.tsx     # Destinations listing
│   ├── PlaceDetails.tsx # Individual destination
│   ├── Packages.tsx    # Package selection
│   ├── MyPackage.tsx   # Package details
│   ├── About.tsx       # About page
│   └── Admin.tsx       # Admin dashboard
├── public/images/      # Static destination images
├── constants.ts        # Destination data
├── translations.ts     # Multilingual content
├── DataContext.tsx     # Global state & Supabase integration
├── LanguageContext.tsx # Language management
├── supabaseClient.ts   # Supabase configuration
└── types.ts            # TypeScript definitions
```

## 🔑 Admin Access

- **URL**: `/admin`
- **Password**: `admin123` (⚠️ Change this in production!)

### Admin Features:
- Add/Edit/Delete destinations
- Manage destination galleries
- Update package details and pricing
- Configure WhatsApp contact number

## 🌍 Deployment

### Recommended Platforms:
- **Vercel** (Recommended)
- **Netlify**
- **Railway**

### Environment Variables for Deployment:
Make sure to add these in your deployment platform:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Salman Mugharbel**
- GitHub: [@salmanMugharbel](https://github.com/salmanMugharbel)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for Kazakhstan Tourism

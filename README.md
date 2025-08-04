# 🚀 Website Idea Generator

A full-stack AI-powered application that transforms website concepts into structured section recommendations. Built with modern web technologies and featuring intelligent section generation with randomized combinations for unique results.

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)

## ✨ Features

- **Smart Section Generation**: 5 website categories (Restaurant, Bakery, Portfolio, Business, E-commerce) with 4-5 variations per section
- **Modern UI/UX**: Dark/light mode, responsive design, glass morphism effects, micro-interactions
- **Technical Excellence**: Full TypeScript, comprehensive error handling, loading states, form validation
- **Data Persistence**: MongoDB storage with RESTful API

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **NestJS** - Node.js framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Class Validator** - Input validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud instance)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd vibecodingjob
   
   # Backend setup
   cd backend
   npm install
   
   # Frontend setup
   cd ../frontend
   npm install
   ```

2. **Environment Configuration**
   
   Backend (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/website-idea-generator
   PORT=3001
   ```
   
   Frontend (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start the application**
   ```bash
   # Start backend (from backend directory)
   npm run start:dev
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
vibecodingjob/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── controllers/     # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── schemas/         # MongoDB schemas
│   │   └── dto/            # Data transfer objects
│   └── package.json
├── frontend/               # Next.js Client Application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Theme)
│   │   └── hooks/          # Custom React hooks
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/website-ideas` | Create new website idea |
| GET | `/api/website-ideas` | Get all website ideas |
| GET | `/api/website-ideas/:id` | Get specific website idea |
| DELETE | `/api/website-ideas/:id` | Delete website idea |
| GET | `/api/website-ideas/meta/website-types` | Get available website types |
| GET | `/api/website-ideas/health/check` | Health check endpoint |

## 💡 How It Works

1. **User Input**: User describes their website concept
2. **Smart Analysis**: Backend analyzes keywords to determine website type (restaurant, bakery, portfolio, business, e-commerce)
3. **Section Generation**: Generates 3 relevant sections (Hero, About/Features, Contact) with random variations
4. **Data Storage**: Saves to MongoDB for persistence
5. **UI Display**: Beautiful preview with responsive section cards

## 🎨 Key Features

### Section Generation Logic
- **Keyword Detection**: Analyzes input for category-specific terms
- **Random Combinations**: Each category has multiple variations to ensure unique results
- **Consistent Output**: Always returns 3 structured sections

### Design System
- **Responsive Design**: Works across all screen sizes
- **Theme Support**: Seamless dark/light mode switching
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Modern UI**: Glass morphism effects and smooth animations

## 🐛 Troubleshooting

### Common Issues
- **MongoDB Connection**: Ensure MongoDB is running locally or check cloud connection string
- **Port Conflicts**: Backend uses port 3001, frontend uses port 3000
- **Environment Variables**: Verify all required env files are created

## 🔮 Future Enhancements

- AI integration with OpenAI/Claude APIs
- User authentication and personal idea management
- Advanced export options (PDF, code generation)
- Team collaboration features
- More sophisticated section templates

## 🙏 Acknowledgments

Built as part of the Stunning Technical Challenge, demonstrating AI-assisted development workflows and modern full-stack architecture.

---

**Built with ❤️ using AI-assisted development**

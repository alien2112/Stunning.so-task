# 🚀 Website Idea Generator

A full-stack AI-powered application that transforms website concepts into structured section recommendations. Built with modern web technologies and featuring intelligent section generation with randomized combinations for unique results.

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)

## ✨ Features

### 🎯 **Smart Section Generation**
- **5 Website Categories**: Restaurant, Bakery, Portfolio, Business, E-commerce
- **Random Combinations**: Each category has 4-5 variations per section type
- **Intelligent Detection**: Advanced keyword analysis determines website type
- **Consistent Output**: Always returns 3 sections (Hero, About/Features, Contact)

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Seamless theme switching with CSS variables
- **Responsive Design**: Perfect centering across all screen sizes
- **Glass Morphism**: Modern visual effects with backdrop blur
- **Micro-interactions**: Smooth animations and hover effects
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### ⚡ **Technical Excellence**
- **TypeScript**: Full type safety across frontend and backend
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Loading States**: Enhanced loading indicators with progress feedback
- **Form Validation**: Real-time validation with helpful error messages
- **API Documentation**: Well-structured REST endpoints

## 🏗️ Project Structure

```
vibecodingjob/
├── backend/                    # NestJS API Server
│   ├── src/
│   │   ├── controllers/        # API endpoints
│   │   ├── services/          # Business logic
│   │   ├── schemas/           # MongoDB schemas
│   │   ├── dto/               # Data transfer objects
│   │   └── app.module.ts      # Main application module
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Next.js Client Application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   ├── components/        # Reusable UI components
│   │   ├── contexts/          # React contexts (Theme)
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Utility functions
│   ├── tailwind.config.ts     # Tailwind configuration
│   ├── package.json
│   └── next.config.ts
│
└── README.md                   # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **MongoDB Atlas** account (cloud database)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd vibecodingjob
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with MongoDB connection
echo "MONGODB_URI=mongodb+srv://your-credentials@cluster0.mongodb.net/" > .env
echo "PORT=3001" >> .env

# Start development server
npm run start:dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Start development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/website-ideas/health/check

## 🔧 Configuration

### Backend Configuration
```bash
# backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3001
NODE_ENV=development
```

### Frontend Configuration
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📚 API Documentation

### Core Endpoints

#### `POST /api/website-ideas`
Create a new website idea with generated sections.
```json
{
  "prompt": "Modern bakery with custom cakes"
}
```

#### `GET /api/website-ideas`
Retrieve all stored website ideas.

#### `GET /api/website-ideas/:id`
Get a specific website idea by ID.

#### `DELETE /api/website-ideas/:id`
Delete a website idea.

### Meta Endpoints

#### `GET /api/website-ideas/meta/website-types`
Get all available website types with descriptions.

#### `GET /api/website-ideas/health/check`
Health check endpoint for monitoring.

## 🎨 Design System

### Color Scheme
The application uses CSS variables for consistent theming:

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #2563eb;
  --muted: #f8fafc;
  /* ... and more */
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --primary: #3b82f6;
  /* ... dark variants */
}
```

### Typography
- **Primary Font**: Inter (clean, modern sans-serif)
- **Monospace Font**: JetBrains Mono (code elements)
- **Font Sizes**: Responsive scale (16px base, up to 36px headers)

### Responsive Breakpoints
```css
xs: 475px   /* Extra small devices */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

## 🧠 Section Generation Logic

### Website Type Detection
The system analyzes user input for keywords:

```typescript
const websiteTypes = {
  'restaurant': ['restaurant', 'food', 'dining', 'cafe', 'bar'],
  'bakery': ['bakery', 'cake', 'bread', 'pastry', 'dessert'],
  'portfolio': ['portfolio', 'designer', 'developer', 'artist'],
  'business': ['business', 'company', 'corporate', 'startup'],
  'ecommerce': ['shop', 'store', 'ecommerce', 'buy', 'sell']
}
```

### Random Section Selection
Each website type has multiple variations:
- **5 Hero options** (different messaging approaches)
- **5 About options** (various storytelling angles)  
- **5 Feature options** (different benefit focuses)
- **4 Contact options** (various engagement styles)

The system randomly selects one from each category to create unique combinations.

## 🔒 Security & Best Practices

### Backend Security
- **Input Validation**: Using class-validator decorators
- **Error Handling**: Comprehensive try-catch with proper HTTP status codes
- **Logging**: Structured logging with NestJS Logger
- **Type Safety**: Full TypeScript implementation

### Frontend Security
- **XSS Prevention**: React's built-in protection
- **Input Sanitization**: Form validation and limits
- **Environment Variables**: Secure API URL configuration
- **HTTPS Ready**: Production deployment ready

## 🧪 Testing the Application

### Manual Testing Scenarios

1. **Basic Functionality**
   ```
   Input: "Modern restaurant website"
   Expected: 3 restaurant-specific sections with unique names
   ```

2. **Random Combinations**
   ```
   Multiple submissions with same input should yield different section combinations
   ```

3. **Theme Switching**
   ```
   Toggle between light/dark mode - all elements should adapt
   ```

4. **Responsive Design**
   ```
   Test on mobile (375px), tablet (768px), desktop (1200px+)
   ```

5. **Error Handling**
   ```
   - Submit empty form
   - Network disconnection
   - Invalid server responses
   ```


## 🔄 Development Workflow

### Adding New Website Types
1. Update `SectionGeneratorService.sectionVariations`
2. Add keyword detection logic
3. Create 4-5 variations for each section type
4. Test with various input prompts

### Modifying UI Components
1. Follow CSS variable naming convention
2. Ensure responsive design principles
3. Test both light and dark themes
4. Validate accessibility requirements





## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **NestJS Team** for the powerful backend framework
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible document database
- **Vercel** for seamless deployment platform

---

**Built with ❤️ using AI-assisted development**
- **Print Functionality**: Export generated sections
- **Data Persistence**: All ideas stored in MongoDB

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

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibecodingjob
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Backend (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/website-idea-generator
   PORT=3001
   ```
   
   Frontend (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the backend**
   ```bash
   cd backend
   npm run start:dev
   ```

7. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
vibecodingjob/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── services/        # Business logic
│   │   ├── schemas/         # MongoDB schemas
│   │   ├── dto/            # Data transfer objects
│   │   └── modules/        # Feature modules
│   └── ...
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   └── ...
└── README.md
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/website-ideas` | Create new website idea |
| GET | `/api/website-ideas` | Get all website ideas |
| GET | `/api/website-ideas/:id` | Get specific website idea |
| DELETE | `/api/website-ideas/:id` | Delete website idea |

## 💡 How It Works

1. **User Input**: User describes their website concept
2. **Smart Analysis**: Backend analyzes keywords to determine website type
3. **Section Generation**: Generates 3 relevant sections based on templates
4. **Data Storage**: Saves to MongoDB for persistence
5. **UI Display**: Beautiful preview with section cards

## 🎨 Design Decisions

### Architecture
- **Separation of Concerns**: Clear separation between frontend and backend
- **Modular Structure**: Both apps organized in logical modules
- **Type Safety**: Full TypeScript implementation

### UI/UX
- **Progressive Enhancement**: Form → Loading → Results flow
- **Accessible Design**: Proper ARIA labels and keyboard navigation
- **Responsive Layout**: Works on all screen sizes
- **Visual Feedback**: Loading states, error handling, success states

### Data Structure
```typescript
interface WebsiteIdea {
  _id: string;
  prompt: string;
  sections: Section[];
  createdAt: Date;
}

interface Section {
  id: string;
  name: string;
  description: string;
  type: string;
}
```

## 🚦 Development Process

This project was built using AI-assisted development tools to demonstrate:
- **Rapid Prototyping**: Quick setup and iteration
- **Code Quality**: Clean, maintainable code structure
- **Best Practices**: Following industry standards
- **Problem Solving**: Debugging and optimization

## 🔮 Future Enhancements

- **AI Integration**: Connect to actual AI services (OpenAI, Claude)
- **Advanced Templates**: More sophisticated section generation
- **User Accounts**: Save and manage personal ideas
- **Export Options**: PDF, JSON, or code generation
- **Collaboration**: Share ideas with teams


## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux
```

### Port Conflicts
- Backend runs on port 3001
- Frontend runs on port 3000
- Make sure ports are available


## 📝 Notes

- **Database**: Uses local MongoDB by default
- **Validation**: Input validation on both client and server
- **Error Handling**: Comprehensive error handling throughout
- **Performance**: Optimized for fast loading and responsiveness

## 🙏 Acknowledgments

Built as part of the Stunning Technical Challenge, demonstrating AI-assisted development workflows and modern full-stack architecture.

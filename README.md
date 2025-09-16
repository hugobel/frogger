# 🐸 Frogger - Modern Loan Management System

A comprehensive loan management application built with Next.js, featuring AI-powered risk assessment, beautiful UI design, and a feature-based architecture.

## Features

- **AI-Powered Risk Assessment** - Intelligent loan analysis with risk scoring and recommendations
- **Comprehensive Loan Management** - Create, edit, and track loans with detailed analytics
- **User Management** - Borrower and co-signer management system
- **Payment Tracking** - Monitor payments, schedules, and loan status
- **Beautiful UI** - Modern design with custom color palette and animations
- **Responsive Design** - Works seamlessly across all devices
- **Advanced Search & Filtering** - Find loans quickly with powerful search capabilities
- **Real-time Analytics** - AI-generated insights and loan performance metrics

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon DB)
- **ORM**: Prisma
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI + Custom components
- **Forms**: React Hook Form + Zod validation
- **AI Integration**: OpenAI API (mock implementation)
- **Deployment**: Vercel-ready with database seeding

## Design & Color Palette

The application features a carefully crafted color palette inspired by [@alexcristache's design](https://x.com/alexcristache/status/1868317592181694879):

The design incorporates:

- Gradient backgrounds with texture overlays
- Modern glassmorphism effects
- Consistent spacing and typography

## Architecture

### Feature-Based Directory Structure

```
features/
├── ai/                   # AI-powered features
│   ├── actions/          # Server actions for AI analysis
│   ├── components/       # AI-related UI components
│   └── services/         # AI service integrations
├── loans/                # Loan management features
│   ├── actions/          # Server actions for loan operations
│   ├── components/       # Loan-related UI components
│   └──- form/            # Form components and validation
├── payments/             # Payment tracking features
└── users/                # User management features
```

### Key Architectural Decisions

- **Server Actions**: Leveraging Next.js 15 server actions for data mutations
- **Feature Modules**: Each feature is self-contained with its own components, actions, and types
- **Type Safety**: Full TypeScript coverage with Prisma-generated types
- **Component Composition**: Reusable UI components with consistent design patterns

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon DB account)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frogger
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   # Database
   POSTGRES_PRISMA_URL="your-neon-db-url"
   POSTGRES_URL_NON_POOLING="your-neon-db-direct-url"

   # OpenAI (optional - uses mock data if not provided)
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push schema to database
   npx prisma db push

   # Seed the database with sample data
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy Anywhere with Seeding

The application is designed to be deployed anywhere with automatic database seeding:

1. **Build the application**

   ```bash
   npm run build
   ```

2. **The build process automatically**:

   - Generates Prisma client
   - Pushes database schema
   - Seeds the database with sample data
   - Builds the Next.js application

3. **Deploy to your preferred platform**:
   - **Vercel**: Connect your GitHub repository

### Environment Variables for Production

Ensure these environment variables are set in your production environment:

```env
POSTGRES_PRISMA_URL="your-production-db-url"
POSTGRES_URL_NON_POOLING="your-production-db-direct-url"
OPENAI_API_KEY="your-openai-api-key" # Optional
```

## AI Demo Features

The application includes several AI-powered features:

### Risk Assessment

- **Automated Risk Scoring**: AI analyzes loan applications and assigns risk scores (1-100)
- **Smart Recommendations**: AI provides approval/rejection recommendations
- **Risk Factors**: Identifies key risk factors affecting loan decisions

### Loan Insights

- **Performance Predictions**: AI predicts loan performance based on historical data
- **Creditworthiness Estimation**: Evaluates borrower creditworthiness
- **Custom Recommendations**: Personalized suggestions for loan terms

### Implementation

- **Mock AI Service**: Currently uses mock data for demonstration
- **OpenAI Integration**: Ready for real OpenAI API integration
- **Extensible Design**: Easy to add more AI features

## Error Handling & UX

### Not Found Page

- **Custom 404 Page**: Beautiful, branded 404 page with helpful navigation
- **Animated Elements**: Engaging animations and visual feedback
- **Clear Actions**: Direct links to relevant pages

### Error Boundary

- **Global Error Handling**: Catches and displays application errors gracefully
- **Development Details**: Shows error details in development mode
- **User-Friendly Messages**: Clear, actionable error messages
- **Recovery Options**: Easy ways to recover from errors

## Database Schema

The application uses a comprehensive PostgreSQL schema with:

- **Users**: Borrower and co-signer information
- **Loans**: Complete loan details with calculated fields
- **Payments**: Payment tracking and history
- **Documents**: File attachments and loan documents

Key features:

- **Enums**: Type-safe status and category definitions
- **Calculated Fields**: Automatic calculation of loan metrics
- **Relationships**: Proper foreign key relationships
- **Timestamps**: Automatic creation and update tracking

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma db seed   # Seed database with sample data
npx prisma studio    # Open Prisma Studio
```

## Known Limitations & Improvements

### Current Shortcomings

- **Form Schema Validation**: Limited client-side validation (needs Zod integration)
- **User Roles**: No role-based access control system
- **Authentication**: No user authentication system
- **File Uploads**: No document upload functionality

### Planned Improvements

- [ ] Implement comprehensive form validation with Zod
- [ ] Add user authentication and authorization
- [ ] Implement role-based access control
- [ ] Add file upload functionality
- [ ] Integrate real OpenAI API
- [ ] Add real-time notifications
- [ ] Implement advanced reporting features
- [ ] Add mobile app support

## Acknowledgments

- Design inspiration from [@alexcristache](https://x.com/alexcristache/status/1868317592181694879)
- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Prisma](https://www.prisma.io/)

---

**Frogger** - Making loan management simple, beautiful, and intelligent. 🐸✨

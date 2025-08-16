# Client Onboarding Form

A simple client onboarding form built with Next.js, React Hook Form, and Zod validation.

## 🚀 Features

- **Form Validation**: Comprehensive validation using Zod schema
- **Real-time Feedback**: Inline error messages for all fields
- **Accessibility**: Keyboard navigation and proper focus management
- **Responsive Design**: Works on desktop and mobile devices
- **Success/Error Handling**: Clear feedback for form submissions
- **Pre-fill Support**: URL query parameters can pre-select services
- **TypeScript**: Fully typed for better development experience

## 📋 Form Fields

- **Full Name**: Required, 2-80 characters, letters/spaces/apostrophes/hyphens only
- **Email**: Required, valid email format
- **Company Name**: Required, 2-100 characters
- **Services**: Multi-select checkboxes (UI/UX, Branding, Web Dev, Mobile App)
- **Budget**: Optional, integer between $100 - $1,000,000
- **Project Start Date**: Required, must be today or later
- **Accept Terms**: Required checkbox

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx           # Main onboarding page
│   └── globals.css        # Global styles
├── controllers/
│   └── useOnboardingForm.ts # Form state management hook
├── models/
│   ├── onboardingSchema.ts  # Zod validation schema
│   └── __tests__/
│       └── onboardingSchema.test.ts # Schema unit tests
└── services/
    └── onboardingApi.ts    # API service for form submission
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd client-onboarding-form-simple
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and update the API endpoint:
   ```
   NEXT_PUBLIC_ONBOARD_URL=https://your-api-endpoint.com/api/onboard
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Testing

Run unit tests for the Zod schema:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

## 🔧 How React Hook Form + Zod Integration Works

### 1. Schema Definition (`src/models/onboardingSchema.ts`)
- Defines validation rules using Zod
- Exports TypeScript types derived from the schema
- Handles complex validations like date ranges and regex patterns

### 2. Form Controller (`src/controllers/useOnboardingForm.ts`)
- Custom hook that manages form state
- Integrates React Hook Form with Zod resolver
- Handles form submission and API calls
- Manages loading states and error handling

### 3. Form Component (`src/app/page.tsx`)
- Uses the controller hook for form management
- Renders form fields with proper labels and accessibility
- Displays validation errors inline
- Shows success/error states after submission

## 🌐 API Integration

The form submits data to an external API endpoint configured via environment variable:

**Request Format:**
```json
{
  "fullName": "Ada Lovelace",
  "email": "ada@example.com",
  "companyName": "Analytical Engines Ltd",
  "services": ["UI/UX", "Web Dev"],
  "budgetUsd": 50000,
  "projectStartDate": "2025-09-01",
  "acceptTerms": true
}
```

## 🧪 Testing with Postman

Since the form posts to an external API, you can test the endpoint directly:

1. **Create a new POST request** in Postman
2. **Set the URL** to your API endpoint (same as in `.env.local`)
3. **Set headers:**
   ```
   Content-Type: application/json
   ```
4. **Set the request body** (raw JSON):
   ```json
   {
     "fullName": "Test User",
     "email": "test@example.com",
     "companyName": "Test Company",
     "services": ["UI/UX"],
     "budgetUsd": 10000,
     "projectStartDate": "2025-12-01",
     "acceptTerms": true
   }
   ```

## 🎯 Bonus Features Implemented

- **Query Parameter Pre-fill**: Add `?service=UI%2FUX` to pre-select services
- **Unit Tests**: Comprehensive tests for the Zod schema validation
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: Proper ARIA labels, focus management, and keyboard navigation

## 🔍 Architecture Explanation

### MVC-like Pattern
- **Models** (`src/models/`): Data schemas and validation logic
- **Controllers** (`src/controllers/`): Business logic and state management
- **Views** (`src/app/`): UI components and pages
- **Services** (`src/services/`): External API communication

### Key Dependencies
- **Next.js 14**: React framework with App Router
- **React Hook Form**: Efficient form state management
- **Zod**: TypeScript-first schema validation
- **Tailwind CSS**: Utility-first CSS framework

## 🚦 Running in Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📝 Assumptions Made

1. The external API accepts JSON payloads in the specified format
2. The API returns appropriate HTTP status codes (2xx for success)
3. Network errors should be handled gracefully
4. Form should reset after successful submission
5. Budget field can be left empty (optional)
6. Date validation should prevent past dates

## 🔄 Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run tests
npm test

# Run linting
npm run lint
```
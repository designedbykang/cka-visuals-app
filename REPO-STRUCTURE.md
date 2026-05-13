# CKA Visuals App - Repository Structure Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Tree](#directory-tree)
3. [Root Level Files](#root-level-files)
4. [Source Code (`/src`)](#source-code-src)
5. [Public Assets (`/public`)](#public-assets-public)
6. [Configuration Reference](#configuration-reference)
7. [Architecture & Patterns](#architecture--patterns)
8. [How to Navigate](#how-to-navigate)

---

## Project Overview

**Project Name**: CKA Visuals App  
**Framework**: Next.js 16.2.4 with React 19.2.4  
**Styling**: Tailwind CSS 4 + PostCSS  
**Backend**: Supabase (database, authentication, real-time)  
**Package Manager**: npm  
**Total Files**: 118  
**Total Code Size**: ~3,391 lines of JavaScript/JSX  

**Purpose**: A modern service directory web application built with Next.js that allows users to browse, search, and enquire about various services. The app includes admin functionality for managing services, packages, and deliverables through a Supabase backend.

**Key Features**:
- Service browsing and search
- Service detail pages with hero images
- Package and pricing information
- Enquiry submission system
- Admin panel for content management
- Category-based filtering
- Responsive design optimized for mobile

---

## Directory Tree

```
cka-visuals-app/
├── .claude/                          # Claude Code workspace config
├── .git/                             # Git repository metadata
├── .gitignore                        # Git ignore rules
├── .vscode/
│   └── launch.json                   # VS Code debugging config
├── node_modules/                     # npm dependencies (not detailed)
├── public/                           # Static assets (42MB)
│   ├── favicon.ico
│   ├── logo.png
│   ├── story-1.png through story-5.png
│   ├── file.svg
│   ├── globe.svg
│   ├── window.svg
│   ├── next.svg
│   └── vercel.svg
├── src/                              # Source code (416KB)
│   ├── app/                          # Next.js App Router
│   │   ├── hooks/                    # App-level hooks
│   │   ├── services/                 # Services section pages
│   │   │   └── [id]/                 # Dynamic service routes
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   ├── components/                   # React components
│   │   ├── services/                 # Service-specific components (29 files)
│   │   ├── Bento.jsx
│   │   ├── Header.jsx
│   │   ├── LoginSheet.jsx
│   │   ├── SearchBar.jsx
│   │   ├── StatusUploadSheet.jsx
│   │   └── StoryViewer.jsx
│   ├── context/                      # React Context providers
│   │   ├── AdminContext.jsx
│   │   ├── ServicesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/                        # Reusable hooks library
│   │   ├── useCategoryServices.js
│   │   ├── useEnquirySubmit.js
│   │   ├── useLongPress.js
│   │   ├── useService.js
│   │   ├── useServiceCategories.js
│   │   ├── useServiceMutations.js
│   │   └── useServiceTags.js
│   └── lib/                          # Utility modules
│       ├── supabase.js
│       └── whatsapp.js
├── REPO-STRUCTURE.md                 # This file
├── CLAUDE.md                         # Claude Code instructions (references AGENTS.md)
├── AGENTS.md                         # Notes on Next.js 16 breaking changes
├── README.md                         # Standard Next.js documentation
├── CKA Visuals — Services Section-2.pdf  # Reference documentation
├── package.json                      # Project dependencies and scripts
├── package-lock.json                 # Locked dependency versions
├── next.config.mjs                   # Next.js configuration
├── jsconfig.json                     # JavaScript path aliases
├── postcss.config.mjs                # PostCSS/Tailwind configuration
└── eslint.config.mjs                 # ESLint configuration
```

---

## Root Level Files

### Documentation & Project Files

| File | Size | Purpose |
|------|------|---------|
| `README.md` | Standard | Next.js starter project documentation |
| `CLAUDE.md` | 10 bytes | References AGENTS.md for Claude Code instructions |
| `AGENTS.md` | ~500 bytes | Important notes about Next.js 16 breaking changes from training data |
| `REPO-STRUCTURE.md` | This file | Complete repository structure documentation |
| `CKA Visuals — Services Section-2.pdf` | 664KB | Reference PDF documentation for the services section |

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, npm scripts, dependencies |
| `package-lock.json` | Locked versions of all dependencies |
| `next.config.mjs` | Next.js configuration (React Compiler enabled) |
| `jsconfig.json` | JavaScript path configuration; defines `@/*` alias pointing to `./src/*` |
| `postcss.config.mjs` | PostCSS configuration for Tailwind CSS v4 |
| `eslint.config.mjs` | ESLint configuration extending Next.js core web vitals |

### Git & Environment

| File | Purpose |
|------|---------|
| `.gitignore` | Excludes: node_modules, .next, build artifacts, .env files, Claude Code worktrees |
| `.git/` | Git repository metadata and history |
| `.vscode/launch.json` | VS Code debugging and launch configurations |
| `.claude/` | Claude Code workspace configurations and worktrees |

---

## Source Code (`/src`)

The `/src` directory contains all application code, organized into five main subdirectories plus styles.

### `/src/app` - Next.js App Router Structure

The App Router is the modern Next.js routing system. Files are automatically converted to routes based on file structure.

#### Root Files

- **`layout.js`** - Root layout component that wraps all pages. Sets up the overall page structure and applies global providers (context, theme, etc.)
- **`page.js`** - Home page (`/`). The main landing page of the application
- **`globals.css`** - Global CSS styles applied across the entire application

#### `/src/app/services` - Service Routes

Route: `/services/*`

- **`layout.js`** - Layout wrapper for all services-related pages. Likely includes the services navigation and structure
- **`page.js`** - Services list page (`/services`). Displays all available services with filtering and search
- **`[id]/page.js`** - Dynamic service detail page (`/services/[id]`). Shows comprehensive information about a specific service
- **`[id]/learn-more/page.js`** - Extended service information page (`/services/[id]/learn-more`). Additional details about a specific service

#### `/src/app/hooks` - App-Level Custom Hooks

These hooks manage app-specific data fetching and state. **Note**: These appear to be duplicated in `/src/hooks`.

1. **`useCategoryServices.js`** - Fetches all services belonging to a specific category
2. **`useEnquirySubmit.js`** - Handles enquiry form submission logic
3. **`useLongPress.js`** - Detects and handles long-press gestures (mobile-oriented)
4. **`useService.js`** - Fetches data for a single service
5. **`useServiceCategories.js`** - Fetches all available service categories
6. **`useServiceMutations.js`** - Handles create, update, delete operations on services
7. **`useServiceTags.js`** - Manages service tags data fetching and manipulation

---

### `/src/components` - React Components

Contains 35 reusable React components organized into core components and service-specific components.

#### Core Components (6 files)

These are general-purpose components used throughout the application.

- **`Bento.jsx`** - Grid layout component, likely implementing a bento box (modern grid) design pattern
- **`Header.jsx`** - Application header/navigation bar component
- **`LoginSheet.jsx`** - Modal/bottom sheet component for user login interface
- **`SearchBar.jsx`** - Search input component with functionality for filtering services
- **`StatusUploadSheet.jsx`** - Modal component for uploading status updates or content
- **`StoryViewer.jsx`** - Carousel/story viewer component (like Instagram stories UI pattern)

#### Service Components (`/src/components/services` - 29 files)

All components related to displaying, managing, and interacting with services.

**Display Components** - Render service information:
- **`ServiceCard.jsx`** - Individual service preview card (used in listings)
- **`ServiceHero.jsx`** - Hero section with image for service detail pages
- **`ServiceTags.jsx`** - Container for displaying multiple service tags
- **`TagBadge.jsx`** - Single tag badge component
- **`DetailFacts.jsx`** - Panel displaying key facts/information about a service
- **`ServiceLiterature.jsx`** - Component for displaying documentation/literature related to a service

**Category & Organization Components** - Handle filtering and organization:
- **`CategoryTabs.jsx`** - Tab navigation for filtering services by category
- **`CategoryBand.jsx`** - Visual band/strip showing category information
- **`ServiceSlideup.jsx`** - Slide-up modal/preview for service overview

**Package Management Components** - Handle pricing and packages:
- **`PackageCard.jsx`** - Individual package/pricing option card
- **`PackageBox.jsx`** - Container/wrapper for package display
- **`PackageList.jsx`** - List of all packages for a service
- **`PackageSelector.jsx`** - UI for selecting a package

**Admin Edit Sheets** - Components for editing content (admin panel):
- **`ServiceEditSheet.jsx`** - Form for editing service details (name, description, etc.)
- **`PackageEditSheet.jsx`** - Form for editing package information and pricing
- **`DeliverableEditSheet.jsx`** - Form for editing service deliverables
- **`HeroUploadSheet.jsx`** - Form for uploading/changing service hero image

**Interaction Components** - Handle user interactions:
- **`EnquirySheet.jsx`** - Form for customers to submit service enquiries
- **`ContactPopup.jsx`** - Popup displaying contact information for a service
- **`AvailabilityToggle.jsx`** - Toggle to show/hide service availability status
- **`PersistentBar.jsx`** - Persistent action bar (likely sticky footer with CTA button)
- **`ServicesShell.jsx`** - Container/wrapper component for the services section layout
- **`DeliverablesList.jsx`** - List component for displaying service deliverables
- **`LearnMoreContent.jsx`** - Content section for the "learn more" extended view
- **`LearnMoreTabs.jsx`** - Tab navigation for the learn-more page

---

### `/src/context` - React Context (State Management)

Global state management using React Context API. Each file exports a context provider and hook for consuming the context.

- **`AdminContext.jsx`** - Manages admin/authentication state (user login, admin permissions, edit mode)
- **`ServicesContext.jsx`** - Manages services data state (service list, categories, filtered data, search results)
- **`ThemeContext.jsx`** - Manages theme state (dark/light mode preference and toggle)

Typical usage pattern:
```jsx
// In a component
const { theme, toggleTheme } = useContext(ThemeContext);
```

---

### `/src/hooks` - Reusable Hooks Library

Custom React hooks that encapsulate logic for data fetching, mutations, and interactions. **These are duplicates of `/src/app/hooks`** and should likely be consolidated.

1. **`useCategoryServices.js`** - Fetches services filtered by category
2. **`useEnquirySubmit.js`** - Form hook for submitting enquiries
3. **`useLongPress.js`** - Gesture detection hook for mobile long-press interactions
4. **`useService.js`** - Fetches single service data
5. **`useServiceCategories.js`** - Fetches all categories
6. **`useServiceMutations.js`** - CRUD operations for services
7. **`useServiceTags.js`** - Tag management hook

---

### `/src/lib` - Utility Modules

Shared utility modules and library integrations.

- **`supabase.js`** - Supabase client initialization and configuration
  - Exports the configured Supabase client for database queries, real-time subscriptions, and authentication
  - Contains the Supabase project URL and API key configuration

- **`whatsapp.js`** - WhatsApp integration utilities
  - Likely contains helper functions for WhatsApp messaging (sending messages to users, WhatsApp contact linking, etc.)

---

## Public Assets (`/public`)

Static files served directly by the web server. Total size: 42MB

### Images

- **`logo.png`** - Application logo (used in header)
- **`story-1.png`** through **`story-5.png`** - Story/showcase images (5 images total)
  - Likely used in the StoryViewer component or carousel display

### Icons (SVG)

- **`file.svg`** - File icon (used in UI for documents/files)
- **`globe.svg`** - Globe icon (used for location/world-related UI)
- **`window.svg`** - Window icon (used for app/interface related UI)
- **`next.svg`** - Next.js logo (likely used in footer or credits)
- **`vercel.svg`** - Vercel logo (likely used in footer or credits)

### Favicon

- **`favicon.ico`** - Browser tab icon (displayed in browser tabs)

---

## Configuration Reference

### `package.json` - Project Dependencies

**Key Scripts**:
```json
{
  "dev": "next dev",           // Development server (usually http://localhost:3000)
  "build": "next build",        // Production build
  "start": "next start",        // Start production server
  "lint": "next lint"           // Run ESLint
}
```

**Production Dependencies**:
- `next@16.2.4` - React framework
- `react@19.2.4` - React library
- `react-dom@19.2.4` - React DOM rendering
- `@supabase/supabase-js@^2.105.1` - Supabase client for backend
- `lucide-react@^1.14.0` - Icon library

**Development Dependencies**:
- `tailwindcss@4` - Utility-first CSS framework
- `postcss@latest` - CSS transformer
- `autoprefixer@latest` - Vendor prefix automation
- `eslint@9` - Code linter
- `eslint-config-next` - Next.js ESLint rules

**Build Optimization**:
- React Compiler enabled in Next.js config for automatic memoization

### `next.config.mjs` - Next.js Configuration

```javascript
// Key settings:
experimental: {
  reactCompiler: true  // Enables automatic memoization and optimization
}
```

### `jsconfig.json` - Path Aliases

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // Allows importing from @/components, @/lib, etc.
    }
  }
}
```

**Usage**: Instead of `import Component from '../../../components/Component'`, use `import Component from '@/components/Component'`

### `postcss.config.mjs` - Tailwind CSS

Configures PostCSS with Tailwind CSS v4 (latest version with new syntax).

### `eslint.config.mjs` - Code Quality

Extends Next.js core web vitals configuration to enforce:
- Code style consistency
- React best practices
- Accessibility standards
- Performance recommendations

---

## Architecture & Patterns

### 1. **Next.js App Router Structure**
- Uses the modern App Router (not the older Pages Router)
- File-based routing: files automatically become routes
- Layouts provide structure and context at different levels
- Dynamic routes using `[id]` conventions

### 2. **Component Organization**
- **Core Components**: Generic, reusable across the app
- **Domain Components**: Service-specific, in `/services` subdirectory
- **Modal/Sheet Pattern**: Multiple `*Sheet.jsx` components for modal dialogs
- **List/Card Pattern**: List components (`PackageList.jsx`) contain individual cards (`PackageCard.jsx`)

### 3. **State Management**
- **React Context**: Three main contexts (Admin, Services, Theme)
- **Custom Hooks**: Data fetching and form logic encapsulated in hooks
- **Supabase Real-time**: Backend provides real-time data updates

### 4. **Data Flow**
```
Supabase (Backend Data)
    ↓
Custom Hooks (useFetch, useMutation)
    ↓
Context (Global State)
    ↓
Components (Display & Interaction)
```

### 5. **Styling Approach**
- **Tailwind CSS**: Utility-first CSS classes
- **Global CSS**: `globals.css` for base styles
- **Component Scoping**: Styles applied via className props

### 6. **Mobile Considerations**
- `useLongPress` hook suggests mobile gesture support
- Multiple "Sheet" components indicate bottom-sheet modals (mobile UI pattern)
- Responsive design with Tailwind CSS breakpoints

### 7. **Admin Functionality**
- Admin context tracks authentication and edit mode
- Separate edit sheets for different content types
- `useServiceMutations` handles create/update/delete
- Allows content management through the web interface

### 8. **Potential Code Duplication Issue**
- **`/src/hooks`** and **`/src/app/hooks`** contain identical files
- Recommend consolidating to single location (`/src/hooks`) to maintain DRY principle
- Update all imports to use the single source

---

## How to Navigate

### Finding Components
- **Core, reusable components**: Check `/src/components/` root level
- **Service-specific UI**: Look in `/src/components/services/`
- **Modal/form dialogs**: Search for `*Sheet.jsx` files
- **List/card pairs**: Look for `ServiceCard.jsx` + `ServiceList.jsx` pattern

### Finding Data Fetching Logic
- **Custom hooks in `/src/hooks/`**: Each hook is named by its purpose (`useService.js`, `useCategoryServices.js`)
- **Mutations/writing data**: Use `useServiceMutations.js`
- **Form submissions**: Use hook like `useEnquirySubmit.js`

### Finding State Management
- **Global state**: Check `/src/context/` (Admin, Services, Theme)
- **Local component state**: Use React `useState` or custom hooks
- **Real-time updates**: Supabase subscriptions in hooks

### Adding a New Page
1. Create folder in `/src/app/` following route structure (e.g., `/src/app/new-section/`)
2. Add `page.js` file (becomes the route)
3. Add `layout.js` if you need section-specific layout
4. Import components from `/src/components/`

### Adding a New Component
1. Create `.jsx` file in `/src/components/` (or `/src/components/services/` if service-related)
2. Export the component as default
3. Use `@/` path alias for imports: `import { Button } from '@/components/Button'`

### Connecting to Supabase
1. Import client: `import { supabase } from '@/lib/supabase'`
2. Use in hooks: `const { data } = await supabase.from('table').select()`
3. Subscribe to real-time: `supabase.from('table').on('*', callback).subscribe()`

### Adding Styling
1. Use Tailwind utility classes: `<div className="flex gap-4 bg-white">...`
2. Add global styles in `/src/app/globals.css` if needed
3. Component styles: Use inline className or import CSS modules (if used)

### Running & Testing
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Create production build
npm start            # Run production build locally
npm run lint         # Check code quality
```

---

## File Count Summary

| Directory | File Count | Type |
|-----------|-----------|------|
| `/src/app` | 7 | Routes + styles |
| `/src/components` | 35 | React components |
| `/src/context` | 3 | Context providers |
| `/src/hooks` (root) | 7 | Custom hooks |
| `/src/app/hooks` | 7 | Custom hooks (duplicate) |
| `/src/lib` | 2 | Utility modules |
| `/public` | 11 | Static assets |
| Config files | 6 | Configuration |
| Root docs | 4 | Documentation |
| **Total** | **~118** | **Files** |

---

## Quick Reference: Common Tasks

| Task | Location |
|------|----------|
| Edit a service display | `/src/components/services/ServiceCard.jsx` |
| Edit service detail page | `/src/app/services/[id]/page.js` |
| Add a new service category | Modify `/src/hooks/useServiceCategories.js` + database |
| Change app theme colors | `/src/app/globals.css` + Tailwind config |
| Add new icon | Place in `/public/` + import from lucide-react |
| Modify enquiry form | `/src/components/services/EnquirySheet.jsx` |
| Change header layout | `/src/components/Header.jsx` |
| Add admin feature | Update `/src/context/AdminContext.jsx` + add edit sheets |
| Fix a database issue | Check `/src/lib/supabase.js` configuration |

---

**Last Updated**: 2026-05-13  
**Documentation Version**: 1.0


# Gallery Management System

A multi-part system for managing and displaying image galleries. The project consists of three main components:

## Components

### Admin Dashboard
- Located in `/admin`
- React + TypeScript application for managing galleries
- Features:
  - Gallery creation and management
  - Image upload and organization
  - User authentication
  - Gallery sharing controls

### Gallery Viewer
- Located in `/gallery-viewer`
- Public-facing React application
- Features:
  - Clean, minimal gallery viewing experience
  - Responsive image grid
  - Accessible via unique gallery URLs

### Backend
- Located in `/backend`
- Firebase Functions
- Features:
  - User management
  - Image processing
  - Security rules

## Technology Stack
- Frontend: React, TypeScript, Vite, TailwindCSS
- Backend: Firebase (Auth, Firestore, Storage, Functions)
- Infrastructure: Terraform

## Environment Setup
Create a `.env` file in the admin directory with your Firebase configuration:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

## Security
- Firebase Authentication for admin access
- Firestore security rules for data protection
- Storage rules for image access control
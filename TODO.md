# Project Management System TODO

## 1. Project Structure Setup
- [x] Create backend/ and frontend/ folders
- [x] Move current React files to frontend/
- [x] Initialize Laravel 11 in backend/

## 2. Backend Setup (Laravel)
- [x] Install Laravel dependencies
- [x] Configure .env for database
- [x] Create migrations for all tables (users, projects, weekly_reports, assets, machines, materials, vendors, finance, payrolls, operations, files)
- [x] Create models with relationships
- [x] Set up Sanctum for authentication
- [x] Create controllers (Auth, Project, Finance, Asset, Vendor, Report, User)
- [x] Create policies and middleware for RBAC
- [x] Set up API routes
- [x] Implement file upload and export features

## 3. Frontend Setup (React)
- [x] Update package.json with required dependencies (React Router, Axios, TailwindCSS, React Icons, React Query, Chart.js, React Toastify)
- [x] Configure TailwindCSS
- [x] Create component structure (Sidebar, Navbar, DataTable, etc.)
- [x] Create pages (Login, Dashboard, ProjectPage, etc.)
- [x] Set up contexts (AuthContext, RoleContext)
- [x] Implement routing with protected routes
- [x] Create API client with Axios

## 4. Authentication & RBAC
- [x] Implement JWT login/logout in backend
- [x] Set up role-based middleware and policies
- [x] Frontend role-based UI hiding

## 5. CRUD Features
- [x] Implement CRUD for Projects
- [x] Implement CRUD for Finance
- [x] Implement CRUD for Assets/Inventory
- [x] Implement CRUD for Vendors
- [x] Implement Reports with file upload

## 6. Dashboard & UI
- [x] Create dashboard with charts and stats
- [x] Implement export to Excel/PDF
- [x] Add notifications
- [x] Make responsive design

## 7. Testing & Deployment
- [x] Test all features
- [x] Run both frontend and backend
- [x] Verify RBAC permissions

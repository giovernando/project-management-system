# Project Management System TODO

## 1. Project Structure Setup
- [ ] Create backend/ and frontend/ folders
- [ ] Move current React files to frontend/
- [ ] Initialize Laravel 11 in backend/

## 2. Backend Setup (Laravel)
- [ ] Install Laravel dependencies
- [ ] Configure .env for database
- [ ] Create migrations for all tables (users, projects, weekly_reports, assets, machines, materials, vendors, finance, payrolls, operations, files)
- [ ] Create models with relationships
- [ ] Set up Sanctum for authentication
- [ ] Create controllers (Auth, Project, Finance, Asset, Vendor, Report, User)
- [ ] Create policies and middleware for RBAC
- [ ] Set up API routes
- [ ] Implement file upload and export features

## 3. Frontend Setup (React)
- [ ] Update package.json with required dependencies (React Router, Axios, TailwindCSS, React Icons, React Query, Chart.js, React Toastify)
- [ ] Configure TailwindCSS
- [ ] Create component structure (Sidebar, Navbar, DataTable, etc.)
- [ ] Create pages (Login, Dashboard, ProjectPage, etc.)
- [ ] Set up contexts (AuthContext, RoleContext)
- [ ] Implement routing with protected routes
- [ ] Create API client with Axios

## 4. Authentication & RBAC
- [ ] Implement JWT login/logout in backend
- [ ] Set up role-based middleware and policies
- [ ] Frontend role-based UI hiding

## 5. CRUD Features
- [ ] Implement CRUD for Projects
- [ ] Implement CRUD for Finance
- [ ] Implement CRUD for Assets/Inventory
- [ ] Implement CRUD for Vendors
- [ ] Implement Reports with file upload

## 6. Dashboard & UI
- [ ] Create dashboard with charts and stats
- [ ] Implement export to Excel/PDF
- [ ] Add notifications
- [ ] Make responsive design

## 7. Testing & Deployment
- [ ] Test all features
- [ ] Run both frontend and backend
- [ ] Verify RBAC permissions

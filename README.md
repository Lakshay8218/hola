# Dry Ice Supply India

A production-ready, full-stack B2B web application for a dry ice supply company. This platform allows customers to verify serviceability based on their pincode and request customized delivery quotes.

## Architecture

The project is structured as a modern containerized application:

- **Frontend**: React 19, Vite, and Three.js (for high-performance 3D visual assets).
- **Backend**: Django 6.1 and Django REST Framework (DRF) providing a secure API.
- **Database**: PostgreSQL (production) / SQLite (local fallback).
- **Infrastructure**: Fully containerized using Docker, with an Nginx reverse proxy routing traffic to the frontend and API safely.

## Project Structure

```text
/
├── backend/            # Django API source, models, and Dockerfile
├── frontend/           # React frontend source, Nginx config, and Dockerfile
├── docker-compose.yml  # Production Docker Orchestration
├── .gitignore          # Version control ignore rules
└── README.md           # Project documentation
```

## Prerequisites

To run the full stack, you will need:
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- (Optional) Node.js 20+ and Python 3.11+ for local uncontainerized development.

## Setup & Installation

### Production / Containerized Mode

The easiest way to run the application is via Docker Compose, which spins up the PostgreSQL database, Django backend, and Nginx/React frontend automatically.

1. **Setup Environment Variables**:
   ```bash
   cd backend
   cp .env.example .env
   # Update the .env file with your production SECRET_KEY and credentials
   ```

2. **Build and Run**:
   From the root directory of the project, run:
   ```bash
   docker compose build
   docker compose up -d
   ```

3. **Access the Application**:
   - Frontend UI: `http://localhost`
   - API Endpoints: `http://localhost/api/...`

### Local Development Mode

If you prefer to run the servers locally for development with hot-reloading:

**1. Start the Django Backend**:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**2. Start the React Frontend**:
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
The Vite dev server proxies `/api/` requests to your local Django server automatically.

## API Endpoints

- `GET /api/check-pincode/?pincode=110001`
  - Validates delivery routes and turnaround times.
- `POST /api/quote-request/`
  - Submits a customer's delivery requirement (Name, Mobile, Quantity, Date, Pincode, Application). Protected by DRF rate limiting.

## Security Features

- Strict `ALLOWED_HOSTS` and CORS policies.
- Configurable environment variable injection.
- Containerized isolation without risky local volume mounts in production.
- Nginx security headers (`X-Frame-Options`, `X-XSS-Protection`, `X-Content-Type-Options`).

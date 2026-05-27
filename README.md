# ESG Platform Prototype

A multi-tenant ESG data ingestion and review platform designed to normalize heterogeneous sustainability datasets, support analyst review workflows, and provide organization-scoped ESG analytics.

The platform supports:
- ESG dataset uploads
- normalization workflows
- Scope 1 / 2 / 3 categorization
- suspicious record detection
- analyst approval workflows
- organization-scoped dashboard analytics

---
## Live Deployment

### Frontend Application
[https://esg-platform-prototype.vercel.app/]

> **Note:**  
> The backend is deployed on Render free tier infrastructure.  
> The application may take approximately 50–60 seconds to fully load on the first request if the backend service is waking from inactivity.

## Features

- Multi-tenant organization support
- ESG dataset ingestion
- Raw source payload preservation
- Normalized emissions records
- Scope 1 / 2 / 3 categorization
- Suspicious record review workflows
- Analyst approval and rejection flows
- Dashboard analytics and charts
- Upload activity tracking
- Source traceability and audit metadata

---

## Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL

### Frontend
- React
- Tailwind CSS
- Axios
- Recharts
- Framer Motion

### Deployment
- Render (Backend)
- Vercel (Frontend)

---

## System Architecture

```text
Frontend Dashboard
        ↓
Django REST APIs
        ↓
Upload Layer
        ↓
RawRecord Storage
        ↓
Normalization Layer
        ↓
NormalizedEmissionRecord
        ↓
Analytics + Review Workflows
```

---

## Project Structure

```text
backend/
├── analytics_dashboard/
├── audit/
├── core/
├── emissions/
├── ingestion/
└── config/

frontend/
├── src/components/
├── src/pages/
├── src/layouts/
├── src/services/
└── src/context/
```

---

## Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Rosen-mund/ESG-platform-prototype.git

```

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows:
# venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

### Backend `.env`

```env
SECRET_KEY=your_secret_key

DATABASE_URL=your_postgresql_connection_string
```

### Frontend `.env`

```env
VITE_API_BASE_URL=your_backend_api_url
```

---

## Running the Application

### Backend
```bash
python manage.py runserver
```

### Frontend
```bash
npm run dev
```

---

## Deployment

### Frontend
Deployed on Vercel

### Backend
Deployed on Render

### Database
Hosted on Render

---

## Supported ESG Sources

The prototype currently supports:
- SAP-style procurement datasets
- Utility consumption datasets
- Travel emissions datasets

---

## Dashboard Features

- Organization-scoped ESG analytics
- KPI summaries
- Source breakdown charts
- Scope breakdown charts
- Upload activity tracking
- Suspicious record review workflows
- Approval and rejection workflows

---

## Documentation Files

- `MODEL.md`
- `DECISIONS.md`
- `TRADEOFFS.md`
- `SOURCES.md`

These documents describe the architectural decisions, data model design, ingestion assumptions, and implementation tradeoffs used throughout the prototype.

---

## Future Improvements

Potential future improvements include:
- asynchronous ingestion pipelines
- configurable anomaly detection rules
- enterprise authentication and RBAC
- configurable ESG mappings
- advanced unit conversion workflows
- real-time ingestion monitoring
- scalable background processing

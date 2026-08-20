# Todo App

A simple full-stack Todo application built with Django (backend) and React TypeScript (frontend).

## Features

1. Add a task (title + description)
2. Mark task as complete/incomplete
3. Edit task details (title, description)
4. Delete a task
5. Search tasks by name
6. Filter tasks by All / Incomplete / Completed (works together with search)

## Tech Stack

- **Backend**: Django 5.2 + Django REST Framework
- **Frontend**: React 18 + TypeScript + Vite
- **Database**: SQLite (development) / PostgreSQL (production-ready config included)

## Project Structure

```
todo/
├── manage.py
├── requirements.txt
├── todo/                    # Django project settings
│   ├── settings.py
│   └── urls.py
├── todo_app/                # Django app
│   ├── models.py            # Task model
│   ├── views.py             # API views (function-based)
│   ├── urls.py              # API routes
│   └── admin.py
└── frontend/                # React TypeScript app
    ├── package.json
    ├── tsconfig.json
    ├── public/index.html
    └── src/
        ├── index.tsx        # Entry point
        ├── types.ts         # TypeScript types
        ├── api.ts           # API calls to backend
        ├── App.tsx          # Main component
        ├── App.css          # Styles
        └── components/
            ├── TaskForm.tsx
            ├── TaskList.tsx
            ├── SearchBar.tsx
            └── FilterBar.tsx
```

## Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 16+ and npm

### Backend Setup

1. Navigate to the project root:
   ```bash
   cd todo
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run database migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   The backend will run at `http://localhost:8000`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | List all tasks. Supports `?search=term` and `?status=completed\|incomplete` |
| POST | `/api/tasks/` | Create a task. Body: `{ "title": "...", "description": "..." }` |
| PUT | `/api/tasks/<id>/` | Update a task. Body: `{ "title", "description", "completed" }` |
| DELETE | `/api/tasks/<id>/` | Delete a task |

## Database

The app uses SQLite by default for easy setup. A PostgreSQL configuration is commented out in `settings.py` — just update the credentials and uncomment it to switch.

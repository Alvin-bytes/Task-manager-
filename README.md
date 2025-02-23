# Task Manager Application

A modern, responsive task management web application built with React and Express, featuring PostgreSQL database integration for persistent storage.

![Task Manager Demo](https://user-images.githubusercontent.com/your-username/task-manager/demo.gif)

## Features

- ✨ Create and manage tasks with titles and descriptions
- 📅 Set due dates and times for tasks
- ✔️ Mark tasks as complete
- 🔔 Optional reminder settings
- 📱 Mobile-responsive design
- 💾 Persistent storage with PostgreSQL
- 🎨 Modern UI with shadcn/ui components

## Tech Stack

- **Frontend:**
  - React 18
  - TanStack Query for data fetching
  - Tailwind CSS for styling
  - shadcn/ui component library
  - Wouter for routing
  - React Hook Form for form management

- **Backend:**
  - Express.js
  - PostgreSQL database
  - Drizzle ORM
  - Zod for validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Alvin-bytes/Task-manager-.git
cd Task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=your_postgresql_connection_string
```

4. Push the database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## API Documentation

### Tasks Endpoints

#### GET /api/tasks
- Returns a list of all tasks
- Response: Array of Task objects
```typescript
{
  id: number;
  title: string;
  description: string | null;
  dueDate: string;
  completed: boolean;
  reminderSet: boolean;
}
```

#### POST /api/tasks
- Creates a new task
- Request body:
```typescript
{
  title: string;
  description?: string;
  dueDate: string;
  reminderSet: boolean;
}
```

#### PATCH /api/tasks/:id
- Updates an existing task
- Request body: Partial Task object

#### DELETE /api/tasks/:id
- Deletes a task
- Response: 204 No Content

## Database Schema

```typescript
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  completed: boolean("completed").notNull().default(false),
  reminderSet: boolean("reminder_set").notNull().default(false),
});
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configurations
│   │   └── pages/        # Page components
├── server/                # Backend Express application
│   ├── db.ts             # Database configuration
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data access layer
└── shared/               # Shared types and schemas
    └── schema.ts         # Database schema and types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Features

- Enhanced notification system
- Task categories and tags
- Recurring tasks
- Native mobile app development

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TanStack Query](https://tanstack.com/query/latest) for efficient data fetching
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations

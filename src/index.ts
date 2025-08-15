import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://dbmthxrbrlgkuhiznsul.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRibXRoeHJicmxna3VoaXpuc3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTU0ODEsImV4cCI6MjA3MDEzMTQ4MX0.b6gFaZcT5AdVPomr7U-5Y2S_slIqza_4zeCtkC5s8Kc';

    const supabase = createClient(supabaseUrl, supabaseKey);

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  importExpenses,
  bulkDeleteExpenses,
  backupExpenses,
  getCategories,
  saveCategories,
  populateCategories,
} from "./routes/expenses";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  bulkDeleteTasks,
  backupTasks,
  importTasks,
} from "./routes/tasks";
import {
  getAnimals,
  addAnimal,
  updateAnimal,
  deleteAnimal,
  getWeightRecords,
  addWeightRecord,
  getBreedingRecords,
  addBreedingRecord,
  updateBreedingRecord,
  getVaccinationRecords,
  addVaccinationRecord,
  getHealthRecords,
  addHealthRecord,
  updateHealthRecord,
  getAnimalSummary,
  backupAnimals,
} from "./routes/animals";

function createServer() {
  const app = express();

  // CORS configuration
  const allowedOrigins = [
      'http://localhost:8080', // For local development
      'https://bijaagro.github.io', // For bija deployment
      'https://shobha-workspace-cloud.github.io',// Add your GitHub Pages origin here
    ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  console.log(
    `Allowing origins: ${allowedOrigins.join(", ")}`,
  );
  // API base path
  const apiBasePath = "/api";

  // Helper function to register routes
  const registerRoute = (
    method: "get" | "post" | "put" | "delete",
    path: string,
    handler: any,
  ) => {
    const fullPath = `${apiBasePath}${path}`;
    app[method](fullPath, handler);
    console.log(`📝 Registered: ${method.toUpperCase()} ${fullPath}`);
  };

  // Example API routes
  registerRoute("get", "/ping", (_req: any, res: any) => {
    const ping = process.env.PING_MESSAGE ?? "Backend API is running";
    res.json({ message: ping });
  });

  registerRoute("get", "/demo", handleDemo);

  // Expense routes
  registerRoute("get", "/expenses", getExpenses);
  registerRoute("post", "/expenses", addExpense);
  registerRoute("put", "/expenses/:id", updateExpense);
  registerRoute("delete", "/expenses/:id", deleteExpense);
  registerRoute("post", "/expenses/import", importExpenses);
  registerRoute("post", "/expenses/bulk-delete", bulkDeleteExpenses);
  registerRoute("get", "/expenses/backup", backupExpenses);
  registerRoute("get", "/expenses/categories", getCategories);
  registerRoute("post", "/expenses/categories", saveCategories);
  registerRoute("post", "/expenses/populate-categories", populateCategories);


  // Task management routes
  registerRoute("get", "/tasks", getTasks);
  registerRoute("post", "/tasks", addTask);
  registerRoute("put", "/tasks/:id", updateTask);
  registerRoute("delete", "/tasks/:id", deleteTask);
  registerRoute("post", "/tasks/bulk-delete", bulkDeleteTasks);
  registerRoute("get", "/tasks/backup", backupTasks);
  registerRoute("post", "/tasks/import", importTasks);


  // Animal management routes
  registerRoute("get", "/animals", getAnimals);
  registerRoute("post", "/animals", addAnimal);
  registerRoute("put", "/animals/:id", updateAnimal);
  registerRoute("delete", "/animals/:id", deleteAnimal);
  registerRoute("get", "/animals/summary", getAnimalSummary);
  registerRoute("get", "/animals/backup", backupAnimals);

  // Animal record routes
  registerRoute("get", "/weight-records", getWeightRecords);
  registerRoute("post", "/weight-records", addWeightRecord);
  registerRoute("get", "/breeding-records", getBreedingRecords);
  registerRoute("post", "/breeding-records", addBreedingRecord);
  registerRoute("put", "/breeding-records/:id", updateBreedingRecord);
  registerRoute("get", "/vaccination-records", getVaccinationRecords);
  registerRoute("post", "/vaccination-records", addVaccinationRecord);
  registerRoute("get", "/health-records", getHealthRecords);
  registerRoute("post", "/health-records", addHealthRecord);
  registerRoute("put", "/health-records/:id", updateHealthRecord);
  return app;
}

// Start server if this file is run directly
if (require.main === module) {
  const app = createServer();
  const port = process.env.PORT || 3031;

  app.listen(port, () => {
    console.log(`🚀 Backend server running on http://localhost:${port}`);
    console.log(`📡 API endpoints available at http://localhost:${port}/api`);
    console.log(`🔗 Visit http://localhost:${port}/api/ping to test the API`);
  });
}

module.exports = { createServer };

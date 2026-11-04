import type { Employee } from "@/lib/types";

export const demoEmployee: Employee = {
  id: "EMP-104",
  firstName: "Janelle",
  lastName: "B.",
  email: "employee@blazeeyewear.com",
  role: "EMPLOYEE",
};

export const seedEmployees: Employee[] = [demoEmployee];

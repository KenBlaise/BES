import type { AuthSession, Role } from "@/lib/types";

export interface AuthenticationService {
  requestCustomerCode(email: string): Promise<{ sent: true; demoHint: string }>;
  verifyCustomerCode(
    email: string,
    code: string,
    firstName?: string,
  ): Promise<AuthSession>;
  loginEmployee(email: string, password: string): Promise<AuthSession>;
  getCustomerSession(): AuthSession | null;
  getEmployeeSession(): AuthSession | null;
  logoutCustomer(): Promise<void>;
  logoutEmployee(): Promise<void>;
  getRole(): Role | null;
}

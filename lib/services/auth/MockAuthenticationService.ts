import { recordAudit } from "@/lib/audit";
import { mockMyBlazeService } from "@/lib/services/myblaze/MockMyBlazeService";
import { getState, setState } from "@/lib/store/prototype-db";
import type { AuthSession } from "@/lib/types";
import { simulateLatency } from "@/lib/utils";
import { demoEmployee } from "@/mock/employees";
import type { AuthenticationService } from "./types";

export const DEMO_CUSTOMER_CODE = "123456";
export const DEMO_STAFF_EMAIL = "employee@blazeeyewear.com";
export const DEMO_STAFF_PASSWORD = "blaze123";

export const mockAuthenticationService: AuthenticationService = {
  async requestCustomerCode(email) {
    await simulateLatency(400);
    if (!email.includes("@")) throw new Error("Enter a valid email.");
    return { sent: true as const, demoHint: DEMO_CUSTOMER_CODE };
  },

  async verifyCustomerCode(email, code, firstName) {
    await simulateLatency();
    if (code !== DEMO_CUSTOMER_CODE) {
      throw new Error("That code doesn’t match. Demo code is 123456.");
    }
    let account = await mockMyBlazeService.getAccountByEmail(email);
    if (!account) {
      if (!firstName?.trim()) {
        throw new Error("Enter your first name to create My Blaze.");
      }
      account = await mockMyBlazeService.createAccount({
        firstName: firstName.trim(),
        email,
      });
    }
    const session: AuthSession = { role: "CUSTOMER", accountId: account.accountId };
    setState((state) => ({ ...state, customerSession: session }));
    return session;
  },

  async loginEmployee(email, password) {
    await simulateLatency();
    if (
      email.toLowerCase() !== DEMO_STAFF_EMAIL ||
      password !== DEMO_STAFF_PASSWORD
    ) {
      throw new Error("Demo credentials only: employee@blazeeyewear.com / blaze123");
    }
    const session: AuthSession = {
      role: "EMPLOYEE",
      employeeId: demoEmployee.id,
      name: `${demoEmployee.firstName} ${demoEmployee.lastName}`,
      email: demoEmployee.email,
    };
    setState((state) => ({ ...state, employeeSession: session }));
    recordAudit({
      type: "EMPLOYEE_LOGIN",
      actorName: session.name,
      actorRole: "EMPLOYEE",
    });
    return session;
  },

  getCustomerSession() {
    return getState().customerSession;
  },

  getEmployeeSession() {
    return getState().employeeSession;
  },

  async logoutCustomer() {
    setState((state) => ({ ...state, customerSession: null }));
  },

  async logoutEmployee() {
    setState((state) => ({
      ...state,
      employeeSession: null,
      verifiedCustomerIds: [],
    }));
  },

  getRole() {
    return getState().customerSession?.role ?? getState().employeeSession?.role ?? null;
  },
};

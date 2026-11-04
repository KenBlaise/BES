import { mockAnagramService } from "./anagram/MockAnagramService";
import { mockAppointmentService } from "./appointments/MockAppointmentService";
import { mockAuthenticationService } from "./auth/MockAuthenticationService";
import { mockCherryOpticalService } from "./cherry/MockCherryOpticalService";
import { mockCrystalPMService } from "./crystal/MockCrystalPMService";
import { mockCustomerService } from "./customers/MockCustomerService";
import { mockMyBlazeService } from "./myblaze/MockMyBlazeService";
import { mockOrderService } from "./orders/MockOrderService";

export const services = {
  auth: mockAuthenticationService,
  myBlaze: mockMyBlazeService,
  customers: mockCustomerService,
  crystal: mockCrystalPMService,
  anagram: mockAnagramService,
  cherry: mockCherryOpticalService,
  orders: mockOrderService,
  appointments: mockAppointmentService,
};

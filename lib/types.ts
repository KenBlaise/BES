export type Role = "CUSTOMER" | "EMPLOYEE" | "ADMIN";

export type FrameAvailability =
  | "AVAILABLE_AT_BLAZE"
  | "LIMITED"
  | "COMING_SOON";

export type FrameShape =
  | "round"
  | "square"
  | "rectangle"
  | "aviator"
  | "geometric";

export type FrameMaterial = "acetate" | "metal" | "titanium" | "mixed";

export type FrameGender = "men" | "women" | "unisex";

export type CollectionId =
  | "blaze-essentials"
  | "statement"
  | "modern-classics"
  | "studio-edit";

export interface FrameMeasurements {
  lensWidth: number;
  bridge: number;
  temple: number;
}

export interface Frame {
  id: string;
  slug: string;
  brand: string;
  model: string;
  color: string;
  colorFamily: string;
  alternateColorIds: string[];
  shape: FrameShape;
  material: FrameMaterial;
  price: number;
  availability: FrameAvailability;
  description: string;
  measurements: FrameMeasurements;
  collection: CollectionId;
  gender: FrameGender;
  styleTags: string[];
  image: string;
  images: string[];
}

export type StylePreference =
  | "classic"
  | "bold"
  | "minimal"
  | "luxury"
  | "sport";

export type PriceRangeId = "under-250" | "250-400" | "400-600" | "600-plus";

export interface StyleProfile {
  style?: StylePreference;
  shapes: string[];
  colors: string[];
  priceRange?: PriceRangeId;
  recommendedFrameIds: string[];
  savedAt?: string;
}

export interface MyBlazeAccount {
  accountId: string;
  firstName: string;
  email: string;
  phoneOptional?: string;
  savedFrameIds: string[];
  recentlyViewedFrameIds: string[];
  tryAtBlazeIds: string[];
  styleProfile?: StyleProfile;
  favoriteColors: string[];
  favoriteShapes: string[];
  favoriteBrands: string[];
  preferredPriceRange?: PriceRangeId;
  createdAt: string;
  updatedAt: string;
}

export type CustomerStatus = "active" | "new" | "inactive";

export interface BlazeCustomer {
  blazeCustomerId: string;
  myBlazeAccountId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  customerStatus: CustomerStatus;
  crystalPatientId?: string;
  anagramPatientId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BenefitVerification {
  id: string;
  blazeCustomerId: string;
  anagramEligibilityId: string;
  carrier: string;
  planName: string;
  status: "active" | "inactive" | "unknown";
  frameAllowance: number;
  lensBenefit: string;
  progressiveBenefit: string;
  antiReflectiveBenefit: string;
  eligibilityDate: string;
  verifiedAt: string;
  source: "ANAGRAM";
}

export type BlazeOrderStatus =
  | "ORDER_RECEIVED"
  | "PRESCRIPTION_VERIFIED"
  | "SENT_TO_LAB"
  | "LENSES_IN_PRODUCTION"
  | "QUALITY_CHECK"
  | "ON_THE_WAY_TO_BLAZE"
  | "ARRIVED_AT_BLAZE"
  | "READY_FOR_PICKUP";

export type LabStatus =
  | "received"
  | "rx_verified"
  | "in_production"
  | "qc"
  | "shipped"
  | "delivered";

export interface BlazeOrder {
  orderId: string;
  blazeCustomerId: string;
  myBlazeAccountId?: string;
  crystalPatientId?: string;
  frameId: string;
  frameBrand: string;
  frameModel: string;
  frameColor: string;
  prescriptionReference: string;
  lensType: string;
  lensMaterial: string;
  lensOptions: string[];
  retailPrice: number;
  estimatedBenefit: number;
  estimatedCustomerResponsibility: number;
  orderStatus: BlazeOrderStatus;
  labName: string;
  labOrderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  blazeCustomerId: string;
  crystalPatientId?: string;
  examDate: string;
  expirationDate: string;
  right: { sphere: string; cylinder: string; axis: string };
  left: { sphere: string; cylinder: string; axis: string };
  add: string;
  pd: string;
}

export interface Appointment {
  id: string;
  blazeCustomerId: string;
  date: string;
  time: string;
  type: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}

export interface Receipt {
  id: string;
  orderId: string;
  blazeCustomerId: string;
  purchaseDate: string;
  frame: string;
  lenses: string;
  retailPrice: number;
  benefitApplied: number;
  customerPaid: number;
}

export interface InventoryItem {
  frameId: string;
  onHand: number;
  location: string;
}

export type AuditEventType =
  | "MY_BLAZE_ACCOUNT_CREATED"
  | "FRAME_SAVED"
  | "FRAME_REMOVED"
  | "STYLE_PROFILE_UPDATED"
  | "EMPLOYEE_LOGIN"
  | "CUSTOMER_SEARCH"
  | "CUSTOMER_RECORD_OPENED"
  | "CUSTOMER_VERIFIED"
  | "MY_BLAZE_CONNECTED"
  | "CRYSTAL_PATIENT_CREATED"
  | "BENEFITS_CHECKED"
  | "ORDER_CREATED"
  | "APPOINTMENT_CREATED";

export interface AuditEvent {
  id: string;
  type: AuditEventType;
  actorName: string;
  actorRole: Role;
  customerId?: string;
  accountId?: string;
  timestamp: string;
  detail?: string;
}

export interface CrystalPatient {
  crystalPatientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface CrystalOpticalOrder {
  id: string;
  crystalPatientId: string;
  blazeOrderId?: string;
  status: string;
  createdAt: string;
}

export interface AnagramEligibilityRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  zip: string;
}

export interface AnagramEligibilityResult {
  anagramEligibilityId: string;
  anagramPatientId?: string;
  carrier: string;
  planName: string;
  status: "active" | "inactive" | "unknown";
  frameAllowance: number;
  lensBenefit: string;
  progressiveBenefit: string;
  antiReflectiveBenefit: string;
  eligibilityDate: string;
}

export interface CherryLabOrder {
  labOrderId: string;
  blazeOrderId: string;
  status: LabStatus;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "EMPLOYEE" | "ADMIN";
}

export interface CustomerSession {
  role: "CUSTOMER";
  accountId: string;
}

export interface EmployeeSession {
  role: "EMPLOYEE" | "ADMIN";
  employeeId: string;
  name: string;
  email: string;
}

export type AuthSession = CustomerSession | EmployeeSession;

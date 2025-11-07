
export type StatusCard = {
  title: "Needs Attention" | "Void" | "In Progress" | "Done";
  value: number;
  change: string;
};

export type Transaction = {
  id: string;
  isChecked: boolean;
  transaction: string;
  amount: number;
  date: string;
  source: "Stripe" | "Bank of America";
  status: "Matched" | "Unmatched";
};

export type DoneCase = {
  case_number: string;
  receipt_date: string;
  social_network: string;
  username: string;
  lilly_product: string;
  report_type: string;
  respondent_type: string;
  case_summary: string;
  assigned_agent: string;
};

export type TeamMember = {
  name: string;
  isYou?: boolean;
  email: string;
  role: 'System Admin';
  team: string;
};


export const statusCards: StatusCard[] = [
  { title: "Needs Attention", value: 0, change: "+2" },
  { title: "Void", value: 0, change: "-3" },
  { title: "In Progress", value: 0, change: "+5" },
  { title: "Done", value: 5, change: "+150" },
];

export const transactions: Transaction[] = [
  {
    id: "txn_1",
    isChecked: false,
    transaction: "Stripe Payout",
    amount: 1250.75,
    date: "2024-07-20",
    source: "Stripe",
    status: "Unmatched",
  },
  {
    id: "txn_2",
    isChecked: true,
    transaction: "Client Payment #5432",
    amount: 8500.0,
    date: "2024-07-19",
    source: "Bank of America",
    status: "Matched",
  },
  {
    id: "txn_3",
    isChecked: false,
    transaction: "Stripe Payout",
    amount: 980.50,
    date: "2024-07-19",
    source: "Stripe",
    status: "Unmatched",
  },
  {
    id: "txn_4",
    isChecked: false,
    transaction: "Refund #9876",
    amount: -250.0,
    date: "2024-07-18",
    source: "Stripe",
    status: "Matched",
  },
  {
    id: "txn_5",
    isChecked: false,
    transaction: "Client Payment #5431",
    amount: 4200.0,
    date: "2024-07-18",
    source: "Bank of America",
    status: "Unmatched",
  },
  {
    id: "txn_6",
    isChecked: false,
    transaction: "SaaS Subscription",
    amount: 99.0,
    date: "2024-07-17",
    source: "Bank of America",
    status: "Matched",
  },
  {
    id: "txn_7",
    isChecked: false,
    transaction: "Stripe Payout",
    amount: 1500.0,
    date: "2024-07-16",
    source: "Stripe",
    status: "Unmatched",
  },
  {
    id: "txn_8",
    isChecked: false,
    transaction: "Office Supplies",
    amount: 125.40,
    date: "2024-07-16",
    source: "Bank of America",
    status: "Matched",
  },
  {
    id: "txn_9",
    isChecked: false,
    transaction: "Client Payment #5430",
    amount: 12000.00,
    date: "2024-07-15",
    source: "Bank of America",
    status: "Unmatched",
  },
];

export type MergedSheetEntry = {
  channel: string;
  "Lilly Agent assigned": string;
  reporter_username: string;
  "Receipt Date": string;
  lilly_products: string;
  respondent_type: string;
  hcp_type: string;
  patient_gender: string;
  patient_age: string;
  ae_pc_details: string;
  report_type: string;
  contacted_poster: string;
  poster_consent: string;
  poster_contact_info: string;
  lot_control_number: string;
};

export const finalMergedSheetData: MergedSheetEntry[] = [
  { "channel": "Social Media", "Lilly Agent assigned": "Agent Smith", "reporter_username": "soc_user_1", "Receipt Date": "2024-07-01", "lilly_products": "Trulicity", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Patient reported mild nausea.", "report_type": "Adverse Event", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Email", "Lilly Agent assigned": "Agent Jones", "reporter_username": "email_user_2", "Receipt Date": "2024-07-02", "lilly_products": "Jardiance", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Question about proper dosage.", "report_type": "Inquiry", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Phone", "Lilly Agent assigned": "Agent Brown", "reporter_username": "phone_user_3", "Receipt Date": "2024-07-03", "lilly_products": "Taltz", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Complaint about the packaging being difficult to open.", "report_type": "Product Complaint", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Web Form", "Lilly Agent assigned": "Agent Smith", "reporter_username": "web_user_4", "Receipt Date": "2024-07-04", "lilly_products": "Emgality", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Severe headache after administration.", "report_type": "Adverse Event", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Social Media", "Lilly Agent assigned": "Agent Davis", "reporter_username": "soc_user_5", "Receipt Date": "2024-07-05", "lilly_products": "Olumiant", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Patient experienced itching and a rash.", "report_type": "Adverse Event", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Email", "Lilly Agent assigned": "Agent Jones", "reporter_username": "email_user_6", "Receipt Date": "2024-07-06", "lilly_products": "Trulicity", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Patient fainted after taking the medication.", "report_type": "Adverse Event", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Phone", "Lilly Agent assigned": "Agent Brown", "reporter_username": "phone_user_7", "Receipt Date": "2024-07-07", "lilly_products": "Jardiance", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "The product appeared to be discolored.", "report_type": "Product Complaint", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Web Form", "Lilly Agent assigned": "Agent Wilson", "reporter_username": "web_user_8", "Receipt Date": "2024-07-08", "lilly_products": "Taltz", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Inquiry about off-label use.", "report_type": "Inquiry", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Social Media", "Lilly Agent assigned": "Agent Smith", "reporter_username": "soc_user_9", "Receipt Date": "2024-07-09", "lilly_products": "Emgality", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "Medication had no effect on migraines.", "report_type": "Lack of Efficacy", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" },
  { "channel": "Email", "Lilly Agent assigned": "Agent Davis", "reporter_username": "email_user_10", "Receipt Date": "2024-07-10", "lilly_products": "Olumiant", "respondent_type": "Consumer", "hcp_type": "U", "patient_gender": "U", "patient_age": "U", "ae_pc_details": "The joint pain relief has been amazing.", "report_type": "Positive Feedback", "contacted_poster": "No", "poster_consent": "No", "poster_contact_info": "NA", "lot_control_number": "2" }
];


export type BillOfSaleEntry = {
    stock_id: string;
    customer_first_name: string;
    customer_last_name: string;
    customer_full_name: string;
    vehicle_year: number;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_vin: string;
    vehicle_vin_last6: string;
    bos_effective_date: string;
    selling_price: number;
    additions_dropoff_tomorrow: string;
    additions_partnership_discount: string;
    applicable_loan_balance: string;
    deductions: string;
    adjustment_sbs: number;
    net_vehicle_value: number;
};

export const billOfSaleData: BillOfSaleEntry[] = [
    { stock_id: '72590', customer_first_name: 'Christopher', customer_last_name: 'Merjanian', customer_full_name: 'Christopher Merjanian', vehicle_year: 2019, vehicle_make: 'Volkswagen', vehicle_model: 'Jetta', vehicle_vin: '3VWE57BU9KM098462', vehicle_vin_last6: '098462', bos_effective_date: '2025-08-15', selling_price: 15473.00, additions_dropoff_tomorrow: '-', additions_partnership_discount: '-', applicable_loan_balance: '-', deductions: '-', adjustment_sbs: 300.00, net_vehicle_value: 15773.00 },
    { stock_id: '83145', customer_first_name: 'Jessica', customer_last_name: 'Miller', customer_full_name: 'Jessica Miller', vehicle_year: 2021, vehicle_make: 'Honda', vehicle_model: 'Civic', vehicle_vin: '1HGFE2F58ML123456', vehicle_vin_last6: '123456', bos_effective_date: '2025-09-01', selling_price: 21500.00, additions_dropoff_tomorrow: '-', additions_partnership_discount: '-', applicable_loan_balance: '-', deductions: '500.00', adjustment_sbs: 0.00, net_vehicle_value: 21000.00 },
    { stock_id: '94221', customer_first_name: 'Michael', customer_last_name: 'Smith', customer_full_name: 'Michael Smith', vehicle_year: 2020, vehicle_make: 'Toyota', vehicle_model: 'Camry', vehicle_vin: '4T1BF1FK0LU789012', vehicle_vin_last6: '789012', bos_effective_date: '2025-10-22', selling_price: 24300.00, additions_dropoff_tomorrow: '-', additions_partnership_discount: '250.00', applicable_loan_balance: '-', deductions: '-', adjustment_sbs: 150.00, net_vehicle_value: 24200.00 },
    { stock_id: '10538', customer_first_name: 'Emily', customer_last_name: 'Johnson', customer_full_name: 'Emily Johnson', vehicle_year: 2022, vehicle_make: 'Ford', vehicle_model: 'Mustang', vehicle_vin: '1FATP8UHXN5456789', vehicle_vin_last6: '456789', bos_effective_date: '2025-11-05', selling_price: 35000.00, additions_dropoff_tomorrow: '100.00', additions_partnership_discount: '-', applicable_loan_balance: '-', deductions: '-', adjustment_sbs: 0.00, net_vehicle_value: 35100.00 },
    { stock_id: '11649', customer_first_name: 'David', customer_last_name: 'Williams', customer_full_name: 'David Williams', vehicle_year: 2018, vehicle_make: 'Chevrolet', vehicle_model: 'Silverado', vehicle_vin: '1GCUKREC2JZ123789', vehicle_vin_last6: '123789', bos_effective_date: '2025-07-18', selling_price: 28000.00, additions_dropoff_tomorrow: '-', additions_partnership_discount: '-', applicable_loan_balance: '-', deductions: '1000.00', adjustment_sbs: 200.00, net_vehicle_value: 27200.00 }
];


export type DriversLicenseEntry = {
    stock_id: string;
    id_first_name: string;
    id_last_name: string;
    id_full_name: string;
    id_expiry_date: string;
    id_number: string;
    id_issue_date: string;
    id_type: 'DriverLicense' | 'Passport' | 'PRCard' | 'CitizenshipCard' | 'MilitaryID' | 'OntarioPhotoID';
    temporary_id_provided: 'Y' | 'N';
    temporary_id_type: string;
    temporary_id_expiry_date: string;
};

export const driversLicenseData: DriversLicenseEntry[] = [
    { stock_id: '72590', id_first_name: 'Christopher', id_last_name: 'Merjanian', id_full_name: 'Christopher Merjanian', id_expiry_date: '2028-10-20', id_number: 'M1234-56789-01234', id_issue_date: '2023-10-20', id_type: 'DriverLicense', temporary_id_provided: 'N', temporary_id_type: '-', temporary_id_expiry_date: '-' },
    { stock_id: '83145', id_first_name: 'Jessica', id_last_name: 'Miller', id_full_name: 'Jessica Miller', id_expiry_date: '2027-05-15', id_number: 'M5678-12345-67890', id_issue_date: '2022-05-15', id_type: 'DriverLicense', temporary_id_provided: 'N', temporary_id_type: '-', temporary_id_expiry_date: '-' },
    { stock_id: '94221', id_first_name: 'Michael', id_last_name: 'Smith', id_full_name: 'Michael Smith', id_expiry_date: '2024-02-10', id_number: 'S5555-66666-77777', id_issue_date: '2019-02-10', id_type: 'DriverLicense', temporary_id_provided: 'Y', temporary_id_type: 'Passport', temporary_id_expiry_date: '2029-08-01' },
    { stock_id: '10538', id_first_name: 'Emily', id_last_name: 'Johnson', id_full_name: 'Emily Johnson', id_expiry_date: '2024-04-05', id_number: 'J8888-99999-00000', id_issue_date: '2019-04-05', id_type: 'DriverLicense', temporary_id_provided: 'Y', temporary_id_type: 'OntarioPhotoID', temporary_id_expiry_date: '2026-11-30' },
    { stock_id: '11649', id_first_name: 'David', id_last_name: 'Williams', id_full_name: 'David Williams', id_expiry_date: '2026-03-22', id_number: 'W1112-22334-45567', id_issue_date: '2021-03-22', id_type: 'DriverLicense', temporary_id_provided: 'N', temporary_id_type: '-', temporary_id_expiry_date: '-' }
];

export type ClutchDoneCase = {
  stock_id: string;
  customer_full_name: string;
  vehicle_year: number;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_vin: string;
  bos_effective_date: string;
  selling_price: number;
  applicable_loan_balance: string;
  net_vehicle_value: number;
}

export const clutchDoneCases: ClutchDoneCase[] = billOfSaleData.map(bos => ({
  stock_id: bos.stock_id,
  customer_full_name: bos.customer_full_name,
  vehicle_year: bos.vehicle_year,
  vehicle_make: bos.vehicle_make,
  vehicle_model: bos.vehicle_model,
  vehicle_vin: bos.vehicle_vin,
  bos_effective_date: bos.bos_effective_date,
  selling_price: bos.selling_price,
  applicable_loan_balance: bos.applicable_loan_balance,
  net_vehicle_value: bos.net_vehicle_value,
}));


export const lillyDoneCases: DoneCase[] = [
  {
    case_number: "PR1116",
    receipt_date: "03 Nov",
    social_network: "Facebook",
    username: "user_fb_1",
    lilly_product: "Trulicity",
    report_type: "Adverse Event",
    respondent_type: "Patient",
    case_summary: "Patient reported nausea after taking the product.",
    assigned_agent: "Agent A",
  },
  {
    case_number: "PR1120",
    receipt_date: "03 Nov",
    social_network: "Twitter",
    username: "user_tw_2",
    lilly_product: "Jardiance",
    report_type: "Product Complaint",
    respondent_type: "Pharmacist",
    case_summary: "Pharmacist reported a packaging issue.",
    assigned_agent: "Agent B",
  },
  {
    case_number: "PR1107",
    receipt_date: "03 Nov",
    social_network: "Instagram",
    username: "user_ig_3",
    lilly_product: "Taltz",
    report_type: "Adverse Event",
    respondent_type: "Patient",
    case_summary: "Patient experienced a skin reaction.",
    assigned_agent: "Agent A",
  },
  {
    case_number: "PR1125",
    receipt_date: "04 Nov",
    social_network: "Reddit",
    username: "user_rd_4",
    lilly_product: "Olumiant",
    report_type: "Off-label Use",
    respondent_type: "Physician",
    case_summary: "Inquiry about using the product for a non-approved indication.",
    assigned_agent: "Agent C",
  },
  {
    case_number: "PR1132",
    receipt_date: "05 Nov",
    social_network: "Facebook",
    username: "user_fb_5",
    lilly_product: "Emgality",
    report_type: "Adverse Event",
    respondent_type: "Patient",
    case_summary: "Patient reported severe migraines after first dose.",
    assigned_agent: "Agent B",
  },
];


export const teamMembers: TeamMember[] = [
    { name: 'Ethan Donovan', isYou: true, email: 'ethan.donovan@example.com', role: 'System Admin', team: 'Admins' },
    { name: 'Aisha Khan', email: 'aisha.khan@example.com', role: 'System Admin', team: 'Admins' },
    { name: 'Leo Martinez', email: 'leo.martinez@example.com', role: 'System Admin', team: 'Admins' },
];


export type Artifact = {
  id: string;
  name: string;
  type: 'document' | 'video' | 'dashboard' | 'link' | 'image';
  external?: boolean;
  href?: string;
};

export const baseArtifacts: Artifact[] = [
    { id: 'art-bos', name: 'Bill of Sale', type: 'image' },
    { id: 'art-dl', name: 'Driver\'s License', type: 'image' },
    { id: 'art-dash', name: 'Dashboard', type: 'dashboard', href: 'https://ben-staging.vercel.app/', external: true },
    { id: 'art-video', name: 'Extraction Video', type: 'video' },
    { id: 'art-bos-dataset', name: 'BOS Dataset', type: 'document', href: '/data/bill-of-sale' },
    { id: 'art-dl-dataset', name: 'DL Dataset', type: 'document', href: '/data/drivers-license' },
    { id: 'art-verification-video', name: 'Verification Video', type: 'video' },
];

export const specialArtifacts: Record<string, Artifact[]> = {
    '94221': [{ id: 'art-passport', name: 'Passport', type: 'image' }],
    '10538': [{ id: 'art-ontario', name: 'Ontario Photo ID', type: 'image' }]
};

export type Activity = {
    id: string;
    timestamp: string;
    status: 'completed' | 'in-progress';
    description: string;
    artifacts?: Artifact[];
};

export const activityLog: Activity[] = [
    { id: 'act1', timestamp: '2024-07-22T10:37:00Z', status: 'completed', description: 'Retrieved incomplete verification task from queue', artifacts: [baseArtifacts.find(a => a.id === 'art-dash')!] },
    { id: 'act2', timestamp: '2024-07-22T10:38:00Z', status: 'completed', description: 'Documents captured successfully', artifacts: [baseArtifacts.find(a => a.id === 'art-bos')!, baseArtifacts.find(a => a.id === 'art-dl')!, baseArtifacts.find(a => a.id === 'art-video')!] },
    { id: 'act3', timestamp: '2024-07-22T10:39:00Z', status: 'completed', description: 'OCR extraction completed — all key fields identified', artifacts: [baseArtifacts.find(a => a.id === 'art-bos-dataset')!, baseArtifacts.find(a => a.id === 'art-dl-dataset')!]},
    { id: 'act4', timestamp: '2024-07-22T10:40:00Z', status: 'completed', description: 'Successfully completed Cross-document verification', artifacts: [baseArtifacts.find(a => a.id === 'art-bos-dataset')!, baseArtifacts.find(a => a.id === 'art-dl-dataset')!] },
    { id: 'act5', timestamp: '2024-07-22T10:41:00Z', status: 'completed', description: 'Verification marked complete on Dashboard', artifacts: [baseArtifacts.find(a => a.id === 'art-verification-video')!] },
];
    







    

    

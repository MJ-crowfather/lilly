
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
  AEPC_Report_Form: string;
  channel: string;
  reporter_information: string;
  reporter_location: string;
  lilly_products: string;
  respondent_type: string;
  hcp_type: string;
  patient_gender: string;
  patient_age_category: string;
  ae_pc_details: string;
  report_type: string;
  contacted_poster: string;
  poster_consent: string;
  poster_contact_info: string;
  lot_control_number: string;
};

export const finalMergedSheetData: MergedSheetEntry[] = [
  { "AEPC_Report_Form": "Form-001", "channel": "Social Media", "reporter_information": "John Doe", "reporter_location": "USA", "lilly_products": "Trulicity", "respondent_type": "Patient", "hcp_type": "N/A", "patient_gender": "Male", "patient_age_category": "40-49", "ae_pc_details": "Patient reported mild nausea.", "report_type": "Adverse Event", "contacted_poster": "Yes", "poster_consent": "Yes", "poster_contact_info": "john.doe@email.com", "lot_control_number": "A123B456" },
  { "AEPC_Report_Form": "Form-002", "channel": "Email", "reporter_information": "Jane Smith", "reporter_location": "Canada", "lilly_products": "Jardiance", "respondent_type": "Physician", "hcp_type": "Endocrinologist", "patient_gender": "Female", "patient_age_category": "60-69", "ae_pc_details": "Question about dosage.", "report_type": "Inquiry", "contacted_poster": "No", "poster_consent": "N/A", "poster_contact_info": "N/A", "lot_control_number": "C789D012" },
  { "AEPC_Report_Form": "Form-003", "channel": "Phone", "reporter_information": "Anonymous", "reporter_location": "UK", "lilly_products": "Taltz", "respondent_type": "Pharmacist", "hcp_type": "N/A", "patient_gender": "N/A", "patient_age_category": "N/A", "ae_pc_details": "Complaint about packaging.", "report_type": "Product Complaint", "contacted_poster": "Yes", "poster_consent": "No", "poster_contact_info": "N/A", "lot_control_number": "E345F678" },
  { "AEPC_Report_Form": "Form-004", "channel": "Web Form", "reporter_information": "Peter Jones", "reporter_location": "Australia", "lilly_products": "Emgality", "respondent_type": "Patient", "hcp_type": "N/A", "patient_gender": "Male", "patient_age_category": "30-39", "ae_pc_details": "Severe headache after use.", "report_type": "Adverse Event", "contacted_poster": "Yes", "poster_consent": "Yes", "poster_contact_info": "peter.j@email.com", "lot_control_number": "G901H234" },
  { "AEPC_Report_Form": "Form-005", "channel": "Social Media", "reporter_information": "Mary Williams", "reporter_location": "USA", "lilly_products": "Olumiant", "respondent_type": "Patient", "hcp_type": "N/A", "patient_gender": "Female", "patient_age_category": "50-59", "ae_pc_details": "Itching and rash.", "report_type": "Adverse Event", "contacted_poster": "No", "poster_consent": "N/A", "poster_contact_info": "N/A", "lot_control_number": "I567J890" },
  { "AEPC_Report_Form": "Form-006", "channel": "Email", "reporter_information": "David Brown", "reporter_location": "Germany", "lilly_products": "Trulicity", "respondent_type": "Nurse", "hcp_type": "Diabetes Educator", "patient_gender": "Male", "patient_age_category": "70-79", "ae_pc_details": "Patient fainted.", "report_type": "Adverse Event", "contacted_poster": "Yes", "poster_consent": "Yes", "poster_contact_info": "d.brown@clinic.de", "lot_control_number": "K123L456" },
  { "AEPC_Report_Form": "Form-007", "channel": "Phone", "reporter_information": "Susan Miller", "reporter_location": "USA", "lilly_products": "Jardiance", "respondent_type": "Patient", "hcp_type": "N/A", "patient_gender": "Female", "patient_age_category": "50-59", "ae_pc_details": "Product was discolored.", "report_type": "Product Complaint", "contacted_poster": "No", "poster_consent": "N/A", "poster_contact_info": "N/A", "lot_control_number": "M789N012" },
  { "AEPC_Report_Form": "Form-008", "channel": "Web Form", "reporter_information": "Robert Garcia", "reporter_location": "Mexico", "lilly_products": "Taltz", "respondent_type": "Physician", "hcp_type": "Dermatologist", "patient_gender": "Male", "patient_age_category": "20-29", "ae_pc_details": "Off-label use inquiry.", "report_type": "Inquiry", "contacted_poster": "Yes", "poster_consent": "Yes", "poster_contact_info": "robert.g@hospital.mx", "lot_control_number": "O345P678" },
  { "AEPC_Report_Form": "Form-009", "channel": "Social Media", "reporter_information": "Linda Martinez", "reporter_location": "USA", "lilly_products": "Emgality", "respondent_type": "Patient", "hcp_type": "N/A", "patient_gender": "Female", "patient_age_category": "40-49", "ae_pc_details": "No effect on migraines.", "report_type": "Lack of Efficacy", "contacted_poster": "No", "poster_consent": "N/A", "poster_contact_info": "N/A", "lot_control_number": "Q901R234" },
  { "AEPC_Report_Form": "Form-010", "channel": "Email", "reporter_information": "Michael Rodriguez", "reporter_location": "Spain", "lilly_products": "Olumiant", "respondent_type": "Patient", "hcp_type": "N/A", "patient_gender": "Male", "patient_age_category": "60-69", "ae_pc_details": "Joint pain relief is amazing.", "report_type": "Positive Feedback", "contacted_poster": "Yes", "poster_consent": "Yes", "poster_contact_info": "m.rod@email.es", "lot_control_number": "S567T890" }
];

export const doneCases: DoneCase[] = [
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

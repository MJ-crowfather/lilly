

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


export const teamMembers: TeamMember[] = [
  { name: 'Vignesh', isYou: true, email: 'vignesh@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Maheedhar', email: 'maheedhar@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Apoorva', email: 'apoorva@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Abhishek', email: 'abhishek@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Aman', email: 'aman@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Aditya', email: 'aditya.jain@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Shubhransh', email: 'shubhransh@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Saurabh', email: 'saurabh@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Akshay', email: 'akshay.srivastava@ext.zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Palak', email: 'palak.raghuwanshi@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Aashita', email: 'aashita@zamp.ai', role: 'System Admin', team: 'Add Team' },
  { name: 'Swati', email: 'swati.deshwal@zamp.ai', role: 'System Admin', team: 'Add Team' },
];

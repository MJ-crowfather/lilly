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
  country: string;
  case_summary: string;
  case_status: string;
  processing_time: string;
  assigned_agent: string;
};

export const statusCards: StatusCard[] = [
  { title: "Needs Attention", value: 0, change: "+2" },
  { title: "Void", value: 2, change: "-3" },
  { title: "In Progress", value: 98, change: "+5" },
  { title: "Done", value: 3, change: "+150" },
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
  statementId: string;
  reconciliationReference: string;
  amount: string;
  additionalEntryInfo: string;
  investigationAndAssignment: string;
  vin: string;
  period: number;
};

export const finalMergedSheetData: MergedSheetEntry[] = [
  {"statementId":"8/1/2025","reconciliationReference":"600038554","amount":"30465.53","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"JTDACAAU5S3057413","period":1},
  {"statementId":"8/1/2025","reconciliationReference":"600038554","amount":"30465.53","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"JTDACAAU5S3057413","period":1},
  {"statementId":"8/1/2025","reconciliationReference":"600038534","amount":"18432.51","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"3N1AB8BV3RY290522","period":3},
  {"statementId":"8/1/2025","reconciliationReference":"600038546","amount":"16215.31","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"1G1ZC5ST6RF225285","period":0},
  {"statementId":"8/1/2025","reconciliationReference":"600038485","amount":"3377.29","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"RVS Estimate","vin":"KM8K22AB6PU028088","period":0},
  {"statementId":"8/1/2025","reconciliationReference":"600038554","amount":"30465.53","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"JTDACAAU5S3057413","period":1},
  {"statementId":"8/1/2025","reconciliationReference":"600038534","amount":"18432.51","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"3N1AB8BV3RY290522","period":3},
  {"statementId":"8/1/2025","reconciliationReference":"600038546","amount":"16215.31","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"1G1ZC5ST6RF225285","period":0},
  {"statementId":"8/1/2025","reconciliationReference":"600038485","amount":"3377.29","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"RVS Estimate","vin":"KM8K22AB6PU028088","period":0},
  {"statementId":"8/1/2025","reconciliationReference":"600038554","amount":"30465.53","additionalEntryInfo":"ORIG CO NAME=Mobilitas,ORIG ID=5...","investigationAndAssignment":"Total Loss","vin":"JTDACAAU5S3057413","period":1}
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
    country: "USA",
    case_summary: "Patient reported nausea after taking the product.",
    case_status: "Closed",
    processing_time: "2 days",
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
    country: "Canada",
    case_summary: "Pharmacist reported a packaging issue.",
    case_status: "Closed",
    processing_time: "1 day",
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
    country: "UK",
    case_summary: "Patient experienced a skin reaction.",
    case_status: "Closed",
    processing_time: "3 days",
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
    country: "Germany",
    case_summary: "Inquiry about using the product for a non-approved indication.",
    case_status: "Closed",
    processing_time: "4 days",
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
    country: "USA",
    case_summary: "Patient reported severe migraines after first dose.",
    case_status: "Closed",
    processing_time: "2 days",
    assigned_agent: "Agent B",
  },
];

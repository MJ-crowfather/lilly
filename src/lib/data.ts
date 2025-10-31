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

export const statusCards: StatusCard[] = [
  { title: "Needs Attention", value: 0, change: "+2" },
  { title: "Void", value: 2, change: "-3" },
  { title: "In Progress", value: 98, change: "+5" },
  { title: "Done", value: 0, change: "+150" },
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

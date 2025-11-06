'use client';

import * as React from 'react';

export type Company = 'Eli Lilly' | 'Clutch' | 'skunk works';

export type CompanyData = {
    name: Company;
    processName: string;
    avatar: {
        fallback: string;
        bgColor: string;
        textColor: string;
    }
};

const companyDetails: Record<Company, CompanyData> = {
    'Eli Lilly': {
        name: 'Eli Lilly',
        processName: 'AE/PC Reporting',
        avatar: {
            fallback: 'E',
            bgColor: 'bg-yellow-300',
            textColor: 'text-yellow-900',
        }
    },
    'Clutch': {
        name: 'Clutch',
        processName: 'Document Verification',
        avatar: {
            fallback: 'C',
            bgColor: 'bg-pink-200',
            textColor: 'text-pink-800',
        }
    },
    'skunk works': {
        name: 'skunk works',
        processName: 'Stealth Project',
        avatar: {
            fallback: 'S',
            bgColor: 'bg-green-200',
            textColor: 'text-green-800',
        }
    },
};

interface CompanyContextType {
  company: Company;
  setCompany: (company: Company) => void;
  companyData: CompanyData;
  companies: CompanyData[];
}

const CompanyContext = React.createContext<CompanyContextType | null>(null);

const COMPANY_KEY = 'app_selected_company';

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompany] = React.useState<Company>('Eli Lilly');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const storedCompany = localStorage.getItem(COMPANY_KEY) as Company | null;
      if (storedCompany && companyDetails[storedCompany]) {
        setCompany(storedCompany);
      }
    } catch (e) {
      // localStorage is not available on the server
    }
    setLoading(false);
  }, []);

  const handleSetCompany = (newCompany: Company) => {
    if (companyDetails[newCompany]) {
        setCompany(newCompany);
        localStorage.setItem(COMPANY_KEY, newCompany);
    }
  };
  
  const value = { 
      company,
      setCompany: handleSetCompany,
      companyData: companyDetails[company],
      companies: Object.values(companyDetails)
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export function useCompany() {
  const context = React.useContext(CompanyContext);
  if (context === null) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}

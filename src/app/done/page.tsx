'use client';

import * as React from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { StatusToolbar } from '@/components/reconciliation/status-toolbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { statusCards, lillyDoneCases, clutchDoneCases, type DoneCase, type ClutchDoneCase } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Check, Search, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCompany } from '@/components/company-provider';

const lillyTableHeaders: (keyof DoneCase)[] = [
  'case_number', 'receipt_date', 'social_network', 'username', 'lilly_product', 'report_type', 'respondent_type', 'case_summary', 'assigned_agent'
];

const clutchTableHeaders: (keyof ClutchDoneCase)[] = [
  'stock_id', 'customer_full_name', 'vehicle_year', 'vehicle_make', 'vehicle_model', 'vehicle_vin', 'bos_effective_date', 'selling_price', 'applicable_loan_balance', 'net_vehicle_value'
];

type LillyTableHeader = typeof lillyTableHeaders[number];
type ClutchTableHeader = typeof clutchTableHeaders[number];
type TableHeader = LillyTableHeader | ClutchTableHeader;

type AppliedFilter = {
    column: TableHeader;
    values: string[];
};

const DoneStatusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 8 8" {...props}>
      <rect width="8" height="8" rx="1.5" className="fill-green-100 dark:fill-green-900/50 stroke-green-500 dark:stroke-green-400" strokeWidth="1"/>
    </svg>
);

function formatHeader(header: string): string {
    if (header === 'stock_id') return 'Stock ID';
    return header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function DonePage() {
  const { company } = useCompany();
  const isClutch = company === 'Clutch';

  const tableHeaders = isClutch ? clutchTableHeaders : lillyTableHeaders;
  const data = isClutch ? clutchDoneCases : lillyDoneCases;
  
  const [filters, setFilters] = React.useState<AppliedFilter[]>([]);
  const [searchTerms, setSearchTerms] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(tableHeaders.map(h => [h, '']))
  );

  const uniqueValues = React.useMemo(() => {
      const allValues: Record<string, Set<string>> = {};
      tableHeaders.forEach(header => {
          allValues[header] = new Set();
      });
      data.forEach(row => {
          tableHeaders.forEach(header => {
              const value = (row as any)[header];
              if (value !== null && value !== undefined) {
                  allValues[header].add(String(value));
              }
          });
      });
      return allValues;
  }, [data, tableHeaders]);

  const filteredData = React.useMemo(() => {
    if (filters.length === 0) {
      return data;
    }
    return data.filter(row => {
      return filters.every(filter => {
        if (filter.values.length === 0) return true;
        const rowValue = String((row as any)[filter.column]);
        return filter.values.includes(rowValue);
      });
    });
  }, [data, filters]);

  const handleFilterChange = (column: TableHeader, value: string, checked: boolean) => {
    setFilters(prevFilters => {
        const existingFilter = prevFilters.find(f => f.column === column);
        if (existingFilter) {
            const newValues = checked
                ? [...existingFilter.values, value]
                : existingFilter.values.filter(v => v !== value);
            
            if (newValues.length === 0) {
                return prevFilters.filter(f => f.column !== column);
            }

            return prevFilters.map(f => f.column === column ? { ...f, values: newValues } : f);
        } else if (checked) {
            return [...prevFilters, { column, values: [value] }];
        }
        return prevFilters;
    });
  };

  const removeFilter = (column: TableHeader, value: string) => {
    handleFilterChange(column, value, false);
  };
  
  const clearAllFilters = () => {
    setFilters([]);
  };

  const handleSearchChange = (column: string, term: string) => {
      setSearchTerms(prev => ({ ...prev, [column]: term }));
  };

  const renderLillyTable = () => (
    <Table>
      <TableHeader>
          <TableRow>
              <TableHead className="text-xs w-12"></TableHead>
              {lillyTableHeaders.map((header) => (
                  <TableHead key={header} className="text-xs">{formatHeader(header)}</TableHead>
              ))}
          </TableRow>
      </TableHeader>
      <TableBody>
          {(filteredData as DoneCase[]).map((caseItem) => (
              <TableRow key={caseItem.case_number} className="border-b-0">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <DoneStatusIcon className="h-2 w-2"/>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </TableCell>
                  {lillyTableHeaders.map(header => (
                    <TableCell key={header} className="py-2 text-xs max-w-[250px] truncate">{caseItem[header]}</TableCell>
                  ))}
              </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  const renderClutchTable = () => (
     <Table>
      <TableHeader>
          <TableRow>
              <TableHead className="text-xs w-12"></TableHead>
              {clutchTableHeaders.map((header) => (
                  <TableHead key={header} className="text-xs">{formatHeader(header)}</TableHead>
              ))}
          </TableRow>
      </TableHeader>
      <TableBody>
          {(filteredData as ClutchDoneCase[]).map((caseItem) => (
              <TableRow key={caseItem.stock_id} className="border-b-0">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <DoneStatusIcon className="h-2 w-2"/>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </TableCell>
                  {clutchTableHeaders.map(header => (
                    <TableCell key={header} className="py-2 text-xs max-w-[250px] truncate">
                      {(header === 'selling_price' || header === 'net_vehicle_value') && typeof (caseItem as any)[header] === 'number' 
                        ? `$${((caseItem as any)[header] as number).toFixed(2)}`
                        : (caseItem as any)[header]
                      }
                    </TableCell>
                  ))}
              </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 flex flex-col">
            <div className="p-4 md:px-6 border-b">
              <div className="flex items-center justify-between">
                <StatusToolbar statuses={statusCards} />
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs">
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64" align="start">
                            <div className="p-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search columns..." className="pl-8" />
                                </div>
                            </div>
                            <Separator />
                            <ScrollArea className="h-60">
                            {tableHeaders.map(header => (
                                <DropdownMenuSub key={header}>
                                    <DropdownMenuSubTrigger>{formatHeader(header)}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <div className="p-2">
                                                <Input
                                                    placeholder="Search values..."
                                                    value={searchTerms[header]}
                                                    onChange={(e) => handleSearchChange(header, e.target.value)}
                                                    className="w-full"
                                                />
                                            </div>
                                            <ScrollArea className="max-h-48">
                                                {Array.from(uniqueValues[header] || [])
                                                  .filter(value => value.toLowerCase().includes((searchTerms[header] || '').toLowerCase()))
                                                  .map(value => {
                                                    const isChecked = filters.find(f => f.column === header)?.values.includes(value) ?? false;
                                                    return (
                                                        <DropdownMenuCheckboxItem
                                                            key={value}
                                                            checked={isChecked}
                                                            onCheckedChange={(checked) => handleFilterChange(header, value, !!checked)}
                                                            onSelect={(e) => e.preventDefault()}
                                                        >
                                                            {value}
                                                        </DropdownMenuCheckboxItem>
                                                    )
                                                })}
                                            </ScrollArea>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {filters.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                            {filters.map(filter =>
                                filter.values.map(value => (
                                    <Badge key={`${filter.column}-${value}`} variant="secondary" className="flex items-center gap-1.5 pl-2 pr-1 text-xs">
                                        <span>{formatHeader(filter.column)}: <span className="font-semibold">{value}</span></span>
                                        <button onClick={() => removeFilter(filter.column, value)} className="rounded-full hover:bg-muted-foreground/20 p-0.5">
                                            <X className="h-3 w-3"/>
                                        </button>
                                    </Badge>
                                ))
                            )}
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearAllFilters}>
                                <X className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </div>
                    )}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="bg-card text-card-foreground">
                    {isClutch ? renderClutchTable() : renderLillyTable()}
                </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

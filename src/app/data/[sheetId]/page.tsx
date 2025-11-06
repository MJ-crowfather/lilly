

'use client';

import * as React from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { finalMergedSheetData, billOfSaleData, driversLicenseData, type MergedSheetEntry, type BillOfSaleEntry, type DriversLicenseEntry } from '@/lib/data';
import { Filter, ArrowDownToLine, History, SlidersHorizontal, ArrowUpDown, Search, Database, X, ChevronRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useCompany } from '@/components/company-provider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const lillyTableHeaders = [
  "channel", "Lilly Agent assigned", "reporter_username", "Receipt Date", "lilly_products",
  "respondent_type", "hcp_type", "patient_gender", "patient_age", "ae_pc_details",
  "report_type", "contacted_poster", "poster_consent", "poster_contact_info", "lot_control_number"
] as const;

const visibleClutchHeaders = [
    "stock_id", "customer_first_name", "customer_last_name", "customer_full_name", 
    "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_vin", "vehicle_vin_last6", 
    "bos_effective_date", "selling_price", "net_vehicle_value"
] as const;

const expandableClutchHeaders = [
    "additions_dropoff_tomorrow", "additions_partnership_discount", 
    "applicable_loan_balance", "deductions", "adjustment_sbs"
] as const;

const clutchBillOfSaleTableHeaders = ["stock_id", "customer_first_name", "customer_last_name", "customer_full_name", "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_vin", "vehicle_vin_last6", "bos_effective_date", "selling_price", "additions_dropoff_tomorrow", "additions_partnership_discount", "applicable_loan_balance", "deductions", "adjustment_sbs", "net_vehicle_value"];

const clutchDriversLicenseTableHeaders = [
    "id_first_name", "id_last_name", "id_full_name", "id_expiry_date", "id_number", 
    "id_issue_date", "id_type", "temporary_id_provided", "temporary_id_type", "temporary_id_expiry_date"
] as const;


type LillyTableHeader = typeof lillyTableHeaders[number];
type ClutchBillOfSaleHeader = (typeof clutchBillOfSaleTableHeaders)[number];
type ClutchDriversLicenseHeader = typeof clutchDriversLicenseTableHeaders[number];
type TableHeader = LillyTableHeader | ClutchBillOfSaleHeader | ClutchDriversLicenseHeader;

type Filter = {
    column: TableHeader;
    values: string[];
};

function SortableHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2">
            {children}
            <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
        </div>
    )
}

function formatHeader(header: string): string {
    if (header === 'ae_pc_details') return 'AE/PC Details';
    if (header === 'bos_effective_date') return 'BOS Effective Date';
    if (header === 'stock_id' || header === 'id') return 'Stock ID';
    if (header.startsWith('id_')) return header.substring(3).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}


export default function SheetDetailsPage({ params }: { params: { sheetId: string } }) {
  const { company } = useCompany();
  const isClutch = company === 'Clutch';

  const isBillOfSale = params.sheetId === 'bill-of-sale';
  const isDriversLicense = params.sheetId === 'drivers-license';

  const data = isClutch 
    ? (isBillOfSale ? billOfSaleData : driversLicenseData) 
    : finalMergedSheetData;

  const tableHeaders = isClutch 
    ? (isBillOfSale ? clutchBillOfSaleTableHeaders : clutchDriversLicenseTableHeaders) 
    : lillyTableHeaders;
    
  const displayHeaders = isClutch 
    ? (isBillOfSale ? visibleClutchHeaders : clutchDriversLicenseTableHeaders) 
    : lillyTableHeaders;


  const [filters, setFilters] = React.useState<Filter[]>([]);
  const [searchTerms, setSearchTerms] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(tableHeaders.map(h => [h, '']))
  );
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  }


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
            {lillyTableHeaders.map(header => (
                <TableHead key={header} className="text-xs">
                    <SortableHeader>{formatHeader(header)}</SortableHeader>
                </TableHead>
            ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {filteredData.map((row, index) => (
                <TableRow key={index}>
                    {lillyTableHeaders.map(key => (
                        <TableCell key={key} className="text-xs py-1">{(row as any)[key]}</TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );

  const renderBillOfSaleTable = () => (
     <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-8" />
                {visibleClutchHeaders.map(header => (
                    <TableHead key={header} className="text-xs">
                        <SortableHeader>{formatHeader(header)}</SortableHeader>
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {(filteredData as BillOfSaleEntry[]).map((row) => (
                <Collapsible asChild key={row.stock_id} open={expandedRows.includes(row.stock_id)} onOpenChange={() => toggleRow(row.stock_id)}>
                    <>
                        <TableRow className="text-xs">
                            <TableCell>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedRows.includes(row.stock_id) && "rotate-90")} />
                                    </Button>
                                </CollapsibleTrigger>
                            </TableCell>
                            {visibleClutchHeaders.map(key => (
                                <TableCell key={key} className="py-1">
                                    {key === 'net_vehicle_value' || key === 'selling_price' ? `$${(row[key] as number).toFixed(2)}` : (row as any)[key]}
                                </TableCell>
                            ))}
                        </TableRow>
                        <CollapsibleContent asChild>
                           <tr className="bg-muted/50 hover:bg-muted">
                                <td colSpan={visibleClutchHeaders.length + 1} className="p-0">
                                    <div className="grid grid-cols-5 gap-x-4 px-16 py-2">
                                        {expandableClutchHeaders.map(header => (
                                            <div key={header}>
                                                <p className="text-xs font-semibold text-muted-foreground">{formatHeader(header)}</p>
                                                <p className="text-sm">{(row as any)[header]}</p>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </CollapsibleContent>
                    </>
                </Collapsible>
            ))}
        </TableBody>
    </Table>
  );

  const renderDriversLicenseTable = () => (
    <Table>
        <TableHeader>
            <TableRow>
            {clutchDriversLicenseTableHeaders.map(header => (
                <TableHead key={header} className="text-xs">
                    <SortableHeader>{formatHeader(header)}</SortableHeader>
                </TableHead>
            ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {(filteredData as DriversLicenseEntry[]).map((row) => (
                <TableRow key={row.id}>
                    {clutchDriversLicenseTableHeaders.map(key => (
                        <TableCell key={key} className="text-xs py-1">{(row as any)[key]}</TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );

  const renderClutchTable = () => {
      if(isBillOfSale) return renderBillOfSaleTable();
      if(isDriversLicense) return renderDriversLicenseTable();
      return null;
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 flex flex-col">
            <div className="p-4 md:px-6 flex items-center justify-between border-b">
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
                            {displayHeaders.map(header => (
                                <DropdownMenuSub key={header}>
                                    <DropdownMenuSubTrigger>{formatHeader(header)}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <div className="p-2">
                                                <Input
                                                    placeholder="Search values..."
                                                    value={searchTerms[header] || ''}
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
                                                            onSelect={(e) => e.preventDefault()} // prevent closing
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
                        <>
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
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearAllFilters}>
                                <X className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                  <ArrowDownToLine className="h-4 w-4" />
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white text-xs">
                              <p>Export All</p>
                          </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                  <Database className="h-4 w-4" />
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white text-xs">
                              <p>Import Data</p>
                          </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                  <History className="h-4 w-4" />
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white text-xs">
                              <p>Activity</p>
                          </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                  <SlidersHorizontal className="h-4 w-4" />
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white text-xs">
                              <p>Display options</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="rounded-lg bg-card text-card-foreground">
                  {isClutch ? renderClutchTable() : renderLillyTable()}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

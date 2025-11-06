
'use client';

import * as React from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { StatusToolbar } from '@/components/reconciliation/status-toolbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { statusCards, doneCases, type DoneCase } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Check, Search, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const tableHeaders: (keyof DoneCase)[] = [
  'case_number',
  'receipt_date',
  'social_network',
  'username',
  'lilly_product',
  'report_type',
  'respondent_type',
  'case_summary',
  'assigned_agent',
];

type TableHeader = typeof tableHeaders[number];

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
    return header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function DonePage() {
  const [filters, setFilters] = React.useState<AppliedFilter[]>([]);
  const [searchTerms, setSearchTerms] = React.useState<Record<TableHeader, string>>(() =>
    Object.fromEntries(tableHeaders.map(h => [h, ''])) as Record<TableHeader, string>
  );

  const uniqueValues = React.useMemo(() => {
      const allValues: Record<TableHeader, Set<string>> = {} as Record<TableHeader, Set<string>>;
      tableHeaders.forEach(header => {
          allValues[header] = new Set();
      });
      doneCases.forEach(row => {
          tableHeaders.forEach(header => {
              const value = row[header];
              if (value !== null && value !== undefined) {
                  allValues[header].add(String(value));
              }
          });
      });
      return allValues;
  }, []);

  const filteredData = React.useMemo(() => {
    if (filters.length === 0) {
      return doneCases;
    }
    return doneCases.filter(row => {
      return filters.every(filter => {
        if (filter.values.length === 0) return true;
        const rowValue = String(row[filter.column]);
        return filter.values.includes(rowValue);
      });
    });
  }, [filters]);

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

  const handleSearchChange = (column: TableHeader, term: string) => {
      setSearchTerms(prev => ({ ...prev, [column]: term }));
  };

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
                                                {Array.from(uniqueValues[header])
                                                  .filter(value => value.toLowerCase().includes(searchTerms[header].toLowerCase()))
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-xs w-12"></TableHead>
                                {tableHeaders.map((header) => (
                                    <TableHead key={header} className="text-xs">{formatHeader(header)}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((caseItem) => (
                                <TableRow key={caseItem.case_number} className="border-b-0">
                                    <TableCell className="py-2">
                                      <div className="flex items-center gap-2">
                                        <DoneStatusIcon className="h-2 w-2"/>
                                        <Check className="h-4 w-4 text-green-600" />
                                      </div>
                                    </TableCell>
                                    {tableHeaders.map(header => (
                                      <TableCell key={header} className="py-2 text-xs max-w-[250px] truncate">{caseItem[header]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

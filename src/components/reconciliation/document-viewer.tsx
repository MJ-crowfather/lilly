
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Artifact, type BillOfSaleEntry, type DriversLicenseEntry } from '@/lib/data';
import { Menu, Search, Download, Share, Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type DocumentViewerProps = {
  artifact: Artifact;
  billOfSaleData: BillOfSaleEntry;
  driversLicenseData: DriversLicenseEntry;
  onOpenChange: (open: boolean) => void;
};

const DataField = ({ label, value }: { label: string; value: string | number }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <Input
            readOnly
            value={value}
            className="mt-1 h-8 text-xs border-0 border-b rounded-none px-1"
        />
    </div>
);

const BillOfSaleDetails = ({ data }: { data: BillOfSaleEntry }) => (
    <div className="space-y-4">
        <DataField label="Customer Full Name" value={data.customer_full_name} />
        <DataField label="Vehicle Year" value={data.vehicle_year} />
        <DataField label="Vehicle Make" value={data.vehicle_make} />
        <DataField label="Vehicle Model" value={data.vehicle_model} />
        <DataField label="Vehicle VIN" value={data.vehicle_vin} />
        <DataField label="BOS Effective Date" value={data.bos_effective_date} />
        <DataField label="Selling Price" value={`$${data.selling_price.toFixed(2)}`} />
        <DataField label="Net Vehicle Value" value={`$${data.net_vehicle_value.toFixed(2)}`} />
    </div>
);

const DriversLicenseDetails = ({ data }: { data: DriversLicenseEntry }) => (
    <div className="space-y-4">
        <DataField label="Full Name" value={data.id_full_name} />
        <DataField label="License Number" value={data.id_number} />
        <DataField label="Expiry Date" value={data.id_expiry_date} />
        <DataField label="Issue Date" value={data.id_issue_date} />
        <DataField label="ID Type" value={data.id_type} />
    </div>
);

const OtherIdDetails = ({ data, type }: { data: DriversLicenseEntry, type: 'Passport' | 'Ontario Photo ID' }) => (
    <div className="space-y-4">
        <DataField label="Full Name" value={data.id_full_name} />
        <DataField label="ID Type" value={type} />
    </div>
);


export function DocumentViewer({ artifact, billOfSaleData, driversLicenseData, onOpenChange }: DocumentViewerProps) {
    const isBOS = artifact.id === 'art-bos';
    const isDL = artifact.id === 'art-dl';
    const isPassport = artifact.id === 'art-passport';
    const isOntarioId = artifact.id === 'art-ontario';

    let detailsContent;
    if (isBOS) {
        detailsContent = <BillOfSaleDetails data={billOfSaleData} />;
    } else if (isDL) {
        detailsContent = <DriversLicenseDetails data={driversLicenseData} />;
    } else if (isPassport) {
        detailsContent = <OtherIdDetails data={driversLicenseData} type="Passport" />;
    } else if (isOntarioId) {
        detailsContent = <OtherIdDetails data={driversLicenseData} type="Ontario Photo ID" />;
    } else {
        detailsContent = <p>No details available for this document type.</p>;
    }
    

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0">
        <div className="grid grid-cols-12 h-full">
            {/* Left Panel: Extracted Data */}
            <div className="col-span-5 border-r flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Menu className="h-4 w-4" /></Button>
                        <h2 className="font-semibold text-sm">{artifact.name}</h2>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Share className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Maximize2 className="h-4 w-4" /></Button>
                    </div>
                </div>
                <ScrollArea className="flex-1">
                   <div className="p-6">
                       {detailsContent}
                   </div>
                </ScrollArea>
            </div>

            {/* Right Panel: Image */}
            <div className="col-span-7 flex flex-col bg-muted/30">
                 <div className="p-4 border-b flex items-center justify-between bg-background">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search PDF" className="pl-8 h-8 text-xs" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center">
                    {artifact.href ? (
                        <Image
                            src={artifact.href}
                            alt={artifact.name}
                            width={800}
                            height={1000}
                            className="object-contain max-w-full max-h-full rounded-md shadow-md"
                        />
                    ) : (
                        <div className="text-muted-foreground">Image not available</div>
                    )}
                </div>
                 <div className="p-2 border-t flex items-center justify-center bg-background">
                    <p className="text-xs text-muted-foreground">Page 1 / 1</p>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

    
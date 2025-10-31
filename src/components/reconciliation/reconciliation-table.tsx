"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/lib/data"
import { Archive, FileWarning, Send } from "lucide-react"

type ReconciliationTableProps = {
  data: Transaction[]
}

export function ReconciliationTable({ data }: ReconciliationTableProps) {
  const [transactions, setTransactions] = React.useState<Transaction[]>(data)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      const allIds = transactions.map((t) => t.id)
      setSelectedRows(allIds)
      setTransactions(transactions.map(t => ({...t, isChecked: true})))
    } else {
      setSelectedRows([])
      setTransactions(transactions.map(t => ({...t, isChecked: false})))
    }
  }

  const handleRowSelect = (id: string) => {
    const newTransactions = transactions.map(t => {
      if (t.id === id) {
        return {...t, isChecked: !t.isChecked}
      }
      return t
    })
    setTransactions(newTransactions)
    const newSelectedRows = newTransactions.filter(t => t.isChecked).map(t => t.id)
    setSelectedRows(newSelectedRows)
  }

  const isAllSelected = selectedRows.length > 0 && selectedRows.length === transactions.length
  const isSomeSelected = selectedRows.length > 0 && selectedRows.length < transactions.length

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {selectedRows.length > 0 && (
        <div className="p-4 bg-secondary/50 border-b flex items-center justify-between gap-4">
          <p className="text-sm font-medium">{selectedRows.length} item{selectedRows.length > 1 ? 's' : ''} selected</p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline"><FileWarning /> Mark as pending</Button>
            <Button size="sm" variant="outline"><Archive /> Archive</Button>
            <Button size="sm"><Send /> Reconcile</Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                onCheckedChange={handleSelectAll}
                checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Transaction</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} data-state={transaction.isChecked && "selected"}>
              <TableCell>
                <Checkbox
                  checked={transaction.isChecked}
                  onCheckedChange={() => handleRowSelect(transaction.id)}
                  aria-label={`Select transaction ${transaction.transaction}`}
                />
              </TableCell>
              <TableCell className="font-medium">{transaction.transaction}</TableCell>
              <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.source}</TableCell>
              <TableCell>
                <Badge variant={transaction.status === "Matched" ? "default" : "secondary"} className={
                  transaction.status === 'Matched' ? 
                  'bg-accent text-accent-foreground hover:bg-accent/80' : 
                  'bg-orange-100 text-orange-700 hover:bg-orange-100/80 dark:bg-orange-900/50 dark:text-orange-300'
                }>
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

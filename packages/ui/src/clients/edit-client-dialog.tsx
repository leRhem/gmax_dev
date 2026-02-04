"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Client } from "@repo/types"
import { EditClientForm } from "./edit-client-form"

interface EditClientDialogProps {
  client: Client
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditClientDialog({
  client,
  open,
  onOpenChange,
  onSuccess,
}: EditClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update the client's details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <EditClientForm 
          client={client} 
          onSuccess={() => {
            onOpenChange(false)
            onSuccess()
          }} 
        />
      </DialogContent>
    </Dialog>
  )
}

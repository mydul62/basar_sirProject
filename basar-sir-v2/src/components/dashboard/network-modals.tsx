"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NetworkForm } from "./network-form"

interface NetworkModalsProps {
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
  isEditModalOpen: boolean
  setIsEditModalOpen: (open: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (open: boolean) => void
  selectedNetwork: any
  onAdd: (data: any) => void
  onEdit: (data: any) => void
  onDelete: () => void
}

export function NetworkModals({
  isAddModalOpen,
  setIsAddModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedNetwork,
  onAdd,
  onEdit,
  onDelete,
}: NetworkModalsProps) {
  return (
    <>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Network</DialogTitle>
            <DialogDescription>Add a new professional affiliation or membership.</DialogDescription>
          </DialogHeader>
          <NetworkForm onSubmit={onAdd} onCancel={() => setIsAddModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Network</DialogTitle>
            <DialogDescription>Update the network information.</DialogDescription>
          </DialogHeader>
          <NetworkForm initialData={selectedNetwork} onSubmit={onEdit} onCancel={() => setIsEditModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Network</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedNetwork?.role}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

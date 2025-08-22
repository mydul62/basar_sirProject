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
import { GrantForm } from "./grant-form"

interface GrantModalsProps {
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
  isEditModalOpen: boolean
  setIsEditModalOpen: (open: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (open: boolean) => void
  selectedGrant: any
  onAdd: (data: any) => void
  onEdit: (data: any) => void
  onDelete: () => void
}

export function GrantModals({
  isAddModalOpen,
  setIsAddModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedGrant,
  onAdd,
  onEdit,
  onDelete,
}: GrantModalsProps) {
  return (
    <>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Grant</DialogTitle>
            <DialogDescription>Add a new research grant or project funding.</DialogDescription>
          </DialogHeader>
          <GrantForm onSubmit={onAdd} onCancel={() => setIsAddModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Grant</DialogTitle>
            <DialogDescription>Update the grant information.</DialogDescription>
          </DialogHeader>
          <GrantForm initialData={selectedGrant} onSubmit={onEdit} onCancel={() => setIsEditModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Grant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedGrant?.title}"? This action cannot be undone.
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

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
import { AwardForm } from "./award-form"

interface AwardModalsProps {
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
  isEditModalOpen: boolean
  setIsEditModalOpen: (open: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (open: boolean) => void
  selectedAward: any
  onAdd: (data: any) => void
  onEdit: (data: any) => void
  onDelete: () => void
}

export function AwardModals({
  isAddModalOpen,
  setIsAddModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedAward,
  onAdd,
  onEdit,
  onDelete,
}: AwardModalsProps) {
  return (
    <>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Award</DialogTitle>
            <DialogDescription>Add a new award or recognition to your profile.</DialogDescription>
          </DialogHeader>
          <AwardForm onSubmit={onAdd} onCancel={() => setIsAddModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Award</DialogTitle>
            <DialogDescription>Update the award information.</DialogDescription>
          </DialogHeader>
          <AwardForm initialData={selectedAward} onSubmit={onEdit} onCancel={() => setIsEditModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Award</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedAward?.title}"? This action cannot be undone.
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

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
import { PublicationForm } from "./publication-form"

interface PublicationModalsProps {
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
  isEditModalOpen: boolean
  setIsEditModalOpen: (open: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (open: boolean) => void
  selectedPublication: any
  onAdd: (data: any) => void
  onEdit: (data: any) => void
  onDelete: () => void
}

export function PublicationModals({
  isAddModalOpen,
  setIsAddModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedPublication,
  onAdd,
  onEdit,
  onDelete,
}: PublicationModalsProps) {
  return (
    <>
      {/* Add Publication Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Publication</DialogTitle>
            <DialogDescription>Add a new research publication to your portfolio.</DialogDescription>
          </DialogHeader>
          <PublicationForm onSubmit={onAdd} onCancel={() => setIsAddModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Publication Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Publication</DialogTitle>
            <DialogDescription>Update the publication information.</DialogDescription>
          </DialogHeader>
          <PublicationForm
            initialData={selectedPublication}
            onSubmit={onEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Publication Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Publication</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedPublication?.title}"? This action cannot be undone.
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

"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ActivityForm } from "./activity-form"
import type { Activity } from "@/src/lib/demo-data"

interface ActivityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activity?: Activity
  onSubmit: (activity: Omit<Activity, "id"> & { id?: string }) => void
}

export function ActivityModal({ open, onOpenChange, activity, onSubmit }: ActivityModalProps) {
  const handleSubmit = (activityData: Omit<Activity, "id"> & { id?: string }) => {
    onSubmit(activityData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{activity ? "Edit Activity" : "Add New Activity"}</DialogTitle>
          <DialogDescription>
            {activity ? "Update your activity details below." : "Create a new activity by filling out the form below."}
          </DialogDescription>
        </DialogHeader>
        <ActivityForm activity={activity} onSubmit={handleSubmit} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

interface DeleteActivityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activity?: Activity
  onConfirm: () => void
}

export function DeleteActivityModal({ open, onOpenChange, activity, onConfirm }: DeleteActivityModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Activity</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{activity?.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

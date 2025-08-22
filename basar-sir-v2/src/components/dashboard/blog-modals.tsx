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
import { BlogForm } from "./blog-form"
import type { BlogPost } from "@/src/lib/demo-data"

interface BlogModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post?: BlogPost
  onSubmit: (post: Omit<BlogPost, "id"> & { id?: string }) => void
}

export function BlogModal({ open, onOpenChange, post, onSubmit }: BlogModalProps) {
  const handleSubmit = (postData: Omit<BlogPost, "id"> & { id?: string }) => {
    onSubmit(postData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
          <DialogDescription>
            {post ? "Update your blog post details below." : "Create a new blog post by filling out the form below."}
          </DialogDescription>
        </DialogHeader>
        <BlogForm post={post} onSubmit={handleSubmit} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

interface DeleteBlogModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post?: BlogPost
  onConfirm: () => void
}

export function DeleteBlogModal({ open, onOpenChange, post, onConfirm }: DeleteBlogModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{post?.title}"? This action cannot be undone.
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

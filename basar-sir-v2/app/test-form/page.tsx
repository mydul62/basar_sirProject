"use client"

import { useForm } from "react-hook-form"

type FormValues = {
  email: string
  password: string
}

export default function TestForm() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-2">
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Icon from "@/components/ui/icon"
import toast from "react-hot-toast"

const formSchema = yup
  .object({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!"),
  })
  .required()

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const router = useRouter()

  function onSubmit(values) {
    signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.refresh()
      } else {
        toast.error(error, { duration: 5000 })
      }
    })
  }
  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3>Login</h3>
          <p className="muted">Please enter your username and password to login.</p>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <FormInput prefix={<Icon name="User" size={18} />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    prefix={<Icon name="Key" size={18} />}
                    suffix={
                      showPassword ? (
                        <div
                          className="muted cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          Hide
                        </div>
                      ) : (
                        <div
                          className="muted cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          Show
                        </div>
                      )
                    }
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
        <div className="flex gap-2">
          <span className="text-sm">Don&apos;t have account?</span>
          <Link
            href="/register"
            className="text-sm underline hover:no-underline font-medium"
          >
            Create account
          </Link>
        </div>
      </form>
    </Form>
  )
}

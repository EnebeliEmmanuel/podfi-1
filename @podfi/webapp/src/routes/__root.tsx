import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { isError } from "ethers"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { config } from "@/lib/config"
import { FunctionComponent, ReactNode, useEffect } from 'react';
import { auth } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon, UserIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { contracts } from '@/lib/contracts'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { Provider } from './-components/wagmi-connector'
import { useWriteContract } from 'wagmi'
import { useState } from 'react'

export const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
      <Toaster />
      <Devtools />
    </Providers>
  ),
})

const Providers: FunctionComponent<{ children: ReactNode }> = () => {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <OnboardingProvider>
          <Outlet />
        </OnboardingProvider>
      </QueryClientProvider>
    </Provider>
  )
}

const OnboardingProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { status, retry } = auth.hooks.useAuth()
  const isOnboarding = status === 'onboarding'

  const completed = () =>
    retry()

  return (
    <>
      {isOnboarding && (
        <Dialog open={isOnboarding} showCloseBtn={false}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Hi friend 👋
              </DialogTitle>
              <DialogDescription>
                We noticed you haven't yet created an account
              </DialogDescription>
            </DialogHeader>
            <OnboardingForm completed={completed} />
          </DialogContent>
        </Dialog>
      )}
      {children}
    </>
  )
}

const FormSchema = z.object({
  username: z.string(),
  bio: z.string()
})

type FormSchema = z.infer<typeof FormSchema>

const OnboardingForm: FunctionComponent<{ completed: () => Promise<unknown> }> = ({ completed }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      bio: ""
    }
  })

  const { toast } = useToast()

  const { writeContract, status } = useWriteContract()

  const onSubmit = async (data: FormSchema) => {
    writeContract({
      abi: contracts.abi.podfi,
      address: config.podfi.contractAddress as any,
      functionName: "registerUser",
      args: [data.username, data.bio]
    }, {
      onSuccess: async () => {
        toast({
          title: 'Account created',
          description: 'Account created successfully'
        })
        await completed()
      },
      onError: err => {
        console.log(err)

        if (err.name === 'ContractFunctionExecutionError') {
          if ((err.walk() as any).reason === 'USER_ALREADY_EXISTS')
            return toast({
              title: "Username taken",
              description: "Username taken",
              variant: "destructive"
            })
        }

        toast({
          title: "Unknown error",
          description: (err as Error).message,
          variant: "destructive"
        })
      }
    })
  }

  const isSubmitting = form.formState.isSubmitting || status === 'pending'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="@username"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (
                <Loader2Icon className="animate-spin size-6" />
              )
              : (
                <>
                  <UserIcon className="size-6 mr-2" />
                  Create Account
                </>
              )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Devtools = () => {
  if (import.meta.env.MODE === 'production')
    return null

  return (
    <>
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}


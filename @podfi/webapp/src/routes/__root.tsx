import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { isError } from "ethers"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { config } from "@/lib/config"
import { FunctionComponent, ReactNode } from 'react';
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, smartWallet, useAccounts, useContractWrite } from '@thirdweb-dev/react'
import { Sepolia, Localhost } from '@thirdweb-dev/chains'
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
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        clientId={config.thirdweb.clientId}
        activeChain={Sepolia}
        supportedWallets={[
          smartWallet(embeddedWallet(), config.podfi.smartWallet),
          smartWallet(metamaskWallet(), config.podfi.smartWallet),
          smartWallet(coinbaseWallet(), config.podfi.smartWallet),
        ]}
      >
        <OnboardingProvider>
          <Outlet />
        </OnboardingProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}

const OnboardingProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const _auth = auth.hooks.useAuth()
  // const condition = _auth.status === 'onboarding'
  const condition = true
  // const condition = false

  return (
    <>
      {condition && (
        <Dialog open={condition} showCloseBtn={false}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create an account</DialogTitle>
            </DialogHeader>
            <OnboardingForm />
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

const OnboardingForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      bio: ""
    }
  })

  const { toast } = useToast()

  const { contract } = contracts.hooks.usePodfiContract()
  const { mutateAsync } = useContractWrite(
    contract,
    "registerUser",
  )

  const onSubmit = async (data: FormSchema) => {
    if (!contract) return

    const res = await contract.call("registerUser", [data.username, data.bio])
    console.log(res)

    // mutateAsync({
    //   args: [data.username, data.bio]
    // })
    //   .then((data) => {
    //     console.log(data)
    //     toast({
    //       title: 'Account created',
    //       description: 'Account created successfully'
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //
    //     if (isError(err, "CALL_EXCEPTION"))
    //       if (err.reason === 'USER_ALREADY_EXISTS')
    //         return toast({
    //           title: "Username taken",
    //           description: "Username taken",
    //           variant: "destructive"
    //         })
    //
    //     toast({
    //       title: "Unknown error",
    //       description: (err as Error).message,
    //       variant: "destructive"
    //     })
    //   })
  }

  const { isSubmitting } = form.formState

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


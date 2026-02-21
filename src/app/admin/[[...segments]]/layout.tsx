import type { ReactNode } from 'react'

import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload/payload.config'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Bind Payload server functions to a Next.js Server Action that the Admin UI can call.
  async function serverFunction(args: { name: string; args: Record<string, unknown> }) {
    'use server'
    return handleServerFunctions({
      ...args,
      config: Promise.resolve(config as any),
      importMap: {} as any,
    })
  }

  return (
    <RootLayout
      config={Promise.resolve(config as any)}
      importMap={{} as any}
      serverFunction={serverFunction as any}
    >
      {children}
    </RootLayout>
  )
}

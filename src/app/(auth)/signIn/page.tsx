import { SignInForm } from '@/components/auth/signIn'
import { requireNoAuth } from '@/lib/auth-utils';
import React from 'react'

async function SignIn() {
  await requireNoAuth();
  return (
    <div className='flex items-center justify-center h-screen '>
      <SignInForm />
    </div>
  )
}

export default SignIn
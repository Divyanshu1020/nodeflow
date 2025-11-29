import { SignUpForm } from '@/components/auth/signup'
import { requireNoAuth } from '@/lib/auth-utils';

async function SignUp() {
  await requireNoAuth();
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignUpForm />
    </div>
  )
}

export default SignUp

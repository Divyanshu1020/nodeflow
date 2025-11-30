import { requireAuth } from '@/lib/auth-utils'

async function page() {
  await requireAuth()
  return (
    <div>page</div>
  )
}

export default page
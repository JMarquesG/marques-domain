import Chat from '@/src/components/Chat'
import PdfDropzone from '@/src/components/PdfDropzone'
import { getUserOrNull } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'
import { redirect } from 'next/navigation'

export default async function Page(){
  const { user } = await getUserOrNull()
  if(!user){
    return redirect('/signin')  
  }
  const supa = supabaseServer()
  const { data, error } = await supa.from('sessions').insert({ user_id: user.id }).select('id').single()
  if(error) throw error

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Chat with your PDF</h1>
      <PdfDropzone sessionId={data.id} />
      <Chat sessionId={data.id} />
      <form action={`/api/sessions/${data.id}/end`} method="post">
        <button className="text-red-600">End session (deletes all chat & files)</button>
      </form>
    </main>
  )
}


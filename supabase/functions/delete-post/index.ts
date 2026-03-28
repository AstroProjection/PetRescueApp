import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { postId } = await req.json()
    
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const { data: post, error: findError } = await supabaseClient
      .from('posts').select('image_path, user_id').eq('id', postId).single()

    if (findError) throw findError
    if (post.user_id !== user.id) throw new Error('Not authorized')

    if (post.image_path) {
      const storagePath = post.image_path.startsWith('http')
        ? post.image_path.split(`/storage/v1/object/public/post-images/`)[1]
        : post.image_path;
        
      if (storagePath) {
        await supabaseClient.storage.from('post-images').remove([storagePath])
      }
    }

    const { error: deleteError } = await supabaseClient.from('posts').delete().eq('id', postId)
    if (deleteError) throw deleteError

    return new Response(JSON.stringify({ message: 'Deleted successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

# Chat Replay Studio

## Deploy with Supabase and Vercel

1. Create a Supabase project and run `supabase.sql` in the SQL Editor.
2. Create a Vercel project from this folder.
3. Add these Vercel environment variables:
   - `SUPABASE_URL`: the Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: the Supabase service-role key
4. Deploy. The root URL opens the editor.
5. Use `Save & share project` to save the current chat/settings and copy a public URL.

Shared URLs use `?project=<id>`. They load the saved project directly into the mobile preview. The API stores the original chat export and replay settings in Supabase; uploaded images/audio remain local browser assets.

The current database policy is intentionally public for link-based sharing. Anyone who has a project URL can read or overwrite that project. Add Supabase Auth and owner checks before using this for private conversations.

export default function SetupNotice() {
  return (
    <div className="max-w-xl mx-auto mt-10 rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
      <h1 className="text-lg font-semibold">Admin not connected yet</h1>
      <p className="mt-2 text-sm">
        Add your Supabase keys to the environment, then redeploy:
      </p>
      <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
        <li><code>NEXT_PUBLIC_SUPABASE_URL</code></li>
        <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
        <li><code>SUPABASE_SERVICE_ROLE_KEY</code></li>
        <li><code>ADMIN_EMAILS</code> (your login email)</li>
      </ul>
      <p className="mt-3 text-sm">Also run <code>supabase/schema.sql</code> in the Supabase SQL editor and create your admin user under Authentication → Users. Full steps are in <code>SETUP-ADMIN.md</code>.</p>
    </div>
  );
}

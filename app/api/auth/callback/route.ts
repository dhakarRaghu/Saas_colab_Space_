// This code is part of an OAuth2 flow where a user is redirected back to your application after authenticating with an external provider (like Supabase). The code extracts the authorization code from the URL, exchanges it for a session token using Supabase, and then redirects the user to a protected area of the site (e.g., a dashboard).

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
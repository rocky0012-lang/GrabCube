import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        },
      },
    }
  )

    // IMPORTANT: DO NOT REMOVE auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const isOwnerRoute = 
    pathname === "/owner" || pathname.startsWith("/owner/");
  const isTenantRoute = 
    pathname === "/tenant" || pathname.startsWith("/tenant/");

  let userRole: string | null = null;

  if (user && (isOwnerRoute || isTenantRoute)) {
    const { data: profile, error } = await supabase
      .from("users")
      .select("user_role")
      .eq("id", user.id)
      .single();
  
    if (error || !profile) {
      console.error("Failed to fetch user role:", error);
    } else {
      userRole = profile.user_role;
    }
  }

  const publicRoutes = new Set([
    '/',
    '/sign-in',
    '/sign-up',
    '/owner-signup',
    '/owner-signin',
    '/forgot-password',
    '/reset-password',
    '/auth/auth-code-error',
  ])
  const isPublicRoute = 
    publicRoutes.has(pathname) || 
    pathname === '/callback' ||
    pathname.startsWith('/callback')

  function redirectWithCookies(url: URL) {
    const response = NextResponse.redirect(url)

    supabaseResponse.cookies.getAll().forEach(({ name, value, ...options}) => {
      response.cookies.set(name, value, options);
    });
    return response;
  }

  if (!user && !isPublicRoute) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return redirectWithCookies(url)
  }
  

    // Protect owner routes
  if (isOwnerRoute && userRole !== "owner") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return redirectWithCookies(url);
  }

  // Protect tenant routes
if (isTenantRoute && userRole !== "tenant") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return redirectWithCookies(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
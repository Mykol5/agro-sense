import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protected application routes
  const protectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/doctor");

  // Redirect unauthenticated users to login
  if (protectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated users should not return to login
  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/doctor/:path*",
    "/login",
  ],
};



// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   let response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },

//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) => {
//             request.cookies.set(name, value);
//           });

//           response = NextResponse.next({
//             request: {
//               headers: request.headers,
//             },
//           });

//           cookiesToSet.forEach(({ name, value, options }) => {
//             response.cookies.set(name, value, options);
//           });
//         },
//       },
//     }
//   );

//   // Get the currently authenticated user
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const pathname = request.nextUrl.pathname;

//   // ---------------------------------------------
//   // PROTECTED ROUTES
//   // ---------------------------------------------
//   const protectedRoute =
//     pathname.startsWith("/dashboard") ||
//     pathname.startsWith("/doctor") ||
//     pathname === "/onboarding";

//   // ---------------------------------------------
//   // NOT LOGGED IN
//   // ---------------------------------------------
//   if (protectedRoute && !user) {
//     const loginUrl = new URL("/login", request.url);

//     // Remember where the user was trying to go
//     loginUrl.searchParams.set("redirect", pathname);

//     return NextResponse.redirect(loginUrl);
//   }

//   // ---------------------------------------------
//   // ALREADY LOGGED IN
//   // ---------------------------------------------
//   if (
//     user &&
//     (pathname === "/login" || pathname === "/register")
//   ) {
//     return NextResponse.redirect(
//       new URL("/dashboard", request.url)
//     );
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/doctor/:path*",
//     "/onboarding",
//     "/login",
//     "/register",
//   ],
// };






// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   let response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },

//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) => {
//             request.cookies.set(name, value);
//           });

//           response = NextResponse.next({
//             request: {
//               headers: request.headers,
//             },
//           });

//           cookiesToSet.forEach(({ name, value, options }) => {
//             response.cookies.set(name, value, options);
//           });
//         },
//       },
//     }
//   );

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const pathname = request.nextUrl.pathname;

//   const protectedRoute =
//     pathname.startsWith("/dashboard") ||
//     pathname.startsWith("/doctor");

//   if (protectedRoute && !user) {
//     const loginUrl = new URL("/login", request.url);

//     loginUrl.searchParams.set("redirect", pathname);

//     return NextResponse.redirect(loginUrl);
//   }

//   if (
//     user &&
//     (pathname === "/login" || pathname === "/register")
//   ) {
//     return NextResponse.redirect(
//       new URL("/dashboard", request.url)
//     );
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/doctor/:path*",
//     "/login",
//     "/register",
//   ],
// };
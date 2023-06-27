import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth';
import {getServerSession} from 'next-auth/next'
import { MemberRole } from '@/types/MemberRole';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log(request)
    const session = await getServerSession(authOptions);
    console.log(session)

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const isAdmin = session.user.roles.some(
        role => role === MemberRole.SECRETARY || role === MemberRole.TREASURER || role === MemberRole.CHAIRMAN
    )
    
    if (isAdmin) {
        return NextResponse.redirect(new URL('/member/dashboard', request.url))
    }

    return NextResponse.redirect(new URL('/member/dashboard', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/' 
}

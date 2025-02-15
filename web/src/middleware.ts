import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const session = request.cookies.get(process.env.TOKEN_NAME!)
    if (session) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
    } else {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// Supports both a single string value or an array of matchers
export const config = {
    matcher: [
        '/',
        '/auth',
        '/auth/students',
        '/auth/students/:path*',
        '/auth/teachers',
        '/auth/teachers/:path*'
    ],
}
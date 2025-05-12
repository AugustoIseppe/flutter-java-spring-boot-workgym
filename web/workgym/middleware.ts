// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value

//   if (!token && !request.nextUrl.pathname.startsWith('/login-page')) {
//     return NextResponse.redirect(new URL('/login-page', request.url))
//   }

//   if (token && request.nextUrl.pathname.startsWith('/login-page')) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }

//   return NextResponse.next()
// }

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Lista de rotas públicas que não exigem autenticação
// const PUBLIC_FILE = /\.(.*)$/;
// const PUBLIC_ROUTES = ['/login-page']; // Adicione outras rotas públicas aqui se necessário

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Ignora arquivos estáticos e rotas públicas
//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api') || // Rotas de API do Next.js não devem ser bloqueadas por este middleware de UI
//     pathname.startsWith('/static') ||
//     PUBLIC_ROUTES.includes(pathname) ||
//     PUBLIC_FILE.test(pathname)
//   ) {
//     return NextResponse.next();
//   }

//   // Para simular a verificação do token, vamos assumir que o token é armazenado em um cookie chamado 'jwtToken'.
//   // No ambiente de middleware do Next.js, o acesso direto ao localStorage não é possível.
//   // A comunicação entre client-side (onde o token é geralmente definido após o login) e o middleware
//   // geralmente ocorre via cookies.
//   const token = request.cookies.get('jwtToken')?.value;

//   if (!token) {
//     // Se não houver token e a rota não for pública, redireciona para a página de login.
//     // Mantém os query params, se houver, para redirecionar de volta após o login.
//     const loginUrl = new URL('/login-page', request.url);
//     if (pathname !== "/") { // Evita adicionar a home como callbackUrl se já estivermos nela
//         loginUrl.searchParams.set('callbackUrl', pathname + request.nextUrl.search);
//     }
//     return NextResponse.redirect(loginUrl);
//   }

//   // Se o token existir, permite o acesso à rota solicitada.
//   // Uma verificação adicional da validade do token poderia ser feita aqui, se necessário,
//   // por exemplo, decodificando-o ou fazendo uma chamada a um endpoint de validação.
//   return NextResponse.next();
// }

// // Define as rotas que serão interceptadas pelo middleware.
// // Aqui, estamos aplicando o middleware a todas as rotas, exceto as de API e as internas do Next.js.
// // A lógica dentro do middleware decide quais rotas realmente precisam de autenticação.
// export const config = {
//   matcher: [
//     /*
//      * Corresponde a todos os caminhos de solicitação, exceto aqueles que começam com:
//      * - api (rotas de API)
//      * - _next/static (arquivos estáticos)
//      * - _next/image (otimização de imagem)
//      * - favicon.ico (arquivo de favicon)
//      * Também exclui rotas que já são públicas por definição no array PUBLIC_ROUTES.
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };


// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('jwtToken')?.value
  
//   if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
  
//   return NextResponse.next()
// }

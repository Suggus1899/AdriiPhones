export { auth as middleware } from "@/auth"

// Configura las rutas en las que el middleware actuará (solo proteger el panel /admin)
export const config = {
  matcher: ["/admin/:path*"],
}

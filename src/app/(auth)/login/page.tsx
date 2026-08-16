import Link from "next/link";
import { GraduationCap, ShoppingCart } from "lucide-react";

import { LoginForm } from "@/features/auth/components/login-form";

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirect ?? "/student/dashboard";

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      
      
      <header className="sticky top-0 z-50 flex h-[72px] w-full items-center justify-between border-b border-[#E6F4FF] bg-white/80 px-6 backdrop-blur-md lg:px-10">
        
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#0D1B2A] text-white">
            <GraduationCap className="size-5" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-[#0D1B2A]">
            SchoolCanteen
          </span>
        </Link>

        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-sans text-sm font-semibold text-[#536069] hover:text-[#0D1B2A] transition-colors">Beranda</Link>
          <Link href="/kantin" className="font-sans text-sm font-semibold text-[#536069] hover:text-[#0D1B2A] transition-colors">Kantin</Link>
          <Link href="/koperasi" className="font-sans text-sm font-semibold text-[#536069] hover:text-[#0D1B2A] transition-colors">Koperasi</Link>
        </nav>

        
        <div className="flex items-center gap-4">
          <Link href="/keranjang" className="flex size-10 items-center justify-center rounded-full text-[#536069] hover:bg-[#E6F4FF] hover:text-[#0D1B2A] transition-colors">
            <ShoppingCart className="size-5" />
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="font-sans text-sm font-bold text-[#0D1B2A] hover:text-[#0D1B2A]/80 transition-colors">Masuk</Link>
            <Link href="/register" className="rounded-lg bg-[#0D1B2A] px-5 py-2 font-sans text-sm font-bold text-white transition-colors hover:bg-[#0D1B2A]/90">Daftar</Link>
          </div>
        </div>
      </header>

      
      <main className="flex flex-grow items-center justify-center px-4 py-8 md:px-10 lg:py-12">
        <div className="grid w-full max-w-[1240px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          
          
          <section className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl border border-white bg-[#E6F4FF] p-8 shadow-sm md:min-h-[600px] md:p-14 lg:p-16">
            <div className="relative z-10 hidden md:block">
              <div className="mb-8 inline-flex items-center rounded-full border border-white/40 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
                <span className="mr-2 size-2 animate-pulse rounded-full bg-[#0D1B2A]"></span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#0D1B2A]">
                  SchoolCanteen Student
                </span>
              </div>
              
              <h1 className="mb-4 font-heading text-4xl font-bold leading-[1.1] text-[#0D1B2A] lg:text-[48px]">
                Belanja kebutuhan sekolah jadi lebih mudah.
              </h1>
              
              <p className="max-w-md font-sans text-base text-[#536069] md:text-lg">
                Masuk untuk melanjutkan pesanan dan menikmati layanan sekolah dalam satu platform modern dan terpercaya.
              </p>
            </div>

            
            <div className="relative z-0 mt-auto flex-grow md:-mx-12 md:-mb-16 md:mt-8">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzuj5z3HfS1SiRwJ8zzDS2QM8o4weZEf95v8Fu5A8tBpZ5a2LnQT-q1sUwLQXwcdI7F0ylvVwPEEm5mhG9OJwBpTs2QTfkFNIA4sVjMrLwY-5wxYb33oxgDtsNjTwYg4cLGMcj1_QmhNsPjhy67Eg8IZmgemUxXV8YzYm-UnKxTw_5aHgOzGxQyHwXvq8X1CPJbWhfNcTywaFUcz5BjSikVzJ-Rka-anLusWoK1d2hy-UD92U6ZIE"
                alt="Ilustrasi SakuSekolah"
                className="size-full object-contain object-bottom transition-transform duration-700 hover:scale-105"
              />
            </div>
          </section>

          
          <section className="flex w-full justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-[#E6F4FF] bg-white p-6 shadow-sm backdrop-blur-xl md:p-10">
              
              
              <div className="mb-8 flex flex-col items-center text-center">
                <Link href="/" className="mb-6 flex items-center justify-center gap-2 lg:hidden">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#0D1B2A] text-white">
                      <GraduationCap className="size-4" />
                    </div>
                    <span className="font-heading text-lg font-bold text-[#0D1B2A]">SchoolCanteen</span>
                </Link>

                <h2 className="mb-2 font-heading text-[28px] font-bold text-[#0D1B2A] md:text-[32px]">
                  Selamat datang kembali
                </h2>
                <p className="font-sans text-sm text-[#536069] md:text-base">
                  Masuk ke akun SakuSekolah kamu.
                </p>
              </div>

              
              <LoginForm redirectTo={redirectTo} />

              
              <p className="mt-6 text-center font-sans text-sm text-[#536069]">
                Belum punya akun?{" "}
                <Link
                  href={`/register?redirect=${encodeURIComponent(redirectTo)}`}
                  className="font-bold text-[#0D1B2A] underline-offset-4 hover:underline"
                >
                  Daftar sekarang
                </Link>
              </p>

              
              <div className="relative z-10 mt-8 border-t border-[#E6F4FF] pt-6">
                <ul className="flex flex-col gap-3">
                  {["Pesanan lebih mudah", "Pantau transaksi", "Akses fitur siswa"].map((text, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-sans text-xs font-medium text-[#536069]">
                      <span className="flex size-6 items-center justify-center rounded-full bg-[#E6F4FF] text-[#0D1B2A]">
                        <CheckIcon className="size-3.5" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </section>

        </div>
      </main>

      
      <footer className="w-full bg-[#0D1B2A] py-12 text-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
            <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
                  <GraduationCap className="size-6 text-white" />
                </div>
                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                  SchoolCanteen
                </span>
              </div>
              <p className="max-w-sm font-sans text-sm leading-relaxed text-white/60">
                Platform digital terpadu untuk ekosistem sekolah modern, mempermudah akses kantin, koperasi, dan layanan kesiswaan dalam satu genggaman.
              </p>
            </div>
            
            <div className="hidden md:block md:col-span-1 lg:col-span-2"></div>
            
            <div className="flex flex-col gap-4 md:col-span-3">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/40">Jelajahi</h4>
              <ul className="flex flex-col gap-3">
                <li><Link href="/" className="font-sans text-sm text-white/80 transition-colors hover:text-white">Beranda</Link></li>
                <li><Link href="/kantin" className="font-sans text-sm text-white/80 transition-colors hover:text-white">Kantin</Link></li>
                <li><Link href="/koperasi" className="font-sans text-sm text-white/80 transition-colors hover:text-white">Koperasi</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4 md:col-span-2">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/40">Akses</h4>
              <ul className="flex flex-col gap-3">
                <li><Link href="/login" className="font-sans text-sm text-white/80 transition-colors hover:text-white">Masuk</Link></li>
                <li><Link href="/register" className="font-sans text-sm text-white/80 transition-colors hover:text-white">Daftar</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="font-sans text-xs text-white/50">© 2026 SchoolCanteen</p>
            <p className="font-sans text-xs text-white/50">Kantin & koperasi sekolah dalam satu tempat.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
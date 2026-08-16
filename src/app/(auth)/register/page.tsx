import Link from "next/link";
import { GraduationCap, ShoppingCart } from "lucide-react";

import { RegisterForm } from "@/features/auth/components/register-form";

interface RegisterPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
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
          
          
          <section className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl border border-white bg-[#E6F4FF] p-8 shadow-sm md:min-h-[640px] md:p-14 lg:p-16">
            <div className="relative z-10 hidden md:block">
              <div className="mb-8 inline-flex items-center rounded-full border border-white/40 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
                <span className="mr-2 size-2 animate-pulse rounded-full bg-[#0D1B2A]"></span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#0D1B2A]">
                  SchoolCanteen Student
                </span>
              </div>
              
              <h1 className="mb-4 font-heading text-4xl font-bold leading-[1.1] text-[#0D1B2A] lg:text-[48px]">
                Buat akun dan mulai pengalaman sekolah digital.
              </h1>
              
              <p className="max-w-md font-sans text-base text-[#536069] md:text-lg">
                Daftar untuk memesan kebutuhan sekolah, mengatur transaksi, dan menikmati layanan SakuSekolah.
              </p>
            </div>

            
            <div className="relative z-0 mt-auto flex-grow md:-mx-12 md:-mb-16 md:mt-8">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVGxobjCEMJ7hSQiK9cIYNjlab6cLCKvgSv7sy3qam-TyyP6Sws2cLjuP7oE8IZ1cbxUzNvrzDZxVGeXELG20qkRgoeT1RzuDG_XDR2SkbfXpXkV5V4Ct6zjvsKYPpcvzHHfKVzh8VIgPbOLyMV1tv00Ar25rnn0D1o2nPpDiT3T-LpmAX9Rfa-WnAaomfL-LQ6s9VxIv0EgOeJWSRG1PiGQW6-qp2PAOa1iF4X-bz_lBxw0WvtMA"
                alt="Ilustrasi Register SakuSekolah"
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
                  Daftar akun baru
                </h2>
                <p className="font-sans text-sm text-[#536069] md:text-base">
                  Lengkapi data untuk membuat akun SakuSekolah.
                </p>
              </div>

              
              <RegisterForm redirectTo={redirectTo} />

              
              <p className="mt-6 text-center font-sans text-sm text-[#536069]">
                Sudah punya akun?{" "}
                <Link
                  href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
                  className="font-bold text-[#0D1B2A] underline-offset-4 hover:underline"
                >
                  Masuk sekarang
                </Link>
              </p>

              
              <div className="relative z-10 mt-8 border-t border-[#E6F4FF] pt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <div className="flex items-center justify-center gap-2 font-sans text-xs font-medium text-[#536069]">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#E6F4FF] text-[#0D1B2A]">
                    <CheckIcon className="size-3" />
                  </span>
                  Pesan lebih cepat
                </div>
                <div className="flex items-center justify-center gap-2 font-sans text-xs font-medium text-[#536069]">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#E6F4FF] text-[#0D1B2A]">
                    <CheckIcon className="size-3" />
                  </span>
                  Simpan riwayat transaksi
                </div>
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
            <div className="flex gap-6">
              <Link href="#" className="font-sans text-xs text-white/50 hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="font-sans text-xs text-white/50 hover:text-white transition-colors">Syarat & Ketentuan</Link>
            </div>
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
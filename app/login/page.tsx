"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Breadcrumb } from "~/components/ui"

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [rememberMe, setRememberMe] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log({ email, password, rememberMe })
	}

	return (
		<div className="max-w-[480px] mx-auto px-4 py-8 font-[family-name:var(--font-satoshi)]">
			<Breadcrumb />
			<h1 className="font-[family-name:var(--font-integral)] text-2xl sm:text-3xl font-black text-center text-black uppercase tracking-tight mb-2">
				WELCOME BACK
			</h1>
			<p className="text-neutral-500 text-center text-sm mb-8">
				Sign in to your account to continue
			</p>

			<form onSubmit={handleSubmit} className="flex flex-col gap-5">
				<div className="flex flex-col gap-1.5">
					<label htmlFor="email" className="text-sm font-semibold text-black">
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="py-3 px-4 border border-neutral-200 rounded-xl text-sm outline-none focus:border-black transition-colors"
					/>
				</div>

				<div className="flex flex-col gap-1.5">
					<label htmlFor="password" className="text-sm font-semibold text-black">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full py-3 pl-4 pr-12 border border-neutral-200 rounded-xl text-sm outline-none focus:border-black transition-colors"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				</div>

				<div className="flex items-center justify-between text-sm">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
							className="rounded border-neutral-300 text-black focus:ring-black"
						/>
						<span className="text-neutral-600">Remember me</span>
					</label>
					<Link href="/forgot-password" className="text-black font-medium hover:underline">
						Forgot Password?
					</Link>
				</div>

				<button
					type="submit"
					className="w-full py-3.5 px-6 bg-black text-white font-semibold text-sm rounded-full hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer mt-2"
				>
					Sign In
				</button>
			</form>

			<div className="flex items-center gap-4 my-6">
				<div className="flex-1 h-px bg-neutral-200" />
				<span className="text-xs text-neutral-400 uppercase">or</span>
				<div className="flex-1 h-px bg-neutral-200" />
			</div>

			<button
				type="button"
				className="w-full py-3 px-6 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-full font-semibold text-sm text-black flex items-center justify-center gap-3 transition-colors cursor-pointer"
			>
				<svg className="w-5 h-5" viewBox="0 0 24 24">
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
					/>
				</svg>
				Sign in with Google
			</button>

			<p className="text-center text-sm text-neutral-600 mt-6">
				Don't have an account?{" "}
				<Link href="/sign-up" className="text-black font-semibold hover:underline">
					Sign Up
				</Link>
			</p>
		</div>
	)
}

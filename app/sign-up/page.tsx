"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Check } from "lucide-react"
import Breadcrumb from "~/components/breadcrumb"

export default function SignupPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [agreeTerms, setAgreeTerms] = useState(false)

	// Password strength calculation
	const calculatePasswordStrength = (pass: string) => {
		let strength = 0
		if (pass.length >= 8) strength += 1
		if (/[A-Z]/.test(pass)) strength += 1
		if (/[0-9]/.test(pass)) strength += 1
		if (/[^A-Za-z0-9]/.test(pass)) strength += 1
		return strength
	}

	const passwordStrength = calculatePasswordStrength(password)

	const getStrengthColor = (strength: number) => {
		if (strength <= 1) return "bg-red-500 text-red-500"
		if (strength === 2) return "bg-amber-500 text-amber-500"
		if (strength === 3) return "bg-emerald-500 text-emerald-500"
		return "bg-blue-600 text-blue-600"
	}

	const getStrengthText = (strength: number) => {
		if (strength === 0) return "Weak"
		if (strength === 1) return "Weak"
		if (strength === 2) return "Medium"
		if (strength === 3) return "Strong"
		return "Very Strong"
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log({ firstName, lastName, email, password, agreeTerms })
	}

	return (
		<div className="max-w-[480px] mx-auto px-4 py-8 font-[family-name:var(--font-satoshi)]">
			<Breadcrumb />
			<h1 className="font-[family-name:var(--font-integral)] text-2xl sm:text-3xl font-black text-center text-black uppercase tracking-tight mb-2">
				CREATE AN ACCOUNT
			</h1>
			<p className="text-neutral-500 text-center text-sm mb-8">
				Join us to start shopping
			</p>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="flex flex-col gap-1.5">
						<label htmlFor="firstName" className="text-sm font-semibold text-black">
							First Name
						</label>
						<input
							type="text"
							id="firstName"
							placeholder="First name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							className="py-3 px-4 border border-neutral-200 rounded-xl text-sm outline-none focus:border-black transition-colors"
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<label htmlFor="lastName" className="text-sm font-semibold text-black">
							Last Name
						</label>
						<input
							type="text"
							id="lastName"
							placeholder="Last name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							className="py-3 px-4 border border-neutral-200 rounded-xl text-sm outline-none focus:border-black transition-colors"
						/>
					</div>
				</div>

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
							placeholder="Create a password"
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

					{/* Strength bar */}
					{password && (
						<div className="mt-2 flex flex-col gap-2">
							<div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
								<div
									style={{ width: `${passwordStrength * 25}%` }}
									className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength).split(" ")[0]}`}
								/>
							</div>
							<span className={`text-xs font-medium ${getStrengthColor(passwordStrength).split(" ")[1]}`}>
								Password Strength: {getStrengthText(passwordStrength)}
							</span>
							<ul className="text-xs text-neutral-500 flex flex-col gap-1 mt-1 list-none p-0">
								<li className={`flex items-center gap-1.5 ${password.length >= 8 ? "text-emerald-600 font-medium" : ""}`}>
									<Check size={12} /> At least 8 characters
								</li>
								<li className={`flex items-center gap-1.5 ${/[A-Z]/.test(password) ? "text-emerald-600 font-medium" : ""}`}>
									<Check size={12} /> At least one uppercase letter
								</li>
								<li className={`flex items-center gap-1.5 ${/[0-9]/.test(password) ? "text-emerald-600 font-medium" : ""}`}>
									<Check size={12} /> At least one number
								</li>
								<li className={`flex items-center gap-1.5 ${/[^A-Za-z0-9]/.test(password) ? "text-emerald-600 font-medium" : ""}`}>
									<Check size={12} /> At least one special character
								</li>
							</ul>
						</div>
					)}
				</div>

				<label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer mt-1">
					<input
						type="checkbox"
						checked={agreeTerms}
						onChange={(e) => setAgreeTerms(e.target.checked)}
						className="mt-0.5 rounded border-neutral-300 text-black focus:ring-black"
						required
					/>
					<span>
						I agree to the{" "}
						<Link href="/terms" className="text-black font-medium underline">
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link href="/privacy" className="text-black font-medium underline">
							Privacy Policy
						</Link>
					</span>
				</label>

				<button
					type="submit"
					disabled={!agreeTerms}
					className="w-full py-3.5 px-6 bg-black text-white font-semibold text-sm rounded-full hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer mt-2"
				>
					Create Account
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
				Sign up with Google
			</button>

			<p className="text-center text-sm text-neutral-600 mt-6">
				Already have an account?{" "}
				<Link href="/login" className="text-black font-semibold hover:underline">
					Sign In
				</Link>
			</p>
		</div>
	)
}

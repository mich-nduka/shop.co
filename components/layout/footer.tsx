"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Mail, Twitter, Facebook, Instagram, Github } from "lucide-react"

export default function Footer() {
	const [email, setEmail] = useState("")
	const [subscribed, setSubscribed] = useState(false)

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault()
		if (email.trim()) {
			setSubscribed(true)
			setEmail("")
		}
	}

	return (
		<footer className="w-full bg-[#f0f0f0] mt-24 relative font-[family-name:var(--font-satoshi)]">
			{/* Newsletter floating banner */}
			<div className="max-w-[1240px] mx-auto px-4">
				<div className="bg-black text-white rounded-[20px] p-6 sm:p-10 -translate-y-1/2 relative z-20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
					<div className="flex-1 max-w-[550px]">
						<h2 className="font-[family-name:var(--font-integral)] text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase leading-tight tracking-tight">
							STAY UP TO DATE ABOUT OUR LATEST OFFERS
						</h2>
					</div>

					<form onSubmit={handleSubscribe} className="w-full md:w-[350px] flex flex-col gap-3">
						<div className="relative">
							<Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
							<input
								type="email"
								placeholder="Enter your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full py-3 pl-11 pr-4 bg-white text-black text-sm rounded-full outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-neutral-400"
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 px-6 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
						>
							{subscribed ? "Subscribed!" : "Subscribe to Newsletter"}
						</button>
					</form>
				</div>
			</div>

			{/* Main Footer Links */}
			<div className="max-w-[1240px] mx-auto px-4 -mt-10 pb-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
					{/* Brand Column */}
					<div className="lg:col-span-1 sm:col-span-2">
						<Link
							href="/"
							className="font-[family-name:var(--font-integral)] text-2xl font-black text-black tracking-tight"
						>
							SHOP.CO
						</Link>
						<p className="text-neutral-500 text-sm mt-4 mb-6 leading-relaxed">
							We have clothes that suit your style and which you're proud to wear.
							From women to men.
						</p>
						<div className="flex items-center gap-3">
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noreferrer"
								aria-label="Twitter"
								className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
							>
								<Twitter size={16} />
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noreferrer"
								aria-label="Facebook"
								className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
							>
								<Facebook size={16} />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noreferrer"
								aria-label="Instagram"
								className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
							>
								<Instagram size={16} />
							</a>
							<a
								href="https://github.com"
								target="_blank"
								rel="noreferrer"
								aria-label="Github"
								className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
							>
								<Github size={16} />
							</a>
						</div>
					</div>

					{/* COMPANY */}
					<div>
						<h3 className="font-semibold text-sm tracking-wider uppercase text-black mb-4">
							COMPANY
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-neutral-600 list-none p-0 m-0">
							<li><Link href="/about" className="hover:text-black transition-colors">About</Link></li>
							<li><Link href="/features" className="hover:text-black transition-colors">Features</Link></li>
							<li><Link href="/works" className="hover:text-black transition-colors">Works</Link></li>
							<li><Link href="/career" className="hover:text-black transition-colors">Career</Link></li>
						</ul>
					</div>

					{/* HELP */}
					<div>
						<h3 className="font-semibold text-sm tracking-wider uppercase text-black mb-4">
							HELP
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-neutral-600 list-none p-0 m-0">
							<li><Link href="/support" className="hover:text-black transition-colors">Customer Support</Link></li>
							<li><Link href="/delivery" className="hover:text-black transition-colors">Delivery Details</Link></li>
							<li><Link href="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
							<li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
						</ul>
					</div>

					{/* FAQ */}
					<div>
						<h3 className="font-semibold text-sm tracking-wider uppercase text-black mb-4">
							FAQ
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-neutral-600 list-none p-0 m-0">
							<li><Link href="/account" className="hover:text-black transition-colors">Account</Link></li>
							<li><Link href="/deliveries" className="hover:text-black transition-colors">Manage Deliveries</Link></li>
							<li><Link href="/orders" className="hover:text-black transition-colors">Orders</Link></li>
							<li><Link href="/payments" className="hover:text-black transition-colors">Payments</Link></li>
						</ul>
					</div>

					{/* RESOURCES */}
					<div>
						<h3 className="font-semibold text-sm tracking-wider uppercase text-black mb-4">
							RESOURCES
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-neutral-600 list-none p-0 m-0">
							<li><Link href="/ebooks" className="hover:text-black transition-colors">Free eBooks</Link></li>
							<li><Link href="/tutorial" className="hover:text-black transition-colors">Development Tutorial</Link></li>
							<li><Link href="/blog" className="hover:text-black transition-colors">How to - Blog</Link></li>
							<li><Link href="/youtube" className="hover:text-black transition-colors">YouTube Playlist</Link></li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-6 border-t border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-neutral-500 text-xs sm:text-sm">
						Shop.co &copy; {new Date().getFullYear()}, All Rights Reserved
					</p>
					<div className="flex items-center gap-3">
						<img src="/visa.webp" alt="Visa" className="h-6 object-contain" />
						<img src="/master-card.webp" alt="Mastercard" className="h-6 object-contain" />
						<img src="/american-express.webp" alt="American Express" className="h-6 object-contain" />
						<img src="/apple-pay.webp" alt="Apple Pay" className="h-6 object-contain" />
						<img src="/google-pay.webp" alt="Google Pay" className="h-6 object-contain" />
					</div>
				</div>
			</div>
		</footer>
	)
}

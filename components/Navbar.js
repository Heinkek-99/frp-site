'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'À Propos', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname?.startsWith(path)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image 
                src="https://customer-assets.emergentagent.com/job_63e47ad1-399c-426d-a02b-8be03de1d437/artifacts/p7oxud0w_Frp-logo.png"
                alt="Face Aux Risques Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden md:block">
              <div className="font-bold text-lg text-foreground">Face Aux Risques</div>
              <div className="text-xs text-muted-foreground">Sécurité Industrielle</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:+237699699522" 
              className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+237 699 699 522</span>
            </a>
            <Button asChild className="gradient-primary text-white">
              <Link href="/contact">Audit Gratuit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-border"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a 
                href="tel:+237699699522" 
                className="flex items-center space-x-2 text-sm font-medium text-primary"
              >
                <Phone className="w-4 h-4" />
                <span>+237 699 699 522</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
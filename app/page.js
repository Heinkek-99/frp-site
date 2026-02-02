'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef } from 'react'
import NextLink from 'next/link'
import Navbar from '@/components/Navbar'
import { 
  Shield, 
  FileCheck, 
  Wrench, 
  GraduationCap, 
  ClipboardCheck, 
  AlertTriangle,
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Award,
  Users,
  Target,
  Flame,
  Factory,
  Menu,
  X,
  ChevronDown,
  Star,
  Building2,
  Zap,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Image from 'next/image'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Section component with scroll animation
function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Counter animation component
function AnimatedCounter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    service: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({ 
          type: 'success', 
          message: 'Merci ! Votre message a été envoyé. Nous vous contacterons sous 24h.' 
        })
        setFormData({ nom: '', email: '', telephone: '', entreprise: '', service: '', message: '' })
      } else {
        setFormStatus({ 
          type: 'error', 
          message: data.error || 'Une erreur est survenue. Veuillez réessayer.' 
        })
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Erreur de connexion. Veuillez vérifier votre connexion internet.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    {
      icon: <ClipboardCheck className="w-10 h-10" />,
      title: 'Re-test & Maintenance',
      description: 'Épreuves sous pression, tests d\'étanchéité, vérifications de conformité des extincteurs, RIA et systèmes SSI. Maintenance préventive et corrective.',
      features: ['Tests fonctionnels', 'Conformité APSAD', 'Remplacement équipements']
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: 'Engineering & Installation',
      description: 'Conception et installation de systèmes incendie complets. Études techniques et ingénierie de protection pour sites industriels.',
      features: ['Systèmes détection', 'Extinction automatique', 'Plans d\'intervention']
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: 'Formation & Audit',
      description: 'Formations certifiées FDFP sur votre site : EPI, extincteurs, évacuation, permis feu, pontiers, élingueurs, caristes. Audits de conformité OHADA.',
      features: ['Sessions pratiques', 'Certification FDFP', 'Audit gratuit 48h']
    }
  ]

  const stats = [
    { value: 24, suffix: '+', label: 'Ans d\'Expérience', icon: <Award className="w-8 h-8" /> },
    { value: 500, suffix: '+', label: 'Sites Industriels Sécurisés', icon: <Factory className="w-8 h-8" /> },
    { value: 24, suffix: 'h/7j', label: 'Disponibilité', icon: <Clock className="w-8 h-8" /> },
    { value: 24, suffix: 'h', label: 'Délai d\'Intervention', icon: <Zap className="w-8 h-8" /> }
  ]

  const reasons = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Expertise ENEO Confirmée',
      description: 'Partenaire privilégié des centrales électriques ENEO. Installation de ports d\'échantillonnage, analyse gaz de combustion, systèmes extinction automatiques.'
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: 'Conformité OHADA Garantie',
      description: 'Audits conformité aux normes OHADA, ISO et APSAD. Évitez les amendes et assurez la mise en conformité réglementaire de vos installations.'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Équipe Certifiée QHSE',
      description: 'Professionnels formés aux standards internationaux de Qualité, Hygiène, Sécurité et Environnement. Standards exemplaires garantis.'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Intervention Rapide Garantie',
      description: 'Intervention sous 24h partout au Cameroun. Présence et écoute 24h/24 et 7j/7. Nos équipes se rendent disponibles quand vous en avez besoin.'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Audit Initial',
      description: 'Diagnostic gratuit de vos risques en 2h. Évaluation complète de vos installations et identification des non-conformités.',
      icon: <FileCheck className="w-8 h-8" />
    },
    {
      step: '02',
      title: 'Proposition Technique',
      description: 'Devis détaillé sous 48h avec solutions adaptées à votre budget. Plan d\'action clair et chiffré.',
      icon: <ClipboardCheck className="w-8 h-8" />
    },
    {
      step: '03',
      title: 'Installation & Formation',
      description: 'Mise en œuvre par nos équipes certifiées. Formation de vos agents sur site pour autonomie complète.',
      icon: <Wrench className="w-8 h-8" />
    },
    {
      step: '04',
      title: 'Suivi & Maintenance',
      description: 'Inspections périodiques et maintenance préventive. Renouvellement de conformité et support technique continu.',
      icon: <Shield className="w-8 h-8" />
    }
  ]

  const projects = [
    {
      title: 'Centrales ENEO',
      category: 'Installation & Analyse',
      description: 'Installation ports d\'échantillonnage + analyse gaz de combustion sur centrales électriques',
      image: 'https://customer-assets.emergentagent.com/job_63e47ad1-399c-426d-a02b-8be03de1d437/artifacts/ufiqw30c_aafc5e1fb32f87748177045adbce9efb.jpeg'
    },
    {
      title: 'Systèmes Extinction Automatiques',
      category: 'Engineering',
      description: 'Inspection et maintenance systèmes extinction automatiques sites industriels',
      image: 'https://images.unsplash.com/photo-1705147219565-fe9f6f369d03'
    },
    {
      title: 'Formation Caristes & Élingueurs',
      category: 'Formation',
      description: 'Formations certifiées FDFP pour caristes, élingueurs et pontiers (12 agents en 2 jours)',
      image: 'https://images.pexels.com/photos/8487408/pexels-photo-8487408.jpeg'
    },
    {
      title: 'Inspection Cuves Sous Pression',
      category: 'Contrôle',
      description: 'Inspection technique cuves sous pression gaz et équipements haute pression',
      image: 'https://images.pexels.com/photos/18568174/pexels-photo-18568174.jpeg'
    },
    {
      title: 'Plan de Réponse Incendie',
      category: 'Audit',
      description: 'Développement plan de réponse incendie et protocoles d\'évacuation pour complexes industriels',
      image: 'https://images.unsplash.com/photo-1759922378222-47ad736a174d'
    },
    {
      title: 'Audits de Conformité',
      category: 'Inspection',
      description: 'Audits conformité OHADA et ISO pour industries et institutions',
      image: 'https://images.pexels.com/photos/8488038/pexels-photo-8488038.jpeg'
    }
  ]

  const testimonials = [
    {
      name: 'Mary Jane',
      role: 'CEO AIG',
      content: 'Vos équipes travaillent plus que prévu. Que j\'appelle tôt le matin ou tard le soir, ils viennent faire le travail rapidement et efficacement.',
      rating: 5
    },
    {
      name: 'Frankie Kao',
      role: 'CEO Fluro',
      content: 'J\'ai utilisé vos services à plusieurs reprises. Services personnalisés, rapides et efficaces. Excellente réactivité.',
      rating: 5
    },
    {
      name: 'Mael Enoka',
      role: 'IT Specialist',
      content: 'Standards exemplaires de qualité, santé, sécurité et environnement. Professionnalisme remarquable.',
      rating: 5
    }
  ]

  const faqs = [
    {
      question: 'Quels sont les délais d\'intervention ?',
      answer: 'Nous intervenons sous 24h partout au Cameroun. Pour les urgences, notre équipe est disponible 24h/24 et 7j/7. L\'audit initial peut être réalisé en 2h sur site.'
    },
    {
      question: 'Êtes-vous conformes aux normes OHADA et ISO ?',
      answer: 'Oui, nous garantissons la conformité totale aux normes OHADA, ISO et APSAD. Nos inspections suivent les standards européens et internationaux de sécurité incendie.'
    },
    {
      question: 'Proposez-vous des formations certifiées ?',
      answer: 'Absolument. Toutes nos formations sont certifiées FDFP et se déroulent directement sur votre site. Nous formons vos agents aux EPI, extincteurs, évacuation, permis feu, et engins de levage (caristes, pontiers, élingueurs).'
    },
    {
      question: 'Quels sont vos principaux clients ?',
      answer: 'Nous travaillons avec les industries (ENEO, SONARA), le secteur BTP, les institutions et les particuliers. Plus de 500 sites industriels sécurisés depuis 2003.'
    },
    {
      question: 'Comment se passe un audit de sécurité ?',
      answer: 'Audit gratuit initial en 2h : inspection complète de vos installations, identification des non-conformités, évaluation des risques. Sous 48h, vous recevez un rapport détaillé avec devis et plan d\'action.'
    },
    {
      question: 'Proposez-vous des contrats de maintenance ?',
      answer: 'Oui, nous proposons des contrats de maintenance préventive et corrective adaptés à vos besoins. Inspections périodiques, tests fonctionnels, remplacement d\'équipements et renouvellement de conformité inclus.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1668243304566-2e78ebd48960"
            alt="Professionnels sécurité industrielle"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center md:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-white">24 ans d'expertise au Cameroun</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Protégez vos Installations Industrielles avec
              <span className="text-primary"> l'Expert N°1</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
            >
              Sécurité incendie, audits de conformité OHADA, formations certifiées FDFP et maintenance industrielle. 
              <span className="font-semibold text-white"> Intervention sous 24h partout au Cameroun.</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="gradient-primary text-white text-base px-8">
                <a href="/contact" className="flex items-center space-x-2">
                  <span>Audit Gratuit en 48h</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-base px-8">
                <a href="tel:+237699699522" className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Intervention Rapide</span>
                </a>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-6 mt-8"
            >
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Conformité OHADA garantie</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">500+ sites sécurisés</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Partenaire ENEO</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="section-padding bg-gradient-to-br from-primary via-primary-dark to-secondary">
        <div className="container-custom">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <div className="flex justify-center mb-4 text-white/80">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/90 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection id="services" className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos <span className="text-primary">Services Experts</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Solutions complètes de sécurité incendie et gestion des risques industriels
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg gradient-primary flex items-center justify-center text-white mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="gradient-primary text-white">
              <NextLink href="/contact">
                Demander un Devis Gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </NextLink>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pourquoi <span className="text-primary">Nous Choisir ?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Leader technique de la sécurité industrielle en Afrique Centrale
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex space-x-4 p-6 rounded-lg bg-card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection id="process" className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Notre <span className="text-primary">Process de Travail</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                4 étapes simples pour sécuriser vos installations
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {process.map((step, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                className="relative"
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white mx-auto mb-4">
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-sm">{step.description}</CardDescription>
                  </CardHeader>
                </Card>

                {/* Connector Arrow (hidden on mobile and last item) */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Portfolio Section */}
      <AnimatedSection id="projets" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos <span className="text-primary">Projets Réalisés</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Plus de 500 sites industriels sécurisés depuis 2003
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-medium mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-200">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection id="temoignages" className="section-padding bg-gradient-to-br from-secondary via-primary to-primary-dark">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ce Que Disent <span className="text-accent">Nos Clients</span>
              </h2>
              <p className="text-lg text-white/90">
                Témoignages de satisfaction de nos partenaires
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white/95 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <CardDescription className="text-base text-foreground leading-relaxed italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4">
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection className="section-padding-mobile bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Partenaires & <span className="text-primary">Certifications</span>
              </h2>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
          >
            <motion.div variants={scaleIn} className="relative w-32 h-16">
              <Image 
                src="https://customer-assets.emergentagent.com/job_63e47ad1-399c-426d-a02b-8be03de1d437/artifacts/ufiqw30c_aafc5e1fb32f87748177045adbce9efb.jpeg"
                alt="SONARA"
                fill
                className="object-contain"
              />
            </motion.div>
            <motion.div variants={scaleIn} className="flex items-center space-x-2">
              <Building2 className="w-12 h-12 text-primary" />
              <span className="font-bold text-xl">ENEO</span>
            </motion.div>
            <motion.div variants={scaleIn} className="flex items-center space-x-2">
              <Award className="w-12 h-12 text-primary" />
              <span className="font-bold text-xl">ISO 9001</span>
            </motion.div>
            <motion.div variants={scaleIn} className="flex items-center space-x-2">
              <Shield className="w-12 h-12 text-primary" />
              <span className="font-bold text-xl">APSAD</span>
            </motion.div>
            <motion.div variants={scaleIn} className="flex items-center space-x-2">
              <CheckCircle className="w-12 h-12 text-primary" />
              <span className="font-bold text-xl">OHADA</span>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Questions <span className="text-primary">Fréquentes</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Réponses aux questions les plus posées
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg px-6 border-0 shadow-sm">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="section-padding relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1705147219565-fe9f6f369d03"
            alt="Installation industrielle"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary-dark/85 to-secondary/90" />
        </div>

        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sécurisez Votre Site Industriel Aujourd'hui
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Audit gratuit de vos risques en 2h. Intervention sous 24h partout au Cameroun. 
              Plus de 500 sites industriels nous font confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-base px-8">
                <a href="/contact" className="flex items-center space-x-2">
                  <span>Demander un Audit Gratuit</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-base px-8">
                <a href="tel:+237699699522" className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Appeler Maintenant</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contactez <span className="text-primary">Notre Équipe</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Remplissez le formulaire pour un audit gratuit ou une intervention rapide
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">Cameroun : +237 699 699 522</p>
                    <p className="text-muted-foreground">France : +33 6 74 15 18 45</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">faceauxrisques@faceauxrisques.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
                    <p className="text-muted-foreground">Bassa, 373 Rue 3W709</p>
                    <p className="text-muted-foreground">Douala, Cameroun</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horaires</h4>
                    <p className="text-muted-foreground">Disponible 24h/24, 7j/7</p>
                    <p className="text-muted-foreground">Intervention sous 24h</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-muted h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Bassa, Douala, Cameroun</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Demande de Devis Gratuit</CardTitle>
                  <CardDescription>Remplissez ce formulaire, nous vous répondrons sous 24h</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom complet *</Label>
                        <Input 
                          id="nom"
                          type="text"
                          required
                          value={formData.nom}
                          onChange={(e) => setFormData({...formData, nom: e.target.value})}
                          placeholder="Votre nom"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telephone">Téléphone *</Label>
                        <Input 
                          id="telephone"
                          type="tel"
                          required
                          value={formData.telephone}
                          onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                          placeholder="+237 xxx xxx xxx"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="entreprise">Entreprise</Label>
                      <Input 
                        id="entreprise"
                        type="text"
                        value={formData.entreprise}
                        onChange={(e) => setFormData({...formData, entreprise: e.target.value})}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service demandé *</Label>
                      <Select 
                        required
                        value={formData.service}
                        onValueChange={(value) => setFormData({...formData, service: value})}
                      >
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inspection">Inspection / Audit</SelectItem>
                          <SelectItem value="formation">Formation SSI</SelectItem>
                          <SelectItem value="audit">Audit de Conformité</SelectItem>
                          <SelectItem value="installation">Installation Systèmes</SelectItem>
                          <SelectItem value="maintenance">Maintenance Préventive</SelectItem>
                          <SelectItem value="autre">Autre / Devis Général</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Décrivez votre besoin en détail..."
                        rows={4}
                      />
                    </div>

                    {formStatus.message && (
                      <div className={`p-4 rounded-lg ${
                        formStatus.type === 'success' 
                          ? 'bg-success/10 text-success border border-success' 
                          : 'bg-destructive/10 text-destructive border border-destructive'
                      }`}>
                        {formStatus.message}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full gradient-primary text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer la Demande'}
                      {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-80 h-10 md:w-96 md:h-22">
                  <Image 
                    src="/images/F-1.png"
                    alt="Face Aux Risques Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-gray leading-relaxed">
                24 ans d'expertise en sécurité incendie et gestion des risques industriels au Cameroun.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-primary transition-colors">Re-test & Maintenance</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Engineering</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Inspection & Audit</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Formation SSI</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+237 699 699 522</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+33 6 74 15 18 45</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>faceauxrisques@faceauxrisques.com</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <span>Bassa, 373 Rue 3W709<br />Douala, Cameroun</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><NextLink href="/services" className="hover:text-primary transition-colors">Nos Services</NextLink></li>
                <li><NextLink href="/portfolio" className="hover:text-primary transition-colors">Projets Réalisés</NextLink></li>
                <li><NextLink href="/portfolio" className="hover:text-primary transition-colors">Témoignages</NextLink></li>
                <li><NextLink href="/contact" className="hover:text-primary transition-colors">Nous Contacter</NextLink></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 Face Aux Risques SA. Tous droits réservés.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Disponible 24h/24, 7j/7</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-xs text-success font-medium">En ligne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
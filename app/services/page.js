'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  FileCheck, 
  Wrench, 
  GraduationCap, 
  ClipboardCheck, 
  AlertTriangle,
  Phone,
  CheckCircle,
  ArrowRight,
  Flame,
  Settings,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function ServicesPage() {
  const services = [
    {
      icon: <ClipboardCheck className="w-12 h-12" />,
      title: 'Re-test & Vérification',
      slug: 'retest',
      description: 'Épreuves de mise sous pression, tests d\'étanchéité et vérifications de conformité pour tous vos équipements de sécurité incendie.',
      features: [
        'Tests fonctionnels extincteurs',
        'Vérifications RIA (Robinets Incendie Armés)',
        'Épreuves hydrauliques sous pression',
        'Tests d\'étanchéité systèmes',
        'Conformité APSAD et normes européennes',
        'Certification après intervention'
      ],
      process: [
        'Inspection visuelle initiale',
        'Tests de pression normalisés',
        'Analyse des résultats',
        'Rapport de conformité détaillé'
      ],
      tarif: 'Sur devis - Audit initial gratuit'
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: 'Maintenance Préventive & Corrective',
      slug: 'maintenance',
      description: 'Entretien régulier et réparations de vos systèmes de sécurité incendie pour garantir leur disponibilité opérationnelle 24/7.',
      features: [
        'Contrats de maintenance annuels',
        'Interventions programmées',
        'Remplacement pièces défectueuses',
        'Tests fonctionnels périodiques',
        'Disponibilité pièces détachées',
        'Astreinte technique 24h/24'
      ],
      process: [
        'Diagnostic complet',
        'Planning maintenance préventive',
        'Interventions sur site',
        'Suivi et traçabilité'
      ],
      tarif: 'À partir de 250 000 FCFA/an'
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: 'Engineering & Conception',
      slug: 'engineering',
      description: 'Conception et installation de systèmes incendie complets adaptés à vos besoins industriels spécifiques.',
      features: [
        'Études techniques détaillées',
        'Plans d\'installation',
        'Systèmes de détection incendie',
        'Extinction automatique (sprinklers, gaz)',
        'Ingénierie de protection',
        'Mise en service et tests'
      ],
      process: [
        'Analyse des risques',
        'Conception sur-mesure',
        'Installation par équipes certifiées',
        'Mise en service et formation'
      ],
      tarif: 'Sur devis selon complexité'
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: 'Inspection & Expertise',
      slug: 'inspection',
      description: 'Audits de conformité, évaluation des risques et diagnostics réglementaires pour vos installations industrielles.',
      features: [
        'Audits de conformité OHADA',
        'Évaluation des risques incendie',
        'Diagnostics réglementaires',
        'Expertises techniques',
        'Rapports détaillés',
        'Recommandations d\'amélioration'
      ],
      process: [
        'Visite site (2h)',
        'Analyse documentaire',
        'Rapport d\'audit sous 48h',
        'Plan d\'action correctif'
      ],
      tarif: 'Audit initial GRATUIT'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Contrôle & Conformité',
      slug: 'controle',
      description: 'Inspections techniques périodiques et vérifications de conformité aux normes nationales et internationales.',
      features: [
        'Conformité APSAD',
        'Normes ISO 9001',
        'Réglementation OHADA',
        'Standards européens',
        'Certifications officielles',
        'Renouvellement conformité'
      ],
      process: [
        'Planification contrôles',
        'Inspections sur site',
        'Tests de conformité',
        'Certification et traçabilité'
      ],
      tarif: 'Forfaits annuels disponibles'
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Formation & Sensibilisation',
      slug: 'formation',
      description: 'Formations certifiées FDFP sur votre site : sécurité incendie, utilisation EPI, gestion des urgences et engins de levage.',
      features: [
        'Formations EPI (Équipements)',
        'Manipulation extincteurs',
        'Évacuation d\'urgence',
        'Permis feu',
        'Formation pontiers, élingueurs',
        'Formation caristes (CACES)'
      ],
      process: [
        'Évaluation des besoins',
        'Programme sur-mesure',
        'Sessions pratiques sur site',
        'Certification FDFP'
      ],
      tarif: '150 000 FCFA/jour (12 agents max)'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
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

            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Accueil</Link>
              <Link href="/services" className="text-sm font-medium text-primary">Services</Link>
              <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">À propos</Link>
              <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Portfolio</Link>
              <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button asChild className="gradient-primary text-white">
                <Link href="/contact">Demander un Devis</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nos <span className="text-accent">Services Experts</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Solutions complètes de sécurité incendie et gestion des risques industriels. 
              Intervention rapide, conformité garantie, formations certifiées.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-20 h-20 rounded-lg gradient-primary flex items-center justify-center text-white mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Prestations incluses</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Notre process</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.process.map((step, idx) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {idx + 1}. {step}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tarif */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Tarification</p>
                          <p className="font-bold text-primary">{service.tarif}</p>
                        </div>
                        <Button asChild variant="outline">
                          <Link href="/contact">
                            Demander un Devis
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-secondary to-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d'un Service Personnalisé ?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour un devis gratuit et une évaluation de vos besoins. 
              Notre équipe vous répond sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  Obtenir un Devis Gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                <a href="tel:+237699699522">
                  <Phone className="w-5 h-5 mr-2" />
                  Appeler Maintenant
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', label: 'Tous les Projets' },
    { id: 'installation', label: 'Installations' },
    { id: 'formation', label: 'Formations' },
    { id: 'audit', label: 'Audits & Inspections' },
    { id: 'maintenance', label: 'Maintenance' }
  ]

  const projects = [
    {
      title: 'Centrales Électriques ENEO',
      category: 'installation',
      year: '2023-2024',
      client: 'ENEO Cameroun',
      description: 'Installation de ports d\'échantillonnage et analyse des gaz de combustion sur plusieurs centrales électriques. Mise en place de systèmes de détection et extinction automatiques.',
      services: ['Engineering', 'Installation', 'Analyse Gaz'],
      results: [
        'Installation de 15 ports d\'échantillonnage',
        'Réduction de 40% des arrêts techniques',
        'Conformité normes internationales atteinte',
        'Formation de 30 techniciens ENEO'
      ],
      image: 'https://customer-assets.emergentagent.com/job_63e47ad1-399c-426d-a02b-8be03de1d437/artifacts/ufiqw30c_aafc5e1fb32f87748177045adbce9efb.jpeg'
    },
    {
      title: 'Systèmes Extinction Automatiques Industries',
      category: 'installation',
      year: '2023',
      client: 'Industries Diverses',
      description: 'Inspection et maintenance préventive de systèmes d\'extinction automatiques sur sites industriels sensibles. Détection précoce d\'anomalies et interventions correctives.',
      services: ['Inspection', 'Maintenance', 'Mise en conformité'],
      results: [
        '20 sites industriels inspectés',
        '100% de conformité atteinte',
        'Zéro incident pendant la période',
        'Contrats maintenance prolongés'
      ],
      image: 'https://images.unsplash.com/photo-1705147219565-fe9f6f369d03'
    },
    {
      title: 'Formations Caristes, Élingueurs & Pontiers',
      category: 'formation',
      year: '2023-2024',
      client: 'Entreprises BTP & Industrie',
      description: 'Formations certifiées FDFP pour opérateurs d\'engins de levage. Sessions pratiques sur site avec mises en situation réelles et évaluations continues.',
      services: ['Formation CACES', 'Certification FDFP', 'Recyclage'],
      results: [
        '150+ agents formés et certifiés',
        'Taux de réussite 95%',
        'Réduction accidents de 60%',
        'Satisfaction client 4.8/5'
      ],
      image: 'https://images.pexels.com/photos/8487408/pexels-photo-8487408.jpeg'
    },
    {
      title: 'Inspection Cuves Sous Pression Gaz',
      category: 'audit',
      year: '2023',
      client: 'Industrie Pétrolière',
      description: 'Inspection technique approfondie de cuves de stockage sous pression. Tests d\'étanchéité, évaluations structurelles et recommandations de mise en conformité.',
      services: ['Inspection Technique', 'Tests Pression', 'Certification'],
      results: [
        '8 cuves inspectées et certifiées',
        'Détection 3 anomalies critiques',
        'Interventions correctives réalisées',
        'Certification OHADA obtenue'
      ],
      image: 'https://images.pexels.com/photos/18568174/pexels-photo-18568174.jpeg'
    },
    {
      title: 'Plan de Réponse Incendie Complexe Industriel',
      category: 'audit',
      year: '2024',
      client: 'Complexe Industriel Douala',
      description: 'Développement d\'un plan de réponse incendie complet avec protocoles d\'évacuation, cartographie des risques et formation des équipes d\'intervention.',
      services: ['Audit Risques', 'Plan Intervention', 'Formation Équipes'],
      results: [
        'Plan intervention sur-mesure',
        '5 exercices d\'évacuation réussis',
        '120 employés formés',
        'Temps d\'évacuation réduit de 50%'
      ],
      image: 'https://images.unsplash.com/photo-1759922378222-47ad736a174d'
    },
    {
      title: 'Audits de Conformité OHADA Multi-Sites',
      category: 'audit',
      year: '2023-2024',
      client: 'Groupe Industriel Régional',
      description: 'Audits de conformité OHADA sur 12 sites industriels. Évaluation complète, recommandations et accompagnement jusqu\à certification.',
      services: ['Audit OHADA', 'Mise en Conformité', 'Suivi'],
      results: [
        '12 sites audités en 3 mois',
        '100% de conformité atteinte',
        'Évitement d\'amendes (est. 50M FCFA)',
        'Contrat cadre 3 ans signé'
      ],
      image: 'https://images.pexels.com/photos/8488038/pexels-photo-8488038.jpeg'
    },
    {
      title: 'Maintenance Préventive Extincteurs - 50 Sites',
      category: 'maintenance',
      year: '2023-2024',
      client: 'Chaîne de Magasins',
      description: 'Contrat de maintenance préventive annuel pour 50 magasins répartis sur le territoire. Vérifications trimestrielles et interventions correctives.',
      services: ['Maintenance Préventive', 'Tests Fonctionnels', 'Remplacement'],
      results: [
        '200+ extincteurs maintenus',
        '0 défaillance pendant l\'année',
        'Contrat renouvelé 2 ans',
        'Extension à 10 nouveaux sites'
      ],
      image: 'https://images.unsplash.com/photo-1668243304566-2e78ebd48960'
    },
    {
      title: 'Formation SSI & Évacuation Urgence',
      category: 'formation',
      year: '2024',
      client: 'Secteur Bancaire',
      description: 'Programme de formation complète SSI pour personnel bancaire. Manipulation extincteurs, procédures d\'évacuation et gestion de crise.',
      services: ['Formation SSI', 'Exercices Pratiques', 'Recyclage'],
      results: [
        '300+ employés formés',
        '15 agences couvertes',
        'Certifications délivrées',
        'Taux satisfaction 98%'
      ],
      image: 'https://images.pexels.com/photos/8487408/pexels-photo-8487408.jpeg'
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative relative w-80 h-80 ">
                <Image 
                  src="/images/F-1.png"
                  alt="Face Aux Risques Logo"
                  fill
                  className="object-contain"
                />
              </div>
              {/* <div className="hidden md:block">
                <div className="font-bold text-lg text-foreground">Face Aux Risques</div>
                <div className="text-xs text-muted-foreground">Sécurité Industrielle</div>
              </div> */}
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Accueil</Link>
              <Link href="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">À propos</Link>
              <Link href="/portfolio" className="text-sm font-medium text-primary">Portfolio</Link>
              <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</Link>
            </div>

            <Button asChild className="gradient-primary text-white">
              <Link href="/contact">Demander un Devis</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-secondary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nos <span className="text-accent">Réalisations</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Plus de 500 sites industriels sécurisés depuis 2003. Découvrez nos projets marquants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding-mobile bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeFilter === cat.id ? 'default' : 'outline'}
                onClick={() => setActiveFilter(cat.id)}
                className={activeFilter === cat.id ? 'gradient-primary text-white' : ''}
              >
                {cat.label}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.services.map((service, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary rounded-full text-xs text-white font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                        <span className="text-sm text-muted-foreground font-medium">{project.year}</span>
                      </div>
                      <p className="text-sm text-primary font-medium mb-3">{project.client}</p>
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    {/* Results */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-foreground mb-3 text-sm">Résultats Clés</h4>
                      <ul className="space-y-2">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <p className="text-white/90">Sites Sécurisés</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">22</div>
              <p className="text-white/90">Ans d'Expérience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <p className="text-white/90">Satisfaction Client</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
              <p className="text-white/90">Conformité Garantie</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Votre Projet Sera Notre Prochaine Réussite
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet de sécurisation industrielle
            </p>
            <Button asChild size="lg" className="gradient-primary text-white">
              <Link href="/contact">Démarrer un Projet</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
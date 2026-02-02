'use client'

import { motion } from 'framer-motion'
import { Award, Target, Users, Shield, CheckCircle, TrendingUp, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function AboutPage() {
  const team = [
    {
      name: 'Arsene ENOKA',
      role: 'CEO Face Aux Risques SA',
      image: 'https://images.pexels.com/photos/8488038/pexels-photo-8488038.jpeg',
      bio: 'Visionnaire alliant innovation et expertise, créant un avenir plus sûr et durable pour nos clients industriels.'
    },
    {
      name: 'Mathurin OMOKO',
      role: 'Responsable QHSE',
      image: 'https://images.pexels.com/photos/8487408/pexels-photo-8487408.jpeg',
      bio: 'Garant des normes de qualité, santé, sécurité et environnement exemplaires pour protéger nos clients et notre planète.'
    },
    {
      name: 'Edith TIOMENE',
      role: 'Responsable des Opérations',
      image: 'https://images.unsplash.com/photo-1759922378222-47ad736a174d',
      bio: 'Conçoit et supervise des infrastructures résistantes et durables, façonnant un monde meilleur pour les générations à venir.'
    }
  ]

  const values = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Excellence & Sécurité',
      description: 'Standards exemplaires de qualité et sécurité sur tous nos projets. Conformité garantie aux normes internationales.'
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Proximité Client',
      description: 'Disponibilité 24h/24, 7j/7. Intervention rapide sous 24h partout au Cameroun. Écoute et personnalisation de nos services.'
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: 'Innovation Continue',
      description: 'Veille technologique permanente. Formation continue de nos équipes aux dernières normes et technologies de sécurité.'
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'Engagement Durable',
      description: 'Approche respectueuse de l\'environnement. Solutions pérennes et économiques pour nos clients.'
    }
  ]

  const timeline = [
    { year: '2003', event: 'Création de Face Aux Risques SA', description: 'Lancement des activités au Cameroun' },
    { year: '2008', event: 'Certification ISO 9001', description: 'Reconnaissance qualité internationale' },
    { year: '2012', event: 'Partenariat ENEO', description: 'Expert sécurité centrales électriques' },
    { year: '2015', event: '100 sites sécurisés', description: 'Expansion nationale' },
    { year: '2020', event: 'Ouverture bureau France', description: 'Développement international' },
    { year: '2025', event: '500+ sites clients', description: 'Leader Afrique Centrale' }
  ]

  const certifications = [
    { name: 'ISO 9001', description: 'Management de la qualité' },
    { name: 'APSAD', description: 'Sécurité incendie' },
    { name: 'OHADA', description: 'Conformité réglementaire' },
    { name: 'FDFP', description: 'Formations certifiées' }
  ]

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
              <Link href="/about" className="text-sm font-medium text-primary">À propos</Link>
              <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Portfolio</Link>
              <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</Link>
            </div>

            <Button asChild className="gradient-primary text-white">
              <Link href="/contact">Nous Contacter</Link>
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
              À Propos de <span className="text-accent">Face Aux Risques</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              24 ans d'expertise au service de la sécurité industrielle en Afrique Centrale
            </p>
          </motion.div>
        </div>
      </section>

      {/* Histoire */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Notre <span className="text-primary">Histoire</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondée en <strong className="text-foreground">2003</strong>, Face Aux Risques SA est née de la conviction qu'une approche professionnelle et rigoureuse de la sécurité industrielle était essentielle pour accompagner le développement économique du Cameroun.
                </p>
                <p>
                  Depuis plus de <strong className="text-foreground">24 ans</strong>, nous avons développé une expertise reconnue en sécurité incendie, gestion des risques industriels et formations QHSE. Partenaire privilégié des plus grandes entreprises camerounaises (ENEO, SONARA), nous avons sécurisé plus de <strong className="text-foreground">500 sites industriels</strong>.
                </p>
                <p>
                  Notre expansion en France en 2020 témoigne de notre ambition de devenir le <strong className="text-foreground">leader régional de la sécurité industrielle</strong> en Afrique Centrale, tout en respectant les standards internationaux les plus exigeants.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1668243304566-2e78ebd48960"
                alt="Histoire Face Aux Risques"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg gradient-primary flex items-center justify-center text-white mb-4">
                    <Target className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-2xl">Notre Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Protéger les vies, les biens et l'environnement en fournissant des solutions de sécurité industrielle d'excellence. Nous accompagnons nos clients dans la maîtrise de leurs risques avec professionnalisme, réactivité et conformité garantie aux normes internationales.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg gradient-primary flex items-center justify-center text-white mb-4">
                    <Globe className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-2xl">Notre Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Devenir la référence incontournable de la sécurité industrielle en Afrique Centrale d'ici 2030. Nous aspirons à créer un écosystème industriel plus sûr et durable, où chaque entreprise peut se développer en toute sérénité.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Valeurs */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nos <span className="text-primary">Valeurs</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Notre <span className="text-primary">Parcours</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/30 my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.event}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Notre <span className="text-primary">Équipe</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des experts passionnés au service de votre sécurité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic">"{member.bio}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Certifications & <span className="text-primary">Agréments</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <Award className="w-12 h-12" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-secondary to-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Rejoignez Plus de 500 Clients Satisfaits
            </h2>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contact">Contactez-Nous Maintenant</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
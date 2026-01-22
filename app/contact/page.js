'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function ContactPage() {
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
              <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Portfolio</Link>
              <Link href="/contact" className="text-sm font-medium text-primary">Contact</Link>
            </div>

            <Button asChild className="gradient-primary text-white">
              <a href="tel:+237699699522">Appeler Maintenant</a>
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
              Contactez <span className="text-accent">Notre Équipe</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Disponibles 24h/24, 7j/7 pour répondre à vos besoins en sécurité industrielle.
              Intervention sous 24h partout au Cameroun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Nos Coordonnées</h2>
                <p className="text-muted-foreground mb-8">
                  N'hésitez pas à nous contacter pour toute question ou demande de devis. 
                  Notre équipe d'experts vous répond rapidement.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-2">Téléphone</CardTitle>
                        <CardDescription className="space-y-1">
                          <div>
                            <p className="font-medium text-foreground">Cameroun</p>
                            <a href="tel:+237699699522" className="text-primary hover:underline">+237 699 699 522</a>
                          </div>
                          <div className="pt-2">
                            <p className="font-medium text-foreground">France</p>
                            <a href="tel:+33674151845" className="text-primary hover:underline">+33 6 74 15 18 45</a>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-2">Email</CardTitle>
                        <CardDescription>
                          <a href="mailto:faceauxrisques@faceauxrisques.com" className="text-primary hover:underline">
                            faceauxrisques@faceauxrisques.com
                          </a>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-2">Adresse</CardTitle>
                        <CardDescription>
                          <p>Bassa, 373 Rue 3W709</p>
                          <p>Douala, Cameroun</p>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-2">Horaires</CardTitle>
                        <CardDescription>
                          <p className="font-medium text-success">Disponible 24h/24, 7j/7</p>
                          <p className="text-sm mt-1">Intervention sous 24h</p>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="bg-muted h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-foreground font-medium">Bassa, Douala</p>
                    <p className="text-sm text-muted-foreground">Cameroun</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Demande de Devis Gratuit</CardTitle>
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
                        rows={5}
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
                      {isSubmitting ? 'Envoi en cours...' : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Envoyer la Demande
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      En soumettant ce formulaire, vous acceptez d'être contacté par Face Aux Risques SA concernant votre demande.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Besoin d'Aide <span className="text-primary">Immédiate ?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Urgence 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Pour toute urgence, contactez-nous immédiatement</p>
                <Button asChild className="w-full gradient-primary text-white">
                  <a href="tel:+237699699522">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler Maintenant
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Audit Gratuit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Diagnostic de vos risques en 2h, sans engagement</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">
                    Réserver un Audit
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Nos Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Découvrez notre gamme complète de services</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services">
                    Voir les Services
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
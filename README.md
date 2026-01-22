# Face Aux Risques SA - Site Web Professionnel

Site web moderne de présentation pour Face Aux Risques SA, expert en sécurité incendie et gestion des risques industriels au Cameroun.

## 🎯 Caractéristiques

### Page d'Accueil Complète (11 Sections)
1. **Hero Section** - Message d'impact avec CTA
2. **Statistiques** - Compteurs animés (22 ans, 500+ sites, 24h/7j)
3. **Services Clés** - 3 services principaux (Re-test, Engineering, Formation)
4. **Pourquoi Nous Choisir** - 4 raisons différenciantes
5. **Process de Travail** - 4 étapes visualisées
6. **Portfolio/Projets** - 6 projets réalisés (ENEO, formations, inspections)
7. **Témoignages Clients** - 3 témoignages authentiques
8. **Certifications** - Logos partenaires (ENEO, SONARA, ISO, APSAD, OHADA)
9. **FAQ** - 6 questions fréquentes avec accordéon
10. **CTA Final** - Appel à l'action fort
11. **Footer** - Contact, liens, informations

## 🚀 Technologies Utilisées

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3.4 + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **Database**: MongoDB (prêt pour phase 2)

## 📦 Installation

```bash
# Installer les dépendances
yarn install

# Lancer en développement
yarn dev

# Build production
yarn build
yarn start
```

## 🔧 Configuration

### Variables d'environnement (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=faceauxrisques_db
NEXT_PUBLIC_BASE_URL=https://faceauxrisques.com
CORS_ORIGINS=*
RESEND_API_KEY=re_hQ5Ur94Q_Kg8CQjHN2kP3ZWdiSBPmfry2
```

## 🎨 Design System

### Palette de Couleurs
- **Primary**: #FF5722 (Orange incendie)
- **Primary Dark**: #E64A19
- **Secondary**: #0D47A1 (Bleu confiance)
- **Accent**: #F77F00 (Orange vif)
- **Success**: #06D6A0 (Vert)

### Typographie
- Police principale: Inter (Google Fonts)
- Hiérarchie claire H1 → H6

## 📧 Formulaire de Contact

Le formulaire envoie automatiquement les demandes à `heidy.kengne@faceauxrisques.com` via Resend.

### Champs du formulaire
- Nom complet (requis)
- Email (requis)
- Téléphone (requis)
- Entreprise (optionnel)
- Service demandé (requis) - dropdown avec 6 options
- Message (requis)

### Services disponibles
- Inspection / Audit
- Formation SSI
- Audit de Conformité
- Installation Systèmes
- Maintenance Préventive
- Autre / Devis Général

## 🌐 Sections du Site

### Navigation
- Services
- Notre Process
- Projets
- Témoignages
- Contact
- Bouton CTA "Audit Gratuit"
- Téléphone cliquable: +237 699 699 522

### Hero Section
- Message principal: "Protégez vos Installations Industrielles avec l'Expert N°1"
- 2 CTA: "Audit Gratuit en 48h" + "Intervention Rapide"
- 3 badges: Conformité OHADA, 500+ sites, Partenaire ENEO

### Services
**Re-test & Maintenance**
- Tests fonctionnels
- Conformité APSAD
- Remplacement équipements

**Engineering & Installation**
- Systèmes détection
- Extinction automatique
- Plans d'intervention

**Formation & Audit**
- Sessions pratiques
- Certification FDFP
- Audit gratuit 48h

### Projets Réalisés
1. Centrales ENEO - Installation & Analyse
2. Systèmes Extinction Automatiques - Engineering
3. Formation Caristes & Élingueurs - Formation
4. Inspection Cuves Sous Pression - Contrôle
5. Plan de Réponse Incendie - Audit
6. Audits de Conformité - Inspection

### Témoignages
- **Mary Jane (CEO AIG)**: "Vos équipes travaillent plus que prévu..."
- **Frankie Kao (CEO Fluro)**: "Services personnalisés, rapides et efficaces..."
- **Mael Enoka (IT Specialist)**: "Standards exemplaires de qualité..."

## 🎯 Performance & SEO

### Optimisations
- ✅ Images Next.js optimisées (lazy loading)
- ✅ Animations Framer Motion au scroll
- ✅ Mobile-first responsive design
- ✅ Metadata SEO complètes
- ✅ Lighthouse score > 90 visé

### SEO - Mots-clés ciblés
- sécurité incendie Cameroun
- audit risques industriels Douala
- formation SSI Yaoundé
- maintenance extincteurs Cameroun
- inspection cuves pression
- conformité OHADA sécurité

### Open Graph & Meta Tags
```html
Title: Face Aux Risques SA - Expert Sécurité Incendie & Risques Industriels Cameroun
Description: 22 ans d'expertise en sécurité incendie, gestion des risques industriels et formations QHSE au Cameroun. Intervention rapide, conformité OHADA garantie.
```

## 📱 Responsive Design

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

### Breakpoints Tailwind
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔗 API Routes

### POST /api/contact
Gère les soumissions du formulaire de contact.

**Request Body:**
```json
{
  "nom": "string",
  "email": "string",
  "telephone": "string",
  "entreprise": "string (optional)",
  "service": "inspection|formation|audit|installation|maintenance|autre",
  "message": "string"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès..."
}
```

### GET /api/health
Health check endpoint.

## 📂 Structure des Fichiers

```
/app
├── app/
│   ├── api/
│   │   └── [[...path]]/
│   │       └── route.js          # API Routes (contact)
│   ├── globals.css               # Styles globaux + variables CSS
│   ├── layout.js                 # Layout principal + metadata
│   └── page.js                   # Page d'accueil (11 sections)
├── components/
│   └── ui/                       # Composants shadcn/ui
├── lib/
│   └── utils.js                  # Utilitaires
├── .env                          # Variables d'environnement
├── package.json                  # Dépendances
├── tailwind.config.js            # Config Tailwind
├── next.config.js                # Config Next.js
└── README.md                     # Documentation
```

## 🎨 Composants Réutilisables

### Shadcn/ui Components Utilisés
- Button
- Card
- Input
- Textarea
- Label
- Select
- Accordion
- (Tous pré-installés)

### Custom Components
- `AnimatedSection` - Wrapper avec animation scroll
- `AnimatedCounter` - Compteurs animés pour stats

## 🚦 Commandes Utiles

```bash
# Redémarrer le serveur
sudo supervisorctl restart nextjs

# Voir les logs
tail -f /var/log/supervisor/nextjs.out.log

# Tester le formulaire
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@test.com","telephone":"+237","service":"audit","message":"Test"}'

# Health check
curl http://localhost:3000/api/health
```

## 📧 Contact & Support

**Face Aux Risques SA**
- 📞 Cameroun: +237 699 699 522
- 📞 France: +33 6 74 15 18 45
- 📧 Email: faceauxrisques@faceauxrisques.com
- 📍 Adresse: Bassa, 373 Rue 3W709, Douala, Cameroun

## 📝 Notes Importantes

### Images Utilisées
- Logo principal (fourni par client)
- Images professionnelles Unsplash/Pexels (professionnels africains)
- Images projets (SONARA fournie, autres stock)

### Animations
- Fade-in au scroll pour toutes les sections
- Compteurs animés pour les statistiques
- Hover effects sur cards et boutons
- Scroll indicator animé sur hero

### Formulaire
- Validation côté client (React Hook Form + Zod)
- Envoi email via Resend API
- Message de confirmation utilisateur
- Email HTML formaté pour l'entreprise

## 🎯 Prochaines Étapes (Phase 2)

1. **Page Services** - Détail des 6 services
2. **Page À Propos** - Histoire, équipe, valeurs
3. **Page Portfolio** - Projets détaillés avec filtres
4. **Page Contact** - Formulaire + Google Maps
5. **Optimisations SEO** - Sitemap, robots.txt
6. **Analytics** - Google Analytics 4 + Tag Manager

## 📄 Licence

© 2025 Face Aux Risques SA. Tous droits réservés.

---

**Site développé avec ❤️ pour Face Aux Risques SA**



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

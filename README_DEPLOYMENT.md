# Face Aux Risques SA - Guide de Déploiement Complet

Guide détaillé pour déployer le site Face Aux Risques en local (Docker) et sur serveur LWS.

---

## Table des Matières

1. [Déploiement Local avec Docker](#1-déploiement-local-avec-docker)
2. [Déploiement sur Serveur LWS](#2-déploiement-sur-serveur-lws)
3. [Migration vers Nouveau Compte Emergent](#3-migration-vers-nouveau-compte-emergent)
4. [Configuration Environnement](#4-configuration-environnement)
5. [Maintenance & Troubleshooting](#5-maintenance--troubleshooting)

---

## 1. Déploiement Local avec Docker

### Prérequis

```bash
# Vérifier les installations
docker --version      # Docker 20.10+ recommandé
docker-compose --version  # Docker Compose 1.29+ recommandé
git --version        # Git 2.x+
```

### Étape 1 : Cloner le Repository

```bash
# Cloner le projet
git clone <votre-repo-url> face-aux-risques
cd face-aux-risques

# Ou si vous avez le code source en ZIP
unzip face-aux-risques.zip
cd face-aux-risques
```

### Étape 2 : Configurer les Variables d'Environnement

```bash
# Copier le fichier .env d'exemple
cp .env.example .env

# Éditer le fichier .env
nano .env
```

**Contenu du fichier `.env` :**

```env
# Base de données MongoDB
MONGO_URL=mongodb://mongodb:27017
DB_NAME=faceauxrisques_db

# URL publique du site
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# CORS (laisser * pour dev local)
CORS_ORIGINS=*

# API Resend (pour formulaire contact)
RESEND_API_KEY=re_hQ5Ur94Q_Kg8CQjHN2kP3ZWdiSBPmfry2
```

### Étape 3 : Lancer avec Docker Compose

```bash
# Construire et lancer les conteneurs
docker-compose up -d

# Vérifier que les conteneurs sont actifs
docker-compose ps

# Voir les logs
docker-compose logs -f nextjs
```

**Output attendu :**

```
NAME                  STATUS
faceauxrisques-nextjs   Running
faceauxrisques-mongodb  Running
```

### Étape 4 : Accéder au Site

```
Site web : http://localhost:3000
MongoDB : mongodb://localhost:27017
```

### Étape 5 : Arrêter les Conteneurs

```bash
# Arrêter sans supprimer les données
docker-compose stop

# Arrêter et supprimer les conteneurs
docker-compose down

# Supprimer aussi les volumes (données MongoDB)
docker-compose down -v
```

---

## 2. Déploiement sur Serveur LWS

### Prérequis LWS

- **Offre recommandée** : LWS Cloud VPS ou Serveur Dédié
- **Système** : Ubuntu 22.04 LTS
- **Node.js** : v18.x ou supérieur
- **MongoDB** : v6.x ou supérieur
- **Domaine** : faceauxrisques.com point vers votre serveur

### Méthode 1 : Déploiement avec Docker sur LWS

#### 1. Connexion au Serveur LWS

```bash
# Via SSH (clés fournies par LWS)
ssh root@votre-serveur-lws.com

# Ou avec mot de passe
ssh utilisateur@votre-serveur-lws.com
```

#### 2. Installation Docker sur LWS

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Installation Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Vérifier
docker --version
docker-compose --version
```

#### 3. Déployer l'Application

```bash
# Créer un répertoire pour l'app
sudo mkdir -p /var/www/faceauxrisques
cd /var/www/faceauxrisques

# Cloner le repository (ou uploader le code)
git clone <votre-repo> .

# Ou uploader via SCP depuis votre machine locale
# scp -r /chemin/local/face-aux-risques/* utilisateur@serveur-lws:/var/www/faceauxrisques/

# Configurer .env pour production
nano .env
```

**`.env` pour production LWS :**

```env
MONGO_URL=mongodb://mongodb:27017
DB_NAME=faceauxrisques_production
NEXT_PUBLIC_BASE_URL=https://faceauxrisques.com
CORS_ORIGINS=https://faceauxrisques.com,https://www.faceauxrisques.com
RESEND_API_KEY=re_hQ5Ur94Q_Kg8CQjHN2kP3ZWdiSBPmfry2
```

```bash
# Lancer les conteneurs en production
docker-compose up -d

# Vérifier
docker-compose ps
docker-compose logs nextjs
```

#### 4. Configurer Nginx Reverse Proxy (optionnel mais recommandé)

```bash
# Installer Nginx
sudo apt install nginx -y

# Créer la configuration du site
sudo nano /etc/nginx/sites-available/faceauxrisques
```

**Contenu `/etc/nginx/sites-available/faceauxrisques` :**

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name faceauxrisques.com www.faceauxrisques.com;

    # Redirection HTTPS (après installation SSL)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name faceauxrisques.com www.faceauxrisques.com;

    # Certificats SSL (Let's Encrypt - voir section suivante)
    ssl_certificate /etc/letsencrypt/live/faceauxrisques.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/faceauxrisques.com/privkey.pem;

    # Proxy vers Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/faceauxrisques /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

#### 5. Installation SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat SSL
sudo certbot --nginx -d faceauxrisques.com -d www.faceauxrisques.com

# Renouvellement automatique (vérifier)
sudo certbot renew --dry-run
```

#### 6. Configuration Firewall

```bash
# Autoriser ports nécessaires
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
sudo ufw status
```

---

### Méthode 2 : Déploiement Direct (sans Docker) sur LWS

#### 1. Installation Node.js et MongoDB

```bash
# Installer Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier
node --version  # v18.x+
npm --version

# Installer Yarn
npm install -g yarn

# Installer MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Démarrer MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

#### 2. Déployer l'Application

```bash
# Créer le répertoire
sudo mkdir -p /var/www/faceauxrisques
cd /var/www/faceauxrisques

# Cloner le code
git clone <votre-repo> .

# Installer les dépendances
yarn install

# Configurer .env
nano .env
```

**`.env` production :**

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=faceauxrisques_production
NEXT_PUBLIC_BASE_URL=https://faceauxrisques.com
CORS_ORIGINS=https://faceauxrisques.com
RESEND_API_KEY=LLLFLSKDFKSDJLFJSDKLFLSKDF
```

```bash
# Build production
yarn build

# Tester
yarn start
```

#### 3. Configurer PM2 (Process Manager)

```bash
# Installer PM2
npm install -g pm2

# Démarrer l'app avec PM2
pm2 start yarn --name "faceauxrisques" -- start

# Sauvegarder la config PM2
pm2 save
pm2 startup

# Commandes utiles PM2
pm2 status
pm2 logs faceauxrisques
pm2 restart faceauxrisques
pm2 stop faceauxrisques
```

---

## 3. Migration vers Nouveau Compte Emergent

### Scénario : Vous avez le code source et voulez continuer sur un nouveau compte

#### Cas 1 : Vous avez accès au repository Git

```bash
# Sur votre nouveau compte Emergent
# 1. Cloner le repository existant
git clone https://github.com/votre-compte/face-aux-risques.git
cd face-aux-risques

# 2. Installer les dépendances
yarn install

# 3. Configurer les variables d'environnement
cp .env.example .env
nano .env  # Ajouter les clés API

# 4. Lancer en développement
yarn dev

# 5. Vérifier que tout fonctionne
curl http://localhost:3000
```

#### Cas 2 : Vous avez le code source en ZIP/archive

```bash
# 1. Uploader le fichier ZIP dans votre workspace Emergent
# Via l'interface Emergent ou command line tools

# 2. Extraire l'archive
unzip face-aux-risques.zip
cd face-aux-risques

# 3. Installer les dépendances
yarn install

# 4. Configurer .env
nano .env
```

**Variables `.env` à configurer :**

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=faceauxrisques_db
NEXT_PUBLIC_BASE_URL=<nouvelle-url-emergent>
CORS_ORIGINS=*
RESEND_API_KEY=re_hQ5Ur94Q_Kg8CQjHN2kP3ZWdiSBPmfry2
```

```bash
# 5. Démarrer les services (si sous Emergent)
sudo supervisorctl restart all

# 6. Vérifier
curl http://localhost:3000
tail -f /var/log/supervisor/nextjs.out.log
```

#### Cas 3 : Export/Import complet avec données MongoDB

##### Sur l'ancien compte (Export)

```bash
# Exporter les données MongoDB
mongodump --uri="mongodb://localhost:27017/faceauxrisques_db" --out=/tmp/mongodb_backup

# Compresser
tar -czvf mongodb_backup.tar.gz /tmp/mongodb_backup

# Télécharger depuis Emergent (via interface ou scp)
```

##### Sur le nouveau compte (Import)

```bash
# Uploader mongodb_backup.tar.gz

# Extraire
tar -xzvf mongodb_backup.tar.gz

# Restaurer dans MongoDB
mongorestore --uri="mongodb://localhost:27017" /tmp/mongodb_backup

# Vérifier
mongo
use faceauxrisques_db
show collections
```

---

## 4. Configuration Environnement

### Variables d'Environnement Complètes

| Variable | Description | Exemple | Obligatoire |
|----------|-------------|---------|-------------|
| `MONGO_URL` | URL connexion MongoDB | `mongodb://localhost:27017` | ✅ |
| `DB_NAME` | Nom base de données | `faceauxrisques_db` | ✅ |
| `NEXT_PUBLIC_BASE_URL` | URL publique du site | `https://faceauxrisques.com` | ✅ |
| `CORS_ORIGINS` | Origines CORS autorisées | `*` (dev), `https://faceauxrisques.com` (prod) | ✅ |
| `RESEND_API_KEY` | Clé API Resend (emails) | `re_xxx` | ✅ |

### Fichiers de Configuration Importants

```
/app/
├── .env                    # Variables d'environnement
├── package.json            # Dépendances Node.js
├── next.config.js          # Configuration Next.js
├── tailwind.config.js      # Configuration Tailwind
├── Dockerfile              # Image Docker
└── docker-compose.yml      # Orchestration Docker
```

---

## 5. Maintenance & Troubleshooting

### Commandes de Maintenance

```bash
# Voir les logs Next.js
docker-compose logs -f nextjs
# ou sans Docker
tail -f /var/log/supervisor/nextjs.out.log

# Voir les logs MongoDB
docker-compose logs -f mongodb
# ou sans Docker
sudo tail -f /var/log/mongodb/mongod.log

# Redémarrer l'application
docker-compose restart nextjs
# ou sans Docker
sudo supervisorctl restart nextjs
# ou avec PM2
pm2 restart faceauxrisques

# Vérifier l'espace disque
df -h

# Vérifier la mémoire
free -h

# Vérifier les processus
top
htop  # Plus visuel
```

### Problèmes Fréquents

#### Problème 1 : Conteneur Next.js ne démarre pas

```bash
# Vérifier les logs
docker-compose logs nextjs

# Reconstruire l'image
docker-compose build --no-cache nextjs
docker-compose up -d
```

#### Problème 2 : Erreur de connexion MongoDB

```bash
# Vérifier que MongoDB est actif
docker-compose ps mongodb

# Tester la connexion
docker-compose exec nextjs mongo mongodb://mongodb:27017

# Redémarrer MongoDB
docker-compose restart mongodb
```

#### Problème 3 : Formulaire de contact ne fonctionne pas

```bash
# Vérifier la clé API Resend dans .env
cat .env | grep RESEND

# Tester l'envoi d'email
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@test.com","telephone":"+237","service":"audit","message":"Test"}'

# Vérifier les logs
docker-compose logs nextjs | grep "POST /api/contact"
```

#### Problème 4 : Site lent ou ne répond pas

```bash
# Vérifier les ressources
docker stats

# Augmenter la mémoire allouée (dans docker-compose.yml)
# services:
#   nextjs:
#     mem_limit: 1g

# Redémarrer
docker-compose restart
```

### Backup & Restauration

#### Backup MongoDB

```bash
# Avec Docker
docker-compose exec mongodb mongodump --out /tmp/backup
docker cp $(docker-compose ps -q mongodb):/tmp/backup ./mongodb_backup

# Sans Docker
mongodump --uri="mongodb://localhost:27017/faceauxrisques_db" --out=./mongodb_backup

# Compresser
tar -czvf mongodb_backup_$(date +%Y%m%d).tar.gz mongodb_backup/
```

#### Restauration MongoDB

```bash
# Extraire le backup
tar -xzvf mongodb_backup_20250120.tar.gz

# Avec Docker
docker cp mongodb_backup $(docker-compose ps -q mongodb):/tmp/
docker-compose exec mongodb mongorestore /tmp/mongodb_backup

# Sans Docker
mongorestore mongodb_backup/
```

#### Backup Code Source

```bash
# Créer une archive complète
tar -czvf faceauxrisques_backup_$(date +%Y%m%d).tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='mongodb_backup' \
  .

# Sauvegarder sur un serveur distant
scp faceauxrisques_backup_*.tar.gz utilisateur@serveur-backup:/backups/
```

---

## Annexes

### A. Structure Complète du Projet

```
/app/
├── app/
│   ├── api/[[...path]]/route.js    # API Routes
│   ├── about/page.js               # Page À propos
│   ├── contact/page.js             # Page Contact
│   ├── portfolio/page.js           # Page Portfolio
│   ├── services/page.js            # Page Services
│   ├── globals.css                 # Styles globaux
│   ├── layout.js                   # Layout principal
│   └── page.js                     # Page d'accueil
├── components/ui/               # Composants shadcn/ui
├── lib/utils.js                 # Utilitaires
├── public/                      # Assets publics
├── .env                         # Variables environnement
├── .env.example                 # Exemple .env
├── package.json                 # Dépendances
├── Dockerfile                   # Image Docker
├── docker-compose.yml           # Orchestration
├── README.md                    # Documentation
└── README_DEPLOYMENT.md         # Ce fichier
```

### B. Commandes Utiles Résumées

```bash
# Développement local
yarn install
yarn dev

# Build production
yarn build
yarn start

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f

# Tests
curl http://localhost:3000
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{...}'

# Maintenance
docker-compose restart nextjs
docker-compose exec nextjs sh
mongodump --out /backup
```

### C. Support & Assistance

**Problèmes de déploiement ?**

1. **Vérifiez les logs** : Toujours commencer par là
2. **Consultez la documentation** : README.md et ce fichier
3. **Testez localement** : Reproduire le problème en local
4. **Vérifiez les variables** : .env correctement configuré

**Contact Technique :**

- **Email** : support-technique@faceauxrisques.com
- **Téléphone** : +237 699 699 522

---

## Changelog Déploiement

- **v1.0.0** (2025-01-20) : Version initiale avec Docker et LWS
- **v1.0.1** (TBD) : Ajout monitoring et métriques

---

**© 2025 Face Aux Risques SA - Documentation Déploiement**
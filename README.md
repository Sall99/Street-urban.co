# Joyner Lucas E-Commerce Store 🎵🛍️

Un clone premium d'e-commerce inspiré de Joyner Lucas, construit avec **Next.js 14**, **TypeScript**, **Tailwind CSS**, et **Supabase**.

## ✨ Fonctionnalités

### 🛒 E-Commerce
- **Catalogue de produits** avec filtres par catégorie
- **Pages produits détaillées** avec galerie d'images
- **Panier d'achat persistant** (localStorage)
- **Système de checkout** complet
- **Gestion des commandes**

### 🔐 Authentification
- **Inscription / Connexion** avec Supabase Auth
- **Profil utilisateur**
- **Historique des commandes**
- **Authentification sécurisée**

### 👨‍💼 Dashboard Admin
- **Gestion des produits** (CRUD complet)
- **Statistiques** en temps réel
- **Gestion des stocks**
- **Produits mis en avant**

### 🎨 Design
- **Interface moderne et responsive**
- **Animations fluides** avec Framer Motion
- **Dark theme premium**
- **Notifications toast**
- **Icônes Lucide React**

## 🚀 Installation

### 1. Cloner le projet
```bash
cd street-urban.co
npm install
```

### 2. Configuration Supabase

#### A. Créer un projet Supabase
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Récupérer l'URL et la clé anonyme

#### B. Créer le fichier `.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
```

#### C. Créer les tables dans Supabase
Aller dans **SQL Editor** et exécuter le script `supabase-schema.sql` :

```sql
-- Le fichier contient :
-- - Tables: products, orders, order_items
-- - Politiques RLS (Row Level Security)
-- - Produits de démonstration
```

### 3. Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
street-urban.co/
├── src/
│   ├── app/                  # Pages Next.js App Router
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── shop/            # Boutique
│   │   ├── product/[id]/    # Détail produit
│   │   ├── cart/            # Panier
│   │   ├── checkout/        # Checkout
│   │   ├── auth/            # Authentification
│   │   ├── profile/         # Profil utilisateur
│   │   └── admin/           # Dashboard admin
│   ├── components/          # Composants réutilisables
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── lib/
│   │   └── supabase.ts      # Client Supabase
│   ├── store/
│   │   └── cartStore.ts     # Store Zustand (panier)
│   └── types/
│       └── index.ts         # Types TypeScript
├── supabase-schema.sql      # Schéma de base de données
├── .env.example             # Variables d'environnement
└── README.md
```

## 🗄️ Schéma de base de données

### Products
```typescript
{
  id: UUID
  name: string
  description: string
  price: number
  image_url: string
  category: 'clothing' | 'music' | 'accessories'
  stock: number
  is_featured: boolean
  created_at: timestamp
}
```

### Orders
```typescript
{
  id: UUID
  user_id: UUID (FK → auth.users)
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  shipping_address: string
  payment_intent_id: string
  created_at: timestamp
}
```

### Order Items
```typescript
{
  id: UUID
  order_id: UUID (FK → orders)
  product_id: UUID (FK → products)
  quantity: number
  price: number
}
```

## 🎯 Fonctionnalités à venir

- [ ] Intégration Stripe pour les paiements
- [ ] Upload d'images avec Supabase Storage
- [ ] Système de reviews/notes produits
- [ ] Wishlist
- [ ] Codes promo
- [ ] Recherche avancée
- [ ] Filtres multiples
- [ ] Mode clair
- [ ] Email de confirmation de commande
- [ ] Tracking de livraison

## 🛠️ Technologies utilisées

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **State**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## 📝 Scripts disponibles

```bash
npm run dev      # Démarrer en développement
npm run build    # Construire pour la production
npm run start    # Démarrer en production
npm run lint     # Linter le code
```

## 🔒 Sécurité

- **Row Level Security (RLS)** activé sur toutes les tables
- **Authentification JWT** avec Supabase
- **Validation côté client et serveur**
- **Protection CSRF**

## 📱 Pages

### Public
- `/` - Page d'accueil
- `/shop` - Catalogue produits
- `/shop?category=clothing` - Filtrage par catégorie
- `/product/[id]` - Détail produit
- `/cart` - Panier
- `/auth/login` - Connexion
- `/auth/signup` - Inscription

### Protégées (authentification requise)
- `/profile` - Profil utilisateur
- `/checkout` - Checkout
- `/admin` - Dashboard admin

## 🎨 Palette de couleurs

```css
Noir: #000000
Zinc-900: #18181b
Zinc-800: #27272a
Rouge: #dc2626
Blanc: #ffffff
Jaune: #eab308
```

## 👨‍💻 Développement

### Ajouter un produit (Admin)
1. Se connecter avec un compte
2. Aller sur `/admin`
3. Cliquer sur "Add Product"
4. Remplir le formulaire
5. Sauvegarder

### Tester le flow complet
1. Créer un compte sur `/auth/signup`
2. Parcourir `/shop`
3. Ajouter des produits au panier
4. Aller sur `/cart`
5. Procéder au checkout `/checkout`
6. Voir la commande dans `/profile`

## 🤝 Contribution

Ce projet est un clone à but éducatif. Les contributions sont les bienvenues !

## 📄 License

MIT License - Projet éducatif

## 🙏 Credits

- Design inspiré de l'univers de Joyner Lucas
- Icons par [Lucide](https://lucide.dev)
- Backend par [Supabase](https://supabase.com)

---

**Enjoy coding! 🚀**

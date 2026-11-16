# 🧭 FindIt — Lost Today. Found Tomorrow.

A worldwide community-powered lost and found platform where anyone can register, log in, report missing belongings, report found belongings, search listings, submit encrypted ownership claims, and safely reunite missing items with their rightful owners.

---

## 🌟 Key Features

### 1. 🏠 Home Page
- **Visual Identity:** Custom navy blue and sky blue SaaS aesthetic with original compass badge logo.
- **Hero Section:** "Lost Something? Let's Find It." with global search bar and prominent "I Lost Something" & "I Found Something" action buttons.
- **Dynamic Bulletin:** Real-time recent lost items & found items tabs.
- **How It Works:** Interactive multi-step guide explaining the protocol for both loss and recovery.
- **Live Platform Impact:** Actual database statistics calculating cataloged items, recovered property, active community guardians, and recovery success rate (87%+).
- **Responsive Navigation & Footer:** Quick navigation, trust & safety guidelines, privacy policy, and terms.

### 2. 🔐 Authentication & Security
- **Email & Password Registration:** Firebase Auth with client-side form validation and automatic email verification trigger.
- **Secure Sign In:** Session persistence, error mapping for invalid credentials, and password reset recovery flow.
- **One-Click Preview Access:** Built-in instant login helpers for quick testing without typing.
- **Security-First Firestore & Storage Rules:** Included `firestore.rules` and `storage.rules` protecting private user contact details and verifying that claimants only see verified owner info upon approval.

### 3. 🔎 Browse & Smart Search
- **Multi-Filter Engine:** Filter by type (*All*, *Lost*, *Found*), category (*Electronics*, *Wallets*, *Keys*, *Documents*, *Bags*, *Jewelry*, *Pets*, *Accessories*), location, and status (*Open*, *Claimed*, *Returned*).
- **Real-Time URL Sync:** Seamless shareable search queries via URL search parameters.
- **Rich Cards:** High-resolution photographs, location pins, formatted dates, reward tags, and proof-requirement badges.

### 4. 📝 Report Missing & Found Belongings
- **Report Lost Item:** Title, category, date lost, location, reward offering, description of distinguishing marks, contact preference, and photo upload.
- **Report Found Item:** Title, category, date found, location, custody/storage location, proof-of-ownership verification question, and photo upload.
- **Storage Service:** Direct upload to Firebase Storage with local preview fallback.

### 5. 🛡️ Claim Verification System
- **Community Claims:** Authenticated users can submit ownership claims specifying unique identifiers (e.g., serial numbers, screen lock wallpapers, engraved initials, purchase receipts).
- **Reporter Review Portal:** Item reporters can review incoming claims and approve or reject them.
- **Privacy Protection:** Claimant contact details (email, phone) remain masked and protected until the reporter approves the claim.
- **Automatic Status Synchronization:** Approving a claim automatically updates the item's status to **Claimed** / **Returned**.

### 6. 📊 User Dashboard
- **Personal Metrics:** Live counters for reported lost items, reported found items, incoming claims, and outgoing claims.
- **Management Tables:** Quick status updates (mark as returned), item detail previews, and deletion.
- **Smart AI/Heuristic Matchmaker:** Automatically matches reported lost items with newly reported found belongings in the same category or location.
- **Profile Management:** Edit full name, contact phone, and public community bio.

### 7. 🛡️ Admin Dashboard
- **Secure Access Control:** Admin panel protected by role verification (`role === 'admin'`).
- **Platform Moderation:** View all community reports, delete fraudulent or inappropriate listings, and inspect all claims.
- **Platform Statistics:** Global health overview of total reports, active claims, and recovery rates.

---

## 🛠️ Technology Stack

- **Frontend:** React 18 + Vite 5
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS (Navy `#0f172a` + Sky/Cyan `#0284c7` + White SaaS palette)
- **Icons:** Lucide React
- **Backend / Cloud Services:**
  - Firebase Authentication
  - Cloud Firestore
  - Firebase Storage

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or pnpm

### 2. Installation
```bash
# Clone or navigate to the repository directory
cd Findit

# Install dependencies
npm install
```

### 3. Configure Firebase Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_optional_measurement_id
```

> **Note on Demo Mode:** If you run the application before setting up `.env`, FindIt automatically runs in **Interactive Local Demo Mode**. All features, reports, forms, claim submissions, status changes, and admin moderation are fully functional and persist in browser storage. A sleek setup banner provides a guide on how to link your Firebase project whenever you're ready.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🔒 Firebase Security Rules Deployment

Deploy the included security rules using the Firebase CLI:

```bash
# Login to Firebase
firebase login

# Initialize project if needed
firebase init

# Deploy Firestore & Storage rules
firebase deploy --only firestore:rules,storage
```

The rules in `firestore.rules` and `storage.rules`:
1. Permit public read access to active item listings.
2. Permit authenticated users to file lost and found reports.
3. Allow only the original author or platform administrator to update or delete listings.
4. Restrict claim verification details and claimant contact information to the item author and claimant.
5. Prevent users from self-assigning administrative privileges.
6. Enforce file size limits (< 5MB) and mime-type constraints (`image/*`) on uploaded media.

---

## 📂 Project Structure

```
Findit/
├── .env.example              # Environment variables template
├── firestore.rules           # Cloud Firestore security rules
├── storage.rules             # Firebase Storage security rules
├── vite.config.js            # Vite configuration (port 3000)
├── tailwind.config.js        # Tailwind custom theme & color tokens
├── index.html                # HTML entry point with Inter font
├── package.json              # Project dependencies
└── src/
    ├── main.jsx              # React DOM render entry
    ├── App.jsx               # Application routes and layout
    ├── styles/
    │   └── index.css         # Tailwind directives & custom CSS
    ├── context/
    │   ├── AuthContext.jsx   # Authentication context & user state
    │   └── ItemContext.jsx   # Items & platform statistics context
    ├── services/
    │   ├── firebase.js       # Firebase SDK initialization & verification
    │   ├── authService.js    # Auth flows, session sync, error handling
    │   ├── itemService.js    # Lost/found reports, filters, matchmaking
    │   ├── claimService.js   # Claim creation, review, approval & privacy
    │   ├── storageService.js # Image upload & validation
    │   └── mockData.js       # Realistic initial dataset & fallback store
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Badge.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── FirebaseSetupBanner.jsx
    │   ├── items/
    │   │   ├── ItemCard.jsx
    │   │   ├── ItemGrid.jsx
    │   │   ├── ItemFilters.jsx
    │   │   └── ClaimModal.jsx
    │   ├── home/
    │   │   ├── HeroSection.jsx
    │   │   ├── RecentItemsSection.jsx
    │   │   ├── HowItWorks.jsx
    │   │   └── StatsSection.jsx
    │   └── dashboard/
    │       ├── StatOverview.jsx
    │       ├── ItemListTable.jsx
    │       ├── ClaimsManager.jsx
    │       ├── MatchesSection.jsx
    │       └── ProfileEditor.jsx
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── BrowseItemsPage.jsx
    │   ├── ItemDetailsPage.jsx
    │   ├── ReportLostPage.jsx
    │   ├── ReportFoundPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── AdminDashboardPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── ForgotPasswordPage.jsx
    │   ├── PrivacyPolicyPage.jsx
    │   ├── TermsPage.jsx
    │   └── NotFoundPage.jsx
    └── utils/
        ├── formatters.js     # Date, relative time, and category config
        └── validation.js     # Form and file validation helpers
```

---

## 🛡️ License

Built for communities worldwide. Licensed under the MIT License.

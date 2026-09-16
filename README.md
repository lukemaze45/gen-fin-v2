# Genesis Financial — Agent Recruitment Platform

A high-converting, mobile-first recruitment website for **Genesis Financial**, designed for prospective financial and life insurance agents.

Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Express / Vercel Serverless**, styled with the Genesis brand identity: **Black (#050505), Dark Charcoal (#101010), Metallic Silver (#B8B8B8), Crisp White (#FFFFFF), and Crimson Red Accents (#B00000)**.

---

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Local Development

To run the local development server on `http://localhost:3000`:

```bash
npm run dev
```

### 3. Production Build & Start

```bash
npm run build
npm run start
```

---

## Configuration & Customization

All company copy, recruitment pillars, leadership bios, contact details, and Calendly integrations are centralized in a single configuration file:

📁 **`/lib/site-config.ts`**

### How to Add Your Calendly URL

When you receive your official Genesis Financial Calendly booking link:

1. Open `/lib/site-config.ts`
2. Update the `calendlyUrl` property:

```typescript
export const siteConfig: SiteConfig = {
  companyName: "GENESIS FINANCIAL",
  // Set your link below:
  calendlyUrl: "https://calendly.com/your-agency/agent-intro",
  // ...
};
```

3. Save the file. **All "BOOK A CALL" buttons and CTA triggers throughout the entire website will automatically link to your scheduler.**

---

### How to Edit Genesis Company Information

Inside `/lib/site-config.ts`, you can customize:

- **Company Name & Taglines**: `companyName`, `heroHeadline`, `heroSupportingText`
- **Contact Details**: Email (`contact.email`), Phone (`contact.phone`), Location (`contact.location`)
- **Benefits**: Add or modify the 6 core pillars under `benefits`
- **Journey Steps**: 4-step onboarding pathway under `journeySteps`
- **Candidate Profile**: 6 characteristics under `whoIsThisFor`
- **Testimonials**: Replace placeholder text under `testimonials` once verified reviews are provided
- **Leadership**: Update founder/executive biography under `about.leadership`

---

## Contact Form & Email Delivery

The secondary contact form (`POST /api/contact`) is validated server-side.

### Email Configuration (Resend)

To deliver incoming candidate submissions directly to your inbox:

1. Sign up for a free API key at [Resend](https://resend.com)
2. Create a `.env` file (copy from `.env.example`):

```env
RESEND_API_KEY="re_123456789"
CONTACT_EMAIL="recruitment@genesisfinancial.com"
```

3. When a candidate submits the form, an email notification is automatically dispatched to `CONTACT_EMAIL` with the applicant's name, phone, email, location, and message.
4. If no `RESEND_API_KEY` is provided, inquiries are securely logged to the server console and confirmed to the candidate.

---

## Deploying to Vercel

The project is structured for 1-click deployment on Vercel:

1. Push your repository to **GitHub**
2. In Vercel, click **Add New Project** and import the repository
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Under **Environment Variables**, add:
   - `RESEND_API_KEY` (optional)
   - `CONTACT_EMAIL` (optional)
7. Click **Deploy**

The API route at `/api/contact.ts` automatically runs as a Vercel Serverless Function.

---

## Legal & Compliance

Genesis Financial recruitment materials comply with financial industry representations:
- No exaggerated or guaranteed income claims
- Clear disclosure of independent contractor status
- Full licensing orientation requirements outlined
- Built-in Privacy Policy, Terms of Service, and Regulatory Disclosures modals accessible in the footer

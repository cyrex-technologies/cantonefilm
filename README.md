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

## Deploying to cPanel

This project is a static Next.js export. It does **not** require cPanel's Node.js Application feature in production. The browser submits enquiries to the same-origin PHP endpoint at `/contact-handler.php`.

Build locally with Node.js 20.9 or newer:

```bash
npm ci
npm run lint
npm run build
php -l public/contact-handler.php
```

Upload the **contents** of `out/`, not the `out` folder itself, to the domain's cPanel document root. This includes `contact-handler.php`, static pages, and `_next/` assets.

Before uploading, copy [`contact-form-config.example.php`](contact-form-config.example.php) outside the document root as:

```text
/home/CPANEL_USER/cantonefilms-contact-form-config.php
```

Replace its placeholders with the authenticated Cantone Films mailbox details and set permissions to `0600`. Do not upload this private file or commit its credentials. The server must have PHP 8+, OpenSSL, and PHP streams enabled.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

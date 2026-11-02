# Cantone Films cPanel deployment

The site is a static Next.js export. cPanel serves the files in `out/` directly; no Node.js app, `server.js`, process manager, or persistent port is needed in production.

## Build and upload

```bash
npm ci
npm run lint
npm run build
php -l public/contact-handler.php
```

Upload the contents of `out/` to the intended cPanel document root. Do not upload the outer `out` directory itself. Confirm that `index.html`, `portfolio/`, `_next/`, images, and `contact-handler.php` are in that document root.

## Inquiry form SMTP configuration

Copy `contact-form-config.example.php` to the cPanel account home directory, outside the domain document root:

```text
/home/CPANEL_USER/cantonefilms-contact-form-config.php
```

Set the real Cantone Films SMTP hostname, mailbox username/password, sender, and recipient there, then set permissions to `0600`. The sender must be an authorised Cantone Films mailbox. Never place this file in the public document root or commit it.

The PHP endpoint provides same-origin checks, a hidden-field bot trap, a minimum form-fill time, payload validation, and per-IP rate limiting. It sends the owner notification with the visitor as `Reply-To`, then sends the visitor a confirmation email.

## Post-deployment checks

1. `GET /contact-handler.php` returns JSON with status `405`.
2. Check the homepage, portfolio listing, and every portfolio page for working images and navigation.
3. Submit a controlled inquiry after waiting at least three seconds. Confirm delivery to the team inbox and the visitor acknowledgement email.
4. Check GA4 receives page traffic and preserve the prior cPanel release for rollback.

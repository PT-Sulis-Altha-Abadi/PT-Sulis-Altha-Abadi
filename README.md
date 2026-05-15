## Development

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in the browser.

## Admin Inbox

The contact form sends messages into a protected admin inbox:

- Login page: `/admin/login`
- Inbox page: `/admin/messages`

Local development defaults:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin12345
ADMIN_SESSION_SECRET=change-this-before-production
```

Set real values in the hosting dashboard before production.

## Netlify Deployment

The project is prepared for Netlify:

- Local development stores contact messages in `.data/contact-messages.json`.
- Netlify deployments automatically use `Netlify Blobs` when `SITE_ID` is available.
- To force blob storage manually, set `MESSAGE_STORAGE=netlify-blobs`.
- If the site is served through HTTPS in production, set `ADMIN_COOKIE_SECURE=true`.

Recommended production environment variables:

```env
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=use-a-strong-password
ADMIN_SESSION_SECRET=use-a-long-random-secret
ADMIN_COOKIE_SECURE=true
```

# Vaisag J portfolio

The portfolio uses Next.js, PostgreSQL through Prisma, and GitHub OAuth for the admin area.

## Local setup

Use Node.js 22 or 24 and npm. Copy `.env.example` to `.env` and fill in the values. Keep your local secrets out of Git. If you already use `.env.local` for Next.js, set `DATABASE_URL` in the shell when running Prisma commands so they target the same database.

```bash
npm ci
npm run db:migrate
npm run dev
```

Run `db:migrate` on a new database. Follow the baseline instructions below when reusing a database that already has the portfolio tables. Open [localhost:3000](http://localhost:3000) for the site and [localhost:3000/admin/login](http://localhost:3000/admin/login) for admin sign-in.

## Production deployment

Use a Next.js host with a Node.js runtime. Set these variables in the hosting environment before building.

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string for the portfolio database. |
| `AUTH_URL` | The public HTTPS origin for the site, such as `https://portfolio.example.com`. |
| `AUTH_SECRET` | A unique secret for production. Generate one with `npx auth secret`. |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | The production GitHub OAuth application's client ID and secret. |
| `ADMIN_EMAIL` | The verified email address of the GitHub account allowed to sign in. |
| `NEXT_PUBLIC_ADMIN_LINKEDIN` | The public LinkedIn profile URL used on the Contact page. |

Register `https://<your-domain>/api/auth/callback/github` in the production GitHub OAuth app. Use a separate GitHub OAuth app for localhost if you need both callback URLs. Verify the full GitHub sign-in on the deployed domain.

### Database

- **Existing database with the published portfolio projects.** Keep its connection string to preserve those records. If the tables were originally created without Prisma Migrate, back up the database and confirm the schema matches before baselining. Run `npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --exit-code` and proceed only if it exits with code `0`. Record the baseline once with `npx prisma migrate resolve --applied 0_init`, then use `npm run db:migrate` for subsequent deploys.
- **Empty database.** Run `npm run db:migrate` to create the schema. Restore the project records from the existing database or add them through the admin interface before launching.

### Build and check

```bash
npm ci
npm run lint
npm audit --omit=dev
npm run build
npm run start
```

The build generates the Prisma client and runs Next.js type checking. For a managed Next.js host, use its standard build and start workflow after applying the database migrations. Check `/projects`, the Contact page links, and GitHub admin sign-in on the hosted site.

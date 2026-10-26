# Eric Zaleta portfolio

An English-only portfolio built with Next.js, React, TypeScript, and Tailwind CSS.
The site is exported as static files for GitHub Pages. It has no translation
service, server API, or Google Translate key requirement.

## Development

Use Node.js 20 or newer and pnpm 10.28.1.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Development and production serve the site at `/`, targeting `ericzaleta.com`.
`lib/public-path.mjs` defines the shared base path for Next.js and public assets.
Next.js `Link` handles page links; use `publicAsset()` for raw public-file URLs.

## Checks and static export

```sh
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm export` is an alias for the static build. Deploy the generated `out/`
directory to a static host at `/`; it does not require `next start`.
Builds enforce TypeScript and lint errors. GitHub Actions runs the checks before
building and publishing the site on pushes to `main`.

## Custom domain

The build is prepared for `ericzaleta.com`. Domain activation is a separate
GitHub Pages and DNS operation, not something the local build performs.
Do not publish this root-path build to the old `/Portfolio` URL without
coordinating the custom-domain switch, or links and assets will break there.

1. Verify `ericzaleta.com` in the GitHub account's Pages settings using the
   exact TXT record GitHub provides. Keep that verification record.
2. Set `ericzaleta.com` in the repository's **Settings > Pages > Custom domain**
   before pointing DNS to GitHub. Coordinate publishing this build with the switch.
3. In the authoritative DNS provider, configure the records below. If Spaceship
   hosts the DNS, use **Advanced DNS Manager > DNS records > Custom records**.

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | MrUltraEnder.github.io |

Replace only conflicting website/parking records after inspecting them. Preserve
mail and verification records; do not change nameservers or add wildcard records.
After DNS and the certificate are ready, enable **Enforce HTTPS** in GitHub Pages
and check both the apex and `www` addresses. DNS/certificate setup may take 24 hours.
The custom Actions deployment does not require a repository `CNAME` file.

References: [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
and [Spaceship DNS manager](https://www.spaceship.com/knowledgebase/dns-alias-record/).

## Itch.io catalog

```sh
pnpm fetch-games
```

Refreshing the catalog requires `ITCH_API_KEY` in the environment or a local
`.env` file. GitHub Actions uses the repository secret of the same name. Never
commit the key. The generated public JSON and HTML contain game information only.

Without a key, the fetcher reuses a valid existing JSON catalog. Configuration or
upstream failures never replace existing catalogs with empty placeholders. If no
usable catalog or key exists, refreshing fails with a nonzero exit code.

An error-marked development catalog is not treated as a valid list of games.
The UI tries the HTML backup and shows an English availability message if
neither source is usable. Refresh with a valid key to populate the catalog. A valid,
intentionally empty JSON catalog still shows the normal empty state.

Tests use local fixtures and do not call Itch.io or require credentials.

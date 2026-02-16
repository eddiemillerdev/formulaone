# PWA icons

The app manifest expects these files in this folder (or at `/icons/` from the site root):

| File | Size | Purpose |
|------|------|--------|
| `icon-192.png` | 192×192 | PWA icon (any + maskable) |
| `icon-512.png` | 512×512 | PWA icon (any + maskable), fallback for iOS splash |
| `apple-touch-icon.png` | 180×180 | iOS home screen icon (optional; 512 is used if missing) |
| `favicon.ico` | 32×32 (or multi-size) | Browser tab (optional; favicon.svg can be used) |

## Generating from `favicon.svg`

If you have Bun and want to generate `icon-192.png` and `icon-512.png` from `favicon.svg`:

```bash
cd formulaone
bun add -d sharp
bun run scripts/generate-pwa-icons.js
```

Or use any image tool (Figma, ImageMagick, online converter) to export 192×192 and 512×512 PNGs from `favicon.svg` and save them here as `icon-192.png` and `icon-512.png`.

## Splash screen (iOS)

The layout uses `icon-512.png` as a simple startup image. For device-optimized splash screens, add PNGs (e.g. `splash-1284x2778.png`) and extra `<link rel="apple-touch-startup-image" href="/icons/splash-1284x2778.png" media="..." />` tags in `src/app/layout.tsx`.

## Legacy files

- `site.webmanifest` – Replaced by the dynamic manifest at `/manifest.webmanifest` (see `src/app/manifest.ts`). Safe to remove or keep for reference.

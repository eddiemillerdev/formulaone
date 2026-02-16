# PWA icons

The app manifest expects these files in this folder (or at `/icons/` from the site root):

| File | Size | Purpose |
|------|------|--------|
| `icon-192.png` | 192×192 | PWA icon (any + maskable) |
| `icon-512.png` | 512×512 | PWA icon (any + maskable) |
| `splash-1170x2532.png` | 1170×2532 | iOS splash (iPhone 14/13) |
| `splash-1290x2796.png` | 1290×2796 | iOS splash (iPhone 14 Pro Max) |
| `splash-1242x2688.png` | 1242×2688 | iOS splash (iPhone 11 Pro Max) |
| `splash-750x1334.png` | 750×1334 | iOS splash (iPhone 8/SE) |
| `splash-2048x2732.png` | 2048×2732 | iOS splash (iPad Pro 12.9") |
| `apple-touch-icon.png` | 180×180 | iOS home screen (optional) |
| `favicon.ico` | 32×32 | Browser tab (optional) |

## Generating from `favicon.svg`

If you have Bun and want to generate `icon-192.png` and `icon-512.png` from `favicon.svg`:

```bash
cd formulaone
bun add -d sharp
bun run scripts/generate-pwa-icons.js
```

Or use any image tool (Figma, ImageMagick, online converter) to export 192×192 and 512×512 PNGs from `favicon.svg` and save them here as `icon-192.png` and `icon-512.png`.

## Splash screen (iOS)

The same script generates full-screen splash images (dark background `#1e1d20` + centered logo) for common iOS sizes. They are linked in `src/app/layout.tsx` via `apple-touch-startup-image` with matching media queries. Android/Chrome uses the manifest `background_color` and icons for its splash.

## Legacy files

- `site.webmanifest` – Replaced by the dynamic manifest at `/manifest.webmanifest` (see `src/app/manifest.ts`). Safe to remove or keep for reference.

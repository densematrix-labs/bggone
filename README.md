# BgGone — Free remove.bg Alternative

AI-powered background removal tool with full HD resolution output. Free to use, no signup required.

🔗 **Live:** https://bggone.demo.densematrix.ai

## Features

- ✅ **Free HD Output** — No 500px limit like competitors
- ✅ **No Signup Required** — Just upload and go
- ✅ **5 Free Uses Daily** — Per device
- ✅ **AI-Powered** — Precise edge detection with rembg
- ✅ **Multiple Languages** — EN, 中文, 日本語, 한국어, ES, DE, FR

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** Python FastAPI + rembg
- **Payment:** Creem MoR
- **Deploy:** Docker

## Quick Start

```bash
# Clone
git clone https://github.com/densematrix/bggone
cd bggone

# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --port 30066 --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Docker

```bash
docker-compose up -d
```

- Frontend: http://localhost:30065
- Backend: http://localhost:30066
- Metrics: http://localhost:30066/metrics

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Creem Payment
CREEM_API_KEY=creem_test_xxx
CREEM_WEBHOOK_SECRET=whsec_xxx
CREEM_PRODUCT_IDS={"pack_5": "prod_xxx", "pack_20": "prod_xxx", "unlimited": "prod_xxx"}
```

## SEO

Programmatic SEO pages are generated at build time:
- `/vs/{competitor}/` — Comparison pages
- `/alternative/{use-case}/` — Use case pages
- `/for/{feature}/` — Feature pages
- `/p/{industry}-{use-case}/` — Industry combination pages

## API

### Remove Background
```bash
curl -X POST http://localhost:30066/api/v1/remove-bg \
  -H "X-Device-ID: your-device-id" \
  -F "file=@image.png" \
  -o result.png
```

### Check Rate Limit
```bash
curl http://localhost:30066/api/v1/rate-limit \
  -H "X-Device-ID: your-device-id"
```

## License

MIT © DenseMatrix

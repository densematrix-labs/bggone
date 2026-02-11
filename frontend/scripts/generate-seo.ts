/**
 * Programmatic SEO Page Generator for BgGone
 * Generates VS pages, Alternative pages, and long-tail keyword pages
 */
import * as fs from 'fs'
import * as path from 'path'

const BASE_URL = 'https://bggone.demo.densematrix.ai'
const PUBLIC_DIR = path.join(__dirname, '../public')
const TODAY = new Date().toISOString().split('T')[0]

// Competitor data for VS pages
const competitors = [
  { slug: 'erase-bg', name: 'Erase.bg', pros: ['Free tier', 'Simple UI'], cons: ['Signup required', 'Lower quality'] },
  { slug: 'photoroom', name: 'PhotoRoom', pros: ['Mobile app', 'Templates'], cons: ['Expensive', 'Limited free'] },
  { slug: 'canva', name: 'Canva', pros: ['Design tools', 'Templates'], cons: ['Not specialized', 'Subscription model'] },
  { slug: 'slazzer', name: 'Slazzer', pros: ['API access', 'Bulk'], cons: ['Paid only HD', 'Complex pricing'] },
  { slug: 'remove-bg', name: 'remove.bg', pros: ['Industry leader', 'Photoshop plugin'], cons: ['500px free limit', 'Expensive'] },
  { slug: 'picwish', name: 'PicWish', pros: ['Mobile apps', 'Batch'], cons: ['Watermarks', 'Slow'] },
  { slug: 'clipping-magic', name: 'Clipping Magic', pros: ['Manual refinement', 'High quality'], cons: ['No free tier', 'Slow'] },
  { slug: 'fotor', name: 'Fotor', pros: ['Photo editor', 'All-in-one'], cons: ['Limited free', 'Ads'] },
  { slug: 'pixlr', name: 'Pixlr', pros: ['Free editor', 'Web-based'], cons: ['Manual work', 'Ads'] },
  { slug: 'kapwing', name: 'Kapwing', pros: ['Video too', 'Collaboration'], cons: ['Watermarks', 'Subscription'] },
]

// Use cases for Alternative pages
const useCases = [
  { slug: 'etsy-sellers', title: 'Etsy Sellers', desc: 'Create professional product photos for your Etsy shop' },
  { slug: 'shopify', title: 'Shopify Store Owners', desc: 'Enhance your Shopify store with professional images' },
  { slug: 'amazon-sellers', title: 'Amazon Sellers', desc: 'Meet Amazon\'s white background requirements easily' },
  { slug: 'designers', title: 'Graphic Designers', desc: 'Speed up your design workflow' },
  { slug: 'photographers', title: 'Photographers', desc: 'Quick background removal for portrait sessions' },
  { slug: 'marketers', title: 'Digital Marketers', desc: 'Create ad creatives with clean backgrounds' },
  { slug: 'real-estate', title: 'Real Estate Agents', desc: 'Professional property photos' },
  { slug: 'ecommerce', title: 'E-commerce Businesses', desc: 'Consistent product photography' },
  { slug: 'social-media', title: 'Social Media Creators', desc: 'Create engaging visual content' },
  { slug: 'youtubers', title: 'YouTubers', desc: 'Thumbnails and channel art' },
  { slug: 'print-on-demand', title: 'Print on Demand', desc: 'Prepare designs for POD products' },
  { slug: 'students', title: 'Students', desc: 'School projects and presentations' },
  { slug: 'small-business', title: 'Small Businesses', desc: 'Professional marketing materials' },
  { slug: 'freelancers', title: 'Freelancers', desc: 'Deliver high-quality work to clients' },
  { slug: 'bloggers', title: 'Bloggers', desc: 'Create featured images for blog posts' },
]

// Features for long-tail pages
const features = [
  { slug: 'no-signup', title: 'No Signup Required', desc: 'Use BgGone without creating an account' },
  { slug: 'high-resolution', title: 'High Resolution Output', desc: 'Get full HD images for free' },
  { slug: 'no-watermark', title: 'No Watermark', desc: 'Download clean images without watermarks' },
  { slug: 'batch-processing', title: 'Batch Processing', desc: 'Process multiple images at once' },
  { slug: 'transparent-png', title: 'Transparent PNG', desc: 'Get images with transparent backgrounds' },
  { slug: 'free-unlimited', title: 'Free Unlimited', desc: '5 free uses daily, upgrade for unlimited' },
  { slug: 'ai-powered', title: 'AI Powered', desc: 'Advanced AI for precise edge detection' },
  { slug: 'instant-results', title: 'Instant Results', desc: 'Get your image in seconds' },
  { slug: 'hair-detection', title: 'Hair Detection', desc: 'Accurate detection of fine details' },
  { slug: 'mobile-friendly', title: 'Mobile Friendly', desc: 'Works great on any device' },
]

// Industries for dimension combinations
const industries = [
  'fashion', 'jewelry', 'electronics', 'furniture', 'cosmetics', 'food', 'automotive',
  'sports', 'toys', 'books', 'art', 'crafts', 'pets', 'gardening', 'home-decor'
]

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function generateVsPage(competitor: typeof competitors[0]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BgGone vs ${competitor.name} - Which Background Remover is Better? (2026)</title>
  <meta name="description" content="Compare BgGone vs ${competitor.name}. See features, pricing, and quality side by side. Find the best background remover for your needs in 2026.">
  <link rel="canonical" href="${BASE_URL}/vs/${competitor.slug}/">
  <meta property="og:title" content="BgGone vs ${competitor.name} - Complete Comparison 2026">
  <meta property="og:description" content="Which background remover is better? Compare BgGone and ${competitor.name} features, pricing, and quality.">
  <meta property="og:url" content="${BASE_URL}/vs/${competitor.slug}/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "BgGone vs ${competitor.name}",
    "description": "Comparison of BgGone and ${competitor.name} background removal tools",
    "url": "${BASE_URL}/vs/${competitor.slug}/"
  }
  </script>
  <script>window.location.href = '/?vs=${competitor.slug}';</script>
</head>
<body>
  <h1>BgGone vs ${competitor.name}: Complete Comparison 2026</h1>
  <p>Redirecting to comparison...</p>
  <a href="/">Go to BgGone</a>
</body>
</html>`
}

function generateAlternativePage(useCase: typeof useCases[0]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Best remove.bg Alternative for ${useCase.title} - BgGone</title>
  <meta name="description" content="${useCase.desc}. BgGone offers free HD background removal with no signup required. The best remove.bg alternative for ${useCase.title.toLowerCase()}.">
  <link rel="canonical" href="${BASE_URL}/alternative/${useCase.slug}/">
  <meta property="og:title" content="Best remove.bg Alternative for ${useCase.title}">
  <meta property="og:description" content="${useCase.desc}. Free HD output, no signup required.">
  <meta property="og:url" content="${BASE_URL}/alternative/${useCase.slug}/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best remove.bg Alternative for ${useCase.title}",
    "description": "${useCase.desc}",
    "url": "${BASE_URL}/alternative/${useCase.slug}/"
  }
  </script>
  <script>window.location.href = '/?alt=${useCase.slug}';</script>
</head>
<body>
  <h1>Best remove.bg Alternative for ${useCase.title}</h1>
  <p>${useCase.desc}</p>
  <a href="/">Try BgGone Free</a>
</body>
</html>`
}

function generateForPage(feature: typeof features[0]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>remove.bg Alternative with ${feature.title} - BgGone</title>
  <meta name="description" content="Looking for a remove.bg alternative with ${feature.title.toLowerCase()}? BgGone offers ${feature.desc.toLowerCase()}. Try free now!">
  <link rel="canonical" href="${BASE_URL}/for/${feature.slug}/">
  <meta property="og:title" content="remove.bg Alternative with ${feature.title}">
  <meta property="og:description" content="${feature.desc}. Free HD background removal.">
  <meta property="og:url" content="${BASE_URL}/for/${feature.slug}/">
  <script>window.location.href = '/?feature=${feature.slug}';</script>
</head>
<body>
  <h1>remove.bg Alternative with ${feature.title}</h1>
  <p>${feature.desc}</p>
  <a href="/">Try BgGone Free</a>
</body>
</html>`
}

function generateIndustryPage(industry: string, useCase: string): string {
  const title = `${industry.charAt(0).toUpperCase() + industry.slice(1)} ${useCase.replace(/-/g, ' ')}`
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Background Remover for ${title} - BgGone</title>
  <meta name="description" content="Remove backgrounds from ${industry} images. Perfect for ${useCase.replace(/-/g, ' ')}. Free HD output, no signup required.">
  <link rel="canonical" href="${BASE_URL}/p/${industry}-${useCase}/">
  <script>window.location.href = '/?industry=${industry}&use=${useCase}';</script>
</head>
<body>
  <h1>Background Remover for ${title}</h1>
  <a href="/">Try BgGone Free</a>
</body>
</html>`
}

function generateSitemap(urls: string[]): string {
  const entries = urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

async function main() {
  console.log('🚀 Generating Programmatic SEO pages...')
  
  const urls: string[] = []
  
  // Generate VS pages
  console.log('📝 Generating VS pages...')
  const vsDir = path.join(PUBLIC_DIR, 'vs')
  ensureDir(vsDir)
  for (const competitor of competitors) {
    const dir = path.join(vsDir, competitor.slug)
    ensureDir(dir)
    fs.writeFileSync(path.join(dir, 'index.html'), generateVsPage(competitor))
    urls.push(`${BASE_URL}/vs/${competitor.slug}/`)
  }
  
  // Generate Alternative pages
  console.log('📝 Generating Alternative pages...')
  const altDir = path.join(PUBLIC_DIR, 'alternative')
  ensureDir(altDir)
  for (const useCase of useCases) {
    const dir = path.join(altDir, useCase.slug)
    ensureDir(dir)
    fs.writeFileSync(path.join(dir, 'index.html'), generateAlternativePage(useCase))
    urls.push(`${BASE_URL}/alternative/${useCase.slug}/`)
  }
  
  // Generate For (feature) pages
  console.log('📝 Generating Feature pages...')
  const forDir = path.join(PUBLIC_DIR, 'for')
  ensureDir(forDir)
  for (const feature of features) {
    const dir = path.join(forDir, feature.slug)
    ensureDir(dir)
    fs.writeFileSync(path.join(dir, 'index.html'), generateForPage(feature))
    urls.push(`${BASE_URL}/for/${feature.slug}/`)
  }
  
  // Generate Industry x UseCase pages
  console.log('📝 Generating Industry pages...')
  const pDir = path.join(PUBLIC_DIR, 'p')
  ensureDir(pDir)
  const simplifiedUseCases = ['product-photos', 'marketing', 'social-media', 'ecommerce', 'design']
  for (const industry of industries) {
    for (const useCase of simplifiedUseCases) {
      const slug = `${industry}-${useCase}`
      const dir = path.join(pDir, slug)
      ensureDir(dir)
      fs.writeFileSync(path.join(dir, 'index.html'), generateIndustryPage(industry, useCase))
      urls.push(`${BASE_URL}/p/${slug}/`)
    }
  }
  
  // Generate sitemap-programmatic.xml
  console.log('📝 Generating sitemap...')
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'sitemap-programmatic.xml'),
    generateSitemap(urls)
  )
  
  console.log(`✅ Generated ${urls.length} programmatic SEO pages`)
  console.log(`   - ${competitors.length} VS pages`)
  console.log(`   - ${useCases.length} Alternative pages`)
  console.log(`   - ${features.length} Feature pages`)
  console.log(`   - ${industries.length * simplifiedUseCases.length} Industry pages`)
}

main().catch(console.error)

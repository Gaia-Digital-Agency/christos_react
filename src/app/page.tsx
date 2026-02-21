import Link from 'next/link'

const defaultNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/about' },
  { label: 'Sessions', href: '/sessions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

const defaultElements = [
  {
    name: 'Earth',
    trait: 'Foundation',
    description:
      'The stability and support that roots you in safety, belonging, and the physical body.',
  },
  {
    name: 'Fire',
    trait: 'Transformation',
    description:
      'The life force and passion that illuminates your direction and transforms stagnation into inspiration.',
  },
  {
    name: 'Water',
    trait: 'Flow',
    description:
      'The intuitive movement that allows emotions to cleanse and reshape your experience without force.',
  },
  {
    name: 'Air',
    trait: 'Clarity',
    description: 'The breath and perspective that creates space for understanding and clear awareness.',
  },
  {
    name: 'Ether',
    trait: 'Space',
    description: 'The silence and unity that connects you to the vastness of consciousness itself.',
  },
]

const defaultHomepage = {
  hero: {
    kicker: 'Christos Medicine',
    title: 'A sacred space for embodied love, wisdom, and presence.',
    description:
      'This is an online sanctuary for those seeking wholeness, remembrance, and gentle inner alignment.',
    learnMoreLabel: 'Learn More',
    learnMoreHref: '/about',
    sessionCtaLabel: 'Pay for Healing Session',
  },
  intro: {
    title: 'What Christos Medicine Is',
    description:
      'Christos Medicine is a grounded, heart-led practice that invites you into an anointed consciousness. It is not a doctrine or hierarchy. It is a sacred place for remembering what is already whole within you.',
  },
  unionSection: {
    title: 'The Embodied Union',
    description:
      'The Embodied Union is the sacred marriage of Wisdom and Love in your physical vessel, where spirit and matter breathe as one integrated life.',
  },
  support: {
    title: 'Support This Sacred Work',
    description:
      'Your contribution helps maintain this healing space and allows transformative sessions to remain accessible.',
    donationLabel: 'Make Donation',
    socialLinksText: 'YouTube | Instagram | Email',
  },
}

type NavItem = { label: string; href: string }
type ElementItem = { name: string; trait: string; description: string }

type HomepageGlobal = {
  navigation?: NavItem[]
  hero?: {
    kicker?: string
    title?: string
    description?: string
    learnMoreLabel?: string
    learnMoreHref?: string
    sessionCtaLabel?: string
    sessionCtaUrl?: string
    heroImage?: unknown
  }
  intro?: { title?: string; description?: string }
  elements?: ElementItem[]
  unionSection?: { title?: string; description?: string }
  support?: {
    title?: string
    description?: string
    donationLabel?: string
    donationUrl?: string
    socialLinksText?: string
    supportImage?: unknown
  }
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}

function resolveMediaUrl(media: unknown, baseUrl?: string) {
  if (!media || typeof media !== 'object') return null
  const maybeUrl = (media as { url?: unknown }).url
  if (typeof maybeUrl !== 'string' || !maybeUrl) return null
  if (/^https?:\/\//.test(maybeUrl)) return maybeUrl
  if (!baseUrl) return maybeUrl
  return `${baseUrl.replace(/\/$/, '')}${maybeUrl.startsWith('/') ? '' : '/'}${maybeUrl}`
}

async function getHomepageContent(): Promise<HomepageGlobal | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
  if (!baseUrl) return null

  try {
    const res = await fetch(`${baseUrl}/api/globals/homepage?depth=2`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function HomePage() {
  const homepage = await getHomepageContent()
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const donationUrl = process.env.NEXT_PUBLIC_DONATION_URL
  const sessionPaymentUrl = process.env.NEXT_PUBLIC_HEALING_SESSION_PAYMENT_URL
  const navItems =
    homepage?.navigation?.filter((item): item is NavItem => !!item?.label && !!item?.href) || defaultNavItems
  const elements =
    homepage?.elements?.filter(
      (item): item is ElementItem => !!item?.name && !!item?.trait && !!item?.description
    ) || defaultElements

  const hero = { ...defaultHomepage.hero, ...(homepage?.hero || {}) }
  const intro = { ...defaultHomepage.intro, ...(homepage?.intro || {}) }
  const unionSection = { ...defaultHomepage.unionSection, ...(homepage?.unionSection || {}) }
  const support = { ...defaultHomepage.support, ...(homepage?.support || {}) }

  const donationHref =
    (homepage?.support?.donationUrl && homepage.support.donationUrl !== '#'
      ? homepage.support.donationUrl
      : donationUrl) || '/donation'
  const sessionHref =
    (homepage?.hero?.sessionCtaUrl && homepage.hero.sessionCtaUrl !== '#'
      ? homepage.hero.sessionCtaUrl
      : sessionPaymentUrl) || '/sessions'
  const donationExternal = isExternal(donationHref)
  const sessionExternal = isExternal(sessionHref)
  const heroImageUrl = resolveMediaUrl(homepage?.hero?.heroImage, baseUrl)
  const supportImageUrl = resolveMediaUrl(homepage?.support?.supportImage, baseUrl)
  const heroStyle = heroImageUrl
    ? {
        backgroundImage: `linear-gradient(var(--christos-overlay), var(--christos-overlay)), url("${heroImageUrl}")`,
      }
    : undefined
  const supportStyle = supportImageUrl
    ? {
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), ` +
          `url("${supportImageUrl}")`,
      }
    : undefined

  return (
    <main className="christos-page">
      <section className="christos-hero" style={heroStyle}>
        <header className="christos-nav-wrap">
          <nav className="christos-nav">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="christos-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <div className="christos-shell christos-hero-content">
          <div className="christos-glass">
            <p className="christos-kicker">{hero.kicker}</p>
            <h1 className="christos-display">{hero.title}</h1>
            <p className="christos-body">{hero.description}</p>
            <div className="christos-actions">
              <Link href={hero.learnMoreHref || '/about'} className="christos-btn christos-btn-light">
                {hero.learnMoreLabel}
              </Link>
              <Link
                href={sessionHref}
                className="christos-btn christos-btn-green"
                target={sessionExternal ? '_blank' : undefined}
                rel={sessionExternal ? 'noreferrer' : undefined}
              >
                {hero.sessionCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="christos-shell christos-section">
        <div className="christos-panel">
          <h2 className="christos-title">{intro.title}</h2>
          <p className="christos-body">{intro.description}</p>
        </div>

        <div className="christos-element-grid">
          {elements.map((element) => (
            <article key={element.name} className="christos-element-card">
              <p className="christos-element-name">{element.name}</p>
              <p className="christos-element-trait">{element.trait}</p>
              <p className="christos-element-copy">{element.description}</p>
            </article>
          ))}
        </div>

        <div className="christos-panel">
          <h2 className="christos-title">{unionSection.title}</h2>
          <p className="christos-body">{unionSection.description}</p>
        </div>
      </section>

      <footer className="christos-support" style={supportStyle}>
        <div className="christos-shell christos-support-card">
          <h2 className="christos-title">{support.title}</h2>
          <p className="christos-body">{support.description}</p>
          <div className="christos-actions">
            <Link
              href={donationHref}
              className="christos-btn christos-btn-gold"
              target={donationExternal ? '_blank' : undefined}
              rel={donationExternal ? 'noreferrer' : undefined}
            >
              {support.donationLabel}
            </Link>
          </div>
          <p className="christos-support-links">{support.socialLinksText}</p>
        </div>
      </footer>
    </main>
  )
}

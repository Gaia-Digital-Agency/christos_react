type ComingSoonPageProps = {
  title: string
  description: string
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <main className="christos-shell py-16">
      <h1 className="christos-title">{title}</h1>
      <p className="christos-body text-[#2d2115]">{description}</p>
      <p className="christos-body text-[#2d2115]">This section is intentionally kept as a placeholder for now.</p>
    </main>
  )
}

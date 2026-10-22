import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  image?: { src: string; alt: string; position?: string }
  aside?: ReactNode
}

export function PageHeader({ eyebrow, title, subtitle, children, image, aside }: Props) {
  const split = Boolean(image || aside)
  return (
    <section className="bg-grid border-b border-line">
      <div
        className={`container-page grid gap-10 pt-12 pb-16 lg:pt-20 lg:pb-24 ${
          split ? 'lg:grid-cols-12 lg:items-center lg:gap-14' : ''
        }`}
      >
        <div className={split ? 'lg:col-span-6' : ''}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="h-display mt-6 max-w-[16ch] !text-[42px] sm:!text-[56px] lg:!text-[64px]">{title}</h1>
          {subtitle && <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-[19px]">{subtitle}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="overflow-hidden rounded-2xl bg-tint lg:col-span-6">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full object-cover"
              style={image.position ? { objectPosition: image.position } : undefined}
            />
          </div>
        )}
        {aside && !image && <div className="lg:col-span-6">{aside}</div>}
      </div>
    </section>
  )
}

export function SectionHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`h-section ${className}`}>{children}</h2>
}

export function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-10">
      <h2 className="text-xl font-bold tracking-tight md:col-span-4">{label}</h2>
      <div className="text-ink-soft md:col-span-8">{children}</div>
    </div>
  )
}

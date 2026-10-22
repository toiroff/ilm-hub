import { useState } from 'react'

type Props = {
  src?: string
  alt: string
  className?: string
  /** Title shown on the branded panel when there is no photo (hidden on small thumbnails). */
  label?: string
}

export function CoverImage({ src, alt, className = '', label }: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`@container bg-navy text-white ${className}`} aria-label={alt} role="img">
        <div className="flex h-full flex-col justify-between p-[6cqw]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white @max-[200px]:m-auto">
            <img src="/assets/logo-icon.png" alt="" className="h-8 w-8 object-contain" />
          </span>
          {label && (
            <span className="hidden max-w-[14ch] text-[clamp(26px,8cqw,64px)] leading-[1.02] font-bold tracking-[-0.04em] @min-[200px]:block">
              {label}
            </span>
          )}
        </div>
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}

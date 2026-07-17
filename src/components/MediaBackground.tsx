type MediaBackgroundProps = {
  image?: string
  video?: string
  className?: string
  poster?: string
}

/** Full-bleed background: video when set, otherwise image. */
export function MediaBackground({
  image,
  video,
  className = '',
  poster,
}: MediaBackgroundProps) {
  const hasVideo = Boolean(video?.trim())

  if (hasVideo) {
    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        autoPlay
        muted
        loop
        playsInline
        poster={poster || image || undefined}
        key={video}
      >
        <source src={video} />
      </video>
    )
  }

  if (image) {
    return (
      <div
        className={`absolute inset-0 bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url('${image}')` }}
      />
    )
  }

  return <div className={`absolute inset-0 bg-navy-deep ${className}`} />
}

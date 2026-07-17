import { GalleryGrid } from '../components/GalleryGrid'
import { useLocale } from '../i18n/locale'

export function GalleryPage() {
  const { t } = useLocale()
  return (
    <div className="pt-20">
      <GalleryGrid
        eyebrow={t('gallery.eyebrow')}
        title={t('gallery.pageTitle')}
        subtitle={t('gallery.pageSubtitle')}
      />
    </div>
  )
}

import { GalleryGrid } from '../components/GalleryGrid'
import { PageHeader } from '../components/PageHeader'
import { useLocale } from '../i18n/locale'

export function GalleryPage() {
  const { t } = useLocale()
  return (
    <>
      <PageHeader eyebrow={t('gallery.eyebrow')} title={t('gallery.pageTitle')} subtitle={t('gallery.subtitle')} />
      <GalleryGrid />
    </>
  )
}

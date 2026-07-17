import { GalleryGrid } from '../components/GalleryGrid'

export function GalleryPage() {
  return (
    <div className="pt-20">
      <GalleryGrid
        eyebrow="Gallery"
        title="Photos & videos from ILM Hub"
        subtitle="Project covers, galleries, and videos are included automatically — plus extras you add in Admin."
      />
    </div>
  )
}

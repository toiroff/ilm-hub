import { PageHeader } from '../components/PageHeader'
import { ClosingCta } from '../components/HomeSections'
import { useLocale } from '../i18n/locale'
import { localizedJourney } from '../i18n/staticContent'
import { useSiteContent } from '../content/ContentContext'
import { initials } from '../lib/initials'

export function AboutPage() {
  const { content } = useSiteContent()
  const { locale } = useLocale()
  const { about, whoWeAre, teamLeads, teamMembers } = content
  const journey = localizedJourney(locale)
  const uz = locale === 'uz'

  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title={
          <>
            {about.headline} <span className="text-blue">{about.headlineAccent}</span>
          </>
        }
        subtitle={about.intro}
        image={{ src: '/assets/who-we-are-2.png', alt: 'ILM Hub graduates with certificates' }}
      />

      <section className="bg-tint">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-5">
            <p className="eyebrow">{uz ? 'Vazifamiz' : 'Our mission'}</p>
            <p className="mt-6 text-[28px] leading-[1.25] font-bold tracking-[-0.025em] sm:text-[34px]">{about.mission}</p>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow">{uz ? 'Bizning tariximiz' : 'Our story'}</p>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{about.story}</p>
            <div className="mt-10 grid grid-cols-2 gap-3">
              <img src={whoWeAre.photoTop} alt="ILM Hub students" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <img src={whoWeAre.photoBottom} alt="ILM Hub students with certificates" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className="eyebrow">{uz ? 'Qadriyatlarimiz' : 'What we stand for'}</p>
            <h2 className="h-section mt-5">
              {uz ? 'Har bir mavsum ortidagi tamoyillar' : 'The principles behind every season'}
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink-soft">
              {uz
                ? 'Challenjlar, lagerlar va haftalik uchrashuvlar — barchasi shu qadriyatlar asosida quriladi.'
                : 'Challenges, camps and weekly meetings are all built around the same few ideas.'}
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-7">
            {about.values.map((v, i) => (
              <li key={v} className="flex items-baseline gap-6 border-b border-line py-7 sm:gap-10">
                <span className="w-8 shrink-0 text-base font-bold text-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[30px] leading-tight font-bold tracking-[-0.035em] sm:text-[40px]">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="timeline" className="bg-navy text-white">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="eyebrow eyebrow-light">{uz ? 'Yoʻlimiz' : 'Journey'}</p>
            <h2 className="h-section mt-5">{uz ? 'ILM Hub qanday oʻsdi' : 'How ILM Hub grew'}</h2>
            <figure className="mt-10 hidden lg:block">
              <img
                src="/assets/projects/english-day-camp/photo-5.png"
                alt={uz ? 'English Day Camp sertifikat topshirish marosimi' : 'Certificate ceremony at English Day Camp'}
                className="aspect-[4/5] w-full max-w-[340px] rounded-2xl object-cover object-[50%_40%]"
              />
              <figcaption className="mt-3 text-sm text-white/50">
                {uz ? 'English Day Camp, 2024-yil avgust' : 'English Day Camp, August 2024'}
              </figcaption>
            </figure>
          </div>
          <ol className="relative lg:col-span-8">
            <span className="absolute top-2 bottom-2 left-[7px] w-px bg-white/15" aria-hidden="true" />
            {journey.map((item) => (
              <li key={`${item.period}-${item.title}`} className="relative pb-10 pl-10 last:pb-0">
                <span
                  className={`absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-navy ${
                    item.type === 'latest' ? 'bg-accent' : 'bg-white'
                  }`}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-white/50">{item.period}</p>
                <p className="mt-1 text-xl font-bold tracking-tight">
                  {item.title}
                  {item.type === 'latest' && (
                    <span className="ml-2 rounded-md bg-accent px-2 py-0.5 align-middle text-xs font-semibold">
                      {uz ? 'Yangi' : 'New'}
                    </span>
                  )}
                </p>
                <p className="mt-2 max-w-[56ch] leading-relaxed text-white/65">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="team" className="scroll-mt-20 bg-white">
        <div className="container-page py-20 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">{uz ? 'Jamoa' : 'Team'}</p>
              <h2 className="h-section mt-5">{uz ? 'ILM Hub ortidagi insonlar' : 'The people behind ILM Hub'}</h2>
            </div>
            <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:self-end">
              {uz
                ? 'Challengelarni ishlab chiqadigan, lagerlarni oʻtkazadigan va ishtirokchilarni har kuni qoʻllab-quvvatlaydigan talabalar.'
                : 'Students who design the challenges, run the camps and support participants every single day.'}
            </p>
          </div>

          <div className={`mt-14 grid gap-4 ${teamLeads.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {teamLeads.map((lead) => (
              <figure
                key={lead.name}
                className={`grid overflow-hidden rounded-2xl bg-tint ${teamLeads.length > 1 ? '' : 'md:grid-cols-12'}`}
              >
                <div
                  className={`aspect-[4/5] overflow-hidden bg-line ${
                    teamLeads.length > 1 ? '' : 'md:col-span-5 md:aspect-auto md:min-h-[460px]'
                  }`}
                >
                  {lead.photo ? (
                    <img src={lead.photo} alt={lead.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl font-bold">{initials(lead.name)}</div>
                  )}
                </div>
                <figcaption
                  className={`flex flex-col justify-center p-8 sm:p-10 ${teamLeads.length > 1 ? '' : 'md:col-span-7 lg:p-14'}`}
                >
                  <span className="w-fit rounded-lg bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-ink">
                    {lead.role}
                  </span>
                  <p className="mt-5 text-[34px] leading-tight font-bold tracking-[-0.03em] sm:text-[44px]">{lead.name}</p>
                  {lead.bio && (
                    <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-soft sm:text-xl">{lead.bio}</p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          {teamMembers.length > 0 && (
            <>
              <h3 className="mt-16 text-2xl font-bold tracking-tight">
                {uz ? 'Tashkilotchilar va mentorlar' : 'Organizers & mentors'}
              </h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <li key={member.name} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                    {member.photo ? (
                      <img src={member.photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-base font-bold text-white">
                        {initials(member.name)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-lg leading-snug font-bold tracking-tight">{member.name}</p>
                      <p className="mt-0.5 text-[15px] text-ink-soft">{member.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <ClosingCta />
    </>
  )
}

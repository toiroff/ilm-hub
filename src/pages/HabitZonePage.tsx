import { ArrowUpRight, Check, Download } from 'lucide-react'
import { Button } from '../components/Button'
import { Phone } from '../components/HabitZone'
import { ClosingCta } from '../components/HomeSections'
import { HABIT_ZONE_DOWNLOAD_URL, HABIT_ZONE_PRIVACY_URL, HABIT_ZONE_URL } from '../lib/links'
import { useLocale } from '../i18n/locale'

// Facts mirror the Habit Zone site (Desktop/habit-zone-website); keep them in sync with the app.
const copy = {
  en: {
    eyebrow: 'Habit Zone · by ILM Hub',
    title: 'Turn discipline into a',
    titleAccent: 'daily habit.',
    lead: 'Pick a 21-day challenge, finish a few small tasks each day, earn points and protect your streak. On your own, with friends, or with your whole class.',
    note: 'Free, no ads. Android 7.0 or newer — iPhone in preparation.',
    site: 'Visit the Habit Zone site',
    facts: [
      ['40', 'ready-made challenges'],
      ['9', 'categories'],
      ['21 or 30', 'day programs'],
      ['Free', 'no payments, no ads'],
    ],
    howEyebrow: 'How it works',
    howTitle: 'Three steps. Every day.',
    steps: [
      ['Choose a challenge', 'Pick from 40 frameworks — fitness, focus, digital detox, sleep, nutrition, faith and more — or build your own. Choose 21 or 30 days and a start date.'],
      ['Finish today’s tasks', 'Tick them off as you go. Every finished task is saved on the calendar on your Home screen.'],
      ['Protect your streak', 'Three gentle reminders a day. Each day closes at 23:59 Tashkent time, so you always know the deadline.'],
    ],
    pointsTitle: 'Points that tell the truth',
    points: [
      ['+5', 'for every task you complete'],
      ['+10', 'bonus for a perfect day'],
      ['−15', 'for each day you miss'],
    ],
    pointsFine: 'New users start at 0, and points never go below zero.',
    screensEyebrow: 'Inside the app',
    screensTitle: 'Real screens from Habit Zone',
    screens: [
      ['home', 'Home', 'Tasks, points and calendar'],
      ['challenge', 'Your challenge', 'One list for every day'],
      ['picker', '40 challenges', 'Pick by category'],
      ['group-today', 'Group: today', 'See who finished'],
      ['group-ranking', 'Group ranking', 'Top three on the podium'],
      ['create', 'Create a group', 'Private or public'],
    ],
    groupsEyebrow: 'Groups & schools',
    groupsTitle: 'Discipline is easier together.',
    groupsLead: 'Create a group, set the tasks for everyone, and let the ranking and chat do the rest. Teachers use it with a whole class.',
    groups: [
      ['Private or public.', 'Private groups are invite-only; public groups appear in Discover.'],
      ['You set the tasks.', 'Same tasks for everyone, or let members choose their own.'],
      ['Chat and announcements.', 'Talk to your group and post news for everyone.'],
      ['Rankings.', 'People and groups compete on the points they earn.'],
    ],
    schoolNote: 'For schools: create a private class group, share the code, set daily tasks and see who finished — no paper charts. For users aged 13 and over.',
    privacy: 'Privacy policy',
  },
  uz: {
    eyebrow: 'Habit Zone · ILM Hub ilovasi',
    title: 'Intizomni',
    titleAccent: 'kundalik odatga aylantiring.',
    lead: '21 kunlik dasturni tanlang, har kuni bir nechta kichik vazifani bajaring, ball toʻplang va birorta kunni ham qoldirmang. Yolgʻiz, doʻstlar bilan yoki butun sinf bilan.',
    note: 'Bepul, reklamasiz. Android 7.0 va undan yuqori — iPhone versiyasi tayyorlanmoqda.',
    site: 'Habit Zone saytiga oʻtish',
    facts: [
      ['40', 'tayyor dastur'],
      ['9', 'yoʻnalish'],
      ['21 yoki 30', 'kunlik dasturlar'],
      ['Bepul', 'toʻlovsiz va reklamasiz'],
    ],
    howEyebrow: 'Qanday ishlaydi',
    howTitle: 'Uch qadam. Har kuni.',
    steps: [
      ['Dastur tanlang', '40 ta tayyor dasturdan birini tanlang — sport, diqqat, telefondan uzoqlashish, uyqu, ovqatlanish, ibodat va boshqalar — yoki oʻzingiz tuzing. 21 yoki 30 kun va boshlanish sanasini belgilang.'],
      ['Bugungi vazifalarni bajaring', 'Bajarganingizni belgilab boring. Har bir vazifa bosh sahifadagi kalendarda saqlanadi.'],
      ['Kunni qoldirmang', 'Kuniga uch marta eslatma keladi. Har bir kun Toshkent vaqti bilan 23:59 da yopiladi.'],
    ],
    pointsTitle: 'Oddiy va adolatli ballar',
    points: [
      ['+5', 'har bir bajarilgan vazifa uchun'],
      ['+10', 'hamma vazifa bajarilgan kun uchun bonus'],
      ['−15', 'har bir qoldirilgan kun uchun'],
    ],
    pointsFine: 'Yangi foydalanuvchi 0 balldan boshlaydi, ball hech qachon noldan pastga tushmaydi.',
    screensEyebrow: 'Ilova ichida',
    screensTitle: 'Habit Zoneʼdan haqiqiy ekranlar',
    screens: [
      ['home', 'Bosh sahifa', 'Vazifalar, ballar va kalendar'],
      ['challenge', 'Sizning dasturingiz', 'Har kun uchun bitta roʻyxat'],
      ['picker', '40 ta dastur', 'Yoʻnalish boʻyicha tanlang'],
      ['group-today', 'Guruh: bugun', 'Kim bajarganini koʻring'],
      ['group-ranking', 'Guruh reytingi', 'Eng yaxshi uchtalik'],
      ['create', 'Guruh yaratish', 'Yopiq yoki ochiq'],
    ],
    groupsEyebrow: 'Guruhlar va maktablar',
    groupsTitle: 'Birga boʻlsa, osonroq.',
    groupsLead: 'Guruh oching, hamma uchun vazifalarni belgilang — qolganini reyting va chat bajaradi. Oʻqituvchilar butun sinf bilan foydalanadi.',
    groups: [
      ['Yopiq yoki ochiq.', 'Yopiq guruhga faqat taklif kodi bilan kiriladi; ochiq guruhlar umumiy roʻyxatda koʻrinadi.'],
      ['Vazifalarni siz belgilaysiz.', 'Hamma uchun bir xil vazifa bering yoki har kim oʻzi tanlasin.'],
      ['Chat va eʼlonlar.', 'Guruh bilan yozishing va hammaga eʼlon yuboring.'],
      ['Reytinglar.', 'Odamlar va guruhlar toʻplagan ballari boʻyicha bellashadi.'],
    ],
    schoolNote: 'Maktablar uchun: sinfga yopiq guruh oching, kodni bering, kunlik vazifalarni belgilang va kim bajarganini koʻring — qogʻoz jadval kerak emas. 13 yosh va undan katta foydalanuvchilar uchun.',
    privacy: 'Maxfiylik siyosati',
  },
}

export function HabitZonePage() {
  const { locale, t } = useLocale()
  const c = copy[locale]

  return (
    <>
      <section className="bg-white">
        <div className="container-page grid gap-14 pt-14 pb-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-20 lg:pb-28">
          <div className="lg:col-span-6">
            <img src="/assets/habit-zone/app-icon.png" alt="Habit Zone" className="h-16 w-16 rounded-2xl" />
            <p className="eyebrow mt-8">{c.eyebrow}</p>
            <h1 className="h-display mt-6 !text-[40px] sm:!text-[56px] lg:!text-[64px]">
              {c.title} <span className="text-blue">{c.titleAccent}</span>
            </h1>
            <p className="mt-7 max-w-[50ch] text-[19px] leading-relaxed text-ink-soft">{c.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={HABIT_ZONE_DOWNLOAD_URL} size="lg">
                <Download className="h-5 w-5" /> {t('cta.download')}
              </Button>
              <Button href={HABIT_ZONE_URL} variant="secondary" size="lg">
                {c.site} <ArrowUpRight className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-6 text-[15px] text-ink-faint">{c.note}</p>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 items-start gap-5 rounded-2xl bg-tint px-6 pt-10 pb-6 sm:gap-8 sm:px-14 sm:pt-14">
              <Phone screen="challenge" alt={c.screens[1][1]} />
              <Phone screen="home" alt={c.screens[0][1]} className="mt-12 sm:mt-20" />
            </div>
          </div>
        </div>

        <div className="container-page pb-20 lg:pb-28">
          <dl className="grid grid-cols-2 gap-x-8 md:grid-cols-4">
            {c.facts.map(([value, label]) => (
              <div key={label} className="border-t border-line py-6">
                <dd className="text-[40px] leading-none font-bold tracking-[-0.04em] sm:text-[48px]">{value}</dd>
                <dt className="mt-3 text-[15px] text-ink-soft">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="container-page grid gap-14 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-6">
            <p className="eyebrow eyebrow-light">{c.howEyebrow}</p>
            <h2 className="h-section mt-5">{c.howTitle}</h2>
            <ol className="mt-10 border-t border-white/15">
              {c.steps.map(([title, detail], i) => (
                <li key={title} className="grid grid-cols-[3rem_1fr] border-b border-white/15 py-6">
                  <span className="text-xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-white/65">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:pt-14">
            <div className="rounded-2xl bg-navy-2 p-7 sm:p-9">
              <p className="font-semibold">{c.pointsTitle}</p>
              <ul className="mt-6 divide-y divide-white/10">
                {c.points.map(([value, label]) => (
                  <li key={value} className="flex items-baseline gap-6 py-5">
                    <span
                      className={`w-24 shrink-0 text-[44px] leading-none font-bold tracking-[-0.04em] ${
                        value.startsWith('+') ? 'text-accent' : 'text-white'
                      }`}
                    >
                      {value}
                    </span>
                    <span className="text-white/75">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/50">{c.pointsFine}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tint">
        <div className="container-page py-20 lg:py-28">
          <p className="eyebrow">{c.screensEyebrow}</p>
          <h2 className="h-section mt-5">{c.screensTitle}</h2>
          <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
            {c.screens.map(([screen, title, caption]) => (
              <li key={screen} className="w-[200px] shrink-0 snap-start lg:w-auto">
                <Phone screen={screen} alt={`${title} — ${caption}`} />
                <p className="mt-5 font-semibold">{title}</p>
                <p className="text-sm text-ink-soft">{caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page grid gap-14 py-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow">{c.groupsEyebrow}</p>
            <h2 className="h-section mt-5">{c.groupsTitle}</h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">{c.groupsLead}</p>
            <ul className="mt-10 border-t border-line">
              {c.groups.map(([title, detail]) => (
                <li key={title} className="flex items-start gap-4 border-b border-line py-5">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <p className="leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">{title}</span> {detail}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl bg-accent-soft p-6 leading-relaxed text-ink">{c.schoolNote}</p>
            <a
              href={HABIT_ZONE_PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-blue hover:underline"
            >
              {c.privacy} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mx-auto w-full max-w-[300px] lg:col-span-5">
            <Phone screen="group-ranking" alt={c.screens[4][1]} />
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}

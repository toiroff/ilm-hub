import {
  challenges,
  challengeWeeks,
  projects,
  seasons,
  stats,
} from '../data/content'
import { teamLeads, teamMembers } from '../data/team'
import { testimonials } from '../data/testimonials'
import type { SiteContent, LocalizedSiteContent } from './types'

export const defaultSiteContent: SiteContent = {
  hero: {
    line1: 'The student community',
    line2: 'building discipline',
    line3: 'across Uzbekistan.',
    subtitle:
      'A community across Uzbekistan where students build discipline through 21-day challenges, real projects, and shared growth.',
    backgroundImage: '/assets/projects/english-day-camp/photo-7.png',
    backgroundVideo: '',
  },
  about: {
    eyebrow: 'About ILM Hub',
    headline: 'Built by students,',
    headlineAccent: 'for students.',
    intro:
      'ILM Hub helps high school students and graduates develop discipline, consistency, and practical skills through structured challenges, collaborative projects, mentorship, and community support — preparing them for university and their future careers.',
    mission:
      'Empower students to build lifelong habits of learning, discipline, and leadership through practical experiences and supportive communities.',
    story:
      'ILM Hub started in July 2024 by sharing useful posts on Telegram. From there it grew into English Day Camp, IT Bootcamp, ILM Hub Camp, and discipline challenges — a community of students across Uzbekistan learning and growing together.',
    values: [
      'Consistency',
      'Community',
      'Growth',
      'Accountability',
      'Continuous Learning',
    ],
  },
  whoWeAre: {
    eyebrow: 'Who We Are',
    headline: 'A community built for',
    headlineAccent: 'disciplined learners',
    description:
      'ILM Hub helps high school students and graduates develop discipline, consistency, and practical skills through structured challenges, collaborative projects, mentorship, and community support — preparing them for university and future careers.',
    mission:
      'Empower students to build lifelong habits of learning, discipline, and leadership through practical experiences and supportive communities.',
    story:
      'Started in July 2024 with useful posts on Telegram, then grew into camps, challenges, and a student community across Uzbekistan.',
    values: [
      'Consistency',
      'Community',
      'Growth',
      'Accountability',
      'Continuous Learning',
    ],
    photoTop: '/assets/who-we-are-outdoor.jpg',
    photoBottom: '/assets/who-we-are.jpg',
    badgeValue: '250+',
    badgeLabel: 'Students in Uzbekistan',
  },
  teamLeads: structuredClone(teamLeads),
  teamMembers: structuredClone(teamMembers),
  projects: structuredClone(projects),
  stats: stats.map((s) => ({
    value: s.value,
    suffix: s.suffix,
    label: s.label,
    decimals: 'decimals' in s ? (s.decimals as number) : undefined,
  })),
  testimonials: structuredClone(testimonials),
  challenges: structuredClone(challenges),
  challengeWeeks: structuredClone(challengeWeeks),
  seasons: structuredClone(seasons),
  gallery: [
    {
      id: 'gallery-1',
      type: 'ceremonies',
      src: '/assets/who-we-are.png',
      label: 'Certificate ceremony',
    },
    {
      id: 'gallery-2',
      type: 'ceremonies',
      src: '/assets/who-we-are-2.png',
      label: 'Graduates with certificates',
    },
  ],
}

/** Starter Uzbek (Latin) copy — media URLs shared with English defaults. */
export const defaultSiteContentUz: SiteContent = {
  hero: {
    line1: 'Oʻzbekiston boʻylab',
    line2: 'intizom quradigan',
    line3: 'talabalar hamjamiyati.',
    subtitle:
      'Oʻzbekiston boʻylab talabalar 21 kunlik challenges, haqiqiy loyihalar va birgalikdagi oʻsish orqali intizom quradigan jamiyat.',
    backgroundImage: defaultSiteContent.hero.backgroundImage,
    backgroundVideo: defaultSiteContent.hero.backgroundVideo,
  },
  about: {
    eyebrow: 'ILM Hub haqida',
    headline: 'Talabalar tomonidan,',
    headlineAccent: 'talabalar uchun.',
    intro:
      'ILM Hub litsey oʻquvchilari va bitiruvchilarga intizom, izchillik va amaliy koʻnikmalarni strukturalangan challenges, hamkorlikdagi loyihalar, mentoring va jamiyat qoʻllab-quvvatlashi orqali rivojlantirishga yordam beradi — universitet va kelajak kasbiga tayyorlaydi.',
    mission:
      'Talabalarni amaliy tajribalar va qoʻllab-quvvatlovchi jamiyatlar orqali oʻrganish, intizom va yetakchilik odatlarini shakllantirishga undash.',
    story:
      'ILM Hub 2024-yil iyulida Telegramda foydali postlar bilan boshlandi. Keyin English Day Camp, IT Bootcamp, ILM Hub Camp va intizom challengesiga aylandi — Oʻzbekiston boʻylab birga oʻrganayotgan talabalar jamiyati.',
    values: [
      'Izchillik',
      'Jamiyat',
      'Oʻsish',
      'Masʼuliyat',
      'Doimiy oʻrganish',
    ],
  },
  whoWeAre: {
    eyebrow: 'Biz kimmiz',
    headline: 'Intizomli oʻrganuvchilar uchun',
    headlineAccent: 'qurilgan jamiyat',
    description:
      'ILM Hub litsey oʻquvchilari va bitiruvchilarga intizom, izchillik va amaliy koʻnikmalarni strukturalangan challenges, hamkorlikdagi loyihalar, mentoring va jamiyat qoʻllab-quvvatlashi orqali rivojlantirishga yordam beradi.',
    mission:
      'Talabalarni amaliy tajribalar va qoʻllab-quvvatlovchi jamiyatlar orqali oʻrganish, intizom va yetakchilik odatlarini shakllantirishga undash.',
    story:
      '2024-yil iyulida Telegram postlari bilan boshlandi, keyin lagerlar, challenges va Oʻzbekiston boʻylab talabalar jamiyatiga aylandi.',
    values: [
      'Izchillik',
      'Jamiyat',
      'Oʻsish',
      'Masʼuliyat',
      'Doimiy oʻrganish',
    ],
    photoTop: defaultSiteContent.whoWeAre.photoTop,
    photoBottom: defaultSiteContent.whoWeAre.photoBottom,
    badgeValue: '250+',
    badgeLabel: 'Oʻzbekistondagi talabalar',
  },
  teamLeads: [
    {
      name: teamLeads[0]!.name,
      role: 'Asoschi va CEO',
      photo: teamLeads[0]!.photo,
      lead: true,
      bio: '2024-yil iyulida ILM Hubʼga asos solgan va uni boshqaradi: ILM Mode challenge mavsumlari, English Day Camp, IT Bootcamp, ILM HUB Camp S3 va Habit Zone ilovasi.',
    },
    {
      name: teamLeads[1]!.name,
      role: 'Mentor va moliya',
      photo: teamLeads[1]!.photo,
      lead: true,
      bio: 'Challenge ishtirokchilariga mentorlik qiladi va ILM Hub moliyasini boshqaradi.',
    },
  ],
  teamMembers: teamMembers.map((m) => ({
    ...m,
    role:
      m.role === 'Organizer & Mentor'
        ? 'Tashkilotchi va mentor'
        : m.role === 'Organizer'
          ? 'Tashkilotchi'
          : m.role === 'Finance'
            ? 'Moliya'
            : m.role,
  })),
  projects: [
    {
      ...projects[0],
      title: 'English Day Camp',
      summary:
        'Talabalar uchun ingliz tilida mashq, oʻyinlar va ishonchni oshiruvchi faoliyatlar bilan toʻliq kun.',
      description:
        'Birinchi yirik loyihamiz — talabalar sinfdan tashqari gapirish, jamoaviy ish va haqiqiy muloqotni mashq qilgan jonli English Day Camp.',
      season: 'Birinchi loyiha',
      date: 'Avgust 2024',
      location: 'Offline',
      category: 'Lager',
      highlights: [
        'Speaking mock va public speaking',
        'Munozara, workshop va film vaqti',
        'Networking va “Yulduzlarni tomosha” kechasi',
      ],
      overview:
        'English Day Camp ILM Hubning birinchi yirik loyihasi edi. Oʻttiz nafar talaba butun kunni ingliz tilida oʻtkazdi — networkingdan tortib munozara, workshop va yulduzlar ostidagi yakuniy lagergacha.',
      activities: [
        'Tanishuv va networking',
        'Speaking mock va public speaking',
        'Film vaqti va munozara',
        'Workshop va yakuniy lager',
        'Kechasi yulduzlarni tomosha',
      ],
      outcomes: [
        'Kuchliroq gapirish ishonchi',
        '30 talaba ingliz tili orqali bogʻlandi',
        'Kelajakdagi ILM Hub lagerlari uchun namuna',
      ],
      schedule: [
        { time: '08:30 – 09:00', activity: 'Tanishuv' },
        { time: '09:00 – 10:00', activity: 'Networking' },
        { time: '10:00 – 11:00', activity: 'Speaking Mock' },
        { time: '11:00 – 12:00', activity: 'Public Speaking' },
        { time: '12:00 – 13:00', activity: 'Boʻsh vaqt' },
        { time: '13:00 – 15:00', activity: 'Film vaqti' },
        { time: '15:00 – 17:30', activity: 'Munozara' },
        { time: '17:30 – 18:30', activity: 'Workshop' },
        { time: '18:30 – 19:00', activity: 'Yakuniy lager' },
        { time: '19:30 – 08:30', activity: 'Yulduzlarni tomosha' },
      ],
    },
    {
      ...projects[1],
      title: 'IT Bootcamp',
      summary:
        '2025-yil may oyida IT sohasida ishlayotgan mutaxassislar talabalarni sunʼiy intellekt, Python va frontend dasturlash bilan tanishtirgan bootcamp.',
      description:
        'Sohadan uchta spiker ishtirok etgan IT Bootcamp. Mashgʻulotdan soʻng har bir ishtirokchi Frontend va Backendni oʻrganishni davom ettirish uchun yoʻl xaritasi va kundalik vazifalar oldi.',
      season: '2025-yil bahor',
      date: 'May 2025',
      location: 'Gibrid',
      category: 'Bootcamp',
      highlights: [
        'Uchta IT mutaxassisining chiqishlari',
        'Sunʼiy intellekt, Python va Frontend',
        'Har bir ishtirokchi uchun oʻquv yoʻl xaritasi',
      ],
      overview:
        'IT Bootcamp 2025-yil may oyida boʻlib oʻtdi. IT sohasida ishlayotgan uchta spiker — Elzodxon Sharofaddinov (AISHA AI asoschisi), Asadbek Rahimov (AI muhandisi, Python) va Farrux Adxamov (frontend dasturchi) — qanday oʻrgangani va qanday ishlashi haqida soʻzlab berdi. Mashgʻulotdan soʻng ishtirokchilar Frontend va Backendni mustaqil oʻrganish uchun yoʻl xaritasi va kundalik vazifalar oldi.',
      activities: [
        'Sunʼiy intellekt, Python va Frontend boʻyicha spiker sessiyalari',
        'Frontend va Backend uchun yoʻl xaritasi',
        'Bootcampdan keyingi kundalik oʻquv vazifalari',
      ],
      outcomes: [
        'Aniq Frontend va Backend yoʻl xaritasi',
        'Oʻrganishni davom ettirish uchun kundalik vazifalar',
        'Ishlayotgan IT mutaxassislaridan bevosita maslahat',
      ],
      speakers: [
        { ...projects[1].speakers![0], role: 'AISHA AI asoschisi' },
        { ...projects[1].speakers![1], role: 'AI muhandisi va Python · 6+ yillik tajriba' },
        { ...projects[1].speakers![2], role: 'Frontend dasturchi · 3+ yillik tajriba' },
      ],
    },
    {
      ...projects[2],
      title: 'ILM HUB Camp S3',
      summary:
        'Fargʻonada oʻtgan universitetga kirish lageri — chet elda oʻqish sessiyalari, grantlar boʻyicha maslahat va buni uddalagan insonlarning tajribasi.',
      description:
        'ILM HUB Camp S3 oʻquvchilarga maktabdan keyin nima qilishni aniqlashga yordam berdi: Yevropa va AQShda qanday oʻqish, grantlarni qanday yutish va keyin nimani oʻrganish — buni oʻzi bosib oʻtgan insonlardan.',
      season: 'Universitetga kirish',
      date: 'Noyabr 2025',
      location: 'Offline',
      category: 'Lager',
      highlights: [
        'Study in Europe and USA sessiyalari',
        'Chet el grantlari va El-yurt umidi haqida toʻliq maʼlumot',
        'IT sohasida qizlar uchun imkoniyatlar',
      ],
      overview:
        'ILM HUB Camp S3 (Fargʻona, 2025-yil noyabr) universitetga kirish va maktabdan keyingi qadamga bagʻishlandi. Oʻquvchilar chet elda tahsil olgan insonlardan oʻrgandi: Saidamir Egamberdiev — FLEX’23, Clarkson University talabasi, educateduz.com asoschisi — hamda Gulnoza Xamidova — Aberdeen University bitiruvchisi, Fulbright TEA, ITEC va EYUF gʻolibasi. Sessiyalar orasida networking, oʻyinlar, pizza party va coffee break boʻldi, har bir ishtirokchi sertifikat oldi.',
      activities: [
        'Study in Europe and USA sessiyalari',
        'Chet el grantlari va El-yurt umidi haqida toʻliq maʼlumot',
        'IT sohasida qizlar uchun imkoniyatlar',
        'Networking va oʻyinlar',
        'Pizza party va coffee break',
        'Har bir ishtirokchiga sertifikat',
      ],
      outcomes: [
        'Yevropa va AQShda oʻqish haqida aniq tasavvur',
        'Qaysi grant va stipendiyalarga topshirishni bilish',
        'Kirgan insonlardan amaliy maslahatlar',
      ],
      speakers: [
        {
          ...projects[2].speakers![0],
          role: 'FLEX’23 · Clarkson University talabasi · educateduz.com asoschisi, chet elda tahsil olayotgan koʻplab talabalarning mentori',
        },
        {
          ...projects[2].speakers![1],
          role: 'Aberdeen University bitiruvchisi (Angliya) · Fulbright TEA, ITEC, EYUF gʻolibasi',
        },
      ],
    },
  ],
  stats: [
    { value: 250, suffix: '+', label: 'Oʻzbekiston boʻylab talabalar' },
    { value: 3, suffix: '', label: 'Challenge mavsumlari' },
    { value: 3, suffix: '', label: 'Yirik loyihalar' },
    { value: 4.9, suffix: '★', label: 'Oʻrtacha baho', decimals: 1 },
  ],
  testimonials: [
    {
      name: 'Nargiza Keldiyeva',
      role: '3-mavsum bitiruvchisi',
      seasonId: 'season-3',
      quote:
        'ILM Mode S3 shunchaki loyiha emas edi — men oʻzimni yangidan kashf qildim. “Ertaga qilaman” degan gapni unutdim, bu mening eng katta yutugʻim. 21 kunlik challengeʼdan keyin foydali odatlarga ega boʻldim va vaqtimni oson taqsimlayapman. Juda-juda katta rahmat!',
      rating: 5,
    },
    {
      name: 'Murodbek Tuychiyev',
      role: '3-mavsum ishtirokchisi',
      seasonId: 'season-3',
      quote:
        'Bu loyiha menga nafaqat intizomni mustahkamlash, balki oʻqishga boʻlgan yondashuvimni yanada tizimlashtirish imkonini berdi. Ayniqsa, challenge davomida berilgan takliflar, tasklar va mentorlarning yoʻnalishlari foydali boʻldi. Eng muhimi, ishtirokchilar bir-birini qoʻllab-quvvatlab, oʻz maqsadlari ustida muntazam ishlashmoqda. Meningcha, ILM Mode — shunchaki challenge emas, balki rivojlanish uchun yaxshi muhit.',
      rating: 5,
      link: 'https://www.linkedin.com/posts/murodbektuychiyev_ilm-mode-challenge-haqida-qisqacha-fikrim-activity-7504424112824610816-Da15',
    },
    {
      name: 'Vahhobova Mubinaxon',
      role: '1-mavsum bitiruvchisi',
      seasonId: 'season-1',
      quote:
        'Bu challenge meni 2026-yildagi eng yaxshi versiyam bilan tanishtirdi. Kunimni tartibga solishga va rejalashtirgan ishlarimni bajarishga yordam berdi. Endi intizomli, mehnatkash va aqlli holatdaman — va shu holatda qolishni xohlayman. Eng foydalisi meditatsiya va jismoniy mashqlar boʻldi. Tashkilotchilarga rahmat!',
      rating: 5,
    },
    {
      name: 'Muhammadjonova Mo‘tabarxon',
      role: '1-mavsum bitiruvchisi',
      seasonId: 'season-1',
      quote:
        'Bu challenge meni tartibliroq, diqqatliroq va o‘z-o‘zini boshqaradigan inson qildi. Vaqtimni yaxshiroq boshqarishga va kundalik rejalarga sodiq qolishga undadi. Kundalik o‘qish, o‘zini tahlil qilish va maqsad qo‘yish menga kuch berdi. Tashkilotchilarga chin dildan minnatdorman.',
      rating: 5,
    },
    {
      name: '1-mavsum bitiruvchisi',
      role: '21 kunlik intizom challenge',
      seasonId: 'season-1',
      quote:
        'Ishtirok etganimdan xursandman. Yil boshidan kitob o‘qish odati paydo bo‘ldi — bugun 50 sahifadan ortiq o‘qiyman, ilgari 10 ga ham yetolmasdim. Sport ham kundalik tartibimga kirdi. Kichik kundalik harakatlar katta o‘zgarish qilishini tushundim. Tashkilotchilarga rahmat!',
      rating: 5,
    },
    {
      name: '1-mavsum bitiruvchisi',
      role: '21 kunlik intizom challenge',
      seasonId: 'season-1',
      quote:
        'Bu mening o‘qishimdagi eng birinchi challenge edi — unutilmas lahza va mehnat. Haqiqiy hayotga qarashimni o‘zgartirdi. Qiyin kunlar bo‘ldi, lekin taslim bo‘lmaslikka harakat qildim. Qo‘llab-quvvatlovchi jamoa hammasi. Mentor Hamidullo va tashkilotchilarga, ayniqsa Muhammadumarga katta rahmat!',
      rating: 5,
    },
    {
      name: 'Sammy',
      role: '2-mavsum bitiruvchisi',
      seasonId: 'season-2',
      quote:
        'Mentor va tashkilotchilarga bu challenge uchun katta rahmat. Vaqtimni to‘g‘ri taqsimlashga va intizomliroq bo‘lishga yordam berdi. Mentorga alohida rahmat — suhbatlar ajoyib edi. Yana shunday challenge bo‘lishini umid qilaman.',
      rating: 5,
    },
    {
      name: 'Muhammadaziz',
      role: '2-mavsum bitiruvchisi',
      seasonId: 'season-2',
      quote:
        'Bu challenge meni tartibliroq va intizomliroq qildi. Oson emas edi — ba’zi vazifalar og‘ir tuyuldi. Lekin umuman olganda, izchil qolishga yordam berdi. Har kuni tekshirgan mentorga rahmat. Shu challengening bir qismi ekanimdan xursandman.',
      rating: 5,
    },
    {
      name: 'Oyshaxon',
      role: '2-mavsum ishtirokchisi',
      seasonId: 'season-2',
      quote:
        'Suhrob va Muhammadumarga bu challengeni tashkil qilganlari uchun minnatdorchilik bildiraman. 1-mavsumda ham qatnashganman — ajoyib tajriba edi. Bu mavsum ham zo‘r bo‘ldi. Tugatmasam ham, qimmatli saboqlar oldim. Imtihonlar tufayli diqqatim chalg‘idi, lekin ko‘p narsa o‘rgandim. Hammaga rahmat!',
      rating: 5,
    },
  ],
  challenges: [
    {
      ...challenges[0],
      title: 'ILM Mode Challenge',
      duration: '21 kun',
      category: 'Asosiy',
      description:
        'Diqqatni charxlash, o‘zini boshqarish va kuchliroq versiyangizga o‘sish uchun 21 kunlik intizom challenge. Ishtirokchilar maqsadiga qarab IELTS, SAT, IT (No-coding) yoki Biologiya yo‘nalishlarini tanlaydi.',
      outcomes: [
        '21 kun davomida kundalik vazifalar',
        'Kuzatiladigan faoliyat va hisobdorlik',
        'Yakunlaganda sertifikat',
      ],
    },
  ],
  challengeWeeks: [
    {
      week: '1-sessiya',
      title: 'Ochilish marosimi',
      detail:
        'Google Meet orqali (~80 ishtirokchi). Challenge tanishtiruvi, qoidalar va muzlatuvchi mashgʻulotlar.',
    },
    {
      week: 'Davomida',
      title: 'Mehmon spikerlar',
      detail:
        'Google Meet yoki Telegram orqali (~70–80 ishtirokchi). Ilhomlantiruvchi mehmon spiker sessiyalari.',
    },
    {
      week: 'Haftalik',
      title: 'Haftalik uchrashuvlar',
      detail:
        'Google Meet orqali (~70–80 ishtirokchi). Oʻtgan haftani koʻrib chiqish, qoʻllab-quvvatlash va eng faol ishtirokchini eʼtirof etish.',
    },
    {
      week: 'Final',
      title: 'Yakuniy marosim',
      detail:
        'Google Meet orqali (~60–80 ishtirokchi). 21 kunlik yutuqlarni koʻrib chiqish, sertifikatlar va rasmiy yakun.',
    },
  ],
  seasons: [
    {
      ...seasons[0],
      title: '2-mavsum',
      period: 'Fevral – Mart 2026',
      description:
        'Haqiqatan intizomli boʻlishni xohlagan talabalar uchun tanlovli mavsum — ularning 75% bitirdi.',
      story:
        '2-mavsum ongli ravishda tanlovli boʻldi. Biz intizomli boʻlishga sodiq ishtirokchilarni tanladik. Kundalik vazifalar, mentoring va hisobdorlik orqali ularning 75% bitirdi — 21 kunda haqiqiy oʻzgarish mumkinligini isbotladi.',
      highlights: [
        'Ehtiyotkorlik bilan tanlangan ishtirokchilar',
        '75% yakunlash darajasi',
        'Kundalik mentoring va check-inlar',
        '21 kunlik diqqatli odat qurish',
      ],
    },
    {
      ...seasons[1],
      title: '1-mavsum — Boshlanish',
      period: 'Yanvar 2026',
      description:
        'Birinchi challenge mavsumimiz — ishtirokchilarning 70% intizomli oʻrganuvchi sifatida bitirdi.',
      story:
        '2026-yil yanvarida ILM Hub birinchi Intizom Challengeʼini oʻtkazdi. Oʻzbekiston boʻylab talabalar yaxshi odatlar qurishga kirishdi va ularning 70% bitirdi — niyat va izchillik bilan haqiqiy oʻzgarish mumkinligini koʻrsatdi.',
      highlights: [
        'Birinchi guruhimiz',
        '70% yakunlash darajasi',
        'Kundalik oʻqish, sport va refleksiya',
        'Mentoring va jamiyat qoʻllab-quvvatlashi',
      ],
    },
  ],
  gallery: defaultSiteContent.gallery.map((g, i) => ({
    ...g,
    label: ['Sertifikat topshirish marosimi', 'Sertifikatli bitiruvchilar'][i] ?? g.label,
  })),
}


export const defaultLocalizedContent: LocalizedSiteContent = {
  en: defaultSiteContent,
  uz: defaultSiteContentUz,
}


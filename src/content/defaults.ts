import {
  challenges,
  challengeWeeks,
  events,
  projects,
  seasons,
  stats,
} from '../data/content'
import { teamLeads, teamMembers } from '../data/team'
import { testimonials } from '../data/testimonials'
import type { SiteContent, LocalizedSiteContent } from './types'

export const defaultSiteContent: SiteContent = {
  hero: {
    line1: 'Learn.',
    line2: 'Build.',
    line3: 'Inspire.',
    subtitle:
      'A community across Uzbekistan where students build discipline through 21-day challenges, real projects, and shared growth.',
    backgroundImage:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
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
  events: structuredClone(events),
  challenges: structuredClone(challenges),
  challengeWeeks: structuredClone(challengeWeeks),
  seasons: structuredClone(seasons),
  gallery: [
    {
      id: 'gallery-1',
      type: 'photos',
      src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      label: 'Study session',
    },
    {
      id: 'gallery-2',
      type: 'ceremonies',
      src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c6a?auto=format&fit=crop&w=800&q=80',
      label: 'Graduation',
    },
    {
      id: 'gallery-3',
      type: 'photos',
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      label: 'Team collab',
    },
    {
      id: 'gallery-4',
      type: 'ceremonies',
      src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      label: 'Opening night',
    },
    {
      id: 'gallery-5',
      type: 'photos',
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      label: 'Community',
    },
  ],
}

/** Starter Uzbek (Latin) copy — media URLs shared with English defaults. */
export const defaultSiteContentUz: SiteContent = {
  hero: {
    line1: 'Oʻrgan.',
    line2: 'Yarat.',
    line3: 'Ilhomlantir.',
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
      bio: 'ILM Hub vizyonini boshqaradi — Telegram postlaridan lagerlar va challengesgacha, Oʻzbekiston boʻylab talabalarga intizom qurishda yordam beradi.',
    },
    {
      name: teamLeads[1]!.name,
      role: 'Loyiha menejeri',
      photo: teamLeads[1]!.photo,
      lead: true,
      bio: 'ILM Hub dasturlari va operatsiyalarini boshqaradi, har bir mavsumni rejalashtirishdan bitirishgacha qoʻllab-quvvatlaydi.',
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
        'Talabalarni raqamli koʻnikmalar va jamoaviy yaratishga tanishtiruvchi amaliy texnologiya bootcampi.',
      description:
        'Talabalar raqamli vositalar, asosiy IT koʻnikmalar va jamoaviy ishni amaliy sessiyalar va mini-loyihalar orqali oʻrgangan IT Bootcamp.',
      season: '2-mavsum',
      date: '2024',
      location: 'Gibrid',
      category: 'Bootcamp',
      highlights: [
        'Amaliy texnologiya workshopʼlari',
        'Jamoaviy mini-loyihalar',
        'Mentor boshchiligidagi sessiyalar',
      ],
      overview:
        'IT Bootcamp ILM Hub talabalarini amaliy texnologiya tajribasiga olib keldi. Workshopʼlar va mini-loyihalar orqali ishtirokchilar asosiy raqamli koʻnikmalarni qurdilar va jamoa boʻlib ishlashni oʻrgandilar.',
      activities: [
        'Orientatsiya va maqsad belgilash',
        'Raqamli savodxonlik workshopʼlari',
        'Qoʻllanmali amaliy mashq',
        'Jamoaviy mini-loyiha',
        'Demo kuni va fikr-mulohaza',
      ],
      outcomes: [
        'Amaliy texnologiya asoslari',
        'Yakunlangan jamoaviy mini-loyihalar',
        'Kuchliroq hamkorlik koʻnikmalari',
      ],
    },
    {
      ...projects[2],
      title: 'ILM HUB Camp S3',
      summary:
        '3-mavsum uchun toʻliq jamiyat lageri — challengeʼdan tashqari oʻrganish, doʻstlik va oʻsish.',
      description:
        'ILM HUB Camp S3 3-mavsum ishtirokchilarini workshopʼlar, faoliyatlar va jamiyat bogʻlanishi uchun birlashtirdi.',
      season: '3-mavsum',
      date: '2025',
      location: 'Offline',
      category: 'Lager',
      highlights: [
        'Workshopʼlar va jamoaviy faoliyatlar',
        'Jamiyatni mustahkamlash sessiyalari',
        '3-mavsum bayram lahzalari',
      ],
      overview:
        'ILM HUB Camp S3 3-mavsum uchun muhim jamiyat loyihasi edi. 21 kunlik challengeʼdan alohida, lager talabalarga birga oʻrganish, doʻstlik qurish va oʻsishni nishonlash imkonini berdi.',
      activities: [
        'Ochilish marosimi va kutib olish',
        'Koʻnikma workshopʼlari va guruhlar',
        'Jamoaviy challengeʼlar va oʻyinlar',
        'Refleksiya doiralari',
        'Yakuniy bayram',
      ],
      outcomes: [
        'Chuqurroq jamiyat bogʻlanishi',
        'Esdalik 3-mavsum bosqichi',
        'Keyingi lagerlar uchun ilhom',
      ],
    },
  ],
  stats: [
    { value: 250, suffix: '+', label: 'Oʻzbekiston boʻylab talabalar' },
    { value: 2, suffix: '', label: 'Challenge mavsumlari' },
    { value: 3, suffix: '', label: 'Yirik loyihalar' },
    { value: 4.9, suffix: '★', label: 'Oʻrtacha baho', decimals: 1 },
  ],
  testimonials: [
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
  events: [
    {
      ...events[0],
      title: 'Ochilish marosimi',
      date: 'Challenge boshi',
      time: 'Online',
      type: 'Marosim',
      location: 'Google Meet · ~80 kishi',
      description:
        'Challenge bilan tanishuv, qoidalar tushuntiriladi va muzlatuvchi mashgʻulotlar.',
    },
    {
      ...events[1],
      title: 'Mehmon spikerlar',
      date: 'Challenge davomida',
      time: 'Online',
      type: 'Suhbat',
      location: 'Google Meet / Telegram · ~70–80 kishi',
      description:
        'Ishtirokchilarni ilhomlantirish va yoʻnaltirish uchun mehmon spiker sessiyalari.',
    },
    {
      ...events[2],
      title: 'Haftalik uchrashuvlar',
      date: 'Har hafta',
      time: 'Online',
      type: 'Uchrashuv',
      location: 'Google Meet · ~70–80 kishi',
      description:
        'Oʻtgan haftani koʻrib chiqish, qiyinchilikka duch kelganlarni qoʻllab-quvvatlash va eng faol ishtirokchini eʼtirof etish.',
    },
    {
      ...events[3],
      title: 'Yakuniy marosim',
      date: 'Challenge oxiri',
      time: 'Online',
      type: 'Marosim',
      location: 'Google Meet · ~60–80 kishi',
      description:
        '21 kunlik natijalarni koʻrib chiqish, eng yaxshi ishtirokchilarni eʼtirof etish, sertifikatlar va yakuniy yopilish.',
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
        'Haqiqatan intizomli boʻlishni xohlagan 20 nafar tanlab olingan ishtirokchi — 15 nafari bitirdi.',
      story:
        '2-mavsum ongli ravishda tanlovli boʻldi. Biz intizomli boʻlishga sodiq 20 ishtirokchini tanladik. Kundalik vazifalar, mentoring va hisobdorlik orqali 15 bitiruvchi 21 kunda haqiqiy oʻzgarish boʻlishini isbotladi.',
      highlights: [
        '20 nafar ehtiyotkorlik bilan tanlangan ishtirokchi',
        '15 nafar intizomli bitiruvchi',
        'Kundalik mentoring va check-inlar',
        '21 kunlik diqqatli odat qurish',
      ],
    },
    {
      ...seasons[1],
      title: '1-mavsum — Boshlanish',
      period: 'Yanvar 2026',
      description:
        'Birinchi challenge mavsumimiz — 40 ishtirokchi, 28 bitiruvchi intizomli oʻrganuvchi ekanligini isbotladi.',
      story:
        '2026-yil yanvarida ILM Hub birinchi Intizom Challengeʼini oʻtkazdi. Qirq talaba yaxshi odatlar qurishga kirishdi. Yigirma sakkiz nafari bitirdi — niyat va izchillik bilan haqiqiy oʻzgarish mumkinligini koʻrsatdi.',
      highlights: [
        'Birinchi guruhda 40 ishtirokchi',
        '28 intizomli bitiruvchi',
        'Kundalik oʻqish, sport va refleksiya',
        'Mentoring va jamiyat qoʻllab-quvvatlashi',
      ],
    },
  ],
  gallery: defaultSiteContent.gallery.map((g, i) => ({
    ...g,
    label: [
      'Oʻqish sessiyasi',
      'Bitirish',
      'Jamoa ishi',
      'Ochilish kechasi',
      'Jamiyat',
    ][i] ?? g.label,
  })),
}


export const defaultLocalizedContent: LocalizedSiteContent = {
  en: defaultSiteContent,
  uz: defaultSiteContentUz,
}


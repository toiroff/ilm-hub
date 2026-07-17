export type Testimonial = {
  name: string
  role: string
  quote: string
  seasonId: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Vahhobova Mubinaxon',
    role: 'Season 1 Graduate',
    seasonId: 'season-1',
    quote:
      'This challenge introduced me to my best version in 2026. It helped me organise my day and do the things I had planned. Now I am in the best frame of being disciplined, hardworking and smart — and I hope I won’t leave this frame. The most beneficial things were meditation and physical exercise. Bunch of thanks to the organisers for inspiring us to spend our year in a useful way.',
    rating: 5,
  },
  {
    name: 'Muhammadjonova Mo‘tabarxon',
    role: 'Season 1 Graduate',
    seasonId: 'season-1',
    quote:
      'This challenge helped me become a more organized, focused, and self-disciplined person. It encouraged me to manage my time better and stay consistent with my daily plans. Daily reading, self-reflection, and goal planning improved me mentally and kept me motivated. I’m truly grateful to the organizers for inspiring us to use our time wisely.',
    rating: 5,
  },
  {
    name: 'Season 1 Graduate',
    role: '21-Day Discipline Challenge',
    seasonId: 'season-1',
    quote:
      'I am glad I participated. I developed the habit of reading books from the beginning of the year — today I read more than 50 pages, while before I couldn’t even reach 10. Exercising also became part of my routine. My days didn’t go by without doing anything, and I learned that small daily actions make a big difference. Thank you to everyone who organized this challenge.',
    rating: 5,
  },
  {
    name: 'Season 1 Graduate',
    role: '21-Day Discipline Challenge',
    seasonId: 'season-1',
    quote:
      'This was the very first challenge of my studies — full of unforgettable moments and hard work. It truly changed my perspective on real life. There were tough days, but I tried not to give up. Having a supportive team makes all the difference. Huge thanks to mentor Hamidullo and the organizers — special thanks to Muhammadumar. Looking forward to future challenges!',
    rating: 5,
  },
  {
    name: 'Sammy',
    role: 'Season 2 Graduate',
    seasonId: 'season-2',
    quote:
      'Thank you so much to the mentor and organizers for this kind of challenge. It really helped me finally allocate my time properly and be more disciplined. Special thanks to the mentor — it was awesome to spend time and have long conversations. Hope there will be another challenge like this.',
    rating: 5,
  },
  {
    name: 'Muhammadaziz',
    role: 'Season 2 Graduate',
    seasonId: 'season-2',
    quote:
      'This challenge helped me become more organized and more disciplined. I can’t say it was easy — at some points I suffered and felt anxious because some tasks felt heavy. But overall, it really helped me stay consistent. Bunch of thanks to the mentor for checking me every day. I’m really glad to be part of this challenge.',
    rating: 5,
  },
  {
    name: 'Oyshaxon',
    role: 'Season 2 Participant',
    seasonId: 'season-2',
    quote:
      'I would like to express my gratitude to Suhrob and Muhammadumar for organizing this challenge. Having participated in the first season as well, I can say it was an excellent experience. This season was equally wonderful. Even though I didn’t finish it, I gained valuable lessons and I’m happy to have been a part of it. Due to upcoming exams I couldn’t stay focused, but I’ve learned a lot. Thank you for everything.',
    rating: 5,
  },
]

export const weekOneWins = [
  'Became more sociable and confident',
  'Built a daily reading habit',
  'Exercised consistently',
  'Developed awareness of the present moment',
  'Learned something new every day',
  'Completed tasks without skipping',
  'Significantly reduced screen time',
]

export function getTestimonialsBySeason(seasonId: string) {
  return testimonials.filter((t) => t.seasonId === seasonId)
}

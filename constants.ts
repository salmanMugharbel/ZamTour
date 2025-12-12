import { Destination, Tip, Category } from './types';

export const DESTINATIONS: Destination[] = [
  { id: '1', name: "Green Bazaar", cat: "Shopping", rating: 4.8, reviews: 1240, img: "https://images.unsplash.com/photo-1572099352723-933df70c2242?q=80&w=500&auto=format&fit=crop" },
  { id: '2', name: "Issyk Lake", cat: "Outdoors", rating: 4.9, reviews: 850, img: "https://images.unsplash.com/photo-1552656967-7a02011b6138?q=80&w=500&auto=format&fit=crop" },
  { id: '3', name: "Butakovka Gorge", cat: "Outdoors", rating: 4.7, reviews: 420, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop" },
  { id: '4', name: "Kok Tobe Park", cat: "Culture", rating: 4.6, reviews: 3100, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500&auto=format&fit=crop" },
  { id: '5', name: "Mega Center", cat: "Shopping", rating: 4.5, reviews: 5200, img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce9?q=80&w=500&auto=format&fit=crop" },
  { id: '6', name: "Grand Park", cat: "Shopping", rating: 4.4, reviews: 2100, img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=500&auto=format&fit=crop" },
  { id: '7', name: "Esentai Mall", cat: "Shopping", rating: 4.9, reviews: 900, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500&auto=format&fit=crop" },
  { id: '8', name: "Shymbulak Mountains", cat: "Outdoors", rating: 5.0, reviews: 4500, img: "https://images.unsplash.com/photo-1596527878345-42d4a515f400?q=80&w=500&auto=format&fit=crop" },
  { id: '9', name: "Medeu Ice Rink", cat: "Outdoors", rating: 4.8, reviews: 3800, img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=500&auto=format&fit=crop" },
  { id: '10', name: "Kolsai Lake", cat: "Essentials", rating: 5.0, reviews: 2200, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500&auto=format&fit=crop" },
  { id: '11', name: "Oi Qaragai Resort", cat: "Essentials", rating: 4.8, reviews: 950, img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=500&auto=format&fit=crop" },
  { id: '12', name: "Big Almaty Lake", cat: "Essentials", rating: 4.9, reviews: 5000, img: "https://images.unsplash.com/photo-1549643276-fbc2bd874326?q=80&w=500&auto=format&fit=crop" },
  { id: '13', name: "Strawberry Farm", cat: "Outdoors", rating: 4.8, reviews: 200, img: "/images/bezdn-oil-strawberry-farm/image-1.jpg" }
];

export const TIPS: Tip[] = [
  { icon: 'solar:dollar-minimalistic-bold-duotone', title: 'Currency — Tenge (KZT)', text: 'You’ll need it for daily purchases; some small shops don’t accept cards.' },
  { icon: 'solar:chat-round-bold-duotone', title: 'Language — Kazakh & Russian', text: 'English is limited; simple phrases or a translator app will help a lot.' },
  { icon: 'solar:plug-circle-bold-duotone', title: 'Electricity — 220V Type C/F', text: 'US type adapters needed. Bring a travel adapter.' },
  { icon: 'solar:ambulance-bold-duotone', title: 'Emergency Numbers', text: 'Remember 102 for police and 103 for ambulance.' },
  { icon: 'solar:taxi-bold-duotone', title: 'Yandex Go (Transportation)', text: 'The best and cheapest taxi option without overcharging.' },
  { icon: 'solar:card-bold-duotone', title: 'ONAY Transport Card', text: 'Makes using the metro and buses easier and saves you time.' },
  { icon: 'solar:sim-card-bold-duotone', title: 'Local SIM (Beeline, Tele2)', text: 'Fast and affordable internet; essential for maps.' },
];

export const CATEGORIES: Category[] = [
  { id: 'All', name: 'All Places', icon: 'solar:stars-minimalistic-bold' },
  { id: 'Essentials', name: 'Essentials', icon: 'solar:star-bold' },
  { id: 'Outdoors', name: 'Outdoors', icon: 'solar:mountains-bold' },
  { id: 'Shopping', name: 'Shopping', icon: 'solar:bag-heart-bold' },
  { id: 'Culture', name: 'Culture & Museums', icon: 'solar:gallery-bold' },
];

export const PLACE_GALLERIES: { [key: string]: string[] } = {
  '1': [ // Green Bazaar
    "https://images.unsplash.com/photo-1572099352723-933df70c2242?q=80&w=500&auto=format&fit=crop",
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Almaty_Zelenyi_Bazar_2.jpg",
    "https://visitalmaty.kz/img/objects/zelenyy-bazar_1.jpg"
  ],
  '2': [ // Issyk Lake
    "https://images.unsplash.com/photo-1552656967-7a02011b6138?q=80&w=500&auto=format&fit=crop",
    "https://upload.wikimedia.org/wikipedia/commons/9/94/Issyk_Lake.jpg",
    "https://pbs.twimg.com/media/FMBqf_IXoAM9P-6.jpg"
  ],
  '3': [ // Butakovka
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
    "https://i.ytimg.com/vi/1_1y1y1y1y1/maxresdefault.jpg",
    "https://visitalmaty.kz/img/objects/butakovskoe-uschele_1.jpg"
  ],
  '4': [ // Kok Tobe
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500&auto=format&fit=crop",
    "https://upload.wikimedia.org/wikipedia/commons/2/23/Kok_Tobe_Tower.jpg",
    "https://koktobe.com/assets/images/about/1.jpg"
  ],
  '5': [ // Mega Center
    "https://images.unsplash.com/photo-1519567241046-7f570eee3ce9?q=80&w=500&auto=format&fit=crop",
    "https://avatars.mds.yandex.net/get-altay/1923723/2a0000016f2c3b3b1c1c1c1c1c1c1c1c1c1c/XXL",
    "https://sxodim.com/uploads/posts/2018/05/15/optim/1526365449_1.jpg"
  ],
  '6': [ // Grand Park
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=500&auto=format&fit=crop",
    "https://grandpark.kz/wp-content/uploads/2019/04/slider-1.jpg",
    "https://grandpark.kz/wp-content/uploads/2019/04/slider-2.jpg"
  ],
  '7': [ // Esentai Mall
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500&auto=format&fit=crop",
    "https://esentaimall.com/storage/app/media/slider/1.jpg",
    "https://esentaimall.com/storage/app/media/slider/2.jpg"
  ],
  '8': [ // Shymbulak
    "https://images.unsplash.com/photo-1596527878345-42d4a515f400?q=80&w=500&auto=format&fit=crop",
    "https://shymbulak.com/images/gallery/1.jpg",
    "https://shymbulak.com/images/gallery/2.jpg"
  ],
  '9': [ // Medeu
    "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=500&auto=format&fit=crop",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Medeu.jpg/1200px-Medeu.jpg",
    "https://visitalmaty.kz/img/objects/vysokogornyy-katok-medeu_1.jpg"
  ],
  '10': [ // Kolsai
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605218439923-d34327734493?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594904976694-871d3780374e?q=80&w=500&auto=format&fit=crop"
  ],
  '11': [ // Oi Qaragai
    "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=500&auto=format&fit=crop",
    "https://oi-qaragai.kz/images/gallery/1.jpg",
    "https://oi-qaragai.kz/images/gallery/2.jpg"
  ],
  '12': [ // Big Almaty Lake
    "https://images.unsplash.com/photo-1549643276-fbc2bd874326?q=80&w=500&auto=format&fit=crop",
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Big_Almaty_Lake.jpg",
    "https://visitalmaty.kz/img/objects/bolshoe-almatinskoe-ozero_1.jpg"
  ],
  '13': [ // Strawberry Farm
    "/images/strawberry-farm/IMG-20251207-WA0077.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0078.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0079.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0080.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0081.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0082.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0083.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0084.jpg",
    "/images/strawberry-farm/IMG-20251207-WA0085.jpg",
    "/images/bezdn-oil-strawberry-farm/image-4.jpg",
    "/images/bezdn-oil-strawberry-farm/image-5.jpg"
  ]
};
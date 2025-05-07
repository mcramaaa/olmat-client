import { Facebook, Instagram, ThumbsUp } from "lucide-react";
import { SiShopee } from "react-icons/si";
import { PiTiktokLogo } from "react-icons/pi";
import { TbBrandShopee } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa6";
// FaTiktok

export const APPCONSTANT = {
  name: "OLMAT UINSA",
  fullName: "Olimpiade Matematika UINSA",
  year: "2025",
  theme: `Numbers beyond time “Reviving the greatness of abbasiyah mathematics in the modern world"`,
  about: {
    desc: "The UINSA Math Olympiad is Indonesias premier mathematics competition, bringing together the brightest young minds from across the nation.",
    item: [
      {
        label: "Tentang OLMAT",
        desc: "Olimpiade Matematika (Olmat) merupakan acara tahunan yang diselenggarakan oleh Program Studi Pendidikan Matematika UIN Sunan Ampel Surabaya. Kegiatan ini ditujukan untuk siswa-siswi dari seluruh Indonesia dalam tiga jenjang pendidikan, yaitu Sekolah Dasar (SD/MI), Sekolah Menengah Pertama (SMP/MTs), dan Sekolah Menengah Atas/Kejuruan (SMA/SMK/MA). Olmat hadir sebagai wadah bagi para pelajar untuk berkompetisi secara sehat, meningkatkan semangat belajar, serta mengembangkan minat dan prestasi di bidang matematika.",
      },
    ],
  },

  socialEcommerce: {
    shopee: {
      name: "Shopee",
      icon: <SiShopee />,
      desc: "Buku Olmat Uinsa",
      username: "",
      item: [
        {
          tumbnail: "/comingSoon.png",
          label: "Buku Olmat Jenjang SD",
          price: 0,
          link: "#",
        },
        {
          tumbnail: "/comingSoon.png",
          label: "Buku Olmat Jenjang SMP",
          price: 0,
          link: "#",
        },
        {
          tumbnail: "/comingSoon.png",
          label: "Buku Olmat Jenjang SMA",
          price: 0,
          link: "#",
        },
      ],
    },
    socialMedia: {
      icon: <ThumbsUp className="h-5 w-5" />,
      name: "Social Media",
      desc: "Ikuti akun Sosial Media kami untuk mendapatkan info terbaru seputar Olimpiade Matematika UINSA!",
      username: "",
      item: [
        {
          icon: <FaInstagram className="text-red-500" />,
          key: "Instagram",
          tumbnail: "/social/comingOut.png",
          caption: "Persiapan Olimpiade Matematika UINSA 2024",
          like: 245,
          view: 417,
          link: "https://www.instagram.com/reel/DJNQostTynO/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
          embedUrl: "https://www.instagram.com/p/DJNQostTynO/embed/",
        },
        {
          icon: <FaInstagram className="text-red-500" />,
          key: "Instagram",
          tumbnail: "/social/teaserIg.png",
          caption: "Tips dan Trik Menghadapi Olimpiade Matematika",
          like: 158,
          view: 318,
          link: "https://www.instagram.com/reel/DJMzNzBPJue/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
          embedUrl: "https://www.instagram.com/p/DJMzNzBPJue/embed/",
        },
        // {
        //   icon: <FaTiktok />,
        //   key: "Tiktok",
        //   tumbnail: "/images/tiktok/video-1.jpg",
        //   caption:
        //     "Persiapan Olimpiade Matematika UINSA 2024 #olmatuinsa #matematika",
        //   like: 1245,
        //   view: 15200,
        //   link: "https://www.tiktok.com/@olmatuinsa/video/7501128312756899090?is_from_webapp=1&sender_device=pc&web_id=7419597193205958162",
        //   embedUrl: "https://www.tiktok.com/embed/v2/7501128312756899090",
        // },
        // {
        //   icon: <FaTiktok />,
        //   key: "Tiktok",
        //   tumbnail: "/images/tiktok/video-2.jpg",
        //   caption:
        //     "Tips Jitu Menghadapi Soal Olimpiade Matematika #olmatuinsa #tipsmatematika",
        //   like: 987,
        //   view: 12400,
        //   link: "https://www.tiktok.com/@olmatuinsa/video/7501131059292081416?is_from_webapp=1&sender_device=pc&web_id=7419597193205958162",
        //   embedUrl: "https://www.tiktok.com/embed/v2/7501131059292081416",
        // },
      ],
    },
  },

  supportEvent: [
    {
      name: "Seminar Nasional",
      img: "/comingSoon.png",
      desc: "Seminar ini menghadirkan narasumber inspiratif yang akan membahas topik menarik seputar dunia pendidikan, matematika, dan teknologi. Selain itu, sesi ini juga akan dipandu oleh MC yang interaktif dan penuh semangat.",
      options: [
        {
          label: "Narasumber",
          value: "Coming Soon",
        },
        {
          label: "Pembawa Acara",
          value: "Coming Soon",
        },
      ],
      registerLink: "",
    },
    {
      name: "Lomba Pidato",
      img: "/comingSoon.png",
      desc: "Tunjukkan kemampuan berbicara di depan umum dan sampaikan gagasan terbaikmu dalam Lomba Pidato OLMAT UINSA! Lomba ini menjadi wadah bagi peserta untuk mengasah kemampuan retorika dan berpikir kritis dengan tema-tema menarik seputar pendidikan dan generasi muda.",
      options: [
        {
          label: "Peserta",
          value: "SD/MI, SMP/MTs, SMA/MA/SMK",
        },
        {
          label: "Tema Pidato",
          value: "The Beauty of Mathematics in Everyday Life",
        },
      ],
      registerLink: "",
    },
    {
      name: "Mobile Legends",
      img: "/comingSoon.png",
      desc: "Bukan hanya otak, tapi juga kerjasama tim yang diuji! Turnamen Mobile Legends hadir untuk kamu yang ingin menunjukkan strategi dan kekompakan dalam dunia e-sports. Siapkan tim terbaikmu dan rebut gelar juara dalam pertandingan yang seru dan kompetitif!",
      options: [
        // {
        //   label: "Peserta",
        //   value: "SD/MI, SMP/MTs, SMA/MA/SMK",
        // },
        {
          label: "Wilayah",
          value: "Surabaya dan sekitarnya",
        },
      ],
      registerLink: "",
    },
  ],

  timelineEvents: [
    {
      date: "12 Mei 2025",
      title: "Pembukaan Pendaftaran",
      description:
        "Pendaftaran OLMAT UINSA 2025 resmi dibuka untuk jenjang MI/SD, MTs/SMP, dan MA/SMA/SMK. Proses pendaftaran dilakukan melalui website resmi​",
    },
    {
      date: "23 Agustus 2025",
      title: "Try Out Gratis",
      description:
        "Pendaftar yang melakukan registrasi antara 12 Mei – 17 Agustus 2025 berhak mengikuti Try Out Gratis pada 23 Agustus 2025.",
    },
    {
      date: "6 September 2025",
      title: "Penutupan Pendaftaran",
      description:
        "Hari terakhir pendaftaran OLMAT UINSA 2025. Peserta harus sudah melengkapi seluruh proses, mulai dari pengisian formulir, pembayaran, hingga konfirmasi.",
    },
    {
      date: "20 September 2025",
      title: "Babak Penyisihan",
      description:
        "Babak pertama olimpiade dilaksanakan online via platform Sibiti dan Zoom Meeting. Peserta terbaik akan dipilih berdasarkan peringkat nasional dan rayon untuk melaju ke babak semifinal​",
    },
    {
      date: "4 Oktober 2025",
      title: "Babak Semifinal",
      description:
        "Peserta yang lolos melanjutkan ke semifinal dengan sistem pengawasan ketat (double device). Peringkat 10 terbaik tiap jenjang berhak maju ke babak final",
    },
    {
      date: "18 Oktober 2025",
      title: "Babak Final",
      description:
        "Final diadakan secara luring (offline) di Fakultas Tarbiyah dan Keguruan UINSA Surabaya. Tahapan Tes tulis & Presentasi",
    },
  ],

  footer: {
    mainWhatsApp: "6289520537559",
    registerWhatsApp: "6289520537559",
    email: "olimpiadematematikauinsa@gmail.com",
    socialMedia: [
      {
        name: "Instagram",
        icon: <Instagram />,
        link: "#",
      },
      {
        name: "Tiktok",
        icon: <PiTiktokLogo />,
        link: "#",
      },
      {
        name: "Facebook",
        icon: <Facebook />,
        link: "#",
      },
    ],
    shopee: {
      icon: <TbBrandShopee />,
      link: "#",
    },
  },
};

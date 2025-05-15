import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OLMAT UINSA – Olimpiade Matematika Nasional UIN Sunan Ampel Surabaya",
  description:
    "Ikuti OLMAT UINSA 2025 – Olimpiade Matematika Nasional dari UIN Sunan Ampel Surabaya. Daftar online, cek jadwal, dan raih prestasi terbaikmu!",
};

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About the Math Olympiad
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed">
            Learn more about the International Mathematics Olympiad 2025
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-gray-600">
            The International Mathematics Olympiad (IMO) is dedicated to
            discovering, encouraging, and challenging mathematically gifted
            young people from around the world. Our mission is to foster
            mathematical creativity and promote the development of mathematical
            talent through competitive problem-solving.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">History</h2>
          <p className="text-gray-600">
            The IMO is the oldest and most prestigious international scientific
            olympiad for high school students. The first IMO was held in Romania
            in 1959 with 7 countries participating. Today, more than 100
            countries from 5 continents participate, representing over 90% of
            the world&apos;s population.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Competition Format</h2>
          <p className="text-gray-600">
            The competition consists of two days of written examinations, with
            three problems to be solved each day. Each problem is worth 7
            points, for a maximum total score of 42 points. The problems come
            from various areas of mathematics taught in secondary schools,
            including geometry, number theory, algebra, and combinatorics.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Awards</h2>
          <p className="text-gray-600">
            Participants are ranked based on their individual scores and are
            awarded gold, silver, and bronze medals in the ratio of 1:2:3, with
            about half of the participants receiving a medal. Special prizes may
            also be awarded for particularly elegant or insightful solutions.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Eligibility</h2>
          <p className="text-gray-600">
            The IMO is open to all pre-university students. Contestants must not
            have formally enrolled at a university or any equivalent
            post-secondary institution, and must be under the age of 20 on the
            day of the second contest paper.
          </p>
        </div>
      </div>
    </div>
  );
}

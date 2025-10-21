import Link from "next/link";
import { Award, Music, Users, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          ABOUT JOYNER LUCAS
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl">
          Multi-platinum recording artist, storyteller, and cultural icon.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div className="bg-zinc-900 rounded-lg p-6 text-center">
          <Music size={32} className="mx-auto mb-4 text-red-500" />
          <p className="text-3xl font-bold mb-2">4</p>
          <p className="text-gray-400">Albums</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-6 text-center">
          <Award size={32} className="mx-auto mb-4 text-yellow-500" />
          <p className="text-3xl font-bold mb-2">10+</p>
          <p className="text-gray-400">Awards</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-6 text-center">
          <Users size={32} className="mx-auto mb-4 text-blue-500" />
          <p className="text-3xl font-bold mb-2">5M+</p>
          <p className="text-gray-400">Fans</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-6 text-center">
          <TrendingUp size={32} className="mx-auto mb-4 text-green-500" />
          <p className="text-3xl font-bold mb-2">1B+</p>
          <p className="text-gray-400">Streams</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <div className="aspect-square bg-zinc-900 rounded-lg mb-6 relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Joyner+Lucas"
              alt="Joyner Lucas"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">THE JOURNEY</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Gary Maurice &quot;Joyner&quot; Lucas Jr., known professionally as
              Joyner Lucas, is an American rapper, singer, songwriter, record
              producer, poet, and actor.
            </p>
            <p>
              Born on August 17, 1988, in Worcester, Massachusetts, Joyner has
              become one of the most respected lyricists in hip-hop, known for
              his intricate wordplay, storytelling ability, and
              thought-provoking content.
            </p>
            <p>
              His breakthrough came with tracks like &quot;Ross
              Capicchioni&quot; and &quot;I&apos;m Not Racist,&quot; which
              showcased his ability to tackle complex social issues through
              music.
            </p>
            <p>
              With multiple platinum certifications and collaborations with
              artists like Eminem, Logic, and Chris Brown, Joyner continues to
              push boundaries and inspire fans worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg p-12 mb-20">
        <h2 className="text-4xl font-bold mb-8 text-center">
          DISCOGRAPHY HIGHLIGHTS
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              year: "2020",
              title: "Evolution",
              description:
                "A journey through personal growth and artistic maturity",
            },
            {
              year: "2020",
              title: "ADHD",
              description:
                "Raw and honest exploration of mental health and success",
            },
            {
              year: "2017",
              title: "508-507-2209",
              description: "Breakthrough album showcasing lyrical prowess",
            },
            {
              year: "2015",
              title: "Along Came Joyner",
              description:
                "The project that introduced the world to Joyner Lucas",
            },
          ].map((album, index) => (
            <div
              key={index}
              className="flex gap-6 items-start border-l-4 border-red-600 pl-6 py-2"
            >
              <span className="text-4xl font-bold text-gray-600 min-w-[80px]">
                {album.year}
              </span>
              <div>
                <h3 className="text-2xl font-bold mb-2">{album.title}</h3>
                <p className="text-gray-400">{album.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">SUPPORT THE MOVEMENT</h2>
        <p className="text-gray-400 mb-8">
          Get exclusive merchandise and music from the official store
        </p>
        <Link
          href="/shop"
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition border-2 border-black"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}

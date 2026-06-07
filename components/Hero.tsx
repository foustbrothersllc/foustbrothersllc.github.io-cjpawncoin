import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-navy text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
          Rockingham County's Trusted Pawn Shop
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Quality Pre-Owned.
          <br />
          <span className="text-gold">Honestly Priced.</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Browse our inventory of electronics, games, instruments, jewelry, tools, and collectibles — all inspected and fairly priced.
        </p>
        <Link
          href="#shop"
          className="inline-block bg-gold text-navy font-bold text-lg px-10 py-4 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </section>
  )
}

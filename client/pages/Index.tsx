export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Full Height Image and Overlay */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fae2a014372bf423c820f388035b17757?format=webp&width=800"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
          {/* Logo */}
          <div className="mb-12 animate-fade-in">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F9b9fe333925c45958af92d68622d968d?format=webp&width=800"
              alt="Logo Ecko"
              className="h-20 md:h-24 lg:h-28 w-auto mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 max-w-6xl leading-[1.1] tracking-tight animate-slide-up">
            <span className="block mb-2">Seja um Lojista Oficial</span>
            <span className="block text-primary drop-shadow-lg">Ecko</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 text-white/95">e Lucre com uma das Maiores Marcas do Brasil</span>
          </h1>

          {/* Subtitle/Call Text */}
          <p className="text-base md:text-lg lg:text-xl text-white/95 mb-10 max-w-4xl leading-relaxed font-medium px-4 animate-fade-in">
            Ao se tornar um lojista oficial Ecko, você garante acesso a <span className="text-primary font-semibold">produtos exclusivos</span>, <span className="text-primary font-semibold">condições comerciais privilegiadas</span> e todo o prestígio de uma das marcas mais fortes e respeitadas do mercado brasileiro.
          </p>

          {/* Call to Action Button */}
          <button className="bg-primary hover:bg-red-600 text-white px-12 py-6 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-primary hover:border-red-600 animate-fade-in uppercase tracking-wide">
            🚀 Seja um Lojista Oficial
          </button>
        </div>
      </section>
    </div>
  );
}

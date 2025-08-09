export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Full Height Image and Overlay */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fae2a014372bf423c820f388035b17757?format=webp&width=800"
          alt="Lojistas Ecko - Parceiros de Sucesso da Maior Marca de Streetwear do Brasil"
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
              alt="Logo Ecko Unltd - Marca de Streetwear e Moda Urbana Brasileira"
              className="h-20 md:h-24 lg:h-28 w-auto mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 max-w-6xl leading-[1.1] tracking-tight animate-slide-up">
            <span className="block mb-2">Seja Lojista Oficial</span>
            <span className="block text-primary drop-shadow-lg">Ecko</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 text-white/95">Maior Marca de Streetwear do Brasil</span>
          </h1>

          {/* Subtitle/Call Text */}
          <p className="text-base md:text-lg lg:text-xl text-white/95 mb-10 max-w-3xl leading-relaxed font-medium px-4 animate-fade-in">
            Acesso a <span className="text-primary font-semibold">produtos exclusivos</span>, <span className="text-primary font-semibold">margens atrativas</span> e todo o prestígio da marca líder em streetwear.
          </p>

          {/* Call to Action Button */}
          <button className="bg-primary hover:bg-red-600 text-white px-12 py-6 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-primary hover:border-red-600 animate-fade-in uppercase tracking-wide">
            Seja Parceiro Ecko Oficial
          </button>
        </div>
      </section>

      {/* 4 Reasons Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                4 Motivos Para Se Tornar
                <span className="block text-primary">Lojista Ecko Oficial</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Descubra as vantagens exclusivas de fazer parte da nossa rede de parceiros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reason 1 */}
              <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Produtos Exclusivos</h3>
                  <p className="text-muted-foreground">
                    Acesso prioritário às coleções limitadas e lançamentos exclusivos da marca.
                  </p>
                </div>
              </div>

              {/* Reason 2 */}
              <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Margens Atrativas</h3>
                  <p className="text-muted-foreground">
                    Condições comerciais privilegiadas com margens competitivas no mercado.
                  </p>
                </div>
              </div>

              {/* Reason 3 */}
              <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Suporte Completo</h3>
                  <p className="text-muted-foreground">
                    Treinamento, materiais de marketing e suporte técnico especializado.
                  </p>
                </div>
              </div>

              {/* Reason 4 */}
              <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Prestígio da Marca</h3>
                  <p className="text-muted-foreground">
                    Associe-se à marca líder em streetwear e potencialize seu negócio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

      {/* 5 Reasons Section - Redesigned */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground">
                Por Que Escolher a
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Ecko?
                </span>
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                5 vantagens que fazem a diferença no seu negócio
              </p>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              <style jsx>{`
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {/* Reason 1 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[300px] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Produtos Exclusivos</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Acesso prioritário às coleções limitadas e lançamentos exclusivos que só lojistas oficiais possuem.
                  </p>
                </div>
              </div>

              {/* Reason 2 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[300px] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Margens Atrativas</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Condições comerciais privilegiadas com margens competitivas que garantem maior lucratividade.
                  </p>
                </div>
              </div>

              {/* Reason 3 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[300px] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Suporte Completo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Treinamento especializado, materiais de marketing e suporte técnico dedicado para seu sucesso.
                  </p>
                </div>
              </div>

              {/* Reason 4 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[300px] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Prestígio da Marca</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Associe-se à marca líder em streetwear e potencialize seu negócio com credibilidade reconhecida.
                  </p>
                </div>
              </div>

              {/* Reason 5 - New */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[300px] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Crescimento Acelerado</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Estratégias comprovadas de vendas e marketing para acelerar o crescimento do seu negócio.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <button className="bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white px-12 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Quero Ser Parceiro Agora
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

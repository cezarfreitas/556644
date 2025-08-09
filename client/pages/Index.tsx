import { MdStar, MdAttachMoney, MdHeadset, MdWorkspacePremium } from "react-icons/md";

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
                4 vantagens que fazem a diferença no seu negócio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Reason 1 */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdStar className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Produtos Exclusivos</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Acesso prioritário às coleções limitadas, lançamentos exclusivos e produtos especiais que apenas lojistas oficiais têm direito. Seja o primeiro a oferecer as novidades para seus clientes.
                </p>
              </div>

              {/* Reason 2 */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdAttachMoney className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Margens Atrativas</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Condições comerciais privilegiadas com margens competitivas e flexibilidade de pagamento. Maximizamos sua lucratividade com preços especiais para parceiros oficiais.
                </p>
              </div>

              {/* Reason 3 */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdHeadset className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Suporte Completo</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Treinamento especializado da equipe, materiais de marketing exclusivos, suporte técnico dedicado e consultoria para maximizar suas vendas e crescimento.
                </p>
              </div>

              {/* Reason 4 */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdWorkspacePremium className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Prestígio da Marca</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Associe-se à marca líder em streetwear no Brasil. Credibilidade reconhecida nacionalmente que fortalece seu negócio e atrai mais clientes para sua loja.
                </p>
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

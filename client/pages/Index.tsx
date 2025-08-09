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

      {/* CTA and Form Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-center">

            {/* Text/CTA Column */}
            <div className="space-y-10">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Pronto Para Começar Sua
                  <span className="block text-primary">Parceria com a Ecko?</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                    Faça parte da rede de lojistas oficiais da maior marca de streetwear do Brasil.
                  </p>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                    Nossa equipe comercial entrará em contato em até 24 horas para apresentar as condições exclusivas, sem taxas de adesão e com processo 100% digital.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Solicite Sua Proposta
                  </h3>
                  <p className="text-muted-foreground">
                    Preencha os dados e receba nossa proposta comercial
                  </p>
                </div>

                <form className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nome *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                      WhatsApp *
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Sua loja possui CNPJ? *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="cnpj"
                          value="sim"
                          className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                          required
                        />
                        <span className="text-foreground">Sim</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="cnpj"
                          value="nao-consumidor"
                          className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                          required
                        />
                        <span className="text-foreground">Não, sou consumidor</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-red-600 text-white py-4 rounded-lg font-bold text-lg transition-colors duration-300 mt-6"
                  >
                    Receber Proposta Comercial
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ao enviar, você concorda em receber contato comercial da Ecko.
                    Seus dados estão seguros conosco.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Reasons Section - Redesigned */}
      <section className="py-20 md:py-32 relative bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fab7e336ecd0049c1ab9a4a470767e70c?format=webp&width=800"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground">
                Por Que Escolher a <span className="text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">Ecko?</span>
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

      {/* Photo Gallery Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground">
                Galeria de
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Fotos
                </span>
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Conheça o estilo e qualidade dos produtos Ecko
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Photo 1 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F6577c7f909a3482fa2cc99ca61e47c4a?format=webp&width=800"
                  alt="Coleção Ecko Streetwear"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 2 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fbe84a66a323540cea5c55c8df2ad8c0d?format=webp&width=800"
                  alt="Estilo Urbano Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 3 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F091edb31ccad491c905e05fbe6529ab1?format=webp&width=800"
                  alt="Moda Urbana Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 4 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F69e215b8632349e598a5da5645fa733f?format=webp&width=800"
                  alt="Streetwear Premium Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 5 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F2a63b4e4f9f541b7a0de23a2e4bc90b8?format=webp&width=800"
                  alt="Lifestyle Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 6 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fb7e252c481ba4795bb62418a495e2670?format=webp&width=800"
                  alt="Produtos Exclusivos Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 7 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F3f050f338bf04bd9872cb5d5499ebce5?format=webp&width=800"
                  alt="Coleção Completa Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 8 */}
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fc5057fe1f9e54153b64262cb22bd8dc4?format=webp&width=800"
                  alt="Qualidade Premium Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-lg text-muted-foreground mb-6">
                Veja a qualidade e estilo que seus clientes vão amar
              </p>
              <button className="bg-primary hover:bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300">
                Quero Revender Ecko
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

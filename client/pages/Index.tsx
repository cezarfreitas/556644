import { MdStar, MdAttachMoney, MdHeadset, MdWorkspacePremium } from "react-icons/md";
import { FaFacebook, FaInstagram, FaStore } from "react-icons/fa";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Landing Page Principal */}
      <header className="relative h-screen w-full overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fae2a014372bf423c820f388035b17757?format=webp&width=800"
          alt="Lojistas Ecko Oficiais - Maior Marca de Streetwear do Brasil"
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
              alt="Logo Ecko - Líder em Streetwear e Moda Urbana no Brasil"
              className="h-20 md:h-24 lg:h-28 w-auto mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Main Heading - H1 for SEO */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 max-w-6xl leading-[1.1] tracking-tight animate-slide-up">
            <span className="block mb-2">Seja Lojista Oficial</span>
            <span className="block text-primary drop-shadow-lg">Ecko</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 text-white/95">Maior Marca de Streetwear do Brasil</span>
          </h1>

          {/* Subtitle/Call Text */}
          <p className="text-base md:text-lg lg:text-xl text-white/95 mb-10 max-w-3xl leading-relaxed font-medium px-4 animate-fade-in">
            Acesso a <span className="text-primary font-semibold">produtos exclusivos</span>, <span className="text-primary font-semibold">margens atrativas</span> e todo o prestígio da marca líder em streetwear brasileiro.
          </p>

          {/* Call to Action Button */}
          <a href="#cadastro-lojistas" className="inline-block bg-primary hover:bg-red-600 text-white px-12 py-6 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-primary hover:border-red-600 animate-fade-in uppercase tracking-wide">
            Seja Parceiro Ecko Oficial
          </a>
        </div>
      </header>

      {/* Cadastro de Lojistas - Formulário de Parceria */}
      <section className="py-20 md:py-32 bg-black" id="cadastro-lojistas">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-center">

            {/* Text/CTA Column */}
            <div className="space-y-10">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Cadastre-se Como Lojista Oficial
                  <span className="block text-primary">Ecko Agora</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                    Faça parte da rede de distribuidores oficiais da maior marca de streetwear e moda urbana do Brasil.
                  </p>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                    Resposta comercial em até 24 horas. Processo 100% digital, sem taxas de adesão. Condições exclusivas para lojistas parceiros.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Solicite Sua Proposta Comercial
                  </h3>
                  <p className="text-muted-foreground">
                    Preencha o formulário e receba condições exclusivas para lojistas Ecko
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

      {/* Benefícios para Lojistas Ecko */}
      <section className="py-20 md:py-32 relative bg-black" id="beneficios-lojistas">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2Fab7e336ecd0049c1ab9a4a470767e70c?format=webp&width=800"
            alt="Produtos Ecko Streetwear - Qualidade e Estilo"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
                Vantagens de Ser Lojista <span className="text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">Ecko Oficial</span>
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto">
                4 benefícios exclusivos que aumentam a lucratividade do seu negócio de moda urbana
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Reason 1 */}
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdStar className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Produtos Exclusivos</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Acesso prioritário às coleções limitadas, lançamentos exclusivos e produtos especiais que apenas lojistas oficiais têm direito. Seja o primeiro a oferecer as novidades para seus clientes.
                </p>
              </div>

              {/* Reason 2 */}
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdAttachMoney className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Margens Atrativas</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Condições comerciais privilegiadas com margens competitivas e flexibilidade de pagamento. Maximizamos sua lucratividade com preços especiais para parceiros oficiais.
                </p>
              </div>

              {/* Reason 3 */}
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdHeadset className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Suporte Completo</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Treinamento especializado da equipe, materiais de marketing exclusivos, suporte técnico dedicado e consultoria para maximizar suas vendas e crescimento.
                </p>
              </div>

              {/* Reason 4 */}
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdWorkspacePremium className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Prestígio da Marca</h3>
                <p className="text-white/80 text-sm leading-relaxed">
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

      {/* Galeria de Produtos Ecko Streetwear */}
      <section className="py-20 md:py-32 bg-black" id="galeria-produtos">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
                Produtos Ecko
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Streetwear
                </span>
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto">
                Coleções exclusivas de streetwear e moda urbana brasileira com qualidade premium
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
              <p className="text-lg text-white/80 mb-6">
                Produtos de alta qualidade que seus clientes vão amar e comprar
              </p>
              <a href="#cadastro-lojistas" className="inline-block bg-primary hover:bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300">
                Quero Ser Distribuidor Oficial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos de Lojistas Parceiros Ecko */}
      <section className="py-20 md:py-32 bg-black" id="depoimentos-lojistas">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
                Depoimentos de Lojistas
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Ecko Oficiais
                </span>
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto">
                Histórias reais de sucesso de parceiros que triplicaram o faturamento com a Ecko
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="text-2xl">★★★★★</span>
                  </div>
                  <blockquote className="text-lg text-foreground leading-relaxed italic">
                    "Trabalhar com a Ecko foi um divisor de águas para minha loja. As margens são excelentes e os produtos saem rapidamente. Meus clientes sempre perguntam pelos lançamentos da marca."
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Marcos Silva</h4>
                      <p className="text-sm text-muted-foreground">Street Style Store - São Paulo, SP</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="text-2xl">★★★★★</span>
                  </div>
                  <blockquote className="text-lg text-foreground leading-relaxed italic">
                    "O suporte da equipe Ecko é incrível. Eles nos ajudam com materiais de marketing e sempre estão disponíveis para dúvidas. Recomendo para qualquer lojista sério."
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Amanda Costa</h4>
                      <p className="text-sm text-muted-foreground">Urban Fashion - Rio de Janeiro, RJ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="text-2xl">★★★★★</span>
                  </div>
                  <blockquote className="text-lg text-foreground leading-relaxed italic">
                    "Em 2 anos como parceiro Ecko, tripliquei meu faturamento. A marca tem um apelo incrível com o público jovem e as peças têm qualidade excepcional."
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Rafael Oliveira</h4>
                      <p className="text-sm text-muted-foreground">Streetwear BH - Belo Horizonte, MG</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="text-2xl">★★★★★</span>
                  </div>
                  <blockquote className="text-lg text-foreground leading-relaxed italic">
                    "A Ecko transformou minha loja multimarca. Agora somos referência em streetwear na cidade. O processo de se tornar parceiro foi super tranquilo e rápido."
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Carla Santos</h4>
                      <p className="text-sm text-muted-foreground">Fashion Hub - Curitiba, PR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-lg text-white/80 mb-6">
                Junte-se a mais de 500 lojistas parceiros de sucesso
              </p>
              <a href="#cadastro-lojistas" className="inline-block bg-primary hover:bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300">
                Quero Ser o Próximo Parceiro de Sucesso
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* História da Marca Ecko - Líder em Streetwear */}
      <section className="py-20 md:py-32 bg-black" id="sobre-ecko">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                    História da Marca
                    <span className="block text-primary">Ecko</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    Há mais de duas décadas, a Ecko é líder absoluta em streetwear e moda urbana no Brasil. Nascida da cultura de rua, a marca revolucionou o mercado de moda jovem brasileira.
                  </p>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    Com produtos autênticos que refletem a essência do street style brasileiro, a Ecko conquistou milhões de consumidores e se estabeleceu como a maior marca de streetwear do país. Nossos lojistas parceiros fazem parte dessa trajetória de sucesso.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">20+</div>
                    <div className="text-white/80 text-sm">Anos de Mercado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-white/80 text-sm">Lojistas Parceiros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1M+</div>
                    <div className="text-white/80 text-sm">Clientes Satisfeitos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">#1</div>
                    <div className="text-white/80 text-sm">Marca de Streetwear</div>
                  </div>
                </div>
              </div>

              {/* Logo/Brand */}
              <div className="text-center lg:text-right">
                <div className="inline-block">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F9b9fe333925c45958af92d68622d968d?format=webp&width=800"
                    alt="Logo Ecko"
                    className="h-32 md:h-40 lg:h-48 w-auto mx-auto drop-shadow-2xl"
                  />
                  <div className="mt-8 space-y-4">
                    <p className="text-white/60 text-sm italic">
                      "Autenticidade que conecta com a rua"
                    </p>
                    <div className="w-16 h-0.5 bg-primary mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-background py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* Brand Section */}
              <div className="space-y-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F9b9fe333925c45958af92d68622d968d?format=webp&width=800"
                    alt="Logo Ecko - Marca de Streetwear"
                    className="h-12 w-auto"
                  />
                  <span className="text-2xl font-bold">Ecko</span>
                </div>
                <p className="text-background/80 leading-relaxed">
                  A maior marca de streetwear do Brasil. Conectando a cultura urbana através da moda autêntica.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                    <FaFacebook className="text-lg text-background/80 group-hover:text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                    <FaInstagram className="text-lg text-background/80 group-hover:text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                    <FaStore className="text-lg text-background/80 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-background/20 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-background/60 text-sm">
                  © 2024 Ecko. Todos os direitos reservados.
                </div>
                <div className="flex space-x-6 text-sm">
                  <a href="#" className="text-background/60 hover:text-primary transition-colors">Privacidade</a>
                  <a href="#" className="text-background/60 hover:text-primary transition-colors">Termos</a>
                  <a href="#" className="text-background/60 hover:text-primary transition-colors">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

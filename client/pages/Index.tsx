export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg"></div>
              <span className="text-xl font-semibold text-foreground">Brand</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  Coming Soon
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                  Your Vision
                  <span className="block text-muted-foreground">Starts Here</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  A blank canvas ready to be transformed into something extraordinary.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-2xl mx-auto"></div>
                <h3 className="text-xl font-semibold text-foreground">Ready to Build</h3>
                <p className="text-muted-foreground">Clean foundation ready for your content and ideas.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-2xl mx-auto"></div>
                <h3 className="text-xl font-semibold text-foreground">Modern Design</h3>
                <p className="text-muted-foreground">Fresh, contemporary styling with thoughtful details.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-2xl mx-auto"></div>
                <h3 className="text-xl font-semibold text-foreground">Fully Responsive</h3>
                <p className="text-muted-foreground">Optimized experience across all devices and screen sizes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Begin?
              </h2>
              <p className="text-lg text-muted-foreground">
                This space is yours to fill with content, features, and functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
                <button className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-muted transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded"></div>
                <span className="font-semibold text-foreground">Brand</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Building the future, one step at a time.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Careers</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Brand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

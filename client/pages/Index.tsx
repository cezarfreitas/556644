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
        <div className="absolute inset-0 bg-black/30"></div>
      </section>
    </div>
  );
}

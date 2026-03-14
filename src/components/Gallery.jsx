export default function Gallery() {
  const images = [
    "/smithwed.jpg",
    "/ay.wed5.JPG",
    "/ay.wed4.JPG",
    "/ay.wed.jpeg",
    "/ay.wed2.jpeg",
    "/proposal.JPG",
    // "/ay.wed3.jpeg",
    
  ];

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">
        Our <em>Moments</em>
      </h2>

      <div className="gallery-grid ">
        {images.map((img, i) => (
          <div key={i} className="gallery-item">
            <img src={img} alt="Wedding moment" />
          </div>
        ))}
      </div>
    </section>
  );
}

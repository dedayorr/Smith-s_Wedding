export default function Gallery() {
  const images = [
    "/smithwed.jpg",
    "/ay.wed.jpeg",
    "/ay.wed4.JPG",
    "/proposal.JPG",
    "/ay.wed2.jpeg",
    "/ay.wed5.JPG",
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

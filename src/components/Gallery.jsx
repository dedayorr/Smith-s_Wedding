export default function Gallery() {
  const images = [
    "/ay.wed4.JPG",
    "/ay.wed.jpeg",
    "/smithwed.jpg",
    "/ay.wed2.jpeg",
    "/smithwed2.jpg",
    "/ay.wed3.jpeg",
    "/ay.wed5.JPG",
    //   "/gallery/6.jpg",
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

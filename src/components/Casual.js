import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Casual.css'; // Import the Casual.css file

const Casual = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section className="casual-section">
      <h1 className="section-title">Casual</h1>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {/* Slide 1 */}
          <div className="slide">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe3a4aee-e9fe-4c98-8da4-2d6f638e2244/d9t7fcu-a118552b-f17d-4da7-942c-6fece8cbd034.png/v1/fill/w_1024,h_576,q_80,strp/comp_tf2_wallpaper_by_teh_tacoman_d9t7fcu-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvZmUzYTRhZWUtZTlmZS00Yzk4LThkYTQtMmQ2ZjYzOGUyMjQ0XC9kOXQ3ZmN1LWExMTg1NTJiLWYxN2QtNGRhNy05NDJjLTZmZWNlOGNiZDAzNC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.zUjCp1N1Q4k1jUVigKVXgvFVNOljXT6E0rBgerUEfeE"
              alt="Casual Team Fortress 2 Wallpaper"
            />
          </div>

          {/* Slide 2 */}
          <div className="slide">
            <img
              src="https://wallpapers.com/images/high/rocket-league-background-nf627ykzlhcyjujz.webp"
              alt="Casual Rocket League Background"
            />
          </div>

          {/* Slide 3 */}
          <div className="slide">
            <img
              src="https://cdn.discordapp.com/attachments/1104208726526795786/1171692859448098816/aGpanpc.png?ex=655d9b02&is=654b2602&hm=dc3692c337eb6c00852911c16ef0db21dfb43b25dff24ff5f6d453f2de1c5571&"
              alt="Casual Gaming Artwork"
            />
          </div>

          {/* Add more slides as needed */}
        </Slider>
      </div>
    </section>
  );
};

export default Casual;




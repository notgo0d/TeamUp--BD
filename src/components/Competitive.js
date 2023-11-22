import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Competitive.css'; // Import the Competitive.css file

const Competitive = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section className="competitive-section">
      <h1 className="section-title">Competitive</h1>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {/* Slide 1 */}
          <div className="slide">
            <img
              src="https://preview.redd.it/hjrzmal4xgpa1.png?width=4267&format=png&auto=webp&s=6745c2be9b4654c5cda58fb99658e833e3c12067"
              alt="Esports Tournament - Team A vs Team B"
            />
          </div>

          {/* Slide 2 */}
          <div className="slide">
            <img
              src="https://i0.wp.com/www.citilennial.com/wp-content/uploads/2020/09/Worlds-2020.jpg?w=1280&ssl=1"
              alt="League of Legends World Championship 2020"
            />
          </div>

          {/* Slide 3 */}
          <div className="slide">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe3a4aee-e9fe-4c98-8da4-2d6f638e2244/d9t7fcu-a118552b-f17d-4da7-942c-6fece8cbd034.png/v1/fill/w_1024,h_576,q_80,strp/comp_tf2_wallpaper_by_teh_tacoman_d9t7fcu-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvZmUzYTRhZWUtZTlmZS00Yzk4LThkYTQtMmQ2ZjYzOGUyMjQ0XC9kOXQ3ZmN1LWExMTg1NTJiLWYxN2QtNGRhNy05NDJjLTZmZWNlOGNiZDAzNC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.zUjCp1N1Q4k1jUVigKVXgvFVNOljXT6E0rBgerUEfeE"
              alt="Team Fortress 2 Competitive Match"
            />
          </div>

          {/* Add more slides as needed */}
        </Slider>
      </div>
    </section>
  );
};

export default Competitive;





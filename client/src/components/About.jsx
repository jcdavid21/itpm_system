import React, { useState, useEffect, useRef } from 'react';
import Navigation from './Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../imgs/Corazon/abt-1.jpg';
import img2 from '../imgs/Corazon/abt-2.jpg';
import school from '../imgs/Corazon/abt-3.jpg';
import grad from '../imgs/Corazon/abt-4.jpg';
import alumni from '../imgs/Corazon/abt-5.jpg';
import '../styles/slider.css';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import logo1 from '../imgs/Corazon/logo.png';
import Footer from './Footer';

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const imgSlider = [
  { src: img1,
    title: "About Us",
    desc: "At Escuela de Corazon of Quezon City, we believe in the potential of every child. Our school is a place where friendships are formed, talents are discovered, and dreams take flight."
  }, 
  { 
    src: img2,
    title: "Embracing Growth",
    desc: "At Escuela de Corazon of Quezon City, we are more than a school; we are a family that nurtures young hearts and minds. Our curriculum and programs are designed to spark curiosity and encourage growth, enabling students to explore their world with confidence and joy."
  }
];

function About() {

  useEffect(()=>{
    Aos.init({duration: 3000})
    window.scrollTo(0, 0)
  }, [])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div className=' overflow-hidden'>
      <Navigation />
      <div className='container max-w-full w-full mt-16 mb-32 md:mb-52'>
        <Slider {...settings}>
          {imgSlider.map((img, index) => (
            <div key={index} className="img-con w-full relative flex items-center justify-center">
              <img
                src={img.src}
                alt="Zoomable Image"
                className="h-full w-full object-cover object-center"
                style={{filter: `brightness(60%)`}}
              />
              <div className=' absolute md:left-10 lg:left-20 left-6 top-0 bottom-0 flex justify-center items-start text-start flex-col
               text-white w-8/12'>
                  <div className=' text-2xl font-medium tracking-widest border-b border-gray-300 mb-5 pb-4 w-max md:text-3xl
                   lg:text-5xl'>
                    {img.title}
                  </div>
                  <div className=' text-xs md:text-base font-light md:w-3/4 lg:w-2/3 lg:text-lg'>{img.desc}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <div className=' max-w-screen-xl mx-auto pl-8 pr-8 md:pl-0 md:pr-0 text-start custom-grid'>
          <div className=' font-medium text-xl border-b-2 border-b-red-800 pb-2 mb-6 max-w-max w-full lg:text-2xl leading-10' 
          data-aos={window.innerWidth < 1200 ? "fade-right" : "fade-down"} data-aos-duration="2000">
            Welcome to the <span className=' text-red-800'>Escuela de Corazon of Quezon City</span>
          </div>
          <div className='text-gray-700 leading-7 mb-10 font-light' 
          data-aos={window.innerWidth < 1200 ? "fade-left" : "fade-up"} data-aos-duration="3000">
          At Escuela de Corazon of Quezon City, we are dedicated to fostering a love for learning and a 
          spirit of curiosity in every child. Our school provides a nurturing environment where young 
          minds can grow, explore, and develop the values that will guide them through life.
        </div>
        <div className='text-gray-700 leading-7 font-light' 
                  data-aos={window.innerWidth < 1200 ? "fade-up" : "fade-left"} data-aos-duration="2800">
                  With our devoted faculty and a well-rounded curriculum, we build a solid foundation in core 
                  subjects while encouraging critical thinking, creativity, and collaboration. We invite every 
                  child to discover their unique potential through engaging classes, hands-on projects, and a 
                  supportive community that celebrates each student’s journey.
        </div>

      </div>

      <div className='mt-40 pt-7 pb-7 bg-gray-50 w-full pl-8 pr-8'>
        <div className='flex items-center justify-center w-full'>
          <div className='relative sm:flex sm:items-start sm:pl-0 sm:pr-0 max-w-screen-lg lg:max-w-screen-xl w-full'>
            <div className='sm:h-44 absolute sm:top-0 sm:bottom-0 sm:left-0'>
              <img src={logo1} alt="" className='opacity-20' />
            </div>

            <div className='flex flex-col gap-6 items-start mb-20 text-start'>
              <div data-aos="fade-right" data-aos-duration="2000">
                  <FontAwesomeIcon icon={faBook} className='text-4xl text-red-700' />
              </div>
              <div className='text-xl font-semibold text-red-700' data-aos="fade-left" data-aos-duration="2000">
                  Our Philosophy
              </div>
              <div className='pr-9 leading-7 text-gray-800' data-aos="fade-up" data-aos-duration="2000">
                  At Escuela de Corazon of Quezon City, our philosophy is rooted in nurturing young hearts and minds 
                  with a foundation of respect, curiosity, and kindness. We are dedicated to creating a joyful 
                  learning environment where each child feels valued, supported, and encouraged to reach their 
                  full potential academically, socially, and personally.
              </div>
              </div>

              <div className='flex flex-col gap-6 items-start text-start'>
                            <div data-aos="fade-right" data-aos-duration="2500">
                                <FontAwesomeIcon icon={faEarthAsia} className='text-4xl text-red-700' />
                            </div>
                            <div className='text-xl font-semibold text-red-700' data-aos="fade-left" data-aos-duration="3000">
                                Keys to Success
                            </div>
                            <div className='pr-9 leading-7 text-gray-800' data-aos="fade-up" data-aos-duration="3000">
                                Our school fosters a supportive and vibrant community where students build strong academic 
                                foundations while developing essential life skills. With enriching activities, engaging 
                                projects, and a focus on creativity and problem-solving, we equip each student with the 
                                confidence and tools they need to excel in an ever-evolving world.
                            </div>
              </div>

            
          </div>
        </div>
      </div>



      <div className="mt-36 text-start pl-8 pr-8 md:pr-0 md:pl-0">
        <div className='col-css overflow-hidden md:border-t md:border-gray-400' style={{height: "450px"}}>
          <div className='flex items-start md:justify-center lg:pt-24 md:text-center'>
            <div className="flex flex-col gap-6 md:w-3/4">
              <div data-aos={window.innerWidth < 768 ? "fade-right" : "fade-down"} data-aos-duration="2000"><FontAwesomeIcon icon={faSchool} className="text-4xl text-red-700" /></div>
              <div className="text-red-700 font-medium text-3xl" data-aos="fade-left" data-aos-duration="2500">A Community of Learners</div>
              <div className="leading-7 md:leading-9 font-light" data-aos="fade-up" data-aos-duration="3000">
              Our students are at the heart of everything we do, and our dedicated staff is here to inspire, support, and guide them every step of the way. We are proud to foster a community that values kindness, curiosity, and respect—preparing each child not only for academic success but also for a life of integrity and compassion.
              </div>
            </div>
          </div>
          <div className='hidden md:block' data-aos="fade-left" data-aos-duration="3000">
            <img src={school} alt="" className=' object-cover object-center' />
          </div>
        </div>

        <div className='col-css overflow-hidden' style={{height: "450px"}}>
          <div className='hidden md:block' data-aos="fade-right" data-aos-duration="3000">
            <img src={grad} alt="" className=' object-cover object-center' />
          </div>
          <div className="flex items-start md:justify-center lg:pt-24 md:text-center">
            <div className='md:w-3/4 flex flex-col gap-6'>
              <div data-aos={window.innerWidth < 768 ? "fade-right" : "fade-down"}  data-aos-duration="2000"><FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-red-700" /></div>
              <div className="text-red-700 font-medium text-3xl" data-aos="fade-left" data-aos-duration="2500">School Sports</div>
              <div className="leading-7 md:leading-9 font-light" data-aos="fade-up" data-aos-duration="3000">
              Our sports programs are designed to encourage every student to embrace a healthy, active lifestyle while learning the values of dedication, discipline, and fair play. Through friendly competition and team activities, our students grow together, celebrate victories, and learn valuable life lessons that extend beyond the field. 
              </div>
            </div>
          </div>
        </div>

        <div className='col-css overflow-hidden md:border-b md:border-gray-400' style={{height: "450px"}}>
          <div className='flex items-start md:justify-center lg:pt-24 md:text-center'>
            <div className="flex flex-col gap-6 md:w-3/4">
              <div data-aos={window.innerWidth < 768 ? "fade-right" : "fade-down"} data-aos-duration="2000"><FontAwesomeIcon icon={faHandshake} className="text-4xl text-red-700" /></div>
              <div className="text-red-700 font-medium text-3xl" data-aos="fade-left" data-aos-duration="2500">Tradition in Every Step</div>
              <div className="leading-7 md:leading-9 font-light" data-aos="fade-up" data-aos-duration="3000">
              At Escuela de Corazon of Quezon City, the selection of our muse and escort is a cherished tradition that symbolizes the spirit, pride, and unity of our school. Representing elegance, confidence, and teamwork, our muse and escort embody the values we hold dear both on and off the field
              </div>
            </div>
          </div>
          <div className='hidden md:block' data-aos="fade-left" data-aos-duration="3000">
            <img src={alumni} alt="" className=' object-cover object-center' />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;

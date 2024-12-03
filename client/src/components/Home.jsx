import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import img1 from '../imgs/Corazon/img-1.jpg'
import img2 from '../imgs/Corazon/img-2.jpg'
import img3 from '../imgs/Corazon/img-3.jpg'
import img4 from '../imgs/Corazon/img-4.jpg'
import logo1 from '../imgs/Corazon/logo.png'
import '../styles/slider.css'
import Navigation  from './Navbar.jsx';
import { Link } from 'react-router-dom'
import { MdOutlineHorizontalRule } from "react-icons/md";
import enroll from '../imgs/Corazon/enroll.jpg'
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react'
import Footer from './Footer'
import axios from 'axios'
import ApiConfig from '../Config/localconfigapi'

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
};

const imgs = [
    {
        src: img1,
        title: "",
        desc: ""
    },
    {
        src: img2,
        title: "",
        desc: ""
    },
    {
        src: img3,
        title: "",
        desc: ""
    }
];


function Home() {

    const [announcements, setAnc] = useState([]);

    useEffect(()=>{
        try{
            const fetchData = async ()=>{
                const response = await axios.get(`${ApiConfig.apiURL}getAnc`);
    
                if(response.status === 200){
                    setAnc(response.data);
                }else{
                    console.log("error");
                }
            }
            fetchData();
        }catch(err){
            console.error("Err: ", err)
        }
        Aos.init({duration: 2000})
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
            <div className='container w-full max-w-full mb-16 mt-16 md:mb-56'>
               
            </div>

            <div className='mt-20'>
                <div className=' max-w-screen-xl lg:max-w-screen-2xl mx-auto pl-9 pr-9'>
                    <div>
                        <div className='flex items-center gap-2 border-b border-gray-400 pb-3'>
                            <div className='text-xl tracking-wider font-medium md:text-2xl' data-aos="fade-right">Announcements</div>
                            <MdOutlineHorizontalRule className='text-4xl text-red-800' />
                        </div>

                        <div className='mt-7 md:flex md:justify-between md:gap-5 md:max-h-max md:overflow-auto md:pb-4'>
  
                        </div>
                    </div>
                </div>
            </div>

            <div className="update-con md:mb-28 mt-20">
              <div className=' max-w-screen-xl lg:max-w-screen-2xl mx-auto pl-9 pr-9 flex flex-col gap-10 justify-center items-center
              md:flex-row'>

              </div>
            </div>
            
            <div className='bg-gray-50 pt-12 pb-12 mt-10'>
                <div className=' max-w-screen-xl mx-auto pl-9 pr-9 lg:max-w-screen-2xl'>
                    <div className='md:grid grid-cols-2 gap-7'>
                        <div className='relative lg:w-96 w-full'>
                            <img src={logo1} alt="" className=' opacity-10 h-32 w-32'/>
                            <div className='absolute top-0 left-0 right-0 text-start' data-aos="fade-right">
                                <div className='text-red-800 font-medium tracking-widest text-lg mb-2'>ABOUT US</div>
                                <div className='font-medium tracking-wide text-2xl leading-8'>
                                    We Are One of The Most Diverse School in Quezon City
                                </div>
                            </div>
                        </div>

                        <div className='text-start leading-7 font-light flex flex-col gap-8 md:text-lg'>
                            <div data-aos="fade-left">
                                Our community is being called to reimagine the future. 
                                As the only university where a renowned design school 
                                comes together with premier colleges, we are making learning more 
                                relevant and transformational. We are enriched by the wide 
                                range of experiences and perspectives of our students, faculty, 
                                staff and alumni.
                            </div>
                            <div data-aos="fade-left">
                                Preparing students to make 
                                meaningful contributions to society as leaders in a complex world
                            </div>
                            <Link to='/about'>
                                <button data-aos="fade-up" className='bg-red-800 text-white font-semibold p-2 pl-7 pr-7 rounded
                                hover:bg-red-700'>
                                    Read more
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-gray-50 pt-20 pb-1'>
                <div className=' max-w-screen-xl mx-auto pl-9 pr-9 lg:pr-0 lg:max-w-screen-2xl'>
                    <div className='md:grid md:grid-cols-2 flex flex-col-reverse gap-7'>

                        <div className='text-start leading-7 font-light flex flex-col gap-8 md:text-lg max-w-max'>
                            <div className='w-full text-start' data-aos="fade-right">
                                <div className='text-red-800 font-medium tracking-widest text-lg mb-2'>Community</div>
                                <div className='font-medium tracking-wide text-2xl leading-8'>
                                    Join in Escuela de Corazon of Quezon City Inc. 
                                </div>
                            </div>
                            <div data-aos="fade-right">
                                At Escuela de Corazon of Quezon City Inc. , we foster a collaborative 
                                and inclusive learning environment where students from 
                                diverse backgrounds come together to exchange ideas, 
                                collaborate on projects, and inspire one another to reach 
                                new heights
                            </div>
                            <div data-aos="fade-right">
                                Join us and unleash your potential in the exciting community in Escuela de Corazon of Quezon City Inc. .
                            </div>
                            <Link to='/about'>
                                <button data-aos="fade-up" className='bg-red-800 text-white font-semibold p-2 pl-7 pr-7 rounded
                                hover:bg-red-700'>
                                    Read more
                                </button>
                            </Link>
                        </div>
                        <div className='w-full' data-aos="fade-left">
                            <img src={img4} alt="" className=' object-cover object-center'/>
                        </div>
                            
                    </div>
                </div>
            </div>
            <div className='w-full h-96'>
                    <img src={enroll} alt="" className='object-contain object-center' />
                </div>
            <Footer />
        </div>

    )
}

export default Home

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

const newsCon = [
    {
        svg:<svg 
                    xmlns="http://www.w3.org/2000/svg" width="70px" height="80px" viewBox="0 0 70 80"><g stroke="none" strokeWidth="1" fill="none" fillRule="nonzero"><path d="M5.80245286,60.2637478 L5.80245286,21.9205525 C5.79986392,19.3169305 7.90832414,17.2041298 10.5119454,17.2013652 L5.66512632,17.2013652 C3.06150506,17.2041298 0.95304484,19.3169305 0.955631399,21.9205525 L0.955631399,60.2637478 C0.95304484,62.8673699 3.06150506,64.9801705 5.66512632,64.9829352 L10.5119454,64.9829352 C7.90832414,64.9801705 5.79986392,62.8673699 5.80245286,60.2637478 L5.80245286,60.2637478 Z" fill="#EEEEEE"></path><path d="M64.3208065,16.2457338 L52.5390323,16.3630294 L52.5582258,18.2964731 L64.3304839,18.1791775 C66.3942626,18.1835317 68.0648766,19.8562053 68.0645161,21.9178131 L68.0645161,54.894951 L1.93548387,54.894951 L1.93548387,21.9178131 C1.93547927,19.8564568 3.6059893,18.1841757 5.66951613,18.179822 L17.8233871,18.179822 L17.8233871,16.2463783 L5.66951613,16.2463783 C2.53771459,16.2523296 0.00159500714,18.7893075 0,21.9178131 L0,60.1577847 C0.0015063089,63.286327 2.53767774,65.8233567 5.66951613,65.8292196 L25.0375806,65.8292196 L25.0375806,77.3839624 L20.5483871,77.3839624 C20.013918,77.3839624 19.5806452,77.8167786 19.5806452,78.3506843 C19.5806452,78.88459 20.013918,79.3174061 20.5483871,79.3174061 L49.4903226,79.3174061 C50.0247917,79.3174061 50.4580645,78.88459 50.4580645,78.3506843 C50.4580645,77.8167786 50.0247917,77.3839624 49.4903226,77.3839624 L44.9624194,77.3839624 L44.9624194,65.8298641 L64.3304839,65.8298641 C67.462574,65.8240006 69.9988493,63.2865786 70,60.1577847 L70,21.9178131 C69.9975977,18.7857644 67.4561605,16.2475109 64.3208065,16.2457338 L64.3208065,16.2457338 Z M43.0269355,77.3839624 L26.9730645,77.3839624 L26.9730645,65.8298641 L43.0269355,65.8298641 L43.0269355,77.3839624 Z M64.3304839,63.8964204 L5.66951613,63.8964204 C3.60573743,63.8920661 1.93548381,62.2193926 1.93548381,60.1577847 L1.93548381,56.8283947 L68.0645162,56.8283947 L68.0645162,60.1577847 C68.0645162,62.2193926 66.3942626,63.8920661 64.3304839,63.8964204 Z" fill="#CCCCCC"></path><g transform="translate(11.706485, 0.000000)" fill="#AE152D" className="primary-fill-color"><path d="M41.9495822,18.8407407 C41.95736,12.5389697 38.7328067,6.67201248 33.4046237,3.29350042 C28.0764407,-0.0850116515 21.3866265,-0.50458978 15.6768398,2.18163242 C10.04594,-0.136059836 3.48288102,-1.10879094 1.16564293,1.87275724 C-0.705779922,4.28072616 0.0250276568,8.3694532 3.2235622,13.3830325 C3.84844628,14.3628567 4.55503354,15.3596079 5.33299,16.3653867 C5.22543986,17.1797213 5.17101783,18.0001741 5.17006802,18.8215569 C5.14492051,25.140922 8.3786088,31.0285136 13.7290423,34.4049219 C14.294817,34.7561014 14.6402131,35.3728421 14.6436013,36.0379624 L14.6436013,42.694577 L13.2711169,42.694577 C12.7360565,42.694577 12.3023043,43.1276296 12.3023043,43.661827 C12.3023043,44.1960245 12.7360565,44.629077 13.2711169,44.629077 L14.6436013,44.629077 L14.6436013,45.9229352 C14.6442217,47.5294483 15.9472306,48.8323028 17.5563361,48.835325 L18.8936203,48.835325 C19.284837,50.8619791 20.8845105,52.4395542 22.9190954,52.805191 C24.9536803,53.1708278 27.0039423,52.2491853 28.0784475,50.4859371 C28.2587489,50.1909109 28.2677054,49.8222608 28.1019432,49.5188539 C27.9361809,49.215447 27.6208831,49.0233779 27.2748195,49.0149973 C26.9287558,49.0066166 26.6045015,49.1831976 26.4242001,49.4782238 C25.8028586,50.5004861 24.64164,51.0673005 23.4519838,50.929023 C22.2623276,50.7907454 21.2625896,49.9727562 20.8930879,48.835325 L29.56396,48.835325 C31.1730394,48.8323027 32.476002,47.5294222 32.4765334,45.9229352 L32.4765334,44.629077 L34.1377239,44.629077 C34.6727843,44.629077 35.1065364,44.1960245 35.1065364,43.661827 C35.1065364,43.1276296 34.6727843,42.694577 34.1377239,42.694577 L32.4762104,42.694577 L32.4762104,36.9489507 C32.9283229,37.1262799 33.3750532,37.2928618 33.8164011,37.4486965 C34.9637347,37.8562169 36.1354893,38.1916485 37.3247942,38.4530245 C38.1039322,38.6232463 38.8930291,38.7443382 39.687405,38.815582 C40.0865557,38.8494358 40.472466,38.8663626 40.8451359,38.8663626 C41.3748077,38.8687742 41.9038659,38.8300751 42.4275297,38.7506151 C44.0291383,38.4992913 45.250165,37.8454303 46.0571858,36.8070874 C48.4478922,33.7310711 43.2744333,27.0262552 41.0860473,24.4438588 C41.6597572,22.6313618 41.951003,20.7415893 41.9495822,18.8407407 L41.9495822,18.8407407 Z M23.5552233,2.36184326 C23.6327283,2.36184326 23.7102333,2.3624007 23.7877383,2.36347542 C32.7986552,2.50310345 40.0261106,9.84328422 40.0120317,18.8407407 C40.0289911,24.4998291 37.1264076,29.7689635 32.3304041,32.7852618 C31.769306,33.1385577 31.308807,33.6301821 30.9932814,34.2127616 C26.8874539,32.3342009 22.4617569,29.6022032 18.2099616,26.2929185 C13.9353993,22.966062 10.2019188,19.3514487 7.37670001,15.8329155 C8.79172916,8.02423654 15.6069667,2.34952697 23.5552233,2.36184326 L23.5552233,2.36184326 Z M4.85794892,12.3445284 C2.1714318,8.13247694 1.38362575,4.74790792 2.69636672,3.05892818 C3.80081299,1.6378767 7.86482005,1.37365623 13.4878079,3.40713819 C9.76854992,5.84441506 7.05674065,9.54144734 5.85195057,13.8171665 C5.50080985,13.3223644 5.16947597,12.831485 4.85794892,12.3445284 Z M30.5385861,45.9226127 C30.5392118,46.4611841 30.1030756,46.8986362 29.563637,46.9005025 L17.5563361,46.9005025 C17.0168345,46.8987249 16.5806001,46.4612468 16.5812256,45.9226127 L16.5812256,44.6287546 L30.5385861,44.6287546 L30.5385861,45.9226127 Z M30.5385854,38.2752117 L24.2090102,38.2752117 C23.6739499,38.2752117 23.2401977,38.7082643 23.2401977,39.2424617 C23.2401977,39.7766591 23.6739499,40.2097117 24.2090102,40.2097117 L30.5385854,40.2097117 L30.5385854,42.6942546 L16.5812263,42.6942546 L16.5812263,40.2097117 L17.0246195,40.2097117 C17.5596799,40.2097117 17.993432,39.7766591 17.993432,39.2424617 C17.993432,38.7082643 17.5596799,38.2752117 17.0246195,38.2752117 L16.5812263,38.2752117 L16.5812263,36.03764 C16.5796713,34.7102895 15.8949807,33.476887 14.7684166,32.7720427 C9.97931555,29.7497055 7.08499048,24.4796322 7.10756049,18.823169 C7.10756049,18.726444 7.10979216,18.629719 7.11140685,18.532994 C9.84652607,21.6894532 13.2292965,24.8684816 17.0191296,27.8185941 C21.5044086,31.3093995 26.194753,34.1863234 30.5385854,36.1325917 L30.5385854,38.2752117 Z M44.526462,35.619788 C44.0318833,36.2559161 43.2245395,36.6658689 42.126552,36.8382006 C41.3729011,36.944358 40.6092742,36.960593 39.8517802,36.8865631 C39.1389363,36.8222532 38.4308456,36.7132765 37.7316954,36.5602774 C36.6219815,36.315845 35.5286462,36.0024367 34.4580779,35.6218837 C33.9110218,35.430207 33.3533087,35.2164447 32.7889754,34.9880125 C32.9394481,34.7597283 33.1366853,34.565886 33.3676794,34.4192695 C36.3962473,32.511939 38.801558,29.7637643 40.2887146,26.5116782 C44.0522283,31.1454506 45.3108773,34.6104626 44.526462,35.619788 L44.526462,35.619788 Z"></path><path d="M20.6405508,40.2097117 L20.6566977,40.2097117 C21.191758,40.2097117 21.6255102,39.7766591 21.6255102,39.2424617 C21.6255102,38.7082643 21.191758,38.2752117 20.6566977,38.2752117 L20.6405508,38.2752117 C20.1054904,38.2752117 19.6717383,38.7082643 19.6717383,39.2424617 C19.6717383,39.7766591 20.1054904,40.2097117 20.6405508,40.2097117 L20.6405508,40.2097117 Z"></path><path d="M20.2948462,12.2726294 C20.5818746,12.2727224 20.8672948,12.229848 21.1415883,12.1454361 L22.3545416,14.1966509 C21.3288811,15.1403451 20.9732764,16.6077923 21.4534274,17.9152118 C21.9335783,19.2226313 23.155011,20.1127768 24.548579,20.1708707 L25.4781546,23.3694053 C24.3454717,24.1952493 23.9724259,25.7151045 24.5943402,26.9702233 C25.2162546,28.2253421 26.6526558,28.8515018 27.9974403,28.4537113 C29.3422248,28.0559209 30.2051499,26.7496151 30.0418693,25.3588314 C29.8785887,23.9680476 28.7364849,22.8963772 27.3360141,22.8198461 L26.4306588,19.7043337 C28.055448,18.7603221 28.6238251,16.6911527 27.708684,15.0516999 L29.1630331,14.0501126 C29.6134196,14.3269985 30.1318923,14.4737626 30.6608172,14.4740905 C31.9252713,14.4805401 33.0481642,13.6683255 33.4359935,12.4667407 C33.8238227,11.265156 33.3871824,9.95120127 32.3568578,9.21936434 C31.3265332,8.48752742 29.940044,8.50651791 28.9302158,9.26629844 C27.9203877,10.026079 27.5200153,11.3514981 27.9407146,12.5420086 L26.2976086,13.6735299 C25.6226811,13.3136265 24.8453531,13.1931855 24.0929142,13.3319294 L22.7005691,10.9766756 C23.4266846,9.87517694 23.3102337,8.4219308 22.417947,7.44969926 C21.5256602,6.47746772 20.0857653,6.23492658 18.9233735,6.86106061 C17.7609816,7.48719463 17.1734077,8.82185227 17.4973525,10.1002269 C17.8212973,11.3786016 18.9739027,12.2737126 20.2946847,12.2726294 L20.2948462,12.2726294 Z M28.1238216,25.6966088 C28.121148,26.2186151 27.6955851,26.6398658 27.1727319,26.6380656 C26.6498787,26.6362539 26.2272454,26.2120734 26.2281893,25.6900612 C26.2291365,25.168049 26.6533037,24.7453975 27.1761601,24.7454796 C27.7007171,24.7473461 28.1247141,25.1728953 28.1238216,25.6966088 L28.1238216,25.6966088 Z M30.6608172,10.6374801 C31.0465836,10.6354696 31.3954933,10.8659173 31.5445263,11.221165 C31.6935593,11.5764126 31.6132934,11.9863272 31.3412311,12.2593854 C31.0691689,12.5324436 30.6590206,12.6147383 30.302419,12.4678192 C29.9458173,12.3209001 29.7131566,11.9737719 29.7131566,11.5886225 C29.7126194,11.0651341 30.1364866,10.6399316 30.6608172,10.6379769 L30.6608172,10.6374801 Z M26.2073488,16.7263321 C26.204229,17.560206 25.5251561,18.2339554 24.6899321,18.2318569 C23.854708,18.2297486 23.1790482,17.5525876 23.1801419,16.7187086 C23.1812382,15.8848297 23.8586742,15.2094398 24.6939009,15.2095229 C25.5312159,15.2119234 26.2084199,15.8908484 26.2073488,16.7268158 L26.2073488,16.7263321 Z M20.2948462,8.43666469 C20.6805982,8.43471876 21.0294586,8.6652082 21.1784406,9.0204613 C21.3274227,9.3757144 21.2471167,9.78560272 20.9750414,10.0586275 C20.7029661,10.3316522 20.2928304,10.4139171 19.9362486,10.2669882 C19.5796667,10.1200594 19.3470232,9.77294114 19.3470232,9.38780626 C19.3461309,8.86402998 19.7702261,8.43845484 20.2948462,8.43666469 L20.2948462,8.43666469 Z"></path><path d="M16.7036196,22.0963471 C17.8730719,22.0982999 18.9284625,21.3964809 19.3773513,20.3183515 C19.8262401,19.2402221 19.5801562,17.9982692 18.7539212,17.1719819 C17.9276862,16.3456947 16.6841415,16.0979248 15.6035191,16.5442805 C14.5228966,16.9906362 13.818173,18.043146 13.818173,19.2107138 C13.818173,20.8025161 15.1092482,22.0936752 16.7036196,22.0963471 Z M16.7036196,18.2595723 C17.0893717,18.2576263 17.4382321,18.4881158 17.5872141,18.8433689 C17.7361961,19.198622 17.6558901,19.6085103 17.3838148,19.881535 C17.1117396,20.1545597 16.7016038,20.2368247 16.345022,20.0898958 C15.9884402,19.942967 15.7557977,19.5958487 15.7557977,19.2107138 C15.7553497,18.6872257 16.179289,18.2620954 16.7036196,18.2602295 L16.7036196,18.2595723 Z">
                    </path></g></g>
            </svg>,
        title: "Innovative Programs",
        desc: "Explore wide-range of innovative and essential courses",
        aos: "fade-right",
        aos2: "fade-right",
        delay: "2500"
    },
    {
        svg:
        <svg 
        xmlns="http://www.w3.org/2000/svg" width="70px" height="98px" viewBox="0 0 70 98"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><path d="M15.4889831,84.4530226 C10.0748958,78.219474 7.10144878,70.2361235 7.11864407,61.979661 C7.11864407,53.004435 9.93644068,45.2688418 15.2596045,39.3801412 C16.4619269,38.0545707 17.7751338,36.8339782 19.1849435,35.7316384 L15.7618644,34.8732486 C15.4739202,34.8040106 15.2105555,34.6569368 15.000565,34.4481073 C12.9218117,35.8627261 11.0175474,37.5180887 9.32740113,39.3797458 C4.00423729,45.2688418 1.18636651,53.004435 1.18636651,61.979661 C1.16924539,70.2361235 4.14269239,78.219474 9.55677966,84.4530226 C15.7409284,91.618459 24.6601871,95.8436015 34.1220339,96.0898305 C34.4120527,96.0978719 34.7047081,96.1016981 35,96.1016981 C35.2952919,96.1016981 35.5879473,96.0976083 35.8779661,96.0898305 C36.5797458,96.0718362 37.2755932,96.0305085 37.9661017,95.9694068 C29.2620856,95.1965658 21.2006416,91.0662016 15.4889831,84.4530226 L15.4889831,84.4530226 Z" fill="#EEEEEE"></path><path d="M35,97.2881356 C54.299435,97.2881356 70,81.4491525 70,61.9794633 C70,56.120226 68.8926554,50.6885028 66.7086158,45.8351695 C64.4516102,40.819096 61.1511299,36.6679379 56.8991243,33.4961864 L55.4805367,35.3984463 C56.9388152,36.4852335 58.2891425,37.7098119 59.5128531,39.0552542 C57.4449569,41.2952035 55.0812032,43.2426343 52.4869492,44.8437006 C51.3227047,41.7981136 49.7487022,38.9254592 47.8084181,36.3050847 L45.9069492,37.7244633 C47.7899699,40.2713489 49.3039173,43.0713727 50.4039548,46.0416102 C45.9708192,48.384435 41.0538136,49.7630791 36.1864407,49.9307627 L36.1864407,39.6417514 L33.8135593,39.6417514 L33.8135593,49.9256215 C28.8219366,49.7206121 23.9423099,48.3830491 19.5438418,46.0141243 C20.6951679,42.9231401 22.3141329,40.0271962 24.3441808,37.4274576 L22.4785028,35.9612147 C20.3802741,38.6456787 18.6912395,41.626128 17.4663842,44.8055367 C15.0665236,43.2927309 12.8730753,41.4749605 10.9409605,39.3977401 C12.3811073,37.9195639 13.9656607,36.5893207 15.670904,35.4269209 L14.3316102,33.4681073 C9.79838991,36.521492 6.12644614,40.6892247 3.66847458,45.5709887 C1.23429379,50.4207627 1.68603361e-14,55.940678 1.68603361e-14,61.9794633 C1.68603361e-14,81.4491525 15.700565,97.2881356 35,97.2881356 L35,97.2881356 Z M14.5321186,63.165904 C14.6044224,67.7961847 15.3484311,72.3914543 16.7408757,76.8079944 C14.1161673,78.4268483 11.7169684,80.3855557 9.60562147,82.6332203 C5.16813347,77.0901724 2.63950582,70.262205 2.39621469,63.165904 L14.5321186,63.165904 Z M67.6037853,63.165904 C67.3605256,70.2599725 64.8333639,77.0859237 60.3983333,82.6280791 C58.2941764,80.3676977 55.8972217,78.3988204 53.2711864,76.7737853 C54.6563206,72.3675829 55.3965523,67.7841273 55.4688701,63.165904 L67.6037853,63.165904 Z M51.1620904,75.5683616 C46.5340865,73.1379629 41.4117129,71.797748 36.1864407,71.6501412 L36.1864407,63.165904 L53.0951977,63.165904 C53.0242655,67.3692844 52.3737638,71.5427826 51.1620904,75.5683616 L51.1620904,75.5683616 Z M33.8135593,94.6014407 C27.3207627,91.1862712 22.439548,85.330791 19.6276836,77.8813277 C23.9980591,75.5260925 28.8521094,74.2089222 33.8135593,74.0319209 L33.8135593,94.6014407 Z M36.1864407,74.0251977 C41.1524389,74.1772525 46.0145038,75.4856293 50.3861582,77.8463277 C47.5762712,85.3125989 42.6895198,91.1809322 36.1864407,94.6014407 L36.1864407,74.0251977 Z M33.8135593,71.6570621 C28.5918664,71.8289761 23.4764768,73.1783261 18.8493785,75.6043503 C17.6303922,71.567985 16.97599,67.3823132 16.9048023,63.1664972 L33.8135593,63.1664972 L33.8135593,71.6570621 Z M11.1620339,84.4417514 C13.0552921,82.3951304 15.203042,80.5995905 17.5527966,79.0990113 C20.0081356,85.4136441 23.8854237,90.6470339 28.9329379,94.3420056 C22.1031992,93.0266915 15.8748846,89.5568682 11.1620339,84.4417514 L11.1620339,84.4417514 Z M41.0670621,94.3418079 C46.1232768,90.6412994 50.0049153,85.3956497 52.4600565,79.0663842 C54.8106078,80.5732778 56.9557322,82.3787502 58.8417232,84.4375989 C54.1284426,89.554868 47.898647,93.026169 41.0670621,94.3418079 L41.0670621,94.3418079 Z M61.0423729,40.8926554 C65.1203672,46.2118644 67.3985311,53.0384463 67.6089266,60.7926271 L55.4702542,60.7926271 C55.3676271,55.904887 54.6314407,51.3121751 53.2933333,47.1277966 C56.1521312,45.4175842 58.7599779,43.3192219 61.0423729,40.8926554 L61.0423729,40.8926554 Z M51.1751412,48.3063277 C52.3866285,52.3604598 53.0335259,56.5622323 53.0975706,60.7930226 L36.1864407,60.7930226 L36.1864407,52.3058192 C41.3079096,52.1424859 46.4851412,50.7237006 51.1751412,48.3063277 L51.1751412,48.3063277 Z M33.8135593,52.300678 L33.8135593,60.7930226 L16.9022316,60.7930226 C16.9945104,56.2465819 17.6170621,52.0786817 18.769887,48.289322 C23.4232486,50.7297981 28.5628895,52.1002699 33.8135593,52.300678 L33.8135593,52.300678 Z M5.78903955,46.6360169 C6.76631014,44.6857066 7.96028699,42.8517581 9.34836158,41.1688983 C11.5088422,43.4612874 13.9669716,45.4536085 16.6570339,47.0925989 C15.3378437,51.2287947 14.6280885,55.7956026 14.5277684,60.7930226 L2.39146893,60.7930226 C2.54135593,55.5922599 3.68152542,50.834435 5.78903955,46.6360169 L5.78903955,46.6360169 Z" fill="#CCCCCC"></path><g transform="translate(2.175141, 0.000000)" fill="#AE152D" className="primary-fill-color"><path d="M43.8267232,19.9543507 C43.9594981,19.9542775 44.0913161,19.9318844 44.2166667,19.8881073 L46.6318644,19.0473164 C47.0321785,18.9079323 47.3277235,18.5655712 47.4071704,18.149197 C47.4866173,17.7328228 47.3378963,17.3056928 47.0170291,17.0287026 C46.696162,16.7517125 46.251896,16.6669436 45.8515819,16.8063277 L43.4365819,17.6471186 C42.889356,17.8371401 42.5593551,18.3945521 42.6559372,18.965723 C42.7525193,19.536894 43.2474442,19.9548151 43.8267232,19.9543507 L43.8267232,19.9543507 Z"></path><path d="M1.5119209,13.2655932 L1.57460452,13.2956497 L4.7259887,14.3737288 L4.7259887,27.3276836 C4.7259887,27.9829367 5.25717629,28.5141243 5.91242938,28.5141243 C6.56768247,28.5141243 7.09887006,27.9829367 7.09887006,27.3276836 L7.09887006,15.1864407 L11.0372599,16.5338418 L11.1628249,33.3158475 C11.1663833,34.6027392 12.0479197,35.7209844 13.2984181,36.024887 L32.1327684,40.7461299 C32.3633512,40.8008569 32.5995371,40.8283914 32.8365254,40.8283914 C33.0662276,40.8283914 33.2951741,40.8020808 33.5187288,40.7492938 L53.3046045,36.2872881 C54.5678854,35.9850951 55.4651713,34.8643834 55.4837006,33.5655932 L55.7822881,15.8617232 L63.2331356,13.2683616 L63.3088701,13.2288136 C64.1802717,12.7736589 64.6971993,11.8435708 64.6236298,10.8632167 C64.5500602,9.88286262 63.9001092,9.04034161 62.9705367,8.72033898 L36.2404237,0.316384181 C35.0452656,-0.0894995937 33.7519748,-0.104665896 32.5476271,0.273079096 L1.87655367,8.69166667 L1.83502825,8.70392655 C0.874367175,9.00926787 0.197089635,9.86964127 0.125869065,10.8751415 C0.0546484956,11.8806417 0.603890362,12.8278906 1.5119209,13.2655932 L1.5119209,13.2655932 Z M2.53324859,10.9718079 L33.1960169,2.55322034 L33.2391243,2.54056497 C33.9728083,2.3073483 34.7620089,2.31601321 35.4903955,2.56528249 L62.2151695,10.9692373 C62.2349435,10.9767514 62.2547175,10.9890113 62.2584746,11.0392373 C62.2615022,11.0597884 62.2573092,11.0807535 62.2466102,11.0985593 L49.080678,15.6821751 C48.4623505,15.8979499 48.1357948,16.5739166 48.3510916,17.1924106 C48.5663884,17.8109045 49.2421025,18.1379826 49.8607627,17.9231638 L53.3949718,16.6928249 L53.1112147,33.525452 C53.11161,33.7353908 52.9716543,33.919705 52.769322,33.9757062 L32.9830508,38.4379096 C32.8886276,38.460713 32.7902693,38.4618622 32.695339,38.4412712 L13.8615819,33.7196328 C13.6681649,33.6710857 13.5330988,33.4964721 13.5347175,33.2970621 L13.4160734,17.3465537 L30.5577684,23.2111299 C31.9396659,23.7193803 33.4604949,23.6999475 34.8289548,23.1565537 L41.1230226,20.9653955 C41.5236507,20.8262845 41.8195611,20.4839112 41.8991869,20.0673605 C41.9788127,19.6508099 41.8300438,19.2234339 41.5089704,18.946366 C41.1878971,18.6692981 40.7433504,18.5846767 40.3429379,18.7244068 L34.0239548,20.9242655 L33.9715537,20.9440395 C33.1380229,21.2797795 32.2092587,21.2926819 31.3667232,20.980226 L10.1189548,13.7111017 L23.7752825,10.3467514 C24.1909573,10.2491776 24.5221439,9.93577594 24.6424897,9.52611383 C24.7628355,9.11645171 24.6537771,8.67371987 24.3569218,8.36682724 C24.0600665,8.0599346 23.6212045,7.93621959 23.2077684,8.04288136 L5.96601695,12.290339 L2.50872881,11.1074576 C2.4940409,11.0889723 2.48818752,11.0649806 2.49271186,11.0418079 C2.49627119,10.9943503 2.5130791,10.9799153 2.53324859,10.9722034 L2.53324859,10.9718079 Z">
            </path></g></g>
        </svg>,
        title: "Best Instructors",
        desc: "Learn from the best experts and professors of the subjects",
        aos: "fade-left",
        aos2: "fade-up",
        delay: "3000"
    },
    {
        svg:
        <svg 
        xmlns="http://www.w3.org/2000/svg" width="80px" height="65px" viewBox="0 0 80 65"><g stroke="none" strokeWidth="1" fill="none" fillRule="nonzero"><path d="M5.85365854,60.1138211 L5.85365854,4.60162602 C5.85408968,3.66107775 6.22813457,2.75922318 6.89350756,2.09446006 C7.55888055,1.42969694 8.46107775,1.0569102 9.40162602,1.0569102 L4.52357724,1.0569102 C3.58302897,1.0569102 2.68083177,1.42969694 2.01545878,2.09446006 C1.35008579,2.75922318 0.976040904,3.66107775 0.975609756,4.60162602 L0.975609756,60.1138211 C0.976597352,62.0723743 2.565024,63.659345 4.52357724,63.6585369 L9.40162602,63.6585369 C7.44307278,63.659345 5.85464613,62.0723743 5.85365854,60.1138211 Z" fill="#EEEEEE"></path><path d="M8.22292683,11.9339837 C10.2994689,11.9326369 11.981873,10.2484133 11.9809756,8.17187097 C11.9800775,6.0953287 10.2962177,4.41256036 8.21967532,4.41300892 C6.1431329,4.41345766 4.46,6.09695346 4.46,8.17349593 C4.46304765,10.2500444 6.1463768,11.9322825 8.22292683,11.9339837 Z M8.22292683,6.36439024 C9.22186067,6.36573688 10.0306827,7.17640225 10.0297561,8.17533657 C10.0288279,9.17427089 9.2185021,9.98343308 8.21956748,9.98292519 C7.22063286,9.98241683 6.41113064,9.17243068 6.41121951,8.17349593 C6.41310216,7.17411965 7.22354887,6.36483674 8.22292683,6.36439024 L8.22292683,6.36439024 Z" fill="#CCCCCC"></path><path d="M18.2578862,11.9339837 C20.334407,11.9325471 22.0167295,10.2482838 22.0157724,8.17176272 C22.0148144,6.09524165 20.3309392,4.41253059 18.2544179,4.41300903 C16.1778967,4.41348767 14.4947967,6.09697464 14.4947967,8.17349593 C14.4978446,10.2501078 16.1812727,11.9323721 18.2578862,11.9339837 L18.2578862,11.9339837 Z M18.2578862,6.36439024 C19.2567987,6.36582663 20.0655391,7.1765316 20.0645529,8.17544467 C20.0635648,9.17435773 19.2532236,9.98346265 18.2543102,9.98292496 C17.2553968,9.98238674 16.4459275,9.17240949 16.4460163,8.17349593 C16.4479884,7.17409336 17.2584818,6.36483654 18.2578862,6.36439024 L18.2578862,6.36439024 Z" fill="#CCCCCC"></path><path d="M28.1068293,11.9339837 C30.1833501,11.9325471 31.8656726,10.2482838 31.8647155,8.17176272 C31.8637575,6.09524165 30.1798823,4.41253059 28.103361,4.41300903 C26.0268398,4.41348767 24.3437398,6.09697464 24.3437398,8.17349593 C24.3467877,10.2501078 26.0302157,11.9323721 28.1068293,11.9339837 L28.1068293,11.9339837 Z M28.1068293,6.36439024 C29.1057418,6.36582663 29.9144822,7.1765316 29.9134959,8.17544467 C29.9125079,9.17435773 29.1021667,9.98346265 28.1032533,9.98292496 C27.1043399,9.98238674 26.2948706,9.17240949 26.2949593,8.17349593 C26.2969315,7.17409336 27.1074249,6.36483654 28.1068293,6.36439024 L28.1068293,6.36439024 Z" fill="#CCCCCC"></path><path d="M42.7874797,8.96357724 L74.7502439,8.96357724 C75.2890583,8.96357724 75.7258537,8.52678187 75.7258537,7.98796748 C75.7258537,7.44915309 75.2890583,7.01235772 74.7502439,7.01235772 L42.7874797,7.01235772 C42.2486653,7.01235772 41.8118699,7.44915309 41.8118699,7.98796748 C41.8118699,8.52678187 42.2486653,8.96357724 42.7874797,8.96357724 L42.7874797,8.96357724 Z" fill="#CCCCCC"></path><g transform="translate(0.975610, 21.788618)" fill="#AE152D" className="primary-fill-color"><path d="M35.398374,0.185365854 C34.995881,-0.0470135845 34.4999863,-0.047001239 34.0975049,0.185398239 C33.6950235,0.417797718 33.4471545,0.847273651 33.4471545,1.31203252 L33.4471545,17.3658537 C33.4476104,17.8304001 33.695613,18.2594917 34.0979107,18.4917851 C34.5002084,18.7240785 34.9958139,18.7243587 35.398374,18.4925203 L49.3017886,10.4653659 C49.7043087,10.2330106 49.9522787,9.8035507 49.9522787,9.33878049 C49.9522787,8.87401028 49.7043087,8.44455036 49.3017886,8.21219512 L35.398374,0.185365854 Z M35.398374,16.2396748 L35.398374,2.43902439 L47.3505691,9.3395122 L35.398374,16.2396748 Z"></path><polygon points="0 26.8585366 78.0487805 26.8585366 78.0487805 28.8097561 0 28.8097561"></polygon><path d="M6.0897561,33.5913821 L5.12861789,33.5913821 C4.5898035,33.5913821 4.15300813,34.0281775 4.15300813,34.5669919 C4.15300813,35.1058063 4.5898035,35.5426016 5.12861789,35.5426016 L6.0897561,35.5426016 C6.62857049,35.5426016 7.06536585,35.1058063 7.06536585,34.5669919 C7.06536585,34.0281775 6.62857049,33.5913821 6.0897561,33.5913821 L6.0897561,33.5913821 Z"></path><path d="M10.9678049,33.5913821 L10.0066667,33.5913821 C9.46785228,33.5913821 9.03105691,34.0281775 9.03105691,34.5669919 C9.03105691,35.1058063 9.46785228,35.5426016 10.0066667,35.5426016 L10.9678049,35.5426016 C11.5066193,35.5426016 11.9434146,35.1058063 11.9434146,34.5669919 C11.9434146,34.0281775 11.5066193,33.5913821 10.9678049,33.5913821 Z"></path><path d="M72.7564228,33.5913821 L19.902439,33.5913821 L19.902439,33.195122 C19.902439,32.6563076 19.4656437,32.2195122 18.9268293,32.2195122 C18.3880149,32.2195122 17.9512195,32.6563076 17.9512195,33.195122 L17.9512195,33.5913821 L16.5113821,33.5913821 C15.9725677,33.5913821 15.5357724,34.0281775 15.5357724,34.5669919 C15.5357724,35.1058063 15.9725677,35.5426016 16.5113821,35.5426016 L17.9512195,35.5426016 L17.9512195,35.9282927 C17.9512195,36.4671071 18.3880149,36.9039024 18.9268293,36.9039024 C19.4656437,36.9039024 19.902439,36.4671071 19.902439,35.9282927 L19.902439,35.5426016 L72.7564228,35.5426016 C73.2952372,35.5426016 73.7320325,35.1058063 73.7320325,34.5669919 C73.7320325,34.0281775 73.2952372,33.5913821 72.7564228,33.5913821 L72.7564228,33.5913821 Z"></path></g><path d="M75.476748,0.081300813 L4.52325203,0.081300813 C2.02701361,0.0830918922 0.00340682509,2.10538928 9.24283234e-15,4.60162602 L9.24283234e-15,60.1138211 C0.00349625203,62.6100207 2.02705068,64.6322658 4.52325203,64.6341463 L75.476748,64.6341463 C77.9729493,64.6322658 79.9965037,62.6100207 80,60.1138211 L80,4.60162602 C79.9965932,2.10538928 77.9729864,0.0830918922 75.476748,0.081300813 Z M4.52325203,2.03252033 L75.476748,2.03252033 C76.8958035,2.03323574 78.0464493,3.18257221 78.0487805,4.60162602 L78.0487805,14.5626016 L1.95121951,14.5626016 L1.95121951,4.60162602 C1.95355065,3.18257221 3.10419649,2.03323574 4.52325203,2.03252033 Z M75.476748,62.6829268 L4.52325203,62.6829268 C3.10419649,62.6822114 1.95355065,61.5328749 1.95121951,60.1138211 L1.95121951,16.5133333 L78.0487805,16.5133333 L78.0487805,60.1138211 C78.0464493,61.5328749 76.8958035,62.6822114 75.476748,62.6829268 L75.476748,62.6829268 Z" fill="#CCCCCC"></path></g>
        </svg>,
        title: "Online Education",
        desc: "Allow you to learn and experience anywhere, anytime",
        aos: "fade-right",
        aos2: "fade-left",
        delay: "3500"
    }
]   


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
                <Slider {...settings}>
                    {imgs.map((img, index) => (
                        <div key={index} className="img-con flex items-center w-full justify-center relative">
                            <img src={img.src} alt="" className=' object-fill'/>
                            {index > 0 ? (
                                <div className='absolute left-5 right-0 top-0 bottom-0 flex flex-col items-center justify-center'>
                                <h1 className="text-white text-3xl font-semibold tracking-widest md:text-5xl lg:text-7xl">{img.title}</h1>
                                <p className="text-white text-xs w-8/12 mt-5 p-2
                                md:text-lg lg:text-xl lg:w-6/12">{img.desc}</p>
                            </div>
                            ) : (<></>)}
                        </div>
                    ))}
                </Slider>
            </div>

            <div className='mt-20'>
                <div className=' max-w-screen-xl lg:max-w-screen-2xl mx-auto pl-9 pr-9'>
                    <div>
                        <div className='flex items-center gap-2 border-b border-gray-400 pb-3'>
                            <div className='text-xl tracking-wider font-medium md:text-2xl' data-aos="fade-right">Announcements</div>
                            <MdOutlineHorizontalRule className='text-4xl text-red-800' />
                        </div>

                        <div className='mt-7 md:flex md:justify-between md:gap-5 md:max-h-max md:overflow-auto md:pb-4'>
                            {announcements.map((anc, index) => (
                                <div key={anc.anc_id} data-aos="fade-up" data-aos-delay={`${index * 100}`} className={index === 0 ? "mb-6 md:w-96 md:shadow-lg md:mb-0 md:rounded" : "flex gap-5 pt-2 pb-2 border-b border-gray-300 md:flex-col md:shadow-lg md:rounded md:w-96"}>
                                    <div className={index === 0 ? "h-96 max-h-96 mb-4 md:w-full cursor-pointer overflow-hidden" : "overflow-hidden cursor-pointer md:h-96 md:max-h-96 md:w-full w-80"}>
                                        <img src={require(`../../../backend/anc_imgs/${anc.anc_img}`)} alt="" className='object-contain md:hover:scale-110 md:transit md:duration-500 md:ease-in-out w-full' />
                                    </div>
                                    <div className={index === 0 ? "md:pl-3 md:pr-3" : "text-start md:pl-3 md:pr-3"}>
                                        <div className='font-semibold text-red-800 text-lg'>{anc.anc_title}</div>
                                        <div className={index === 0 ? "truncate font-light" : "w-40 mt-3 md:truncate md:w-72"}>
                                            <div className="text-sm font-light leading-6 md:truncate">{anc.anc_desc}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="update-con md:mb-28 mt-20">
              <div className=' max-w-screen-xl lg:max-w-screen-2xl mx-auto pl-9 pr-9 flex flex-col gap-10 justify-center items-center
              md:flex-row'>
                {newsCon.map((con, index)=>(
                    <div
                    data-aos={window.innerWidth < 500 ? con.aos : con.aos2} data-aos-duration={con.delay} 
                    className='flex flex-col items-center w-full justify-center gap-4 md:flex-row' key={index}>
                        {con.svg}
                        <div className='text-center md:text-start'>
                            <h1 className=' font-semibold text-xl text-gray-800'>
                                {con.title}
                            </h1>
                            <div className=' font-light md:w-10/12'>{con.desc}</div>
                        </div>
                    </div>
                ))}
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
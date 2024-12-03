import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import '../styles/navbar.css'
import { Link, useLocation} from 'react-router-dom'
import '../styles/general.css'
import logo from '../imgs/Corazon/logo.png'
import axios from 'axios'
import ApiConfig from '../Config/localconfigapi'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navigation() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  let [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: false },
    { name: 'About', href: '/about', current: false },
    { name: 'Contact us', href: '/contact', current: false },
  ])
  const location = useLocation();

  useEffect(() => {
    const isUserLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) === true;
    setLoggedIn(isUserLoggedIn);

    const updatedNavigation = navigation.map(item => ({
        ...item,
        current: item.href === location.pathname,
    }));
    setNavigation(updatedNavigation);

    const fetchData = async () => {
      try {
        const account_id = JSON.parse(localStorage.getItem('accData'))[0].account_id;
        const response = await axios.get(`${ApiConfig.apiURL}countPendingForms`, {params: {account_id}});
        if(response.status === 200){
          setPendingCount(response.data[0].count);
        }
      } catch (e) {
        console.error("Error: ", e);
      }
    }
    fetchData();
  }, []); 

  const handleLogout = () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('accData');
      setLoggedIn(false);
      window.location.href = "/login";
  };

  return (
    <Disclosure as="nav" className="bg-white fixed w-full top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w px-2 sm:px-6 lg:px-8 shadow-lg">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white-00 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-10 w-auto"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <Link to={item.href} key={index}>
                      <div
                        className={classNames(
                          item.current ? 'bg-red-800 text-white' : 'text-red-700 hover:bg-red-800 hover:text-white',
                          'rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                      </div>
                    </Link>
                    ))}
                    {loggedIn && (
                      <Link to="/forms">
                          <div  className={classNames(
                          location.pathname === '/forms' ? 'bg-red-800 text-white' : 'text-red-700 hover:bg-red-800 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}>
                              Forms
                          </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-red-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600"
                >
                  <div className='absolute -top-1 -right-1 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center'
                  >{pendingCount}</div>
                  {/* <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span> */}
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                {loggedIn ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-transparent text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <div className="icon-profile">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Link to="/profile">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700')}
                                >
                                  Your Profile
                                </div>
                              )}
                            </Menu.Item>
                          </Link>

                          <Link to="/resetPass">
                            <Menu.Item>
                                {({ active }) => (
                                  <div
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700')}
                                  >
                                  Reset Password
                                </div>
                              )}
                            </Menu.Item>
                          </Link>

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={handleLogout}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700')}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                ) : (
                  <Link to='/login'>
                    <button className='pl-3 pr-3 pt-0.5 pb-0.5 rounded text-gray-700 text-base font-semibold tracking-wide bg-white border-gray-800 border ml-1
                    hover:bg-red-800 hover:text-white hover:border-white'>
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item, index) => (
                <Link key={index} to={item.href}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      item.current ? 'bg-red-800 text-white' : 'text-gray-700 hover:bg-red-800 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
              {loggedIn && (
                  <Link to="/forms">
                    <div
                      className={classNames(
                        location.pathname === '/forms' ? 'bg-red-800 text-white' : 'text-gray-700 hover:bg-red-800 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                    >
                      Forms
                    </div>
                  </Link>
                )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}


import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/logo/logo.png';
import SidebarLinkGroup from './SidebarLinkGroup';
import { FaArrowRight } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa6';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { MdAssignmentAdd } from 'react-icons/md';
import { MdBarcodeReader } from 'react-icons/md';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [open, setOpen] = useState(false);

  const menus = [
    { title: 'Dashboard', icon: <BiSolidDashboard /> },
    { title: 'Search', icon: <FaSearch /> },
    { title: 'Registration', icon: <MdAssignmentAdd /> },
    { title: 'Barcode', icon: <MdBarcodeReader /> },
  ];

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`  ${
        open ? ' w-60' : 'w-30'
      }  absolute no-scrollbar  left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-4 px-6 py-5.5 lg:py-6.5">
        <div className='flex items-center gap-4'>
          <img   src={Logo} alt="" className='max-w-13 ' />
          <span className={`text-white font-extrabold text-lg uppercase flex-nowrap ${open ? "block" :"hidden"} `}>MedTech  </span>
        </div>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block md:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>

        <button
          ref={trigger}
          onClick={() => setOpen(!open)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="hidden md:block"
        >
          {open ? <FaArrowLeft /> : <FaArrowRight />}
          
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <div
              className={`w-full flex ${
                open ? 'justify-start' : 'justify-center'
              } `}
            >
              <h3
                className={`mb-4  ${
                  open ? 'ml-4' : 'ml-0'
                } origin-left duration-500 text-sm font-semibold text-gray-200   `}
              >
                MENU
              </h3>
            </div>

            <ul className="pt-6">
              {menus.map((menu, index) => (
                <li
                  className={`group relative flex items-center ${!open ? "justify-center" : ""}  gap-2.5 rounded-sm py-2 px-4 mb-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
                  
                  
                  `}
                >
                  <div className="text-xl">{menu.icon}</div>

                  <span
                    className={`${
                      open ? 'block' : 'hidden'
                    } origin-left duration-1000 text-gray`}
                  >
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

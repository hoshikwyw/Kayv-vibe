import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../assets/constants";
import music from "../assets/music.png";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
  <div className=" mt-2">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
        className=" flex flex-row justify-start items-center my-8 text-sm font-semibold text-text-secondary hover:text-accent">
        <item.icon className=" w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [phviewOpen, setPhviewOpen] = useState(false);

  return (
    <>
      <div className=" md:flex hidden flex-col w-[220px] pt-5 pb-10 px-4 bg-secondary">
        <Link to={"/"}>
          <div className=" flex flex-col items-center justify-center cursor-pointer">
            <img
              src={music}
              alt=""
              className=" w-fit h-12 rounded-full object-contain"
            />
            <p className=" font-bold text-xl text-text-primary main-text">
              Oro's music
            </p>
          </div>
        </Link>
        <NavLinks />
      </div>
      <div className=" fixed md:hidden block top-4 right-3">
        {phviewOpen ? (
          <RiCloseLine
            className=" text-white mr-2 text-4xl"
            onClick={() => setPhviewOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className=" text-white mr-2 text-4xl"
            onClick={() => setPhviewOpen(true)}
          />
        )}
      </div>
      <div
        className={` absolute top-0 h-screen w-2/3 bg-gradient-to-r from-background-tertiary to-secondary/70 backdrop-blur-xl z-10 p-6 md:hidden smooth-transition ${
          phviewOpen ? "left-0" : "-left-full"
        }`}>
        <Link to={"/"}>
          <div className=" flex flex-col items-center justify-center cursor-pointer">
            <img
              src={music}
              alt=""
              className=" w-fit h-12 rounded-full object-contain"
            />
            <p className=" font-bold text-xl text-text-primary main-text">
              Oro's music
            </p>
          </div>
        </Link>
        <NavLinks handleClick={() => setPhviewOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;

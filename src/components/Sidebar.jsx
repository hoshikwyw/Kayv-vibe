import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../assets/constants";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { BsMusicNoteBeamed } from "react-icons/bs";

const NavLinks = ({ handleClick }) => (
  <div className="mt-5 flex flex-col gap-0.5">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-[10px] transition-all duration-150 ${
            isActive
              ? "bg-primary text-white"
              : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
          }`
        }
      >
        <item.icon className="w-[18px] h-[18px]" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-9 h-9 bg-primary rounded-[10px] border-2 border-border shadow-retro-sm flex items-center justify-center">
      <BsMusicNoteBeamed className="text-white text-sm" />
    </div>
    <div>
      <h1 className="font-bold text-base text-text-primary leading-tight tracking-tight">
        Music Player
      </h1>
      <p className="text-[9px] text-text-muted font-retro-mono tracking-wider">RETRO VIBES</p>
    </div>
  </div>
);

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="md:flex hidden flex-col w-[210px] min-h-screen bg-card border-r-2 border-border">
        <Link to="/" className="block px-4 pt-5 pb-1">
          <Logo />
        </Link>
        <div className="px-2.5 flex-1">
          <NavLinks />
        </div>
        <div className="px-4 py-3 border-t border-border/20">
          <p className="text-[9px] text-text-muted font-retro-mono text-center tracking-wider">v1.0.0</p>
        </div>
      </div>

      {/* Mobile Button */}
      <div className="fixed md:hidden top-3 right-3 z-20">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 flex items-center justify-center bg-card border-2 border-border rounded-[10px] shadow-retro-sm"
        >
          {mobileOpen ? (
            <RiCloseLine className="text-text-primary text-lg" />
          ) : (
            <HiOutlineMenu className="text-text-primary text-lg" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 h-screen w-[240px] bg-card border-r-2 border-border z-20 p-4 md:hidden smooth-transition ${
          mobileOpen ? "left-0" : "-left-full"
        }`}
      >
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <Logo />
        </Link>
        <NavLinks handleClick={() => setMobileOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;

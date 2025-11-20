"use client";
import { MenuIcon, Sprout } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data } = useSession();
  const user = data?.user;
  const Menu = () => {
    return (
      <>
        <li>
          <Link href={"/inventory"}>Inventory</Link>
        </li>
        <li>
          <Link href={"/how-it-works"}>How It Works</Link>
        </li>
        <li>
          <Link href={"/sustainable-practices"}>Sustainable Practices</Link>
        </li>
        {user && (
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
        )}
      </>
    );
  };
  return (
    <div className="navbar bg-nav-panel dark:bg-[#2F362D] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MenuIcon />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Menu()}
          </ul>
        </div>
        <Link
          href={"/"}
          className="md:text-xl font-bold flex gap-1 items-center"
        >
          {" "}
          <Sprout size={25} />
          Eco Plates
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-semibold text-xl">{Menu()}</ul>
      </div>
      <div className="navbar-end gap-1.5">
        {!user ? (
          <>
            <Link
              href="/login"
              className="px-3 py-1.5 border border-primary-btn-bg rounded-2xl font-semibold text-lg"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 rounded-2xl font-semibold text-lg bg-primary-btn-bg text-primary-btn-text"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-2xl font-semibold text-lg bg-primary-btn-bg text-primary-btn-text"
            >
              Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

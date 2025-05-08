"use client";
import Header, { HeaderLink, HeaderLogo, HeaderSection, Scrolled, Static } from "./components/Header";


import { useEffect, useState } from "react";
import Slide from "./components/Slide";
import Animate from "./components/Animate";
import { getSlide, slideId } from "./utils/scroller";


export default function Home() {

  return (
    <main>
      
    </main>
  );
}


export function Logo() {
  return <svg width={30} height={30} style={{ display: "inline-block" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><circle cx="181.55" cy="264.16" r="104.55" style={{ fill: "none", stroke: "white", strokeMiterlimit: 10, strokeWidth: 41 }} /><path d="M318.45,158.79a104.14,104.14,0,0,0-68.93,26,104.47,104.47,0,0,1,1,158,104.53,104.53,0,1,0,68-183.94Z" style={{ fill: "none", stroke: "white", strokeMiterlimit: 10, strokeWidth: 41 }} /></svg>;
}

export function Inner() {
  return <div style={{ height: "110vh" }}></div>;
}
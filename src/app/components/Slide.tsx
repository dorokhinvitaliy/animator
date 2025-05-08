"use client";
import React, { useEffect, useRef, useState } from "react";
import "@/app/components/slide.css";
import { cls } from "../utils/parseClass";
export default function Slide({id, duration, children}:{id: Number, duration: Number, children: React.ReactNode}){
    const slideRef = useRef(null);
    const [isActive, isActiveUpdate] = useState(false);
    const [progress, progressUpdate] = useState(0);

    function inRange(el:Number, from:Number, to:Number){
        return (el >= from) && (el <= to)
    }

    useEffect(()=>{
        document.addEventListener("scroll", (e)=>{
            isActiveUpdate(inRange((window.pageYOffset - slideRef.current.offsetTop) / (slideRef.current.scrollHeight - document.documentElement.clientHeight), 0, 1));
            progressUpdate(Number((window.pageYOffset - slideRef.current.offsetTop) / (slideRef.current.scrollHeight - document.documentElement.clientHeight)));

        });
        
    },[]);

    return <div ref={slideRef} data-id={id} data-progress={progress} className={cls({slideWrapper: true, active: isActive})} style={{height: `${duration*100}vh`}}>
        <div className="slideInner">
            {children}
        </div>
    </div>;
}
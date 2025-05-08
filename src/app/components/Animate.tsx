"use client";
import React, { useEffect, useRef, useState } from "react";
import { cloneElement } from "react";

export default function Animate({ progress, children, animations, transitions }: { progress: Number, children: React.ReactNode, animations?: any, transitions?: any }) {
    const animateRef = useRef(null);
    const [slideProgress, slideProgressUpdate] = useState(0);
    const [slideParent, slideParentUpdate] = useState(null);
    const [style, styleUpdate] = useState({});
    /* 
    {
                    marginLeft: {
                      from: 0.2,
                      to: 0.6,
                      phase: {
                        start: 0,
                        stop: 0.7
                      }
                    }
                  }
    */

    function beetwen(val: Number, a: Number, b: Number) {
        if ((val >= a) && (val <= b)) {
            return true;
        } else {
            return false;
        }
    }

    function generateStyles() {
        var local_style = {};
        for (const key in transitions) {
            if (slideProgress <= Number(transitions[key]["phase"]["start"])) {
                local_style[key] = Number(transitions[key]["phase"]["start"]);
            } else if (slideProgress >= Number(transitions[key]["phase"]["stop"])) {
                local_style[key] = Number(transitions[key]["phase"]["stop"]);
            } else {
                var res = (slideProgress - Number(transitions[key]["phase"]["start"])) / (Number(transitions[key]["phase"]["stop"]) - Number(transitions[key]["phase"]["start"]));
                local_style[key] = Number(transitions[key]["phase"]["start"]) + (Number(transitions[key]["phase"]["stop"]) - Number(transitions[key]["phase"]["start"])) * res;
            }
            local_style[key] = Number(transitions[key]["phase"]["start"]);
        }
        styleUpdate(local_style);
        console.log(local_style, slideProgress);
    }

    function findSlideParent(obj: any) {
        if (obj.className == "slideWrapper") {
            return obj
        }
        return findSlideParent(obj.parentNode);

    }

    useEffect(() => {
        slideParentUpdate(findSlideParent(animateRef.current));
        console.log(findSlideParent(animateRef.current));
    }, []);

    function test() {
        slideProgressUpdate(slideParent?.dataset.progress)
        /* console.log(slideParent); */
    }

    useEffect(() => {
        document.addEventListener("scroll", (e) => {
            test();
            generateStyles();
        });

    });

    const clonedElement = cloneElement(
        children,
        {
            ...children.props,
            style: style,
            ref: animateRef,
            progress: slideProgress
        }
    );

    return <>
        {clonedElement}
    </>
        ;
}
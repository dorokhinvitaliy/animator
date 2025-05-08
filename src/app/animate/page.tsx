"use client";
import classNames from "../../../node_modules/classnames/index";
import styles from "./page.module.css";
import { useState } from "react";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Option from "@/components/Input/types.ts";
import { SelectBox } from "@/components/Input/SelectBox";
export default function Home(){
    
    const [headerSticky, headerStickyUpd] = useState(true);

    const options: Option[] = [{id: 1, text: "lol"}, {id: 2, text: "lol2"}];
    const [selected, changeSelected] = useState(null);

    const [option, updateOption] = useState(null);

    const [field, updateField] = useState("312");
    
    function scrollerEvent(e: any) {
      const offset = window.pageYOffset
      if (offset > 0) {
        headerStickyUpd(true)
      } else {
        headerStickyUpd(false)
      }
    }

    return <div onWheel={(e)=>scrollerEvent(e)} style={{paddingTop: "6rem"}}>
        <Header active={ headerSticky } />
        <div style={{margin: "0 auto", maxWidth: "800px"}}>
        <Input id={"lol"} value={field} onChange={(value: any)=>updateField(value)}></Input>
        <h1>{field}</h1>
        
        <SelectBox options={options} selected={selected} placeholder={"Выберите подходящий вариант"} onChange={(val: any)=>changeSelected(val)} />

        </div>
        
    </div>;
}

export function Inner(){
    return <div className={classNames(styles.inner)}>
        1343143
    </div>;
}


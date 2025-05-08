"use client";
import React, { useState } from "react";
import classNames from "../../../../node_modules/classnames/index";

import styles from "./Input.module.css";

import Option from "./Input/types.ts";

export function SelectBox({options, selected, placeholder, onChange}: {options: Option[], selected: Option, placeholder: String, onChange: any}){
    const [focused, updateFocused] = useState(false);
    const [empty, updateEmpty] = useState(selected==null);
    return <div className={styles.selectBox_container}>
        <div className={classNames(styles.inputBox, styles.selectBox, {[styles.active]: focused, [styles.empty]: empty})}>
            <div className={styles.inputBoxLabel}>{placeholder}</div>
            <div className={styles.inputBoxField}>{selected?.text}</div>
        </div>
        <div className={styles.selectBox_options}>
            {options.map((option)=>(
                <div key={"option_"+option.id} className={styles.selectBox_option} onClick={()=>{onChange(option);updateEmpty(false)}}>{option.text}</div>
            )
            )}
            
        </div>
    </div>;
}
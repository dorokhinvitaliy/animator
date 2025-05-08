"use client";
import React, { useState } from "react";
import classNames from "../../../../node_modules/classnames/index";

import styles from "./Input.module.css";

export default function Input({id, value, onChange, placeholder="Поле ввода"}:{id: any, value: any, onChange: any, placeholder: String}){
    const [focused, updateFocused] = useState(false);
    const [empty, updateEmpty] = useState(value=="");
    return <div className={classNames(styles.inputBox, {[styles.active]: focused, [styles.empty]: empty})}>
        <label htmlFor={id} className={styles.inputBoxLabel}>{placeholder}</label>
        <input id={id} value={value} onChange={(e)=>{onChange(e.target.value);updateEmpty(e.target.value=="")}} onFocus={(e)=>updateFocused(true)} onBlur={(e)=>updateFocused(false)} className={styles.inputBoxField} />
    </div>;
}
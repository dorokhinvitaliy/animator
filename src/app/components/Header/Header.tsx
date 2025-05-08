import React from "react";
import classNames from "../../../../node_modules/classnames/index";
import styles from "./Header.module.css";
export default function Header({active}:{active: boolean}){
    function Logo({children}:{children:React.ReactNode}){
        return <div className={classNames(styles.headerSpan, styles.logo)}>{ children }</div>;
    }

    function Span({children}:{children:React.ReactNode}){
        return <div className={classNames(styles.headerSpan)}>{ children }</div>;
    }

    function Group({children}:{children:React.ReactNode}){
        return <div className={styles.headerGroup}>{children}</div>
    }



    return <div className={classNames(styles.header, {[styles.active]: active})}>
        <Logo>Company</Logo>
        <Group><Span>Span</Span><Span>Span</Span><Span>Span</Span></Group>
    </div>;
}
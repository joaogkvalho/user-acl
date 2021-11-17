import router from "next/router"
import { useContext, useEffect } from "react"
import { Header } from "../../components/Header"
import { HomepageContent } from "../../components/HomepageContent"
import { SidebarNav } from "../../components/SidebarNav"
import { AuthContext } from "../../contexts/authContext"

import styles from './styles.module.scss'

export default function Homepage(){
    let { user } = useContext(AuthContext)

    if(!user){
        router.push('/')
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />

                <div className={styles.pageContent}>
                    <SidebarNav />
                    <HomepageContent />
                </div>
            </div>
        </div>
    )
}
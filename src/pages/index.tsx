import Link from "next/link"

import styles from './home.module.scss'

export default function Home() {
  return (
    <div className={styles.signInBox}>
      <h1>user ACL</h1>

      <form className={styles.signInForm}>
          <input type="email" placeholder="Digite seu email" />
          <input type="password" placeholder="Digite sua senha" />

          <button>
              Entrar
          </button>
      </form>

      <div className={styles.separator}>
          ou
      </div>

      <Link href="/signup">
        <button className={styles.signUpButton}>Cadastre-se</button>
      </Link>
    </div>
  )
}

import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import * as yup from 'yup'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'

import Link from "next/link"
import 'react-toastify/dist/ReactToastify.css'

import styles from './home.module.scss'

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function Home() {
  const { handleSignIn } = useContext(AuthContext)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const { errors } = formState  

  return (
    <div className={styles.signInBox}>
      <h1>user ACL</h1>

      <form className={styles.signInForm} onSubmit={handleSubmit(handleSignIn)}>
          <input
            type="email"
            placeholder="Digite seu email"
            name="email"
            {...register('email')} 
          />
          <span>{errors.email?.message}</span>
          <input
            type="password"
            placeholder="Digite sua senha"
            name="password"
            {...register('password')} 
          />
          <span>{errors.password?.message}</span>

          <button>
              Entrar
          </button>

          <div className={styles.separator}>
            ou
          </div>

          <Link href="/signup">
            <button className={styles.signUpButton}>Cadastre-se</button>
          </Link>
      </form>

      <ToastContainer />
    </div>
  )
}

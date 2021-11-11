import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

import Link from "next/link"
import 'react-toastify/dist/ReactToastify.css'

import styles from './home.module.scss'
import { api } from '../services/api'

type SignInFormData = {
  email: string;
  password: string;
}

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function Home() {
  const router = useRouter()

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const { errors } = formState  

  async function handleSignIn(data: SignInFormData){
        const dataFormatted = {
          email: data.email,
          password: data.password
        }

        const toastGeneralError = () => toast.error('Erro interno no servidor', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        })

        const toastWrongDataError = () => toast.error('Email ou senha incorretos', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        })

        try{
          await api.post('auth/sign-in', dataFormatted)

          router.push('homepage')
        } catch(err){
          if(err.response?.status === 401){
            toastWrongDataError()
          } else {
            toastGeneralError()
          }
        } 
  }

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

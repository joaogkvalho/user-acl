import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import * as yup from 'yup'

import Link from "next/link"

import styles from './home.module.scss'

type SignInFormData = {
  email: string;
  password: string;
}

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const { errors } = formState  

  const handleSignIn: SubmitHandler<SignInFormData> = (data) => {
      console.log(data)
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

import Link from 'next/link'

import styles from './styles.module.scss'

export default function Signup() {
    return(
        <div className={styles.signupFormWrapper}>
            <h1>Faça o seu cadastro</h1>

            <form className={styles.signupForm}>
                <h2>Dados Pessoais</h2>
                <div className={styles.personalData}>                    
                    <input type="text" id="nameInput" name="name" placeholder="Nome" />                    
                    <input type="email" id="emailInput" name="email" placeholder="Email" />                    
                    <input type="password" id="passwordInput" name="password" placeholder="Senha" />                     
                    <input type="text" id="cpfOrCnpjInput" name="cpfOrCnpj" placeholder="CPF / CNPJ" />
                </div>

                <h2>Informações de endereço</h2>
                <div className={styles.adressData}>                    
                    <input type="text" id="adressInput" name="adress" placeholder="Endereço" />                    
                    <input type="text" id="complementInput" name="complement" placeholder="Complemento" /> 

                    <input type="text" id="stateInput" name="state" placeholder="Estado" />                     
                    <input type="text" id="cityInput" name="city" placeholder="Cidade" />

                    <input type="text" id="countryInput" name="country" placeholder="País" />                     
                    <input type="text" id="cepInput" name="cep" placeholder="CEP" />
                </div>

                <div className={styles.formButtons}>
                    <button type="submit">Cadastrar</button>

                    <Link href="/">
                        <button>Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}





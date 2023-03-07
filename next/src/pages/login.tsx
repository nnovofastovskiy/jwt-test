import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import axios from 'axios'
import { InputHTMLAttributes, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import Header from '@/layout/Header/Header'

export default function Login() {
    const { login, refresh, getUser, user, accessToken } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [accessToken, setAccessToken] = useState('');

    const router = useRouter();

    const getEmail = (event: React.FormEvent<HTMLInputElement>) => {
        const email = event.currentTarget.value;
        setEmail(email);
        console.log(email);
    }

    const getPassword = (event: React.FormEvent<HTMLInputElement>) => {
        const pass = event.currentTarget.value;
        setPassword(pass);
        console.log(pass);
    }


    const submitHandler = async (e: any) => {
        e.preventDefault();
        const res = await login(email, password);
        if (res === 200) router.push('/profile');
    }

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Header />

                <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
                    <label htmlFor="email">
                        email
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            id="email"
                            onChange={getEmail}
                            onPaste={getEmail}
                        />
                    </label>
                    <label htmlFor="password">
                        password
                        <input
                            className={styles.input}
                            type="password"
                            name="password"
                            id="password"
                            onChange={getPassword}
                            onPaste={getPassword}
                        />
                    </label>
                    <input
                        className={styles.input}
                        type="submit"
                        value="Login"
                        id="submit"
                    />
                </form>
                <hr />
                <button onClick={refresh}>refresh</button>
                <button onClick={() => accessToken && getUser(accessToken)}>getUser</button>
                <hr />
                <span>{JSON.stringify(accessToken, null, 4)}</span>
                <span>{JSON.stringify(user, null, 4)}</span>
            </main>
        </>
    )
}



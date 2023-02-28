import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import axios from 'axios'
import { InputHTMLAttributes, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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


    const submitHandler = async (e) => {
        e.preventDefault();
        // const data = await axios.post('http://localhost:1337/api/auth/local', { identifier: email, password: password })
        const data = await axios({
            method: 'POST',
            url: 'http://localhost:1337/api/auth/local',
            withCredentials: true,
            data: {
                identifier: email,
                password: password
            }
        });
        console.log('submit');
        console.log(data);
        if (data.status === 200) {
            router.push('/profile')
        }
    }

    const refresh = async () => {
        // const data = await axios.post('http://localhost:1337/api/token/refresh');
        const data = await axios({
            method: 'POST',
            url: 'http://localhost:1337/api/token/refresh',
            withCredentials: true
        });
        console.log(data);
        console.log('refresh');
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
                <Link
                    href={process.env.NEXT_PUBLIC_DOMAIN + "/"}
                >
                    HOME
                </Link>
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
                            ref={passwordRef}
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
            </main>
        </>
    )
}

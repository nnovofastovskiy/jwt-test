import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Header from '@/layout/Header/Header'

export default function Profile() {
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Header />

            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    console.log(context);

    return {
        props: {}, // will be passed to the page component as props
    }
}
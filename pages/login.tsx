import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@mui/material/Button'

const inter = Inter({ subsets: ['latin'] })

export default function LoginPage() {

  const handleClick = () => {
    // Function code here
    alert("Button Clicked!");
  };

  return (
    <>
      <Head>
        <title>LoginPage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <Button onClick={handleClick} variant="contained" color="primary">
            Login me
          </Button>
        </div>
      </main>
    </>
  )
}

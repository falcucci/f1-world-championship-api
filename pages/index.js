import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    const getHome = async () => {
      const res = await axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        url: `api/hello`,
      });
      if (res.status === 200) {
        console.log(res.data, "Hello");
      }
    };
    // const getCountryByNationality = async () => {
    //   const res = await axios({
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     url: `api/getCountryByNationality`,
    //     data: JSON.stringify({ nationality: "Australian" }),
    //   });
    //   if (res.status === 200) {
    //     console.log(res.data, "Data by Nationality");
    //   }
    // };
    // const getCountryByName = async () => {
    //   const res = await axios({
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     url: `api/getFlagUrlByCountryName`,
    //     data: JSON.stringify({ countryName: "Australia" }),
    //   });
    //   if (res.status === 200) {
    //     console.log(res.data, "Data by Name");
    //   }
    // };
    // const getCountryByISO2 = async () => {
    //   const res = await axios({
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     url: `api/getFlagUrlByISO2Code`,
    //     data: JSON.stringify({ iso2Code: "AU" }),
    //   });
    //   if (res.status === 200) {
    //     console.log(res.data, "Data by ISO 2 Code");
    //   }
    // };
    //
    // const getCountryByISO3 = async () => {
    //   const res = await axios({
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     url: `api/getFlagUrlByISO3Code`,
    //     data: JSON.stringify({ iso3Code: "AUS" }),
    //   });
    //   console.log(res, "single country by name");
    //   if (res.status === 200) {
    //     console.log(res.data, "Data by ISO 3 Code");
    //   }
    // };
    try {
      getHome();
      // getCountryByNationality();
      // getCountryByName();
      // getCountryByISO2();
      // getCountryByISO3();
    } catch (e) {
      console.log('e: ', e);
      // setAllCountries([]);
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Country Flags</title>
        <meta name='description' content='Get country flags' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Country Flags Serverless Functions!</h1>
      </main>

      <footer className={styles.footer}>
        <a href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' target='_blank' rel='noopener noreferrer'>
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

'use client';
import styles from "./page.module.css";
import { useEffect } from 'react';

export default function Home() {
  
  useEffect(() => {
    const redirectTo = "/Links";
    const redirectTimeout = setTimeout(() => {
      window.location.href = redirectTo;
    }, 500); // Adjust the time delay as needed
    
    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(redirectTimeout);
  }, []); // Empty dependency array to run only once on component mount



  return (
    <main className={styles.main}>
    </main>
  );
}


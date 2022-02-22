import React from 'react';
import styles from "../styles/Footer.module.css";
import Link from 'next/link'

const Footer = () => {
  return <div className={styles.footer}>

      <div className={styles.ourMotive}>
         <div className={styles.logo}>
           <Link href="/" passHref>
              <h1 className={styles.logo}>
                GYAN <span className={styles.logo_span}>PARK</span>
              </h1>
           </Link> 
         </div>
         <p className={styles.logo_slogan}>
             Discovering the way of life...
         </p>
      </div>

  <div className={styles.footerItems}>
      <div className={styles.explore}>
         <p className={styles.footerTitle}>
             Explore
         </p>
         <div className={styles.exploreItems}>
           <Link href='/' passHref>
           <p className={styles.exploreItem}> Home </p>
           </Link>
          
            <Link href='/store' passHref>
            <p className={styles.exploreItem}> Store </p>
             </Link>

             <Link href='/blog' passHref>
            <p className={styles.exploreItem}> Blog </p>
             </Link>
           
            <Link href='/ebook' passHref>
            <p className={styles.exploreItem}> Ebook </p>
             </Link>
           
            <Link href='/board-question' passHref>
            <p className={styles.exploreItem}> Question Paper </p>
             </Link>
           
            <Link href='/contest' passHref>
            <p className={styles.exploreItem}> Contest </p>
             </Link>
            
            <Link href='/about-us' passHref>
            <p className={styles.exploreItem}> About us </p>
             </Link>
        
            <Link href='/contact-us' passHref>
            <p className={styles.exploreItem}> Contact us </p>
             </Link>
           
         </div>
      </div>

      <div className={styles.followUs}>
         <p className={styles.footerTitle}>
             Follow us
         </p>
         <div className={styles.socialMediaLists}>
             <Link href='https://www.facebook.com/GyanPark-100766589216827/?notif_id=1645189900053041&notif_t=page_fan&ref=notif' passHref>
              <div className={styles.socialMediaList}>
                 <div className={styles.icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>                
                 </div>
                 <p className={styles.exploreItem}>
                     Facebook
                 </p>
              </div>
             </Link>

             <Link href='https://www.instagram.com/gyanpark49/' passHref>
               <div className={styles.socialMediaList}>
                 <div className={styles.icon}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>               
                 </div>
                 <p className={styles.exploreItem}>
                     Instagram
                 </p>
               </div>
             </Link>
         </div>
      </div>

      <div className={styles.contactUs}>
        <p className={styles.footerTitle}>
            Contact us
        </p>
        <div className={styles.contactLists}>
            <div className={styles.contactList}>
               <div className={styles.icon}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg>
               </div>
               <p className={styles.exploreItem}>
                   9807717694
               </p>
            </div>

            <div className={styles.contactList}>
               <div className={styles.icon}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>              
               </div>
               <p className={styles.exploreItem}>
                  gyanpark49@gmail.com
               </p>
            </div>

            <div className={styles.contactList}>
               <div className={styles.icon}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>               
               </div>
               <p className={styles.exploreItem}>
                  Sitapaila, Kathmandu
               </p>
            </div>
        </div>
        </div>
      </div>
  </div>;
};

export default Footer;

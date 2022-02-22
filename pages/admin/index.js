import styles from "../../styles/AboutUs.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from 'next/link'
import React,{useContext, useEffect } from "react";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";

const Admin = () => {

  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(()=>{
    if(!userInfo){
      router.push('/user/login');     
    }
    if(userInfo?.isAdmin == false){
      router.push('/user/login');
    }
  },[userInfo,router])

  return <div className={styles.admin}>
     <Navbar />
      <div className={styles.adminLink}>
      <Link href='/admin/getAllUsers' passHref>
          <button className={styles.adminLinkBtn}>
               Get All Users
           </button>
        </Link>

        <Link href='/admin/getAllOrders' passHref>
          <button className={styles.adminLinkBtn}>
               Get All Orders
           </button>
        </Link>

        <Link href='/admin/create-contest' passHref>
          <button className={styles.adminLinkBtn}>
               Create Contest
           </button>
        </Link>

        <Link href='/admin/create-product' passHref>
          <button className={styles.adminLinkBtn}>
               Create Product
           </button>
        </Link>

        <Link href='/admin/create-blog' passHref>
          <button className={styles.adminLinkBtn}>
               Create Blog
           </button>
        </Link>

        <Link href='/admin/generate-token' passHref>
          <button className={styles.adminLinkBtn}>
               Generate Token
           </button>
        </Link>

        <Link href='/admin/update-product' passHref>
          <button className={styles.adminLinkBtn}>
               Update Product
           </button>
        </Link>

        <Link href='/admin/update-question-paper' passHref>
          <button className={styles.adminLinkBtn}>
               Update Question Paper
           </button>
        </Link>

        <Link href='/admin/upload-ebook' passHref>
          <button className={styles.adminLinkBtn}>
               Upload Ebook
           </button>
        </Link>

        <Link href='/admin/upload-question-paper' passHref>
          <button className={styles.adminLinkBtn}>
               Upload Qiestion Paper
           </button>
        </Link>

      </div>
      <Footer />
  </div>;
};

export default Admin;

import React, { useContext, useState } from "react";
import ImageSlider from "../../../../components/ImageSlider";
import Navbar from "../../../../components/Navbar"
import Footer from "../../../../components/Footer"
import LoadingBar from "../../../../components/LoadingBar"
import ReviewCard from "../../../../components/ReviewCard";
import SubmitReviewDialogue from "../../../../components/SubmitReviewDialogue";
import Product from "../../../../models/Product";
import styles from "../../../../styles/ProductDetail.module.css";
import db from "../../../../utils/db";
import { Store } from "../../../../utils/store";
import { useRouter } from "next/router";
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head'
  
const SingleProduct = ({product}) => {
  const router = useRouter();
    const [opening, setOpening] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [reviewDialog, setReviewDialog] = useState(false);
    const [message,setMessage] = useState('')
    const [itemQuantity,setItemQuantity] = useState(1);
    const [loading,setLoading] = useState(false);
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const handleCross = () => {
      setOpening(false);
      setLoginPopup(false);
      setReviewDialog(false);
      setMessage('')
    };

    const handleReviewBtn = ()=>{
      if(!userInfo){
        setOpening(true)
        setLoginPopup(true)
      }else{
        setOpening(true)
        setReviewDialog(true)
      }    
    }

    const redirectLogin = ()=>{
      router.push(`/user/login?redirect=/store/product/product-details/${product._id}`);
    }
    const handleDecreaseQty = ()=>{
      if(itemQuantity===1){
        return;
      }
      setItemQuantity(itemQuantity-1);
    }

    const addToCartHandler = async (product) => {
      if(!userInfo){
        setLoginPopup(true)
      }else{
        try{
          setLoading(true)
           const {data} = await axios.post('/api/cart/add-item',{
             user: userInfo._id,
             productId: product._id,
             quantity: itemQuantity,
             productName: product.name,
             productImage: product.images[0],
             productPrice: product.price
           });
           if(data){
            setLoading(false)
            setMessage('Added to cart')
           }
        }
        catch(err){
          console.log(err);
          setLoading(false);
          setMessage('failed to add to cart')
        }
      }   
    };

    const handleBuyBtn = (product)=>{
      if(!userInfo){
        setLoginPopup(true)
      }else{
        dispatch({ type: 'BUY_ITEM', payload: {product,itemQuantity } });
        router.push('/checkout/shipping-info');
      }
    }

    return (
        <div className={styles.singleProduct}>
         <Head>
           <title> {product?.name} </title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
        {opening &&  <div style={{opacity:"60%",zIndex:"12",position:"absolute",width:"100%",height:"400vh",backgroundColor:"grey"}}></div>}
          
            <Navbar />
            {
              message && 
              <div className={styles.loginDialog}>
                        { message }
                        <div onClick={handleCross} className={styles.cross}>
                          <div className={styles.line1}></div>
                          <div className={styles.line2}></div>
                        </div>
                      </div>
            }
            {
              product && 
              <div className={styles.singleProduct_details}>
                <div className={styles.singleProduct_details_imageSlider}>
                <ImageSlider slides={product.images} />
                </div>
                <div className={styles.singleProduct_details_info}>
                    <h2 className={styles.singleProduct_title}>{product.name}</h2>
                    <p className={styles.singleProduct_id}>{product._id}</p>
                    <p className={styles.singleProduct_price}>Rs. {product.price}</p>
                    <div className={styles.singleProduct_addToCart}>
                       <button className={styles.increase_btn} onClick={handleDecreaseQty}>-</button>
                         <span className={styles.singleProduct_qty}>{ itemQuantity }</span>
                       <button className={styles.decrease_btn} onClick={()=> setItemQuantity(itemQuantity+1)}>+</button>
                       <button disabled={loading === true ? true : false} onClick={()=>addToCartHandler(product)} className={styles.addToCart_btn} >
                          {
                            loading === true ? <LoadingBar /> : 'Add to Cart'
                          }
                       </button>
                    </div>
                    <p className={styles.singleProduct_status}>
                      Status:<span className={styles.singleProduct_status_span}> Instock</span>
                    </p>
                    <button onClick={()=>handleBuyBtn(product)} className={styles.buyBtn}>
                        Buy
                    </button>
                    <p className={styles.singleProduct_description}>
                      <span className={styles.singleProduct_description_span}>Description:</span> {product.description}
                    </p>
                    {
                      product.author &&  
                      <p className={styles.singleProduct_author}>
                       <span className={styles.singleProduct_author_span}>Author:</span> {product.author}
                      </p>
                    }
                    {
                      product.publication &&  
                      <p className={styles.singleProduct_publication}>
                       <span className={styles.singleProduct_publication_span}>Publication:</span> Oracle
                      </p>
                    }
                   
                </div>
            </div>
            }
            <div className={styles.singleProduct_submitReview}>
                    <button onClick={handleReviewBtn} className={styles.singleProduct_submitReview_btn}>
                        Submit Review
                    </button>
                    {reviewDialog && <SubmitReviewDialogue cancel={handleCross} />}
                    {
                      loginPopup && 
                      <div className={styles.loginDialog}>
                        <h3>Please Login first</h3>
                    
                           <button onClick={redirectLogin} style={{padding:'8px 12px',border:'none',borderRadius:'5px',backgroundColor:'blue',color:'white',fontWeight:'550',letterSpacing:'1.3px',marginTop:'10px'}}>
                             Login
                           </button>
                           <p style={{marginTop:"15px"}}>
                             Don&apos;t have account?
                             <Link href="/user/signup">
                                 signUp
                             </Link>
                           </p>
                        
                        <div onClick={handleCross} className={styles.cross}>
                          <div className={styles.line1}></div>
                          <div className={styles.line2}></div>
                        </div>
                      </div>
                    }
                    <div className={styles.submit_review_dialogue_box}>
                        
                    </div>
                </div>
           {
             product?.reviews ?
             <div className={styles.singleProduct_review}>
                
                <div className={styles.singleProduct_reviews}>
                  {
                    product.reviews.map((review,i)=>(
                      <ReviewCard 
                        key={i}
                        reviewUser_name={review.name}
                        reviewUser_opinion={review.comment}
                        userReviewRating={review.rating}
                    />
                    ))
                  }
                </div>
            </div>
            : <h2 style={{fontFamily:'monospace',marginTop:'30px'}}>No review yet for this product</h2>
           }
           <Footer />
        </div>
    )
}

export async function getStaticProps(ctx) {
  const pid = await ctx.params?.pid;

  await db.connect();
  const item = await Product.findById(pid).lean();
  await db.disconnect();
  const product = db.convertDocToObj(item);
  const productDetails = {
    _id: product._id,
    name: product.name,
    category: product.category,
    images: product.images,
    price: product.price,
    description: product.description,
    stock: product.countInStock,
    reviews: product.reviews?.map(review=> {return {
      name: review.name,
      rating: review.rating,
      comment: review.comment
    }})
  }
   return {
     props: {
       product: productDetails
     },
     revalidate: 10
   }
 }

 export async function getStaticPaths() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    paths: products.map(product=>{
      return { params: { pid: product._id.toString() } }
    }),
    fallback: true 
  };
}

export default SingleProduct;


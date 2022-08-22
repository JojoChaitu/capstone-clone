import React, { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";
import data from '../Assets/decor-data';
import  { AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai'
import axios from 'axios';

const SingleProduct = () => {
    const { productId } = useParams()
    // const [products,setProducts] = useState([])
    const [product,setProduct] = useState([])


    useEffect(() => {
        axios
        .get(`http://localhost:3001/viewsingleproduct/${productId}`)
        .then((res) => {
          console.log(res.data,'res');
            setProduct(res.data)
          });
        }, [])
        // console.log(product);

  const handleWishlist = () => {

      axios.post(`http://localhost:3001/addtowishlist/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }
    const addToCart = () => {

      axios.post(`http://localhost:3007/addtocart/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }

  return (
    product.map((item)=>{
          return <div className='container prodkt-container'>
      <div className='row'>
          <div className='prodkt-display col'>
              <img src={item.image} className="prodkt-image-lg"></img>
          </div>
          <div className='prodkt-details col'>
                <h1>{item.title}</h1>
                {/* <h5></h5> */}
                <h5>${item.price}</h5>
                <p className='desc'>{item.description}</p>
                <div className='grid-container'>
                   <span>Available :</span>
                   <p>{item.quantity} items left !</p>
                   <span>Brand :</span>
                   <p>Green</p>
                </div>
                <hr/>
                <section>
                  {/* <div className='controller'>
                    <div><AiOutlinePlus/></div>
                    <span className='number'>1</span>
                    <div><AiOutlineMinus/></div>
                  </div> */}
                  <div className='buttons-sp'>
                  <button onClick={handleWishlist} className='btn btn-info'>ADD TO WISHLIST</button>
                    <button onClick={addToCart} className='btn btn-outline-dark'>ADD TO CART</button>
                    <button className='btn btn-info'>BUY NOW</button>
                  </div>
                </section>
          </div>
      </div>
    </div>
    })
  )
}

export default SingleProduct

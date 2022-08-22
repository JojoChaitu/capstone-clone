import React,{useState,useEffect} from 'react'
import {FaTrash} from 'react-icons/fa'
import data from '../Assets/decor-data'
import  { AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai'
import  { RiDeleteBin6Fill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {

    const [products,setProducts] = useState([])

     useEffect(() => {
        axios
        .get("http://localhost:3007/showcart",
        {
        headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
      })
        .then((res) => {

            setProducts([...res.data])
            console.log(products);
        });
    }, [products])
    console.log(products,'pro')

  const deleteItem = (productId) => {

      axios.delete(`http://localhost:3007/deletefromcart/${productId}`,
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }
  const handleIncrement =(productId) =>{
      axios.put(`http://localhost:3007/incrementquantity/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }
  const handleDecrement =(productId) =>{
      axios.put(`http://localhost:3007/decrementquantity/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }
  return (
    
    <div className='cart'>
        <div className='title'>
              <h1>Cart</h1>
              <div className='title-underline'></div>
        </div>
        <div className='space' ></div>
        <div className='cart-container'>
            <div className='cart-items-container'>
                <div className='cart-headings'>
                    <section>
                        <h5>Item</h5>
                        <h5>Price</h5>
                        <h5>Quantity</h5>
                        <h5>Subtotal</h5>
                        <h5>Remove</h5>
                    </section>
                    <hr/>
                </div>
                <div className='cart-items'>
                    {
                        products.map((product)=>{
                            return <>
                                <div className='title'>
                        <img src="https://dl.airtable.com/.attachmentThumbnails/d3174ad774fc628e1d50b77e3bec399f/1de7b97a?ts=1660829807&userId=usrQMwWEPx18KgLcP&cs=90ea148596d6ba0e" width='100px' height='80px' />
                        <div>
                            <h5 className='name'>{product.title}</h5>
                            {/* <p>In Stock</p> */}
                        </div>
                        
                    </div>
                    <h5 className='price'>${product.price}</h5>
                    <div className='cart-controller'>
                        <div>
                            <button onClick={()=>{handleDecrement(product._id)}} style={{border:'none',background:'none'}}>
                                <AiOutlineMinus className='icon'/>
                            </button>
                        </div>
                        <span className='number'>{product.quantity}</span>
                        <div>
                        <button onClick={()=>{handleIncrement(product._id)}} style={{border:'none',background:'none'}}>
                        <AiOutlinePlus className='icon'/>
                        </button>
                        </div>
                    </div>
                    <h5 className='subtotal'>${product.quantity*product.price}</h5>
                    <button
                        onClick={()=>{deleteItem(product._id)}}
                        type='button'
                        className='cart-rm-btn'
                    >
                        <RiDeleteBin6Fill />
                    </button>
                            </>
                        })
                    }
                </div>
            </div>
            <hr/>
            <div className='cart-totals'>
                <article>
                    <h5 className='ct-h5'>subtotal : <span>$999</span></h5>
                    <p className='ct-p'>Discount : <span>$99</span></p>
                    <hr />
                    <h4 className='ct-h4'>Order total :<span>$900</span></h4>
                </article>
                <button className='btn btn-info ct-btn'>Proceed To Checkout</button>
                <div className='space' ></div>
            </div>
            </div>
        </div>
  

  )
}

export default Cart;
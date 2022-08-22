import React,{useEffect, useState} from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import data from '../Assets/decor-data';
import { useGlobalContext } from '../context';
import jwtDecode from 'jwt-decode'
import {RiHeartLine} from 'react-icons/ri'
import axios from 'axios'
import Modala from './Modala';
import Modalu from './Modalu';
import Alert from './Alert'


 const Products = () => {
    
    const navigate = useNavigate()
    const { userRole } = useGlobalContext()
    const [searchItem,setSearchItem] = useState("")
    const [category,setCategory] = useState("all")
    const [products,setProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    let decodetoken;
    let token = localStorage.getItem("login_user");
    if (token) {
        decodetoken = jwtDecode(token);
    }
    useEffect(() => {
        axios
        .get("http://localhost:3001/viewproduct")
        .then((res) => {
            setProducts([...res.data])
        });
    }, [products])
//===========Alert==========================
    const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
//==========New Product======================
    const handleAdd = async (newProduct) => {
        setOpen(false)
        await axios.post('http://localhost:3001/addproduct',{
                title: newProduct.title,
                price: newProduct.price,
                description: newProduct.description,
                category: newProduct.category,
                quantity: newProduct.quantity,
    })
    }
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }
//==========Updated Product====================
    const handleUpdate =async (val) => {
        setShow(false)
        console.log(val,'val');
        localStorage.setItem("productId",val)

        // await axios.put(`http://localhost:3001/updateproduct/${id}`,{

        // })
    }
    const handleShow = () =>{
        setShow(true)
    }
    const handleRemove = () =>{
        setShow(false)
    }
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/deleteproduct/${id}`)
    }
//==============Filer by Category==============

    const handleClick =(e)=>{
        let temp=[];
        console.log(e.target.value);
        if(e.target.value !== 'all')
        {
            temp = products.filter((product)=>{
                return product.category === e.target.value
            })
            setProducts(temp)
        }
        else
            setProducts(products)
    }
//=============Wishlist==============
    const handleWishlist = () => {
        showAlert(true, 'success', 'Item added to Wishlist');
        console.log('added to wishlist');
    }

    return (
        <div className='products-page'>
            <div className='title'>
                <h1>Products</h1>
                <div className='title-underline'></div>
            </div>
            <div class="input-group mb-3 search-bar">
              <input type="text" className="form-control" onChange={(e)=>{setSearchItem(e.target.value)}} placeholder="search bedrooms..."/>
              <span class="input-group-text" id="basic-addon2">search</span>
            </div>
            <div className='category'>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button onClick={handleClick} type="button" value="all" class="btn btn-outline-dark">All</button>
                    <button onClick={handleClick} type="button" value="office" class="btn btn-outline-dark">Office</button>
                    <button onClick={handleClick} type="button" value="living room" class="btn btn-outline-dark">Living room</button>
                    <button onClick={handleClick} type="button" value="bedroom" class="btn btn-outline-dark">Bedroom</button>
                    <button onClick={handleClick} type="button" value="dining" class="btn btn-outline-dark">Dining</button>
                    <button onClick={handleClick} type="button" value="kids" class="btn btn-outline-dark">Kids</button>
                </div>
            </div>
                    <div>
                        { decodetoken.user_type === 'admin' && <div className='add-prodkt'><button onClick={handleOpen} className='btn btn-outline-dark'>Add Product</button>
                        <NavLink to='/bulkupload'><button onClick={handleOpen} className='btn btn-outline-dark'>Bulk Upload +</button></NavLink>
                    </div>}
                                    
                        <Modala handleAdd={handleAdd} open={open} handleClose={handleClose}/>
                    </div>
            <div className='products-container'>
                {
                    products.filter((product)=>{
                      if(searchItem === "")
                        return product
                      else if(product.title.toLowerCase().includes(searchItem.toLowerCase()))
                        return product
                    }).map((product,index)=>{
                        return <div key={index}  className='product-card'>
                                
                                    <img className='product-image' src={product.image} alt={product.title} width="100%" height="300" />
                                    <div className='product-details'>
                                        <div className='title-price'>
                                            <h5>{product.title}</h5>
                                            <div className='wishlist-icon-price'>
                                                <p>${product.price}</p>                   
                                            </div>
                                            <div className='place-alert'>
                                                {alert.show && <Alert {...alert} removeAlert={showAlert} />}
                                            </div>
                                        </div>
                                    </div>
                                    <NavLink to={`/products/${product._id}`} className=''><button className='ghost'></button></NavLink>
                                    <div className='rm-up-btns'>
                                        { decodetoken.user_type === 'admin' && <div className='remove-prodkt'><button className='btn btn-outline-dark' onClick={()=>handleDelete(product._id)}>Remove</button></div>}
                                        { decodetoken.user_type === 'admin' && <div className='update-prodkt'><button  className='btn btn-info' onClick={handleShow}>Update</button></div>}
                                        <Modalu handleUpdate={()=>handleUpdate(product._id)} open={show} handleClose={handleRemove}/>
                                    </div>
                                </div>
                    })
                    
                }
            </div>
        </div>
    )
    }

export default Products

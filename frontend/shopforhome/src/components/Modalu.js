import React,{ useState} from 'react'
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useGlobalContext } from '../context';
import { RiWindowsFill } from 'react-icons/ri';

const Modalu = ({handleUpdate,handleClose,open}) => {

        const [updatedProduct,setUpdatedProduct] = useState({
        title:'',
        price:'',
        description:'',
        category:'',
        quantity:''
    })
    // const { changeProduct } = useGlobalContext()
    const changeProduct = async () => {
        let id = localStorage.getItem('productId')
        console.log(updatedProduct,'updt pro');
        await axios.put(`http://localhost:3001/updateproduct/${id}`,{
                title: updatedProduct.title,
                price: updatedProduct.price,
                description: updatedProduct.description,
                category: updatedProduct.category,
                quantity: updatedProduct.quantity,
    })
    // localStorage.removeItem('productId')
    // window.location.reload(false);

    }

  return (
    
        <Modal open={open} onClose={handleClose}>
                            <form className='form-signup-modal' >
                                    <div className='input-container'>
                                        <label>Title</label>
                                        <input type="text" name='title' className='input-box' 
                                            onChange={(e)=>{setUpdatedProduct({...updatedProduct,title:e.target.value})}}></input>
                                    </div>
                                    <div className='input-container'>
                                        <label>Price</label>
                                        <input type="text" name='price' className='input-box' 
                                        onChange={(e)=>{setUpdatedProduct({...updatedProduct,price:e.target.value})}}></input>
                                    </div>
                                    <div className='input-container'>
                                        <label>Description</label>
                                        <textarea type="text" name='description' className='input-box' 
                                        onChange={(e)=>{setUpdatedProduct({...updatedProduct,description:e.target.value})}}></textarea>
                                    </div>
                                    <div className='input-container'>
                                        <label>Category</label>
                                        <input type="text" name='category' className='input-box' 
                                        onChange={(e)=>{setUpdatedProduct({...updatedProduct,category:e.target.value})}}></input>
                                    </div>
                                    <div className='input-container'>
                                        <label>Quantity</label>
                                        <input type="text" name='quantity' className='input-box' 
                                        onChange={(e)=>{setUpdatedProduct({...updatedProduct,quantity:e.target.value})}}></input>
                                    </div>

                                    <button type='button' onClick={()=>{
                                        handleUpdate()
                                        changeProduct()
                                    }} className='btn btn-info'>Update  </button>
                                </form>

                        </Modal>
  )
}

export default Modalu
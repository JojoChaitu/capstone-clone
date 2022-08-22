import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsBookmarkHeart } from 'react-icons/bs'
import { GrCart } from 'react-icons/gr'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useGlobalContext } from '../context'
import jwtDecode from 'jwt-decode'


const  Navbar = () => {

    const navigate = useNavigate()
    const { userRole } = useGlobalContext()
    let name;
    let decodetoken;
    let token = localStorage.getItem("login_user");
    if (token) {
        decodetoken = jwtDecode(token);
        name = decodetoken.name;
    }
    console.log("Token", decodetoken);
    // role = decodetoken.user_type;
    // console.log(role,'role');
    function logout() {
        localStorage.removeItem("login_user");
        window.location.reload(false);
    }

    
    return (
        <div className="nav-container">
            <div className="logo"><h2>ShopForHome</h2></div>
            <nav className='row'>
                <div className="nav-items col">
                    <p><NavLink to='/' className="NavLink">Home</NavLink></p>
                    <p><NavLink to='about' className="NavLink">About</NavLink></p>
                    <p><NavLink to='products' className="NavLink">Products</NavLink></p>
                    <p><NavLink to='userlist' className="NavLink">Users</NavLink></p>
                </div>
                <ul className='col'>

                    <li className="item">
                        <NavLink to='wishlist' className="NavLink"><BsBookmarkHeart className='icons'/></NavLink>
                    </li>
                    <li className="item">
                        <NavLink to='cart' className="NavLink">
                            <Badge badgeContent={4} color="primary">
                                <GrCart className='icons cart-icon'/>
                            </Badge>
                        </NavLink>
                    </li>
                    <li className="item">
                            <div className="dropdown">
                            <div className=" dropdown-toggle"  role="button" data-bs-toggle="dropdown">
                                <CgProfile className='icons'/>
                            </div>

                            <ul className="dropdown-menu">
                                { token ? <>
                                <li><a  className="dropdown-item" >{name}</a></li>
                                <li><a onClick={logout} className="dropdown-item"  >Logout</a></li>
                                </>    :   
                                <>
                                <li><a to='signup' className="dropdown-item" onClick={()=>navigate('signup')} >Signup</a></li>
                                <li><a to='login' className="dropdown-item" onClick={()=>navigate('login')} >Login</a></li>
                                </>                             

                                }

                                <li><a className="dropdown-item" >others</a></li>
                            </ul>
                            </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
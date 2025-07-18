import { flushKeyframeResolvers } from 'motion'
import profileimage from '../assets/emptypp.png'
import { motion } from "motion/react"
import { Outlet, Link } from "react-router-dom";
import logoimg from '../assets/logo.png'
import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
function NavBar(){
  
    var logedin = sessionStorage.getItem('IsLoggedIn')
    var username = sessionStorage.getItem('Name')

    // singout
    function signout(){
         sessionStorage.setItem('IsLoggedIn',false)
         window.location.reload()
    }

    const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <motion.button
                    whileHover={{ scale: 1.2}}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{background:'none',border:'none'}}
                    className='m-2 nav-item'
                    onClick={signout}
                >    

                    Sign Out
            </motion.button>
      </Popover.Body>
    </Popover>
  );
    if(username){
        var nameArr = username.split(" ")
    }
 
    
    return(
        
    <nav className="navbar navbar-light bg-light">
    <div className='d-flex w-90 justify-content-between align-items-center'>
        <Link to='/' className="navbar-brand align-self-start" href="#">
            <img src={logoimg} width="40" height="40" className="d-inline-block align-top" alt=""/>
            <h1 className='d-inline-block'>FocusTrail</h1>        
        </Link>
    </div>

    <div>
        
        {logedin=='true'?(<>  <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                             <h3 className='m-2' style={{cursor:'pointer'}}>Hi! {nameArr[0]}</h3></OverlayTrigger>
                             </>):(
           <>
           
          <Link to='SignUp'> <motion.button
                    whileHover={{ scale: 1.2}}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{background:'none',border:'none'}}
                   className='m-2 nav-item'

                >    

                    SignUp
            </motion.button>
        </Link>

           <Link to='SignIn'><motion.button
                    whileHover={{ scale: 1.2}}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{background:'none',border:'none'}}
                   className='m-2 nav-item'

                >    

                    SignIn
            </motion.button>
        </Link>
            </>
          )}
    </div>
            
        
    </nav>
        
    )
        
}
export default NavBar
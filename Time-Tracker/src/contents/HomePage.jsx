import { degrees } from "motion"
import logoimg from '../assets/logo.png'
import { motion } from "motion/react"
import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

function HomePage(){

    var signIn = sessionStorage.getItem('IsLoggedIn')
    
    
    useEffect(() => {
    function changeele(){
           
      if(signIn=='true'){
      
        document.getElementById('Home_Page').style.visibility = "hidden";
        console.log('Available') 
       

      }else{
        document.getElementById('Home_Page').style.visibility = "visible";
            
      }
    } 
    
    changeele()
    
    
  },[signIn])
    return(
        <div className="container-fluid d-flex justify-content-center align-content-center align-items-center" id="Home_Page" style={{width:'100vw',height:'80vh',background:'#F7F4F0',visibility:'hidden'}}>
            <div>
                <div className="d-flex justify-content-center"  data-aos = 'zoom-in' style={{width:'100vw'}}>
                    <img src={logoimg} alt="" width={100} height={100}/>
                    <h1 className=" display-1 " style={{color:'#1F3845'}}><strong>Focus Trail</strong></h1>
            
                </div>
                
                <h1 className="text-center mt-3" data-aos ='fade-up'><strong>Track your time <br /> effectively</strong></h1>
               
                <h3 style={{width:'100%', color:'#1F3845'}} data-aos = 'fade-up' className="text-center mt-3">
                    Enhace your productivity  by <br /> managing and monitoring  your time <br/> spent on task
                </h3>
              
                <div className="d-flex justify-content-center" data-aos='zoom-in' style={{width:'100vw'}}>
                    
                               <Link to='SignUp'><motion.button
                                        whileHover={{ scale: 1.2}}
                                        whileTap={{ scale: 0.95 }}
                                        onHoverStart={() => console.log('hover started!')}
                                        style={{background:'#F5A43C' ,color:'white',border:'none' ,width:'100%'}}
                                        className='btn m-2 nav-item'
                    
                                    >    
                    
                                        <strong>Get Started</strong>                                 </motion.button>
                            </Link>
                </div>
            </div>
           

        </div>
    )
}

export default HomePage
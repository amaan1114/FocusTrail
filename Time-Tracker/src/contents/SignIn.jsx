import axios from "axios"
import { motion } from "motion/react"
import { useState, useRef } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Overlay, Popover, Button, Form } from 'react-bootstrap';
function SignIn(){
    const [email,setMail] = useState()
    const[pass,SetPass] =useState()
    const[showpass,showpassfunc] = useState(true)
    const [passclass,changepassclass] = useState('bi bi-eye-fill')
    const[passwordtype,setpasstype] = useState('password')
    const [showError, setShowError] = useState(false);
    const [error,err] = useState('')
    const [target, setTarget] = useState(null);
    const BoxRef = useRef(null);
    const navigate = useNavigate()
    
    
//showing password    
function showpassword() {

            if (showpass) {
                changepassclass('bi bi-eye-slash-fill');
                setpasstype('text') // Always show password
                showpassfunc(false);
            } else {
                changepassclass('bi bi-eye-fill');
                setpasstype('password') // Always hide password
                showpassfunc(true);
            }
}



//posting signin request
    async function postSignIn(){
        try{
            const res = await axios.post('http://localhost:3000/SignIn',{
                emailS:email,
                passwordS:pass
            })
            sessionStorage.setItem('IsLoggedIn',true)
            sessionStorage.setItem('Name',res.data.message)
            sessionStorage.setItem('Mail',email)
            navigate('/')
            window.location.reload()

             


        }catch(error){
            setTarget(BoxRef)
                        err('Email or Password is incorrect')
                            setShowError(true)

                            setTimeout(() => {
                                setShowError(false);
                            }, 3000); 

        }
       
    }



//frontend
return(
    
    <>
    <div className="container justify-content-center d-flex align-content-between align-items-center" data-aos='flip-right' style={{width:'100vw',height:'80vh'}}>
         <div className="card" ref = {BoxRef} style={{width: '18rem'}}>
        <div className="card-body align-items-center align-content-center">
            <h1 className="card-title  text-center">Sign In</h1>
            <input type="email" className="rounded-3 p-2 mt-3 w-100" placeholder="Enter email id" onChange={(e)=>setMail(e.target.value)}/>
            <div className="d-flex justify-content-center align-items-center gap-3" >
                <input type={passwordtype} id="passwords" className="rounded-3 p-2 mt-3 w-100" placeholder="Enter Password"onChange={(e)=>SetPass(e.target.value)}/>
                <i style={{cursor:'pointer'}} onClick={showpassword} className={passclass}></i>
            </div>

            <Overlay target={target?.current} show={showError} placement="top">
                        {(props) => (
                        <Popover {...props}>
                            <Popover.Body>{error}</Popover.Body>
                        </Popover>
                        )}
                </Overlay>
             <motion.button
                    whileHover={{ scale: 1.1}}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{width:'100%',height:'10%'}}
                    className='rounded-3 btn btn-primary text-light mt-3'
                    id='SaveSessionButton'
                    onClick={()=>postSignIn()}

                >    

                    <strong>Sign In</strong>
                </motion.button>
        </div>
        </div>
    </div>
       
    </>
)
}

export default SignIn
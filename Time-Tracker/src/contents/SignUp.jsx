import axios from "axios"
import { FlatTree, motion } from "motion/react"
import { useState,useRef } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Overlay, Popover, Button, Form } from 'react-bootstrap';
function SignUp(){

      
    const[name,SetName]=useState() 
    const [SetMail,mailid] = useState()
    const[password,SetPass] = useState()
    const[confirmPass,SetConfirmpass]=useState() 
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false);
    const [error,err] = useState('')
    const [target, setTarget] = useState(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const confirmPassRef = useRef(null);
    const [passclass,changepassclass] = useState('bi bi-eye-fill')
    const [confirmpasclass,changeconfirmclass] = useState('bi bi-eye-fill')
    const[showpass,showpassfunc] = useState(true)
    const[passwordtype,setpasstype] = useState('password')
    const[showcomfirmpass,showcomfirmpassfunc] = useState(true)
    const[passwordcomfirmtype,setcomfirmpasstype] = useState('password')

//show password
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



//show comfirm password
function showConfirmpassword() {

  if (showcomfirmpass) {
    changeconfirmclass('bi bi-eye-slash-fill');
    setcomfirmpasstype('text') // Always show password
    showcomfirmpassfunc(false);
  } else {
    changeconfirmclass('bi bi-eye-fill');
    setcomfirmpasstype('password') // Always hide password
    showcomfirmpassfunc(true);
  }
}
    
    // password Validator   
function validatePassword(password) {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUppercase) {
            return "Password must include at least one uppercase letter.";
        }
        if (!hasLowercase) {
            return "Password must include at least one lowercase letter.";
        }
        if (!hasNumber) {
            return "Password must include at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must include at least one special character.";
        }

        return "Valid";
}


//Email Validator
 function ValidateEmail(mail) 
    {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
        
        return (false)
    }





    //SingUp Function
    async function SignUp() {
        if(name&&name.trim!==''){
            if(ValidateEmail(SetMail)){
                if(validatePassword(password)==='Valid'){
                        if(password==confirmPass){
                            try{
                                const res=await axios.post('http://localhost:3000/SignUp',{name1:name,
                                    Password1:password,
                                    email1:SetMail
                                })
                                navigate('/SignIn') 
                                sessionStorage.setItem('Name',name)
                            }catch(error){

                                 setTarget(emailRef)
                                err('User Already Exist')
                                    setShowError(true)

                                    setTimeout(() => {
                                        setShowError(false);
                                    }, 3000); 
                            }

                        }else{
                                setTarget(confirmPassRef)
                                    err('Password Does not match')
                                        setShowError(true)

                                        setTimeout(() => {
                                            setShowError(false);
                                        }, 3000); 

                        }
                    }else{
                          setTarget(passwordRef)
                            err(validatePassword(password))
                            setShowError(true)

                            setTimeout(() => {
                                setShowError(false);
                            }, 3000); 

                    }
        }else{
            setTarget(emailRef)
                        err('Please enter valid email id')
                            setShowError(true)

                            setTimeout(() => {
                                setShowError(false);
                            }, 3000); 
        }
    }else{
        setTarget(nameRef)
                    err('Fill out this field')
                        setShowError(true)

                        setTimeout(() => {
                            setShowError(false);
                        }, 3000); 
    }
        
        
    }   
    
return(

   
    
    <>
    <div className="container justify-content-center d-flex align-content-between align-items-center" data-aos='flip-left' style={{width:'100vw',height:'80vh'}}>
         <div className="card" style={{width: '18rem'}}>
        <div className="card-body align-items-center align-content-center">
            <h1 className="card-title  text-center">Sign Up</h1>
            <input type="text" ref={nameRef} className="rounded-3 p-2 mt-3 w-100" placeholder="Enter Full name" onChange={(e)=>SetName(e.target.value)}/>
            <input type="email" ref  = {emailRef} className="rounded-3 p-2 mt-3 w-100" placeholder="Enter email id" onChange={(e)=>mailid(e.target.value)}/>
            <div className="d-flex justify-content-center align-items-center gap-3" >
                <input type={passwordtype} id="passwords" ref={passwordRef} className="rounded-3 p-2 mt-3 w-100" placeholder="Enter Password"onChange={(e)=>SetPass(e.target.value)}/>
                <i style={{cursor:'pointer'}} onClick={showpassword} className={passclass}></i>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-3" id="confirmpass">
                 <input type={passwordcomfirmtype} ref = {confirmPassRef} className="rounded-3 p-2 mt-3 w-100" placeholder="Confirm Password"onChange={(e)=>SetConfirmpass(e.target.value)}/>
                 <i style={{cursor:'pointer'}}  className={confirmpasclass} onClick={showConfirmpassword}></i>
            </div>
           
            <Overlay target={target?.current} show={showError} placement="bottom">
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
                    onClick={()=>SignUp()}
                 

                >    

                    <strong>Sign Up</strong>
                </motion.button>
        </div>
        </div>
    </div>
       
    </>
)
}

export default SignUp
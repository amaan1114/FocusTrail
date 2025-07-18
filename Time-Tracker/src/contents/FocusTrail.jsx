import clockimg from '../assets/clock.png' 
import { useRef, useState,useEffect } from 'react'
import { motion } from "motion/react"
import axios from "axios"
import { Overlay, Popover, Button, Form } from 'react-bootstrap';
function FocusTrail(){
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [Buttonclass,SetButtonClass] = useState("bi bi-play-fill fs-2");
  const [reset,SetReset] = useState(false)
  const intervalRef = useRef(null);
  const [Session,Addsessions] = useState([])
  const[name,SetName] = useState()

  const [showError, setShowError] = useState(false);

  var saveButton = document.getElementById('SaveSessionButton')
  var projectButton = document.getElementById('ProjectName')
  var RButton = document.getElementById('ResetButtons')
  const email = sessionStorage.getItem('Mail')
  const signIn = sessionStorage.getItem('IsLoggedIn')
  const hasFetchedSessions = useRef(false);
  const NameRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;



// SessionSetting

  useEffect(()=>{
    
        const fetchdata= async()=>{
        try{
          const res = await axios.post(`${backendUrl}/GetSessions`,{emailG:email})
          Addsessions(res.data.Sessions)
         
          hasFetchedSessions.current = true
        }catch (error){
          console.log('Error')
        }

      }
    if(signIn=='true'){
      fetchdata()
    }

      
    
    
  },[signIn,email])

  useEffect(()=>{
    const update= async()=>{
    try{

      const res = await axios.post(`${backendUrl}/SessionUpdate`,{emailSe:email,Sessions:Session})

    }catch(error){
      console.log(error)
    }
    
  }
  if(hasFetchedSessions.current && signIn=='true'){
    update()
  }
  

  },[Session,email])

  const saveSession = () => {
    if(name && name.trim() != ''){
      const newSession = {
      id:Date.now(),
      project: name,
      duration: formatTime(elapsedTime),
      timestamp: new Date().toDateString()
    };
    SetName('')
    setElapsedTime(0)
    Addsessions(prev => [...prev, newSession]);

    }else{
       setShowError(true)

                            setTimeout(() => {
                                setShowError(false);
                            }, 3000); 
    }
    
  }
  const deleteSession = (id) => {
    Addsessions(prev => prev.filter(s => s.id !== id));
  }



  
// Timer Settings
  useEffect(() => {
    if (isRunning) {
      
      
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      
      SetButtonClass("bi bi-stop-fill fs-2")
    } else {
      SetButtonClass("bi bi-play-fill fs-2")
      clearInterval(intervalRef.current);
    }
    if (saveButton && projectButton && RButton){
        saveButton.disabled = isRunning
        projectButton.disabled = isRunning
        RButton.disabled = isRunning
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(()=>{
    if(reset){
      setElapsedTime(0)
      SetReset(false)
    }
  },[reset])

 
  const startTimer = () => {
    setIsRunning(prev => !prev);
  };

  const parseDurationToSeconds = (durationStr) => {
  const [h, m, s] = durationStr.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

  const ResumeTimer = (Session) => {
    const seconds = parseDurationToSeconds(Session.duration); 
    setElapsedTime(seconds);       
    SetName(Session.project)
    setIsRunning(prev => !prev);
     setTimeout(() => {
    deleteSession(Session.id);
  }, 100); 
  };

  const resetTimer=()=>  
  {
    SetReset(prev=>!prev)
  }
  const formatTime = (time) => {
    const hrs = String(Math.floor(time / 3600)).padStart(2, '0');
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };




  
//Front-End Code
    return(
        <>

        {/* timer */}
        <div data-aos='fade-in' className='container bg-white  mt-5 focusarea rounded-2'>


            <h4 className='pt-2'>Today's Focus:</h4>
           
           <div className="card border-0">
            <div className='card-body'>
                <div className='rounded-3 d-flex  card-header'>
                    <motion.button
                    whileHover={{ scale: 1.2}}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{background:'none',border:'none'}}
                    

                >    

                    <i className={Buttonclass} onClick={startTimer}></i>
                </motion.button>



                <motion.button
                    whileHover={{ scale: 1.2}}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{background:'none',border:'none'}}
                    id="ResetButtons"

                >    

                    <i className="bi bi-arrow-clockwise fs-3" onClick={resetTimer}></i>
                </motion.button>

                    <h1 className='text-center' style={{width:'100%'}}>{formatTime(elapsedTime)}</h1>
                    
                    
                </div>
                <div className='card-title mt-2' >
                    <label style={{marginRight:'1rem'}}>Project:</label>
                    <input type="text" ref={NameRef} className='rounded-3 border-1  p-1 text-center shadow-lg' id='ProjectName' value={name} style={{height:'100%'}} onChange={(e)=>SetName(e.target.value)}/>
                    <Overlay target={NameRef} show={showError} placement="top">
                        {(props) => (
                          <Popover {...props}>
                              <Popover.Body>Give project a name</Popover.Body>
                          </Popover>
                        )}
                </Overlay>
                </div> 


                <motion.button
                    whileHover={{ scale: 1.1}}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{width:'100%',height:'10%'}}
                    className='rounded-3 btn btn-primary text-light'
                    id='SaveSessionButton'
                    onClick={saveSession}
                 

                >    

                    <strong>Save Session</strong>
                </motion.button>
            </div>   

        </div>
            
        
               
            
            
        </div>



        {/* logs */}
          <div data-aos='fade-in' className='container bg-white  mt-5 focusarea rounded-2'>
            <h3 className='pt-2'>Session Logs:</h3>
            
            
            {Session.length== 0 ?(<p className='text-center pb-2' id='NoSession'>No Sessions Found</p>):(
              Session.map(Sess=>(
              <p data-aos='zoom-in-right' className='text-center' key={Sess.id}> 
              <motion.button
                    whileHover={{ scale: 1.2}}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{background:'none',border:'none'}}
                    onClick={()=>ResumeTimer(Sess)}
                  >    

                  <i className="bi bi-play-fill"></i>
                </motion.button>


               <motion.button
                    whileHover={{ scale: 1.2}}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={{background:'none',border:'none'}}
                    onClick={()=>deleteSession(Sess.id)}
                  >    

                  <i className="bi bi-trash"></i>
                </motion.button>
               {Sess.timestamp} — {Sess.project}: {Sess.duration}</p>
            ))
            ) }
            

          </div> 
        

        </>
    )
   
    
}
export default FocusTrail
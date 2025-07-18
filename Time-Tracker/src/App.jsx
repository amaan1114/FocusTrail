import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FocusTrail from './contents/FocusTrail'
import SignUp from './contents/SignUp'
import NavBar from './contents/NavBar'
import { Routes, Route } from 'react-router-dom';
import SignIn from './contents/SignIn'
import HomePage from './contents/HomePage'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
  var siginIn = sessionStorage.getItem('IsLoggedIn')
  const [element1,changeEle] = useState(<HomePage></HomePage>)

  useEffect(() => {
    async function changeele(){
      if(siginIn=='true'){
        await changeEle(<FocusTrail></FocusTrail>)
      }else{
        await changeEle(<HomePage></HomePage>)
      } 
    }
    changeele()
    
    
  },[siginIn])
  



  return (
    <>
    <NavBar></NavBar>
    <Routes>
      <Route path='/' element={element1}></Route>
      <Route path='SignUp' element={<SignUp/>}></Route>
      <Route path='SignIn' element={<SignIn/>}></Route>
    </Routes>
      
    </>
  )
}

export default App

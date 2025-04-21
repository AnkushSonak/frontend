import React, { useState } from 'react'
import './Landing.css';
import '../assets/global.css';

import RegisterModal from '../features/register';
import { RightSideBar } from '../features/landing/components/RightSideBar/RightSideBar';

export const Landing:React.FC = () => {

  const [register, setRegister] = useState<boolean>(false);
  const toggleRegister = () => {
    setRegister(!register);
  }
  return (
    <div className="home-container bg-color">
       {register ?  <RegisterModal toggleModal = {toggleRegister} /> : <></>}
       <div className="landing-layout">
        <div className="landing-top-left bg-blue">

        </div>
        <div className="landing-top-right">
          <RightSideBar toggleLogin={() => {}} toggleRegister={toggleRegister} />
        </div>
        <div className="landing-bottom">
          content
        </div>
       </div>
    </div>
  )
}


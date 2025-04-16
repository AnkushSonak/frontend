import React from 'react'

import './Landing.css';
import '../assets/global.css';
import { RegisterModal } from '../features/register/component/RegisterModal/RegisterModal';

export const Landing:React.FC = () => {
  return (
    <div className="home-container bg-color">
        <RegisterModal />
    </div>
  )
}


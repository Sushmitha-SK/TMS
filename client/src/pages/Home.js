import React from 'react'
import '../styles/Home.css'
import showCaseImage from '../assets/showcase-img.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="showcase">
                <div className="container">
                    <div className="showcase-top">
                        <a className="navbar-brand" onClick={() => navigate('/')}>
                            Task Management System
                        </a>
                        <button type="button" onClick={() => navigate('/login')}>Login</button>
                    </div>
                    <div className="showcase-content">
                        <div className="sc-left">
                            <h1>Let's make task completion easy</h1>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae quia officiis perspiciatis vitae hic exercitationem aut. Laborum exercitationem est cupiditate explicabo, illo repudiandae laudantium nisi corrupti!</p>
                            <div className="sc-btns">
                                <button type="button" onClick={() => navigate('/login')}>
                                    Get Started
                                </button>

                            </div>
                        </div>
                        <div className="sc-right">
                            <img src={showCaseImage} alt="showcase image" />
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Home
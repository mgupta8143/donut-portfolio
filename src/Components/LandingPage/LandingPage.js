import React from 'react';
import { SpinningDonut } from './SpinningDonut/SpinningDonut';
import "./LandingPage.css";


export const LandingPage = () => {
    return (
        <div className="landing-wrap">
            <div className="intro-wrap">
                <p>Hello,</p>
                <p>I'm Manu</p>
                <p>Georgia Tech CS 25'</p>
            </div>
            <SpinningDonut/>
        </div>

    );
};
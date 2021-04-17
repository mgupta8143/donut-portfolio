import React, { useState, useEffect } from 'react';
import "./SpinningDonut.css";

const screen_width = 40;
const screen_height = 40;

const theta_spacing = 0.07;
const phi_spacing = 0.02;

const R1 = 1;
const R2 = 2;
const K2 = 5;
const K1 = screen_width * K2 * 3/(8 * (R1 + R2));

const render_frame = (A, B) => {
    const cosA = Math.cos(A),
          sinA = Math.sin(A),
          cosB = Math.cos(B),
          sinB = Math.sin(B);

    const output = [],
          zbuffer = [];

    for(let i = 0; i < screen_width; ++i) {
        const temp_1 = [],
              temp_2 = []
        for(let j = 0; j < screen_height; ++j) {
            temp_1.push(" ")
            temp_2.push(0);
        }
        output.push(temp_1);
        zbuffer.push(temp_2);
    }

    for(let theta = 0; theta < 2*Math.PI; theta+=theta_spacing) {
        const costheta = Math.cos(theta),
              sintheta = Math.sin(theta);
        
        for(let phi = 0; phi < 2*Math.PI; phi+=phi_spacing) {
            const cosphi = Math.cos(phi),
                  sinphi = Math.sin(phi);
            
            const circlex = R2 + R1*costheta;
            const circley = R1*sintheta;

            const x = circlex*(cosB*cosphi + sinA*sinB*sinphi)  - circley*cosA*sinB; 
            const y = circlex*(sinB*cosphi - sinA*cosB*sinphi)  + circley*cosA*cosB;
            const z = K2 + cosA*circlex*sinphi + circley*sinA;
            const ooz = 1/z; 

            const xp = Math.floor(screen_width/2 + K1*ooz*x);
            const yp = Math.floor(screen_height/2 - K1*ooz*y);

            const L = cosphi*costheta*sinB - cosA*costheta*sinphi -
                      sinA*sintheta + cosB*(cosA*sintheta - costheta*sinA*sinphi);

            if (L > 0) {
                if(ooz > zbuffer[xp][yp]) {
                    zbuffer[xp][yp] = ooz;
                    let luminance_index = Math.floor(L*8);

                    const luminnance_array = [".", ",", "-", "~", ":", ";", "=", "!", "*", "#", "$", "@"];

                    output[xp][yp] = luminnance_array[luminance_index];
                }
            }
        }
    }

    let new_output = [];
    for(let i = 0; i < screen_height; i++) {
        let temp_string = "";
        for(let j = 0; j < screen_width; j++) {
            temp_string += output[i][j];
        }
        new_output.push(<p>{temp_string}</p>);
    }


    return new_output;
};



export const SpinningDonut = () => {
    const [A, setA] = useState(0);
    const [B, setB] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setA(prev => prev + 0.09);
            setB(prev => prev + 0.03);
        }, 50);

        return () => {
            clearInterval(interval);
        }
    }, []);


    return (

        <div className="donut-wrap">
            <div>I like donuts if you couldn't tell</div>
            {
            
              render_frame(A, B)
            
            }
            <div>Credit: Andy Sloane's Article on the Math of Donuts</div>
        </div>
    );
};
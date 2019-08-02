import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import '../spin/slot.css'
import { CSSTransition } from 'react-transition-group'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import style from '../spin/spin.module.css'
let fruitDick = {
    'lemon': '🍋',
    'apple': '🍎',
    'cherry': '🍒',
    'banana': '🍌'
}

let start = []
let wins = []
export default  ()=> {
    const SLOTS_PER_REEL = 12;
    const [spins, setSpins] = useState([])
    const [points, setPoints] = useState(20)
    const [slotval, setSlotval] = useState([
        ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon', 'apple', 'lemon', 'cherry', 'lemon']
        , ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon', 'apple', 'lemon', 'cherry', 'lemon']
        , ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'apple', 'lemon', 'cherry', 'lemon', 'lemon', 'banana', 'lemon']
    ])
    // radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
    // current settings give a value of 149, rounded to 150
    const REEL_RADIUS = 150;

    const getSeed= ()=> {
        // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
        return Math.floor(Math.random() * (SLOTS_PER_REEL));
    }

    const occurence = (x) => {
        let   a = x.reduce( (acc, curr) =>{
            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }

            return acc;
        }, {});

        return a
    }

    const calcwin = () => {
        const pulls = []

        for (let i = 0; i < wins.length; i++) {
            const element = slotval[i][wins[i]];
            pulls.push(element)
        }

        console.log(pulls);


        if (occurence(pulls)['cherry'] == 2) {
            return 50
        }

        else if ((pulls[0] == 'cherry' && pulls[1] == 'cherry' || (pulls[1] == 'cherry' && pulls[2] == 'cherry'))) {
            return 40
        }

        else if (occurence(pulls)['apple'] == 3) {
            return 20
        }

        else if ((pulls[0] == 'apple' && pulls[1] == 'apple' || (pulls[1] == 'apple' && pulls[2] == 'apple'))) {
            return 10
        }

        else if (occurence(pulls)['banana'] == 3) {
            return 15
        }

        else if ((pulls[0] == 'banana' && pulls[1] == 'banana' || (pulls[1] == 'banana' && pulls[2] == 'banana'))) {
            return 5
        }

        else if (occurence(pulls)['lemon'] == 3) {
            return 3
        }

        else {
            return 0
        }

    }

     const createSlots=(x)=> {

        const slotAngle = 360 / SLOTS_PER_REEL;

        const seed = getSeed();

        const slots = []

        if (start.length == 3) {
            start = []
        }

        start.push((seed) % 12)

        for (let i = 0; i < SLOTS_PER_REEL; i++) {

            // compute and assign the transform for this slot
            const transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

            slots.push({
                value: fruitDick[slotval[x][(seed + i) % 12]],
                transform: transform,
                key: parseInt(Math.random() * Math.random() * 10000)
            })
        }
        console.log(start);

        return slots

    }

    const spiner = (timer) => {

        const wseed = []
        console.log(start)

        //let   txt = 'seeds: ';
        for (let i = 0; i < spins.length; i++) {
            let oldSeed = -1;
    		/*
    		checking that the old seed from the previous iteration is not the same as the current iteration;
    		if this happens then the reel will not spin at all
    		*/
            let   oldClass = document.getElementById("ring" + i).className

            if (oldClass.length > 4) {
                console.log(oldClass);

                oldSeed = parseInt(oldClass.slice(10));
                console.log(oldSeed);
            }
            let   seed = getSeed();
            while (oldSeed == seed) {
                seed = getSeed();
            }

            wseed.push(seed)

            document.getElementById("ring" + i).style.animation = 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 0.5) + 's'
            document.getElementById("ring" + i).setAttribute("class", 'ring spin-' + seed);


        }
        ///get win
        const w = []

        for (let i = 0; i < start.length; i++) {
            const s_Start = start[i];
            const se = wseed[i]

            w.push((s_Start + se) % 12)

        }

        setTimeout(() => {
            wins = w
            const reward = calcwin()
            setPoints(points + reward - 1)
        }, 2900);

    }




    useEffect(() => {

        const board = [[0, createSlots(0)], [1, createSlots(1)], [2, createSlots(2)]]

        console.log(board);


        setSpins(board)
    }, [])

  
    const center = {
       'text-align': '-webkit-center'
    }


    return (

        <div className={style.page}>

            <Row  >
                <Col style={center}>
                    <h5>
                        {points}
                    </h5>
                </Col>
            </Row>

            <Row className={style.spinner}>
                <Col>
                    <div id="stage" className="perspective-on" >
                        <div id="rotate">

                            {spins.map((slotsSpin) => {
                                return (
                                    <CSSTransition>
                                        <div id={`ring${slotsSpin[0]}`} className={`ring`}>
                                            {slotsSpin[1].map((x) => {
                                                const tstyle = {
                                                    "transform": x.transform
                                                }

                                                return (<div key={x.key} className="slot" style={tstyle}>
                                                    <p> {x.value} </p>
                                                </div>)
                                            })}
                                        </div>
                                    </CSSTransition>
                                )
                            })}

                        </div>

                    </div>
                </Col>
            </Row>


            <Row>
                <Col>

                    <div>
                        <Button variant="primary" onClick={e => {
                            spiner(2)
                        }} className="go">Start spinning</Button>
                    </div>
                </Col>
            </Row>








        </div>

    )
}

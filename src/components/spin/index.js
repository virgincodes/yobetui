import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../spin/slot.css'
import { CSSTransition } from 'react-transition-group'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loader from 'react-loader-spinner'
import style from '../spin/spin.module.css'
let fruitDick = {
    'lemon': '🍋',
    'apple': '🍎',
    'cherry': '🍒',
    'banana': '🍌'
}

let start = []
let wins = []
// const api = 'https://yobetback.herokuapp.com/api/'
const api = 'http://localhost:8000/api/'

export default () => {
    const SLOTS_PER_REEL = 12;
    const [spins, setSpins] = useState([])
    const [points, setPoints] = useState(20)
    const [loading, setLoader] = useState(false)
    const [slotval, setSlotval] = useState([
        ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon', 'apple', 'lemon', 'cherry', 'lemon']
        , ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon', 'apple', 'lemon', 'cherry', 'lemon']
        , ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'apple', 'lemon', 'cherry', 'lemon', 'lemon', 'banana', 'lemon']
    ])
    // radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
    // current settings give a value of 149, rounded to 150
    const REEL_RADIUS = 150;

    const getSeed = () => {
        // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
        return Math.floor(Math.random() * (SLOTS_PER_REEL));
    }


    const createSlots = (x) => {

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

    const spiner = async (timer) => {
        const old = []

        for (let i = 0; i < spins.length; i++) {
            let oldSeed = -1
            let oldClass = document.getElementById("ring" + i).className
            if (oldClass.length > 4) {

                oldSeed = parseInt(oldClass.slice(10));
            }

            old.push(oldSeed)
        }

        setLoader(true)
        
        const { data } = await axios.get(`${api}spin?slots=3&&prev=${JSON.stringify(old)}&&start=${JSON.stringify(start)}`, {

        })

        setLoader(false)


        for (let i = 0; i < data.lands.length; i++) {

            document.getElementById("ring" + i).style.animation = 'back-spin 1s, spin-' + data.lands[i] + ' ' + (timer + i * 0.5) + 's'
            document.getElementById("ring" + i).setAttribute("class", 'ring spin-' + data.lands[i]);

        }
        ///get win
        const w = []
        

        // for (let i = 0; i < start.length; i++) {
        //     const s_Start = start[i];
        //     const se = data.lands[i]
        //     w.push((s_Start + se) % 12)
        // }

        console.log(w); 
          
        setTimeout(() => {
            wins =  data.alt
            const reward = data.reward
            setPoints(points + reward - 1)
        }, 2800);

    }




    useEffect(() => {
        const board = [[0, createSlots(0)], [1, createSlots(1)], [2, createSlots(2)]]
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

                    {loading  && <Loader
                        type="Puff"
                        color="#fff"
                        height="100"
                        width="100"
                    />}
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
                            spiner(1)
                        }} className="go">Start spinning</Button>
                    </div>
                </Col>
            </Row>








        </div>

    )
}

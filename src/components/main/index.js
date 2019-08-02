import React from 'react'
import style from './index.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

export default function index() {
    return (
        <div className={style.app}>
            <p>Hi my name is somto , and this is my hopefully not under engineered fill stack developer assesment </p> <br />
            <p> Click on the buttons below to take you to the pages</p>

            <Nav >
                <Nav.Item>
                    <Nav.Link href="/countries">Country search</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  href="/casino">Slot Game</Nav.Link>
                </Nav.Item>
                 
            </Nav>

            <Row>
                <Col>

                </Col>

                <Col>

                </Col>
            </Row>

        </div>
    )
}

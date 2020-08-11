import React from 'react';
import { useSpring, animated} from 'react-spring';
import {Container, Col, Row} from 'react-bootstrap';
import './resume.css';

const calc = (x, y, title) => {
    const card = document.getElementById(title);
    const bounds = card.getBoundingClientRect();
    return [
        -5 * (y - bounds.y - (bounds.height/2))/bounds.height, 
        5 * (x - bounds.x - (bounds.width/2))/bounds.width, 
        1.02
    ];
} 
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function resumeItem(title, position, bullets, startDate, endDate, logo, tools) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [props, set] = useSpring(() => ({ xys: [0,0,1], config: { mass: 5, tension: 350, friction: 40} }));
    return (
        <li className="list-unstyled">
            <animated.div 
                id={title}
                className="card padding-15"
                onMouseMove={({clientX: x, clientY: y}) => set({ xys: calc(x, y, title)})}
                onMouseLeave={() => set({ xys: [0,0,1]})}
                style={{
                    backgroundColor: '#f8e297',
                    transform: props.xys.interpolate(trans)
                }}>
                    <Container>
                        <Row xs>
                            <Col md={2}>{logo}</Col>
                            <Col md="auto">
                                <Row><h3 className="title">{title}</h3></Row>
                                <Row><h5>{position}</h5></Row>
                            </Col>
                            <Col />
                            <Col md="auto"><h5>
                                {new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long"
                                }).format(startDate)} - 
                                {new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long"
                                }).format(endDate)}
                            </h5></Col>
                        </Row>
                        <br/>
                        <Row md="auto">
                            <Col><ul>{bullets.map((b) => <li>{b}</li>)}</ul></Col>
                        </Row>
                        <Row fluid>
                            <Col />
                            <Row md="auto">
                            {tools.map((l) => <div style={{margin: 10+'px'}}>{l}</div>)}
                            </Row>
                            <Col />
                        </Row>
                    </Container>
            </animated.div>
        </li>
    )
}

export default resumeItem;
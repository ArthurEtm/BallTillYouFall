import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

function Catalog() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/players")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container>

                {items.map(item => (
                    <Row>
                        <Col key={item.id}>
                            <Card style={{ width: '' }} className='mt-5 mb-5'>
                                <Card.Img variant="top" src="https://images.daznservices.com/di/library/sporting_news/8/88/nba-bubble-072820-getty-ftr_171qre7cfhsui1b802zc3k2pks.jpg?t=-1690856413&quality=100" />
                                <Card.Body>
                                    <Card.Title>{item.first_name} {item.last_name}</Card.Title>
                                    <Card.Text>
                                        <br />
                                        height feet: {item.height_feet}
                                        <br />
                                        height inches:{item.height_inches}
                                        <br />
                                        position: {item.position}
                                        <br />
                                        weight: {item.weight_pounds}
                                        <br />
                                        team name: {item.team.name} "Celtics"
                                        <br />
                                        full team name: {item.team.full_name} "Boston Celtics"
                                        <br />
                                        team abbr: {item.team.abbreviation} "BOS"
                                        <br />
                                        city: {item.team.city} "Boston"
                                        <br />
                                        conference: {item.team.conference} "East"
                                        <br />
                                        division: {item.team.division} "Atlantic"
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                ))}

            </Container>
        );
    }
}

export default Catalog
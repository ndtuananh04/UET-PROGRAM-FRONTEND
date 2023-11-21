import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function Graduation() {
    const [data, setData] = useState({});
    const {id} = useParams();
    const {id2} = useParams();
    const [student, setStudent] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/myprogram/graduation/${id}/${id2}`)
        .then(response => {
        console.log(response.data)
        setData(response.data)
        })
        .catch(error => console.log(error));
        axios.get(`http://localhost:8080/myprogram/searchid/${id}`)
            .then(response => {
            console.log(response.data)
            setStudent(response.data)
            })
            .catch(error => console.log(error));
      },[])
    return (
        <div className="container pt-5">
          <br />
          <Row className="justify-content-md-center">
          <Col md="8">
          <Card>
            <Card.Header as="h5">Student Information</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Student ID:</strong> {student.studentId}<br />
                <strong>Name:</strong> {student.name}<br />
                <strong>Class:</strong> {student.classFullName}<br />
                <strong>Program Code:</strong> {student.programFullCode}<br />
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          </Row>
          <br/>
          <Card>
          <Card.Header>Graduation Status</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>Condition Duration:</strong> {data.conditionDuration}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Number of Credits:</strong> {data.numberCredit}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Completed Mandatory Credits:</strong> {data.completedMandatory}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Completed Optional Credits:</strong> {data.completedOptional}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Completed Optional Reinforcement Credits:</strong> {data.completedOptionalReinforcement}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Completed Physical Credits:</strong> {data.completedPhysical}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Completed National Defense Credits:</strong> {data.completedNationalDefense}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Completed Additional Credits:</strong> {data.completedAdditional}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Completed Graduation Internship Credits:</strong> {data.completedGraduationInternship}
              </ListGroupItem>
            </ListGroup>
            <Card.Text>
              <strong> Current GPA:</strong> {data.gpaCondition}
            </Card.Text>
            <Card.Text>
                <strong>Language Certificates:</strong> {data.enoughCert ? 'Completed' : 'None'}
            </Card.Text>
            <Card.Text>
              <strong>Graduation Status:</strong> {data.graduation ? 'Yes' : 'Not yet'}
            </Card.Text>
          </Card.Body>
          </Card>
        </div>
        
      );
}
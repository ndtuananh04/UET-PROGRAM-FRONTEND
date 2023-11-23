import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default function Graduation() {
    const [data, setData] = useState({});
    const {id} = useParams();
    const {id2} = useParams();
    const [student, setStudent] = useState('');

    useEffect(() => {
        // axios.get(`http://localhost:8080/myprogram/graduation/${id}/${id2}`)
        // .then(response => {
        // console.log(response.data)
        // setData(response.data)
        // })
        // .catch(error => console.log(error));
        request(
          "GET",
          `graduation/${id}/${id2}`,
          {}).then(
          (response) => {
            console.log(response.data)
            setData(response.data)
          }).catch(
          (error) => {
              if (error.response.status === 401) {
                  // setAuthHeader(null);
              } else {
                  this.setState({data: error.response.code})
              }
          }
        );
        // axios.get(`http://localhost:8080/myprogram/searchid/${id}`)
        //     .then(response => {
        //     console.log(response.data)
        //     setStudent(response.data)
        //     })
        //     .catch(error => console.log(error));
        request(
          "GET",
          `searchid/${id}`,
          {}).then(
          (response) => {
            console.log(response.data)
            setStudent(response.data)
          }).catch(
          (error) => {
              if (error.response.status === 401) {
                  // setAuthHeader(null);
              } else {
                  this.setState({data: error.response.code})
              }
          }
        );
      },[])
    return (
        <div className="container pt-5">
          <br />
          <Row className="justify-content-md-center">
          <Col md="8">
          <Card  style={{ backgroundColor: '#78c6de', color: '#04151a' }}>
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
          <Card style={{ backgroundColor: '#78c6de', color: '#04151a' }}>
          <Card.Header>Graduation Status</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong> Condition Duration:</strong> {data.conditionDuration}
            </Card.Text>
            <ListGroup >
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Number of Credits:</strong> {data.numberCredit}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Completed Mandatory Credits:</strong> {data.completedMandatory}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Completed Optional Credits:</strong> {data.completedOptional}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Completed Optional Reinforcement Credits:</strong> {data.completedOptionalReinforcement}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Completed Physical Credits:</strong> {data.completedPhysical}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Completed National Defense Credits:</strong> {data.completedNationalDefense}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Completed Additional Credits:</strong> {data.completedAdditional}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9fdbed', color: '#04151a' }}>
                <strong>Completed Graduation Internship Credits:</strong> {data.completedGraduationInternship}
              </ListGroupItem>
            </ListGroup>
            <br></br>
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
          <br></br>
        </div>
        
      );
}
import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Container,
  ListGroup,
  Accordion,
  Button,
} from "react-bootstrap";
import { AppContext } from "../../App";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";


function ForumSection({ type }) {
  const [threads, setThreads] = useState([]);

  const navigate = useNavigate();

  const {url} = useContext(AppContext);

  useEffect(()=>{
    fetch(`${url}/threads`)
      .then(res => res.json())
      .then(data => setThreads(data));
  },[]);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={8}>
          <Button onClick={() => navigate('/threads/new')} className="mt-3">New Thread</Button>
          <Accordion defaultActiveKey="0" className="mt-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Mental Health Threads</Accordion.Header>
              <Accordion.Body>
                {threads.length > 0 ? threads.filter((item) => item.thread_type === 'Mental Health').map((item) => {
                  return(
                    <Card>
                      <Card.Header>
                        <Card.Title onClick={()=>navigate(`/threads/${item.id}`)}>{item.thread_title}</Card.Title>
                      </Card.Header>
                      <Card.Body data-color-mode="light">
                        <MDEditor.Markdown className="text-muted" source={item.thread_content.substring(0, 200)} style={{ whiteSpace: "pre-wrap" }} preview="preview"/>
                      </Card.Body>
                    </Card>
                  )
                }):"No Threads"}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Finance Threads</Accordion.Header>
              <Accordion.Body>
                {threads.length > 0 ? threads.filter((item) => item.thread_type === 'Finance').map((item) => {
                  return(
                    <Card>
                      <Card.Header>
                        <Card.Title onClick={()=>navigate(`/threads/${item.id}`)}>{item.thread_title}</Card.Title>
                      </Card.Header>
                      <Card.Body data-color-mode="light">
                        <MDEditor.Markdown className="text-muted" source={item.thread_content.substring(0, 200)} style={{ whiteSpace: "pre-wrap" }} preview="preview"/>
                      </Card.Body>
                    </Card>
                  )
                }):"No Threads"}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Fitness Threads</Accordion.Header>
              <Accordion.Body>
                {threads.length > 0 ? threads.filter((item) => item.thread_type === 'Fitness').map((item) => {
                  return(
                    <Card>
                      <Card.Header>
                        <Card.Title onClick={()=>navigate(`/threads/${item.id}`)}>{item.thread_title}</Card.Title>
                      </Card.Header>
                      <Card.Body data-color-mode="light">
                        <MDEditor.Markdown className="text-muted" source={item.thread_content.substring(0, 200)} style={{ whiteSpace: "pre-wrap" }} preview="preview"/>
                      </Card.Body>
                    </Card>
                  )
                }):"No Threads"}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Mentorship Threads</Accordion.Header>
              <Accordion.Body>
                {threads.length > 0 ? threads.filter((item) => item.thread_type === 'Mentorship').map((item) => {
                  return(
                    <Card>
                      <Card.Header>
                        <Card.Title onClick={()=>navigate(`/threads/${item.id}`)}>{item.thread_title}</Card.Title>
                      </Card.Header>
                      <Card.Body data-color-mode="light">
                        <MDEditor.Markdown className="text-muted" source={item.thread_content.substring(0, 200)} style={{ whiteSpace: "pre-wrap" }} preview="preview"/>
                      </Card.Body>
                    </Card>
                  )
                }):"No Threads"}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default ForumSection;

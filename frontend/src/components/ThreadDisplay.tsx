import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { AppContext } from "../App";
import MDEditor from "@uiw/react-md-editor";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { AppContextType } from "../types";

interface ThreadType {
  thread_id: number;
  thread_title: string;
  thread_type: string;
  thread_content: string;
  username?: string;
  is_anonymous: boolean;
  thread_timestamp: Date;
}

interface CommentType {
  comment_id?: number;
  thread_id: number;
  comment_content: string;
  username: string | undefined;
  is_anonymous?: boolean;
  comment_timestamp?: Date;
}

function ThreadDisplay() {
  const [comments, setComments] = useState<Array<CommentType>>([]);
  const [thread, setThread] = useState<ThreadType>();
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const { user, url, token } = useContext(AppContext) as AppContextType;

  const navigate = useNavigate();

  useEffect(() => {
    //fetch thread details
    fetch(`${url}/threads/id/${id}`)
      .then((res) => res.json())
      .then((data) => setThread(data));

    //fetch comments
    fetch(`${url}/comments/post/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [url, id]);

  const handleSubmit = () => {
    const obj = {
      comment_author: user?.publicData.id,
      thread_id: thread?.id,
      comment_content: value,
    };

    fetch(`${url}/comments/new`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        addComment({
          comment_content: data.comment_content,
          thread_id: data.thread_id,
          username: user?.publicData.username,
          comment_timestamp: data.comment_timestamp,
        });
        setValue("");
      });
  };

  const addComment = (comment: CommentType) => {
    setComments([...comments, comment]);
  }

  const handleChange = (value?: string) => {
    setValue(value || '');
  }

  const handleDelete = () => {
    console.log('deleting!')
    fetch(`${url}/threads/id/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.json())

    setShowModal(false);
    navigate('/forums');
  };

  return (
    <>
      <Container fluid className="forums-main">
        <Row className="justify-content-center">
          <Col md={6}>
            <Container className="flex-column justify-content-center">
              <Button
                className="m-2 btn-chat"
                variant="primary"
                onClick={() => navigate("/forums")}
              >
                Back
              </Button>
              {thread?.username === user?.publicData?.username ||
              user?.roles.includes("Admin") ? (
                <>
                  <Button
                    className="m-2 btn-chat"
                    variant="primary"
                    onClick={() => navigate(`/threads/${thread?.id}/edit`)}
                  >
                    Edit Post
                  </Button>
                  <Button
                    className="m-2 btn-chat"
                    variant="primary"
                    onClick={() => setShowModal(true)}
                  >
                    Delete Post
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Container>
            {createThreadCard(thread, navigate)}
            {thread ? (
              comments.map((comment) => {
                return createCommentCard(comment, navigate);
              })
            ) : (
              <div>Loading...</div>
            )}
          </Col>
        </Row>
        <br />
        <Row className="justify-content-center">
          <Col md={6} data-color-mode="light">
            <span>Post a comment:</span>
            <MDEditor value={value} onChange={(value)=>handleChange(value)} />
            <Button
              variant="primary"
              className="m-2 btn-chat"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
            <Button
              variant="primary"
              className="btn-chat"
              onClick={() => setValue("")}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() =>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ThreadDisplay;

const createThreadCard = (thread: ThreadType, navigate: NavigateFunction) => {
  return (
    <Card className="m-1" key={thread?.thread_id}>
      <Card.Header>
        <Card.Title className="m-2">{thread?.thread_title}</Card.Title>
      </Card.Header>
      <Card.Subtitle className="m-2 text-muted clickable" onClick={()=> navigate(`/profile/${thread?.username}`)}>
        {thread?.is_anonymous ? "Anonymous" : thread?.username}
      </Card.Subtitle>
      <Card.Body data-color-mode="light">
        <MDEditor.Markdown
          source={thread?.thread_content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Card.Body>
      <Card.Footer>
        <Card.Text className="text-muted">
          Posted on: {new Date(thread?.thread_timestamp).toDateString()}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

const createCommentCard = (comment: CommentType, navigate: NavigateFunction) => {
  return (
    <Card className="m-1" key={comment?.comment_id} onClick={()=> navigate(`/profile/${comment?.username}`)}>
      <Card.Subtitle className="m-2 text-muted clickable">
        {comment?.is_anonymous ? "Anonymous" : comment?.username}
      </Card.Subtitle>
      <Card.Body data-color-mode="light">
        <MDEditor.Markdown
          source={comment?.comment_content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Card.Body>
      <Card.Footer>
        <Card.Text className="text-muted">
          Posted on: {new Date(comment?.comment_timestamp).toDateString()}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

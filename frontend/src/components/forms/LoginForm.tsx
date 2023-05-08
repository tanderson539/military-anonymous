import { Form, Button } from "react-bootstrap";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivacyAct from "../PrivacyAct";
import { DismissableAlert } from "../DismissableAlert";
import { AlertType } from "../../types";
import { MouseEvent } from "react";

interface Props {
  handleSubmit: (e: MouseEvent<HTMLElement>) => void;
  alert: AlertType;
}

const LoginForm: FC<Props> = ( {handleSubmit, alert} ) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (alert.error === true) {
      setShowAlert(true);
    }else{
      setShowAlert(false);
    }
  }, [alert])

  return (
    <Form className="loginform-main">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name='username' placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" />
      </Form.Group>
      {showAlert ? <DismissableAlert alert={alert} setShowAlert={setShowAlert} /> : null}
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </Form.Group> */}
      <Button variant="primary" className="my-2 me-2" onClick={(e)=> {handleSubmit(e)}} >
        Submit
      </Button>

      <Button variant="primary" onClick={() => navigate('/register')}>
        Register
      </Button>

      <Button variant="primary" className="my-2 ms-2" onClick={() => navigate('/registerpro')}>
        Register as Specialist
      </Button>

      <PrivacyAct />
    </Form>
  );
}

export default LoginForm;

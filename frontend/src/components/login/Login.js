import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { userLoginThunk } from '../../redux/slice/userslice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const { register, handleSubmit } = useForm();
  const { loginUserStatus, currentUser, errorOccurred, errMsg } = useSelector(state => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async(loginCred) => {
    console.log(loginCred)
    let res=dispatch(userLoginThunk(loginCred));
    console.log(res.message)
  };

  useEffect(() => {
    if (loginUserStatus) {
      console.log('Login Success');
      console.log(currentUser)
      navigate('/')
    }
  }, [loginUserStatus, navigate, currentUser]);

  return (
    <Container className="mt-5 p-4 bg-light rounded w-50">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4 text-primary text-center">Login</h1>
          <Form onSubmit={handleSubmit(login)}>
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Control as="select" placeholder="Role" {...register('role')}>
                <option value="Parent">Parent</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your username"
                {...register('name')}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                {...register('password')}
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

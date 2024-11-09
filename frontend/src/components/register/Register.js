
import React from 'react';
import {useForm} from 'react-hook-form';
import { Form, Button, Row, Col,Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Register() {
  const { register, handleSubmit } = useForm();
  let navigate=useNavigate()
  let [err,setErr] = useState("")
  
async function registerUser(user){
  console.log(user)
  let res;
    res = await axios.post('http://localhost:4000/user-api/user',user)
    console.log(res)
if(res.data.message==='User created' ){
    navigate('/login')
}
else{
    setErr(res.data.message)
}
  

}

  return (
<Container className="mt-5 p-4 rounded" style={{ backgroundColor: '#f8f9fa', maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Register</h2>
      <Form onSubmit={handleSubmit(registerUser)}>
        <Form.Group as={Row} controlId="formRole" className="mb-3">
          <Col sm={12}>
            <Form.Control as="select" className="role-field" placeholder="Role" {...register("role",{required:true})}>
              <option>Volunteer</option>
              <option>Parent</option>
              <option>Instructor</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formUsername" className="mb-3">
          <Col sm={12}>
            <Form.Control type="text" className="username-field" placeholder="Username"{...register("username",{required:true})} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPassword" className="mb-3">
          <Col sm={12}>
            <Form.Control type="password" className="password-field" placeholder="Password" {...register("password",{required:true})} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAge" className="mb-3">
          <Col sm={12}>
            <Form.Control type="number" className="age-field" placeholder="Age" {...register("age",{required:true})}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formGender" className="mb-3">
          <Col sm={12}>
            <Form.Control as="select" className="gender-field" placeholder="Gender" {...register("gender",{required:true})}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPhoneNumber" className="mb-3">
          <Col sm={12}>
            <Form.Control type="text" className="phone-field" placeholder="Phone Number" {...register("phonenumber",{required:true})}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail" className="mb-3">
          <Col sm={12}>
            <Form.Control type="email" className="email-field" placeholder="Email" {...register("email",{required:true})}/>
          </Col>
        </Form.Group>

        {/*<Form.Group as={Row} controlId="formUploadImage" className="mb-3">
          <Col sm={12}>
            <Form.Label>Upload Image (Parents Only)</Form.Label>
            <Form.Control type="file" className="upload-field" />
          </Col>
        </Form.Group>*/}

        <Button variant="primary" type="submit" block>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Register
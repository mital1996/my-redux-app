import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../api/login";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormContainer from "../../component/FormContainer";
import Loader from "../../component/Loader";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      userName: user,
      password: password,
      notificationToken: "abc",
      deviceName: "samsung",
      platform: "android",
    },
  });

  useEffect(() => {
    form.setValue("userName", user);
    form.setValue("password", password);
  }, [user, password, form]);

  const [login, { isLoading, isError }] = useLoginUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form.getValues());
      sessionStorage.setItem("token", res?.data?.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler} role="form">
        <Form.Group className="my-2" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="off"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
        {isError && <div>Error occurred while signing in..</div>}
      </Form>
    </FormContainer>
  );
};

export default Login;

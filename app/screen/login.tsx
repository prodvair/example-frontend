import { useCallback, useState } from "react";

import Layout from "@/app/components/layout";
import { Button } from "@/app/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";

import { useAuth } from "../api/hook/useAuth";
import ActiveLink from "../components/ui/activeLink/ActiveLink";
import { Box } from "../components/ui/box";
import { Input } from "../components/ui/input";
import { H2 } from "../components/ui/title";

const LoginScreen = () => {
  const { login } = useAuth();
  const [sendParam, setSendParam] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const setValue = useCallback(
    (value: string, key: "email" | "password") => {
      setSendParam((prevSendParam) => ({
        ...prevSendParam,
        [key]: value,
      }));
      setErrors((prevError) => ({
        ...prevError,
        [key]: "",
      }));
    },
    [setSendParam, setErrors]
  );

  const sendRequest = useCallback(() => {
    login(sendParam).catch(({ response }) => {
      if (response.status === 422) setErrors(response.data.errors);
    });
  }, [login, sendParam, setErrors]);

  return (
    <div>
      <Layout title="Login" middleware="guest">
        <Box
          type="modal"
          color="white"
          alignH="center"
          css={{ marginBottom: 20 }}
        >
          <H2 css={{ marginBottom: 30 }}>Login</H2>
          <Input
            placeholder="E-mail"
            hint={errors.email}
            onChange={(e) => setValue(e.target.value, "email")}
          />
          <Input
            type="password"
            placeholder="Password"
            hint={errors.password}
            onChange={(e) => setValue(e.target.value, "password")}
          />
          <Button size="big" css={{ marginBottom: 10 }} onClick={sendRequest}>
            Auth
          </Button>
        </Box>

        <ActiveLink href="/signup">
          <Pencil2Icon />I need sign up
        </ActiveLink>
      </Layout>
    </div>
  );
};

export default LoginScreen;

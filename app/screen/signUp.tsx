import { useCallback, useState } from "react";

import Layout from "@/app/components/layout";
import { Button } from "@/app/components/ui/button";
import { EnterIcon } from "@radix-ui/react-icons";

import { useAuth } from "../api/hook/useAuth";
import ActiveLink from "../components/ui/activeLink/ActiveLink";
import { Box } from "../components/ui/box";
import { Input } from "../components/ui/input";
import { H2 } from "../components/ui/title";

export const SignUpScreen = () => {
  const { register } = useAuth();
  const [sendParam, setSendParam] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const setValue = useCallback(
    (value: string, key: "first_name" | "last_name" | "email" | "password") => {
      setSendParam((prevSendParam) => ({
        ...prevSendParam,
        [key]: value,
      }));
      setErrors((prevError) => ({
        ...prevError,
        [key]: "",
      }));
    },
    [setSendParam]
  );

  const sendRequest = useCallback(() => {
    register(sendParam).catch(({ response }) => {
      if (response.status === 422) setErrors(response.data.errors);
    });
  }, [register, sendParam, setErrors]);

  return (
    <div>
      <Layout title="Sign Up" middleware="guest">
        <Box
          type="modal"
          color="white"
          alignH="center"
          css={{ marginBottom: 20 }}
        >
          <H2 css={{ marginBottom: 30 }}>Sign Up</H2>
          <Input
            placeholder="First name"
            hint={errors.first_name}
            onChange={(e: any) => setValue(e.target.value, "first_name")}
          />
          <Input
            placeholder="Last name"
            hint={errors.last_name}
            onChange={(e: any) => setValue(e.target.value, "last_name")}
          />
          <Input
            placeholder="E-mail"
            hint={errors.email}
            onChange={(e: any) => setValue(e.target.value, "email")}
          />
          <Input
            type="password"
            placeholder="Password"
            hint={errors.password}
            onChange={(e: any) => setValue(e.target.value, "password")}
          />
          <Button size="big" css={{ marginBottom: 10 }} onClick={sendRequest}>
            Registration
          </Button>
        </Box>
        <ActiveLink href="/login">
          <EnterIcon />I hav account
        </ActiveLink>
      </Layout>
    </div>
  );
};

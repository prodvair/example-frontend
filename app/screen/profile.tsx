import { useCallback, useEffect, useState } from "react";

import Layout from "@/app/components/layout";
import { Button } from "@/app/components/ui/button";
import { EnterIcon } from "@radix-ui/react-icons";

import { updateUser, updateUserPassword } from "../api/fetchers/user";
import { useAuth } from "../api/hook/useAuth";
import ActiveLink from "../components/ui/activeLink/ActiveLink";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Box } from "../components/ui/box";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { H2 } from "../components/ui/title";

export const ProfileScreen = () => {
  const { user, username, refetch } = useAuth();
  const [sendParam, setSendParam] = useState({
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [sendParamPassword, setSendParamPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const setValue = useCallback(
    (value: string, key: "first_name" | "last_name" | "email" | "birthday") => {
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

  const setValuePassword = useCallback(
    (
      value: string,
      key: "old_password" | "new_password" | "confirm_password"
    ) => {
      setSendParamPassword((prevSendParamPassword) => ({
        ...prevSendParamPassword,
        [key]: value,
      }));
      setErrors((prevError) => ({
        ...prevError,
        [key]: "",
      }));
    },
    []
  );

  const sendRequest = useCallback(() => {
    updateUser(sendParam)
      .then(() => refetch())
      .catch(({ response }) => {
        if (response.status === 422)
          setErrors((prevErrors) => ({
            ...prevErrors,
            ...response.data.errors,
          }));
      });
    if (sendParamPassword.old_password) {
      updateUserPassword(sendParamPassword)
        .then(() => refetch())
        .catch(({ response }) => {
          if (response.status === 422)
            setErrors((prevErrors) => ({
              ...prevErrors,
              ...response.data.errors,
            }));
          setSendParamPassword({
            old_password: "",
            new_password: "",
            confirm_password: "",
          });
        });
    }
  }, [refetch, sendParam, sendParamPassword]);

  useEffect(() => {
    setSendParam((prevSendParam) => ({
      ...prevSendParam,
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    }));
  }, [user]);

  return (
    <div>
      <Layout title="Profile" middleware="auth">
        <Box
          type="modal"
          color="white"
          alignH="center"
          css={{ marginBottom: 20 }}
        >
          <Avatar size="big" css={{ marginBottom: 30 }}>
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={username.full} />
            ) : (
              ""
            )}

            <AvatarFallback>{username.initials}</AvatarFallback>
          </Avatar>
          <Input
            placeholder="First name"
            hint={errors.first_name}
            defaultValue={user?.first_name}
            onChange={(e: any) => setValue(e.target.value, "first_name")}
          />
          <Input
            placeholder="Last name"
            hint={errors.last_name}
            defaultValue={user?.last_name}
            onChange={(e: any) => setValue(e.target.value, "last_name")}
          />
          <Input
            placeholder="E-mail"
            hint={errors.email}
            defaultValue={user?.email}
            onChange={(e: any) => setValue(e.target.value, "email")}
          />
          <Separator css={{ marginBottom: 20 }} />
          <Input
            placeholder="Old password"
            hint={errors.old_password}
            onChange={(e: any) =>
              setValuePassword(e.target.value, "old_password")
            }
          />
          <Input
            placeholder="New password"
            hint={errors.new_password}
            onChange={(e: any) =>
              setValuePassword(e.target.value, "new_password")
            }
          />
          <Input
            placeholder="Confirm password"
            hint={errors.confirm_password}
            onChange={(e: any) =>
              setValuePassword(e.target.value, "confirm_password")
            }
          />
          <Button size="big" css={{ marginBottom: 10 }} onClick={sendRequest}>
            Save
          </Button>
        </Box>
      </Layout>
    </div>
  );
};

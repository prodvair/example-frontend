import { FC, useEffect } from "react";

import Layout from "@/app/components/layout";
import { Button } from "@/app/components/ui/button";

import { login } from "../api/fetchers/auth";
import { useAuth } from "../api/hook/useAuth";
import { useTasks } from "../api/hook/useTasks";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { user, login, logout } = useAuth();
  const { tasks, refetch } = useTasks();

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  return (
    <div>
      <Layout title="home">
        <div>
          <h1>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <Button
            onClick={() =>
              login({
                email: "prodvair.almaz@ya.ru",
                password: "123456",
              }).then((res) => {
                console.log(res.data.user);
              })
            }
          >
            Auth
          </Button>

          <Button onClick={logout}>logout</Button>
          <pre>{JSON.stringify(user)}</pre>

          <pre style={{ maxWidth: "90vw" }}>{JSON.stringify(tasks)}</pre>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

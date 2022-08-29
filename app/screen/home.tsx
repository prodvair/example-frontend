import { FC } from "react";

import Layout from "@/app/components/layout";
import { Button } from "@/app/components/ui/button";
import { decrement, increment, selectValue } from "@/app/slices/counterSlice";
import { getUser, selectUser } from "@/app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const count = useSelector(selectValue);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div>
      <Layout title="Login">
        <div>
          <h1>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <pre>{JSON.stringify(user)}</pre>
          <Button onClick={() => dispatch(getUser())}>Auth</Button>
          <h2>
            Counter counet: <b>{count}</b>
          </h2>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

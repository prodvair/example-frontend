import { useCallback, useEffect, useState } from "react";

import Layout from "@/app/components/layout";
import { Item } from "@radix-ui/react-dropdown-menu";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@radix-ui/react-icons";

import { useAuth } from "../api/hook/useAuth";
import { useTasks } from "../api/hook/useTasks";
import { TaskCard } from "../components/taskCard";
import { TaskDialog } from "../components/taskDialog";
import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { ColorPicker } from "../components/ui/colorPicker/ColorPicker";
import { Grid } from "../components/ui/grid";
import { Input } from "../components/ui/input";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { tasks, refetch } = useTasks({ search, page, per_page: 12 });
  const { user } = useAuth();

  useEffect(() => {
    refetch();
  }, [user, refetch, search, page]);

  const pagination = useCallback(
    (pageNumber: number) => {
      if (!tasks) return;
      if (pageNumber <= tasks.meta.last_page && pageNumber >= 1) {
        setPage(pageNumber);
      }
    },
    [tasks, setPage]
  );

  return (
    <div>
      <Layout title="Home" middleware="auth" alignH="left" alignV="top">
        <Box
          css={{
            justifyContent: "space-between",
            padding: 20,
            paddingBottom: 0,
            width: "100%",
          }}
        >
          <Box type="block">
            <Input
              placeholder="Search task"
              sz="small"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box type="block">
            <TaskDialog type="new">
              <Button bg="outline" size="small">
                <PlusIcon /> Add Task
              </Button>
            </TaskDialog>
          </Box>
        </Box>
        <Grid>
          {tasks?.data.map((item) => (
            <TaskCard key={item._id} {...item} />
          ))}
        </Grid>
        <Box
          css={{
            justifyContent: "flex-end",
            padding: 20,
            paddingBottom: 0,
            width: "100%",
          }}
        >
          {Number(tasks?.meta.current_page) != 1 ? (
            <Button
              bg="outline"
              size="small"
              onClick={() => pagination(Number(tasks?.meta.current_page) - 1)}
              css={{ marginRight: 10 }}
            >
              <ArrowLeftIcon />
              Prev
            </Button>
          ) : (
            ""
          )}

          {Number(tasks?.meta.current_page) != Number(tasks?.meta.last_page) ? (
            <Button
              bg="outline"
              size="small"
              onClick={() => pagination(Number(tasks?.meta.current_page) + 1)}
            >
              <ArrowRightIcon />
              Next
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Layout>
    </div>
  );
};

export default HomeScreen;

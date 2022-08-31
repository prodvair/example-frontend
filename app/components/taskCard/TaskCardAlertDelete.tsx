import { FC, ReactNode, useCallback } from "react";

import { removeTasks } from "@/app/api/fetchers/task";
import { useTasks } from "@/app/api/hook/useTasks";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alertDialog";
import { Box } from "../ui/box";
import { Button } from "../ui/button";

export interface TaskCardAlertDeleteProps {
  _id: string;
  title: string;
  children: ReactNode;
}

export const TaskCardAlertDelete: FC<TaskCardAlertDeleteProps> = ({
  _id,
  title,
  children,
}) => {
  const { refetch } = useTasks();

  const deleteTask = useCallback(() => {
    removeTasks(_id).then(() => refetch());
  }, [_id, refetch]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your task{" "}
          <span>{title}</span> from our servers.
        </AlertDialogDescription>
        <Box alignV="bottom">
          <AlertDialogCancel asChild>
            <Button bg="outline" css={{ marginRight: 25 }}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={deleteTask}>Yes, delete task</Button>
          </AlertDialogAction>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  );
};

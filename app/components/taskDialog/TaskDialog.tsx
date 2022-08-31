import { FC, ReactNode, useCallback, useState } from "react";

import { createTasks, updateTasks } from "@/app/api/fetchers/task";
import { useTasks } from "@/app/api/hook/useTasks";
import { TaskResource } from "@/app/types/resources/Task";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Box } from "../ui/box";
import { Button, IconButton } from "../ui/button";
import { ColorPicker } from "../ui/colorPicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export interface TaskDialogProps {
  type: "edit" | "new";
  data?: TaskResource;
  children: ReactNode;
}

export const TaskDialog: FC<TaskDialogProps> = ({
  type,
  children,
  data = {
    _id: "",
    title: "",
    content: "",
    updated_at: "",
    created_at: "",
  },
}) => {
  const { refetch } = useTasks();
  const [dialogState, setDialogState] = useState(false);
  const [sendParam, setSendParam] = useState(data);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    color: "",
  });

  const setValue = useCallback(
    (value: string, key: "title" | "content" | "color") => {
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

  const setOpen = useCallback(
    (open: boolean) => {
      setDialogState(open);
    },
    [setDialogState]
  );

  const sendRequest = useCallback(() => {
    if (type === "edit") {
      updateTasks(sendParam._id, {
        title: sendParam.title,
        content: sendParam.content,
        color: sendParam.color,
      })
        .then(() => refetch())
        .catch(({ response }) => {
          if (response.status === 422) {
            setOpen(true);
            setErrors(response.data.errors);
          }
        });
    } else {
      createTasks({
        title: sendParam.title,
        content: sendParam.content,
        color: sendParam.color,
      })
        .then(() => refetch())
        .catch(({ response }) => {
          if (response.status === 422) {
            setOpen(true);
            setErrors(response.data.errors);
          }
        });
    }
  }, [
    refetch,
    sendParam._id,
    sendParam.color,
    sendParam.content,
    sendParam.title,
    setOpen,
    type,
  ]);

  return (
    <Dialog onOpenChange={setOpen} open={dialogState}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {type === "edit" ? `Edit ${data.title}` : "New task"}
        </DialogTitle>
        <DialogDescription>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <Input
          placeholder="Title"
          hint={errors.title}
          defaultValue={sendParam.title}
          onChange={(e) => setValue(e.target.value, "title")}
        />
        <Input
          placeholder="Content"
          hint={errors.content}
          defaultValue={sendParam.content}
          onChange={(e) => setValue(e.target.value, "content")}
        />
        <ColorPicker
          defaultValue={sendParam.color}
          onValueChange={(value: string) => setValue(value, "color")}
        />

        <Box alignV="bottom" css={{ marginTop: 25 }}>
          <DialogClose asChild>
            <Button onClick={sendRequest}>
              {type === "edit" ? "Save changes" : "Create"}
            </Button>
          </DialogClose>
        </Box>
        <DialogClose asChild>
          <IconButton
            aria-label="Close"
            css={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

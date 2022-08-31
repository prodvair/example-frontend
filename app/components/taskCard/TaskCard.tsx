import { FC } from "react";

import { TaskResource } from "@/app/types/resources/Task";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { TaskDialog } from "../taskDialog";
import { IconButton } from "../ui/button";
import { Card, CardAction, CardContent, CardDate } from "../ui/card";
import { H3 } from "../ui/title";
import { TaskCardAlertDelete } from "./TaskCardAlertDelete";

export const TaskCard: FC<TaskResource> = ({
  _id,
  title,
  content,
  color,
  updated_at,
  created_at,
}) => {
  // const getDate = (date: string) => {
  //   cnew Date()
  // }

  return (
    <Card color={color}>
      <CardAction>
        <IconButton>
          <TaskDialog
            type="edit"
            data={{
              _id,
              title,
              content,
              color,
              updated_at,
              created_at,
            }}
          >
            <Pencil1Icon />
          </TaskDialog>
        </IconButton>
        <TaskCardAlertDelete title={title} _id={_id}>
          <IconButton>
            <TrashIcon />
          </IconButton>
        </TaskCardAlertDelete>
      </CardAction>
      <H3 css={{ marginRight: 55 }}>{title}</H3>
      <CardContent>{content}</CardContent>
      <CardDate className="date">{created_at}</CardDate>
    </Card>
  );
};

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button } from "@mui/base/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { FormEvent, useEffect, useRef, useState } from "react";
import { BlockArea } from "../App";

interface BlockAreaProps {
  id: string;
  blocksMap: Map<string, Block>;
  onEdit: (id: string, value: string) => void;
}

export function BlockArea({ id, onEdit, blocksMap }: BlockAreaProps) {
  const [executionResult, setExecutionResult] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let value = inputRef.current?.value;

    if (!value) {
      setExecutionResult("No value");
    }

    try {
      const regex = /A\d+/g;
      let matches = value?.match(regex);
      if (matches) {
        for (const match of matches) {
          if (blocksMap.has(match)) {
            value = value?.replace(match, `'${blocksMap.get(match)?.value || ""}' `);
            debugger;
          }
        }
      }

      const result = eval(value as string);
      setExecutionResult(result.toString());
    } catch (error: any) {
      setExecutionResult(error.message);
    }
  };

  useEffect(() => {
    onEdit(id, executionResult);
  }, [executionResult]);

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {id}
        <form onSubmit={onSubmit}>
          <TextareaAutosize
            minRows={3}
            aria-label="empty textarea"
            placeholder="Empty"
            id="value"
            ref={inputRef}
          />
          <Button type="submit">Run</Button>
        </form>
      </Stack>
      <Box>{executionResult}</Box>
    </Stack>
  );
}

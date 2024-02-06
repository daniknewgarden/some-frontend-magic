import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button } from "@mui/base/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { FormEvent, useRef, useState } from "react";

// TODO: rename to CodeBlock
export function InputArea() {
  const [executionResult, setExecutionResult] = useState("jfksdjflk");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value;

    if (!value) {
      setExecutionResult("No value");
    }

    try {
      const result = eval(JSON.stringify(value));
      setExecutionResult(result.toString());
    } catch (error: any) {
      setExecutionResult(error.message);
    }
  };

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      <Stack direction="row" spacing={2} alignItems="flex-start">
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

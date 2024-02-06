import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button } from "@mui/base/Button";
import Stack from "@mui/material/Stack";

export function InputArea() {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <TextareaAutosize minRows={3} aria-label="empty textarea" placeholder="Empty" />
      <Button>Button</Button>
    </Stack>
  );
}

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { InputArea } from "./components";
import { Stack } from "@mui/material";
import { Button } from "@mui/base";

interface Block {
  id: string;
}

function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const onBlockAdd = () => {
    setBlocks(prev => {
      return [...prev, { id: uuidv4() }];
    });
  };

  return (
    <Stack spacing={2} justifyContent="center">
      {blocks.map(block => (
        <InputArea key={block.id} />
      ))}
      <Button onClick={onBlockAdd}>Add Block</Button>
    </Stack>
  );
}

export default App;

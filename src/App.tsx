import { useState } from "react";
import { BlockArea } from "./components";
import { Stack } from "@mui/material";
import { Button } from "@mui/base";

export interface Block {
  id: string;
  value: string;
}

function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const blocksMap = new Map<string, Block>();
  blocks.forEach(block => {
    blocksMap.set(block.id, block);
  });

  const onBlockAdd = () => {
    setBlocks(prev => {
      return [...prev, { id: `A${blocks.length + 1}`, value: "" }];
    });
  };

  const onBlockEdit = (id: string, value: string) => {
    setBlocks(prev => {
      return prev.map(block => {
        if (block.id === id) {
          return { ...block, value };
        }
        return block;
      });
    });
  };

  return (
    <Stack spacing={2} justifyContent="center">
      {blocks.map(block => (
        <BlockArea key={block.id} id={block.id} onEdit={onBlockEdit} blocksMap={blocksMap} />
      ))}
      <Button onClick={onBlockAdd}>Add Block</Button>
    </Stack>
  );
}

export default App;

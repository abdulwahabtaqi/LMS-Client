
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

const HTMLEditor = ({ initialHtml }: { initialHtml: any }) => {
  const [html, setHtml] = useState(initialHtml);

  const handleDrop = (item:any) => {
    // Handle the dropped item and update the HTML content
    const updatedHtml = `${html}\n${item.text}`;
    setHtml(updatedHtml);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {/* Your drag-and-drop components go here */}
        <div
          // Example drop target
          onDrop={(e) => {
            e.preventDefault();
            const item = JSON.parse(e.dataTransfer.getData('text/plain'));
            handleDrop(item);
          }}
          onDragOver={(e) => e.preventDefault()}
          style={{ border: '1px solid black', minHeight: '200px' }}
        >
          Drop HTML here
        </div>

        {/* HTML Code Editor */}
        <AceEditor
          mode="html"
          theme="monokai"
          name="html-editor"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={html}
          onChange={(value) => setHtml(value)}
          style={{ width: '100%', minHeight: '200px' }}
        />
      </div>
    </DndProvider>
  );
};

export default HTMLEditor;

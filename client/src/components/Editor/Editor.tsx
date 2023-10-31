import React from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import PlayerCard from './PlayerCard';

const Editor = () => {
  const [code, setCode] = React.useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/run-code', { code });
      console.log('Code execution result:', response.data);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={undefined} />

      <div className="border-4 border-dashed border-gray-800 flex flex-grow rounded-lg my-4">
        <AceEditor
          mode="javascript"
          theme="github"
          onChange={handleCodeChange}
          name="code_editor"
          value={code}
          editorProps={{ $blockScrolling: true }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <button 
        onClick={handleRunCode} 
        className="my-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Run Code
      </button>

      <PlayerCard self />
    </div>
  );
};

export default Editor;

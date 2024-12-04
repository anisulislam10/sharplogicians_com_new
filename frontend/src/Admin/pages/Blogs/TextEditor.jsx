// TextEditor.jsx
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { DraftEditorBlockStyleFn } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Handle changes in the editor's content
  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  // Handle bold, italic, and underline formatting
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        { src: imageUrl }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.push(
        editorState,
        contentStateWithEntity,
        'insert-characters'
      );
      setEditorState(newEditorState);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onEditorStateChange}
        handleKeyCommand={handleKeyCommand}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default TextEditor;

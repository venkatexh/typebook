import './code-editor.css';
import './syntax.css';
import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import React from 'react';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });

    const monacoJSXHighlighter = new MonacoJSXHighlighter(monaco, parse, traverse, editor);
    monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
  
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          theme: 'dark',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;

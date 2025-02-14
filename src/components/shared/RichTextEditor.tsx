import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEdit } from '../../contexts/EditContext';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  className?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg py-1.5 px-2 z-50 flex gap-1.5 items-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded text-sm ${editor.isActive('bold') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        title="Bold"
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        title="Italic"
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded text-sm underline ${editor.isActive('underline') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        title="Underline"
      >
        U
      </button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <select
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        className="p-1 rounded border text-sm"
        value={editor.getAttributes('textStyle').fontFamily}
        title="Font Family"
      >
        <option value="Inter">Default</option>
        <option value="poppins">Poppins</option>
        <option value="serif">Serif</option>
      </select>
      <select
        onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
        className="p-1 rounded border text-sm"
        title="Font Size"
      >
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="32px">32px</option>
        <option value="48px">48px</option>
        <option value="64px">64px</option>
      </select>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <select
        onChange={(e) => editor.chain().focus().setTextAlign(e.target.value).run()}
        className="p-1 rounded border text-sm"
        value={editor.getAttributes('textAlign').textAlign}
        title="Text Align"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().setColor('#1a1a1a').run()}
          className="w-6 h-6 rounded bg-[#1a1a1a] hover:ring-2 ring-offset-2 ring-blue-400"
          title="Black"
        />
        <button
          onClick={() => editor.chain().focus().setColor('#666666').run()}
          className="w-6 h-6 rounded bg-[#666666] hover:ring-2 ring-offset-2 ring-blue-400"
          title="Gray"
        />
        <button
          onClick={() => {
            const element = editor.view.dom;
            element.style.backgroundImage = 'linear-gradient(to right, #A533FF, #ff3366)';
            element.style.webkitBackgroundClip = 'text';
            element.style.backgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            editor.chain().focus().setColor('transparent').run();
          }}
          className="w-6 h-6 rounded bg-gradient-to-r from-[#A533FF] to-[#ff3366] hover:ring-2 ring-offset-2 ring-blue-400"
          title="Gradient"
        />
      </div>
    </div>
  );
};

export default function RichTextEditor({
  content,
  onChange,
  className = '',
}: RichTextEditorProps) {
  const { isEditMode } = useEdit();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content,
    editable: isEditMode,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: className,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      {isEditMode && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

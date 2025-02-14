import React, { useState, useEffect, useRef } from 'react';
import { useEdit } from '../../contexts/EditContext';

interface EditableTextProps {
  content: string;
  onChange: (value: string) => void;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  multiline?: boolean;
}

export default function EditableText({
  content,
  onChange,
  className = '',
  as: Component = 'p',
  multiline = false,
}: EditableTextProps) {
  const { isEditMode } = useEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setValue(content);
  }, [content]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (!isEditMode) {
    return <Component className={className}>{content}</Component>;
  }

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          setIsEditing(false);
          onChange(value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !multiline) {
            setIsEditing(false);
            onChange(value);
          }
        }}
        className={`block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        rows={multiline ? 4 : undefined}
      />
    );
  }

  return (
    <Component
      className={`${className} cursor-pointer hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 rounded px-2 py-1 -mx-2`}
      onClick={() => setIsEditing(true)}
    >
      {content}
    </Component>
  );
}

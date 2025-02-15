import React, { useState, useEffect, useRef } from 'react';
import { useEdit } from '../../contexts/EditContext';
import DOMPurify from 'dompurify';

interface EditableTextProps {
  content: string;
  onChange: (value: string) => void;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

export default function EditableText({
  content,
  onChange,
  className = '',
  as: Component = 'p',
}: EditableTextProps) {
  const { isEditMode } = useEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);
  const editableRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const sanitizeHtml = (html: string) => {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span', 'br'] });
  };

  const handleBlur = () => {
    setIsEditing(false);
    const sanitizedValue = sanitizeHtml(editableRef.current?.innerHTML || '');
    onChange(sanitizedValue);
  };

  if (!isEditMode) {
    return <Component className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />;
  }

  if (isEditing) {
    return React.createElement(Component, {
      ref: editableRef,
      contentEditable: true,
      onBlur: handleBlur,
      dangerouslySetInnerHTML: { __html: sanitizeHtml(value) },
      className: `${className} outline-none border border-blue-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`
    });
  }

  return React.createElement(Component, {
    className: `${className} cursor-pointer hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 rounded px-2 py-1 -mx-2`,
    onClick: () => setIsEditing(true),
    dangerouslySetInnerHTML: { __html: sanitizeHtml(content) }
  });
}
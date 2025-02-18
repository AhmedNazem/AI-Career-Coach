"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content, onChange }) => {
  const [value, setValue] = useState(content);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue); // Pass the updated content to the parent component
    }
  };

  return (
    <div className="py-4">
      <MDEditor value={value} onChange={handleEditorChange} height={700} />
    </div>
  );
};

export default CoverLetterPreview;

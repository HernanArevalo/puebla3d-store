import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos del editor

// Importar ReactQuill de forma dinámica para evitar problemas con SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  description:string;
  onChange: (value:string)=>void
}

export default function RichTextEditor({description, onChange}: Props) {

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={description} onChange={onChange} />
    </div>
  );
}

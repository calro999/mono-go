import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="list-disc pl-5 my-4 space-y-1 text-slate-700 font-sans">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(`flush-${index}`);
      return;
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      flushList(`h3-${index}`);
      const text = trimmed.replace(/^###\s+/, '');
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4 border-b-2 border-indigo-500 pb-2 flex items-center gap-2">
          <span>{text}</span>
        </h3>
      );
      return;
    }

    // H4 Heading
    if (trimmed.startsWith('#### ')) {
      flushList(`h4-${index}`);
      const text = trimmed.replace(/^####\s+/, '');
      elements.push(
        <h4 key={`h4-${index}`} className="text-lg font-bold text-indigo-900 mt-6 mb-3 bg-indigo-50/80 p-3 rounded-xl border-l-4 border-indigo-600">
          {text}
        </h4>
      );
      return;
    }

    // List item (- or * or ・)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('・')) {
      const text = trimmed.replace(/^[-*・]\s*/, '');
      listItems.push(text);
      return;
    }

    // Normal Paragraph
    flushList(`p-${index}`);
    
    // Parse Bold text **text**
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    const parsedNodes = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} className="font-extrabold text-slate-900 bg-amber-100/60 px-1 rounded">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    elements.push(
      <p key={`p-${index}`} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
        {parsedNodes}
      </p>
    );
  });

  flushList(`final`);

  return <div className="space-y-2">{elements}</div>;
}

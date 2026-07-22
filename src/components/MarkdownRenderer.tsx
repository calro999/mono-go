import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const parseInline = (text: string): React.ReactNode[] => {
    // Regex for **bold** text
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={pIdx} className="font-extrabold text-slate-900 bg-amber-100/70 px-1.5 py-0.5 rounded mx-0.5 border-b border-amber-300">
            {boldText}
          </strong>
        );
      }
      return part;
    });
  };

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="my-4 space-y-2 text-slate-700 font-sans">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs sm:text-sm">
              <span className="text-indigo-600 font-bold flex-shrink-0">✓</span>
              <span>{item}</span>
            </li>
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
        <h3 key={`h3-${index}`} className="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4 border-b-2 border-indigo-500 pb-2.5 flex items-center gap-2">
          <span>{parseInline(text)}</span>
        </h3>
      );
      return;
    }

    // H4 Heading
    if (trimmed.startsWith('#### ')) {
      flushList(`h4-${index}`);
      const text = trimmed.replace(/^####\s+/, '');
      elements.push(
        <h4 key={`h4-${index}`} className="text-base sm:text-lg font-extrabold text-indigo-900 mt-6 mb-3 bg-indigo-50/80 p-3.5 rounded-2xl border-l-4 border-indigo-600 shadow-sm">
          {parseInline(text)}
        </h4>
      );
      return;
    }

    // List item (- or * or ・)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('・')) {
      const text = trimmed.replace(/^[-*・]\s*/, '');
      listItems.push(parseInline(text));
      return;
    }

    // Normal Paragraph
    flushList(`p-${index}`);

    elements.push(
      <p key={`p-${index}`} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
        {parseInline(trimmed)}
      </p>
    );
  });

  flushList(`final`);

  return <div className="space-y-2">{elements}</div>;
}

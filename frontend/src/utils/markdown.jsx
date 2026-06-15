import React from 'react';

/**
 * A lightweight custom Markdown parser that translates common elements
 * into styled React JSX components, avoiding external library overhead.
 */
export const renderMarkdown = (markdownText) => {
  if (!markdownText) return null;

  // Split content by code blocks and normal text
  const parts = markdownText.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    // Check if it is a code block
    if (part.startsWith('```')) {
      const match = part.match(/```(\w*)\n([\s\S]*?)```/);
      const language = match ? match[1] : '';
      const code = match ? match[2] : part.slice(3, -3);

      return (
        <div key={index} className="my-6 rounded-lg overflow-hidden border border-white/5 shadow-2xl">
          <div className="bg-[#101530] px-4 py-2 flex justify-between items-center text-[10px] font-mono text-[#8F9CAE] border-b border-white/[0.04]">
            <span>{language.toUpperCase() || 'CODE'}</span>
            <span className="text-[9px] uppercase tracking-wider text-portfolio-primary">ReadOnly</span>
          </div>
          <pre className="p-4 bg-black/60 overflow-x-auto text-xs md:text-sm font-mono text-[#00E5FF] leading-relaxed">
            <code>{code.trim()}</code>
          </pre>
        </div>
      );
    }

    // Process normal text (paragraphs, lists, headings)
    const lines = part.split('\n');
    let inList = false;
    const listItems = [];
    const elements = [];

    const flushList = (key) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-xs md:text-sm text-[#8F9CAE]">
            {[...listItems]}
          </ul>
        );
        listItems.length = 0;
        inList = false;
      }
    };

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();

      // Heading 1
      if (trimmed.startsWith('# ')) {
        flushList(lineIdx);
        elements.push(
          <h1 key={lineIdx} className="text-2xl md:text-3xl font-extrabold text-white mt-8 mb-4 tracking-tight border-b border-white/[0.04] pb-2">
            {trimmed.slice(2)}
          </h1>
        );
      }
      // Heading 2
      else if (trimmed.startsWith('## ')) {
        flushList(lineIdx);
        elements.push(
          <h2 key={lineIdx} className="text-xl md:text-2xl font-bold text-white mt-6 mb-3 tracking-tight">
            {trimmed.slice(3)}
          </h2>
        );
      }
      // Heading 3
      else if (trimmed.startsWith('### ')) {
        flushList(lineIdx);
        elements.push(
          <h3 key={lineIdx} className="text-lg md:text-xl font-bold text-white mt-5 mb-2 tracking-tight">
            {trimmed.slice(4)}
          </h3>
        );
      }
      // List Item
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        listItems.push(
          <li key={lineIdx} className="leading-relaxed">
            {parseInlineFormatting(trimmed.slice(2))}
          </li>
        );
      }
      // Ordered List Item
      else if (/^\d+\.\s/.test(trimmed)) {
        inList = true;
        const text = trimmed.replace(/^\d+\.\s/, '');
        listItems.push(
          <li key={lineIdx} className="list-decimal leading-relaxed ml-2">
            {parseInlineFormatting(text)}
          </li>
        );
      }
      // Empty Line
      else if (trimmed === '') {
        flushList(lineIdx);
      }
      // Table Row (Simple parsing helper)
      else if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList(lineIdx);
        // Skip separator rows like |---|---|
        if (!trimmed.includes('---')) {
          const cells = trimmed.split('|').map(c => c.trim()).filter(c => c !== '');
          elements.push(
            <div key={lineIdx} className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-white/[0.04] text-xs md:text-sm text-[#8F9CAE]">
                <tbody>
                  <tr className="bg-white/[0.01]">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 border border-white/[0.04]">{cell}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      }
      // Standard Paragraph
      else {
        flushList(lineIdx);
        elements.push(
          <p key={lineIdx} className="my-3 text-xs md:text-sm text-[#8F9CAE] leading-relaxed">
            {parseInlineFormatting(line)}
          </p>
        );
      }
    });

    flushList(lines.length);
    return <React.Fragment key={index}>{elements}</React.Fragment>;
  });
};

// Help parse bold (**text**) and inline code (`code`)
const parseInlineFormatting = (text) => {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="font-mono text-portfolio-primary bg-portfolio-primary/10 px-1.5 py-0.5 rounded text-xs">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

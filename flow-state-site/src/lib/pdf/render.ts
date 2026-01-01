import React from 'react';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';

export async function renderPdfToBuffer(element: React.ReactElement): Promise<Buffer> {
  const buf = await renderToBuffer(element as React.ReactElement<DocumentProps>);
  return Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
}

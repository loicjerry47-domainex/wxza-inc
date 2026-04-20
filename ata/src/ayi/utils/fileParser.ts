import * as XLSX from 'xlsx';
import mammoth from 'mammoth';

export const parseFileToGenerativePart = async (file: File): Promise<{ inlineData?: { data: string, mimeType: string }, text?: string }> => {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // Images, PDF, TXT, CSV, HTML, MD, XML, RTF are supported natively via inlineData
  const nativelySupportedTypes = [
    'image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif',
    'application/pdf',
    'text/plain', 'text/csv', 'text/html', 'text/css', 'text/md', 'text/xml', 'text/rtf',
    'application/x-javascript', 'text/javascript', 'application/x-python'
  ];

  if (nativelySupportedTypes.includes(fileType) || fileName.endsWith('.txt') || fileName.endsWith('.csv') || fileName.endsWith('.md')) {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    
    let mimeType = fileType;
    if (!mimeType) {
        if (fileName.endsWith('.csv')) mimeType = 'text/csv';
        else if (fileName.endsWith('.md')) mimeType = 'text/md';
        else mimeType = 'text/plain';
    }

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType },
    };
  }

  // Handle Excel files (.xlsx, .xls)
  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel') {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    let csvContent = '';
    
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      csvContent += `--- Sheet: ${sheetName} ---\n`;
      csvContent += XLSX.utils.sheet_to_csv(worksheet);
      csvContent += '\n\n';
    });

    // Send as text/csv inlineData or just text
    const base64EncodedData = btoa(unescape(encodeURIComponent(csvContent)));
    return {
      inlineData: { data: base64EncodedData, mimeType: 'text/csv' },
    };
  }

  // Handle Word files (.docx)
  if (fileName.endsWith('.docx') || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const textContent = result.value;
    
    const base64EncodedData = btoa(unescape(encodeURIComponent(textContent)));
    return {
      inlineData: { data: base64EncodedData, mimeType: 'text/plain' },
    };
  }

  // Fallback for unknown text-based files
  try {
    const text = await file.text();
    const base64EncodedData = btoa(unescape(encodeURIComponent(text)));
    return {
      inlineData: { data: base64EncodedData, mimeType: 'text/plain' },
    };
  } catch (e) {
    throw new Error(`Unsupported file type: ${fileName}`);
  }
};

declare module 'pdf-parse' {
  type PDFData = { text: string; numpages: number }
  function pdf(data: Buffer, options?: any): Promise<PDFData>
  export default pdf
}


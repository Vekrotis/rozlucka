
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generateInvitationPDF = async (elementId: string, filename: string = 'pozvanka.pdf') => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error('Element not found');
      return false;
    }
    
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff8f7',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        // Find the cloned element in the cloned document
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Make sure all content is visible and properly styled for PDF
          const clonedHtmlElement = clonedElement as HTMLElement;
          clonedHtmlElement.style.padding = '30px';
          clonedHtmlElement.style.maxWidth = '100%';
          clonedHtmlElement.style.width = 'auto';
          clonedHtmlElement.style.height = 'auto';
          clonedHtmlElement.style.position = 'static';
          clonedHtmlElement.style.opacity = '1';
          
          // Remove buttons and elements with pdf-hide class
          const pdfHideElements = clonedElement.querySelectorAll('.pdf-hide');
          pdfHideElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.display = 'none';
          });

          // Show any hidden elements
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.style && !htmlEl.classList.contains('pdf-hide')) {
              htmlEl.style.opacity = '1';
            }
          });

          // Set Caveat font and proper styling for the name element
          const nameElement = clonedElement.querySelector('p.font-caveat');
          if (nameElement) {
            const htmlNameElement = nameElement as HTMLElement;
            htmlNameElement.style.fontFamily = 'Caveat, cursive';
            htmlNameElement.style.fontWeight = 'bold';
            htmlNameElement.style.fontSize = '30px';
            htmlNameElement.style.color = '#333';
            htmlNameElement.style.padding = '10px';
            htmlNameElement.style.margin = '16px 0';
            htmlNameElement.style.border = 'none';
            htmlNameElement.style.background = 'none';
          }
        }
      }
    });
    
    // Calculate dimensions for A4 size
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF and add image
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    return false;
  }
};

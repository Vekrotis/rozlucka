
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
          // Cast to HTMLElement to access style property
          const htmlElement = clonedElement as HTMLElement;
          htmlElement.style.padding = '30px';
          htmlElement.style.maxWidth = '100%';
          htmlElement.style.width = 'auto';
          htmlElement.style.height = 'auto';
          htmlElement.style.position = 'static';
          htmlElement.style.opacity = '1';
          
          // Hide buttons for PDF
          const buttonsContainer = clonedElement.querySelector('#buttons-container');
          if (buttonsContainer) {
            (buttonsContainer as HTMLElement).style.display = 'none';
          }

          // Hide any other elements with pdf-hide class
          const hideElements = clonedElement.querySelectorAll('.pdf-hide');
          hideElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });

          // Show any hidden elements
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach(el => {
            if ((el as HTMLElement).style) {
              (el as HTMLElement).style.opacity = '1';
            }
          });
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

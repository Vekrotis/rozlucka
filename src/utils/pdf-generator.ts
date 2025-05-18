
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
          clonedElement.style.padding = '30px';
          clonedElement.style.maxWidth = '100%';
          clonedElement.style.width = 'auto';
          clonedElement.style.height = 'auto';
          clonedElement.style.position = 'static';
          clonedElement.style.opacity = '1';
          
          // Ensure all elements within are visible
          const buttons = clonedElement.querySelectorAll('button');
          buttons.forEach(button => {
            button.style.backgroundColor = '#6C63FF';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '10px 15px';
            button.style.borderRadius = '8px';
            button.style.margin = '5px';
            button.style.fontSize = '14px';
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

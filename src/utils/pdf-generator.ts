
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generateInvitationPDF = async (elementId: string, filename: string = 'pozvanka.pdf') => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error('Element not found');
      return;
    }
    
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff8f7'
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

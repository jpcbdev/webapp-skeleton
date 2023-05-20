import { jsPDF } from 'jspdf';

export const print = (content: string[], preview = true) => {
    if (content[2]) content[2] = new Date(content[2]).toLocaleDateString();
    const printer = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [58, 210],
    });
    printer.setFontSize(8);
    content.map((item, index) => printer.text(item, 2, (index + 1) * 8));
    if (!preview) { printer.save(); return; }
    printer.autoPrint();
    printer.output('dataurlnewwindow');
}
import { Router } from "express";
const route = Router();
// import { buildPDF } from "../utils/generatePdf.js";
import PDFDocument from "pdfkit";

route.post("/generate-pdf", (req, res) => {
  const doc = new PDFDocument({ bufferPages: true });

  const {
    clientName,
    cuit,
    products,
    subTotalArs,
    taxesIva,
    totalFinal,
    ivaCondition,
  } = req.body;

  const fileName = `Quotation-${clientName}-${Date.now()}.pdf`;

  res.writeHead(200, {
    "Content-Type": "Application/pdf",
    "Content-Disposition": `attachment;filename=${fileName}`,
  });

  doc.pipe(res);

  doc.fontSize(20).text(`Quotation for: ${clientName}`);
  doc.moveDown();
  doc.fontSize(15).text(`CUIT: ${cuit} - IVA Condition: ${ivaCondition}`);
  doc.moveDown();

  products.forEach((prod) => {
    doc
      .fontSize(12)
      .text(
        `- ${prod.name} | SKU: ${prod.sku} | USD ${prod.price_usd} | ARS ${prod.priceArs}`,
      );
  });
  doc.moveDown();

  doc.fontSize(12).text(`${subTotalArs}`);
  doc.fontSize(12).text(`${taxesIva}`);
  doc.fontSize(12).text(`${totalFinal}`);

  doc.end();
  console.log(fileName);
});

export default route;

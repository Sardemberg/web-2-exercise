const PDFDocument = require('pdfkit');
const path = require('path')
const { labRepository } = require("../../repository/labRepository");

const labReportController = async (_, res) => {
    const allLabs = await labRepository.getAllLabs();

    console.log(allLabs);

    try {
        if(allLabs.length == 0){
            res.status(404).json({
                message: "Nenhum laboratório encontrado :("
            })

            return
        }

        const doc = new PDFDocument();
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="labs.pdf"');

        doc.pipe(res);

        doc.fontSize(20).text('Lista de Laboratórios', { align: 'center' });
        doc.moveDown();

        allLabs.forEach((lab, index) => {
            doc.fontSize(16).text(`Laboratório ${index + 1}: ${lab.name}`, { underline: true });
            doc.moveDown(0.5);

            doc.fontSize(12).text(`Capacidade: ${lab.capacity}`);
            doc.text(`Descrição: ${lab.description}`);
            doc.moveDown(0.5);

            if (lab.photo) {
                const imagePath = path.join(__dirname, '../../../uploads', lab.photo);

                try {
                    doc.image(imagePath, {
                        fit: [150, 150],
                        align: 'center',
                        valign: 'center',
                    });
                } catch (err) {
                    doc.text("Erro ao carregar a foto.");
                    console.error(err.message)
                }
            } else {
                doc.text("Foto não disponível.");
            }

            doc.moveDown(1);
            doc.addPage();
        });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao gerar o PDF" });
        return
    }
}

module.exports = {
    labReportController
}
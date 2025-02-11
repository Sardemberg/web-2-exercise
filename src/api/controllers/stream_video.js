const fs = require("fs");
const path = require("path");

const streamTutoria = async (req, res) => {
    const videoPath = path.join("tutorial.mp4");

        // Verifica se o arquivo existe
        if (!fs.existsSync(videoPath)) {
            return res.status(404).send("Vídeo não encontrado.");
        };

        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            // Streaming com suporte a range de bytes (para reprodução contínua)
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;

            const fileStream = fs.createReadStream(videoPath, { start, end });

            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4",
            });

            fileStream.pipe(res);
        } else {
            // Envia o vídeo inteiro caso não haja range especificado
            res.writeHead(200, {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
            });

            fs.createReadStream(videoPath).pipe(res);
        };

};

module.exports = {  
    streamTutoria
};
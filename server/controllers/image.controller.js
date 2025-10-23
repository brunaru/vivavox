import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getUploadUrl(req, res) {
  try {
    const { fileName, fileType } = req.query;

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${fileName}`,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.status(200).send({ uploadUrl });
  } catch (error) {
    console.error("Erro ao gerar URL:", error.message);
    res.status(500).send({ message: "Erro ao gerar URL de upload" });
  }
}

export async function deleteImage(req, res) {
  try {
    const { imageUrl } = req.body;
    const key = getS3KeyFromUrl(imageUrl);

    if (!key) {
      return res.status(400).send({ message: "URL inválida para exclusão" });
    }

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);
    res.status(200).send({ message: "Imagem deletada com sucesso" });

  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    res.status(500).send({ message: "Erro ao deletar imagem" });
  }
}


function getS3KeyFromUrl(url) {
  const urlObj = new URL(url);
  const path = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
  return decodeURIComponent(path);
}


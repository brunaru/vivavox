import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

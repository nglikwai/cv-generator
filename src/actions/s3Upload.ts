// app/actions/s3Upload.ts
'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getPresignedUrl(key: string) {
  const command = new PutObjectCommand({
    Bucket: 'likwai',
    Key: key,
    ContentType: 'application/json',
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes
  return url;
}

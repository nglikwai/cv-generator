import { BaseClientService } from './baseClientService';

const S3ApiClient = BaseClientService({
  baseURL: process.env.NEXT_PUBLIC_S3_URL || '',
  nodeEnv: process.env.NODE_ENV,
});

export default { ...S3ApiClient };

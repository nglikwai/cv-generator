import defaultClData from 'public/data/cl.json';
import defaultCvData from 'public/data/default.json';

import S3ApiClient from './S3ApiClient';

const tryCatch = async (fn: any, defaultValue?: any) => {
  try {
    return await fn;
  } catch (e) {
    console.warn(e);

    return defaultValue;
  }
};

export default {
  getCV: async (username: string) => tryCatch(S3ApiClient.get(`/cv-generator/${username}.json`), defaultCvData),
  getCL: async (username: string) => tryCatch(S3ApiClient.get(`/cl-generator/${username}.json`), defaultClData),
};

import S3ApiClient from './S3ApiClient';

export default {
  getCV: async (username: string) => S3ApiClient.get(`/cv-generator/${username}.json`),
  getCL: async (username: string) => S3ApiClient.get(`/cl-generator/${username}.json`),
};

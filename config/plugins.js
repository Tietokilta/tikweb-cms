module.exports = ({ env }) => {
  // If 'upload' is undefined strapi will use local file system for
  // file uploads. This is the preferred option in development mode
  // since the database in docker containing upload URIs doesn't sync with Azure,
  // and so if the database is reset, it will not show images that are already
  // previously uploaded to Azure.
  if (env('NODE_ENV') === 'development') return { upload: undefined }

  // TODO: Add the option 'cdnBaseURL' when the CDN is configured to get the images from the CDN instead of storage account URL.
  return {
    upload: {
      config: {
        provider: 'strapi-provider-upload-azure-storage',
        providerOptions: {
          account: env('UPLOADS_ACCOUNT_NAME'),
          accountKey: env('UPLOADS_ACCOUNT_KEY'),
          containerName: env('UPLOADS_CONTAINER_NAME'),
          defaultPath: 'strapi',
          maxConcurrent: 10,
        },
      },
    },
  }
}

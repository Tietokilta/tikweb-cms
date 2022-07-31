module.exports = ({ env }) => ({
  // TODO: Add the option 'cdnBaseURL' when the CDN is configured to get the images from the CDN instead of storage account URL.
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
})

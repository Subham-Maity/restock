import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { maxFiles, maxFileSize } from './graphql-upload.setting';

export function setupGraphqlUpload(app: { use: (arg0: any) => void }) {
  app.use(graphqlUploadExpress({ maxFileSize, maxFiles }));
}

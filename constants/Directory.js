import * as RNFS from 'react-native-fs';

const newPath = RNFS.ExternalStorageDirectoryPath;
const absolutePath = `${newPath}/DocScan`

export default {
  folderDocument: `${absolutePath}/Documents`,
  folderImage: `${absolutePath}/Pictures`,
}
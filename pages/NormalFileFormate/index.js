import * as FileSystem from 'expo-file-system';

export const ConvertBlobToNormal =async (blobData) => {
    const blob = new Blob([blobData], { type: 'application/octet-stream' });
  
    try {
      const fileUri = FileSystem.cacheDirectory + 'temp_file';
      const arrayBuffer = await blob.arrayBuffer();
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      console.log('Temporary file URI:', fileUri);
      return fileUri;
    } catch (error) {
      console.error('Error converting Blob data to file URI:', error);
      return null;
    }
  }

// export const ConvertBlobToNormal =async (blobData)=> {
//     const temporaryFileUri = await convertBlobToFileURI(blobData);
  
//     if (temporaryFileUri) {
//       const originalObject = {
//         extension: 'msf%3A1000045934', // Replace with the correct value if needed
//         name: 'msf%3A1000045934', // Replace with the correct value if needed
//         uri: temporaryFileUri,
//       };
  
//       console.log('Original object format:', originalObject);
//       return originalObject;
//     }
//     return null;
//   }

//   export const ConvertBlobToNormal=async(blobData) =>{
//     console.log(blobData)
//     if (blobData) {
//       const originalObject = await convertBlobToOriginalObject(blobData);
//       if (originalObject) {
//         // Edit the object properties as needed
//         originalObject.extension = 'new_extension';
//         originalObject.name = 'new_name';
//         // Save the updated object or use it as needed in your application
//         console.log('Updated object format:', originalObject);
//       }
//     }
//   }
  
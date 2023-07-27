export const convertToBase64 = async (blobData) => {
    try {
      const response = await fetch(blobData.uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result.split(',')[1]); // Extract the base64 data from the result
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting BLOB to base64:', error);
      return null;
    }
  };
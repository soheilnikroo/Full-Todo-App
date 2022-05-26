import { useState } from 'react';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

function usePhotoGallery(): {
  photos: UserPhoto[];
  takePhoto: () => Promise<void>;
  } {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = `${new Date().getTime()}.jpeg`;
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: photo.webPath,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
  };
}

export default usePhotoGallery;

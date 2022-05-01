import * as faceapi from 'face-api.js';
const loadLabeledImages = function(labels: string[]) {
  return Promise.all(
    labels.map(async label => {
      const descriptors = [];
      for (let i = 1; i <= 3; i++) {
        const image = await faceapi.fetchImage(
          `/images/user/${label}/${i}.jpg`
        );
        const detection = await faceapi
          .detectSingleFace(image)
          .withFaceLandmarks()
          .withFaceDescriptor();
        detection && descriptors.push(detection.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptors);
    })
  );
};
export default loadLabeledImages;

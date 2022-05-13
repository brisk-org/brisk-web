import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import * as faceapi from 'face-api.js';
import loadLabeledImages from '../../utils/loadLabeledImages';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AttendanceDialog: React.FC<Props> = ({ open, setOpen }) => {
  const videoDom = useRef<HTMLVideoElement>(null);
  const handleClose = () => {
    setOpen(false);
  };

  const startVideo = async () => {
    console.log('jksdj', videoDom);
    try {
      if (!videoDom.current) return;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoDom.current.srcObject = stream;
      console.log(stream);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ]).then(startVideo);
    return () => {
      console.log('unmounted');
    };
  }, [videoDom]);
  const handlePlay:
    | React.ReactEventHandler<HTMLVideoElement>
    | undefined = async event => {
    if (!videoDom.current) return;
    console.log(videoDom.current, event.target);
    const canvas = faceapi.createCanvasFromMedia(videoDom.current);
    canvas.style.position = 'absolute';
    document.body.append(canvas);
    const labeledFaceDescriptors = await loadLabeledImages(['Kranz Aklilu']);
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    const displaySize = {
      width: videoDom.current.width,
      height: videoDom.current.width
    };
    faceapi.matchDimensions(canvas, displaySize);
    console.log('faceMatcher', faceMatcher);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          videoDom.current!,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptors();
      console.log('detections', detections);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      console.log('resizedDetections', resizedDetections);
      const results = resizedDetections.map(({ descriptor }) =>
        faceMatcher.findBestMatch(descriptor)
      );
      console.log('results', results);
      results.forEach((result, idx) => {
        const box = resizedDetections[idx].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString()
        });
        drawBox.draw(canvas);
      });
      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 5000);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <video
          ref={videoDom}
          width="550"
          height="360"
          autoPlay
          muted
          onPlay={handlePlay}
        ></video>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceDialog;

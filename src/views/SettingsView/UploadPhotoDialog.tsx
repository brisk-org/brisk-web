import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
// import { RegisteredUsersProps } from './RegisteredUsers';
// import { useUploadPhotoMutation } from '../../generated/graphql';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UploadPhotoDialog: React.FC<Props> = ({ open, setOpen }) => {
  const [files, setFiles] = useState<File[]>();
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  // const [uploadPhoto] = useUploadPhotoMutation({
  //   onError: err => console.error(err)
  // });
  const onChange: React.ReactEventHandler<HTMLInputElement> = event => {
    const files = event.currentTarget.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      setFiles(prevFiles =>
        prevFiles ? [...prevFiles, files[i]] : [files[i]]
      );
    }
  };
  const handleClose = () => setOpen(false);
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData();
    if (!files || files.length === 0) return;
    console.log(formData, files[0]);
    // files.forEach(file => formData.append('file', file));
    formData.append('file', files[0]);
    //   const res = await fetch(`http://localhost:4000/upload${user.id}`, {
    //     body: formData,
    //     method: 'POST'
    //   });
    //   console.log(res, 'jksdf');
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Employee Work Hours</DialogTitle>
        <DialogContent>
          <div className="custom-file mb-4">
            <input type="file" onChange={onChange} required />
            <label htmlFor="customFile">{files?.map(file => file.name)}</label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Submit Pictures</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadPhotoDialog;

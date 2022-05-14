import React, { useRef } from 'react';
import clsx from 'clsx';
import { useReactToPrint } from 'react-to-print';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
  SelectChangeEvent
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { User, SetUser } from './index';
import { ExaminationCheckbox } from './ExaminationCheckbox';
import { format } from 'date-fns';
import PrintHeader from '../../../components/PrintHeader';
import StringTextField from '../../../components/helpers/StringTextField';
import SelectTextField from '../../../components/helpers/SelectTextField';

const gender = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  grid: {
    marginBottom: 50
  },
  textArea: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px 10px'
  }
}));

interface ProfileDetailsI {
  user: User;
  setUser: SetUser;
  sidebarVisible: {
    isSidebarVisible: boolean;
    setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const RequestForm: React.FC<ProfileDetailsI> = ({
  user,
  setUser,
  sidebarVisible: { isSidebarVisible, setIsSidebarVisible }
}) => {
  const classes = useStyles();

  const componentRef = useRef(null);
  // const [addReport, { error, data, loading }] = useMutation(ADD_REPORT);
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = event => {
    event.preventDefault();
    // addReport({ variables: user });
    const newUser = {
      name: '',
      gender: '',
      age: '',
      card_no: 0,
      lmp: '',
      clinical_note: '',
      examination: {
        x_ray: false,
        ultrasound: false,
        ecg: false,
        echocardiography: false,
        pathology: false,
        ct_scan: false,
        mri: false,
        others: true
      },
      specify: '',
      requested_by: '',
      conclusion: '',
      report: '',
      reported_by: ''
    };
    setUser(newUser);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.root)}>
      <Card ref={componentRef}>
        <Divider />
        <CardContent>
          <PrintHeader />
          <Grid className={classes.grid} container spacing={3}>
            <Grid item md={6} xs={6}>
              <StringTextField
                label="Full Name"
                name="name"
                handleChange={handleChange}
                value={user.name}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <SelectTextField
                label="Select Gender"
                name="gender"
                handleChange={handleChange}
                value={user.gender}
                options={gender}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                onChange={handleChange}
                required
                type="number"
                value={user.age}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Card Number"
                name="card_no"
                onChange={handleChange}
                value={user.card_no}
                required
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                fullWidth
                label="LMP"
                name="lmp"
                onChange={handleChange}
                value={user.lmp}
                variant="standard"
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextareaAutosize
                className={classes.textArea}
                minRows={6}
                placeholder="Clinical Note: "
                name="clinical_note"
                onChange={handleChange}
                value={user.clinical_note}
                required
              />
            </Grid>
          </Grid>

          <Grid className={classes.grid} container>
            <Grid container md={7} spacing={2}>
              <Grid item md={12} xs={12}>
                <Typography>Examination Requested</Typography>
              </Grid>
              {Object.entries(user.examination).map((item, index) => (
                <Grid item md={3} xs={3}>
                  <ExaminationCheckbox
                    key={index}
                    label={item[0]}
                    checked={item[1]}
                    setUser={setUser}
                  />
                </Grid>
              ))}
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Requested by"
                  name="requested_by"
                  onChange={handleChange}
                  value={user.requested_by}
                  variant="standard"
                  required
                />
              </Grid>
            </Grid>
            <Grid container md={5}>
              <Grid item md={12} xs={12}>
                <Typography>Specify</Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  className={clsx(classes.textArea)}
                  minRows={8}
                  name="specify"
                  onChange={handleChange}
                  value={user.specify}
                  required
                />
              </Grid>
            </Grid>
            <Grid container md={12} xs={12} spacing={2}>
              <Grid item md={6}>
                <Grid item md={12}>
                  <Typography>Report</Typography>
                </Grid>
                <Grid item md={6}>
                  <TextareaAutosize
                    className={classes.textArea}
                    minRows={8}
                    name="report"
                    onChange={handleChange}
                    value={user.report}
                    required
                  />
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid item md={12} xs={12}>
                  <Typography>Conclusion</Typography>
                </Grid>

                <TextareaAutosize
                  className={classes.textArea}
                  minRows={3}
                  name="conclusion"
                  onChange={handleChange}
                  value={user.conclusion}
                  required
                />
              </Grid>
              <Grid container md={12} xs={12} spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Reported by"
                    name="reported_by"
                    onChange={handleChange}
                    value={user.reported_by}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography>{format(new Date(), 'dd/MM/yyyy')}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button onClick={handlePrint} color="primary" variant="contained">
          Print
        </Button>
      </Box>
    </form>
  );
};

export default RequestForm;

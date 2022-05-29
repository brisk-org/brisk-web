import React, { useContext, useRef } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextareaAutosize,
  Typography,
  TextField
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { QuickLabTest } from '.';

import SingleQuickLabTestForm from './SingleQuickLabTestForm';
import { AuthContext } from '../../../context/AuthContext';
import { Occupation } from '../../../generated/graphql';

const useStyles = makeStyles(() => ({
  root: {},
  grid: { marginBottom: 50 },
  textArea: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px 10px'
  }
}));

interface PrescriptionFormProps {
  isQueried: boolean;
  qLabTestState: {
    qLabTest: QuickLabTest;
    setQLabTest: React.Dispatch<React.SetStateAction<QuickLabTest>>;
  };
}

const QuickLabTestForm: React.FC<PrescriptionFormProps> = ({
  isQueried,
  qLabTestState: { qLabTest, setQLabTest }
}) => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);

  const componentRef = useRef(null);
  const handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined = (event, checked) => {
    const name = event.target.name;
    setQLabTest(prevPresc => ({
      ...prevPresc,
      [name]: { selected: checked, price: 0 }
    }));
  };
  const handleFieldChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = event => {
    const name = event.target.name;
    name === 'other' || name === 'name'
      ? setQLabTest(prevPresc => ({
          ...prevPresc,
          [name]: event.target.value
        }))
      : setQLabTest(prevPresc => ({
          ...prevPresc,
          [name]: { price: Number(event.target.value), selected: true }
        }));
  };
  return (
    <>
      <Card className={classes.root} ref={componentRef}>
        <CardHeader
          title={
            <>
              <Typography variant="h5">Quick Emergency Lab Test</Typography>
              {!isQueried && occupation === Occupation.Laboratory && (
                <Typography color="error" variant="body1">
                  Please Go to Emergency Laboratory table and Select Test
                </Typography>
              )}
            </>
          }
        />
        <Divider />
        <CardContent>
          <Grid className={classes.grid} container spacing={2}>
            <Grid item md={12}>
              {occupation === Occupation.Laboratory ? (
                <Typography variant="h6">Name: {qLabTest.name}</Typography>
              ) : (
                <TextField
                  name="name"
                  onChange={handleFieldChange}
                  value={qLabTest.name}
                  label="Name"
                  required
                />
              )}
            </Grid>
            {Object.entries(qLabTest).map(([key, value]: any) => {
              if (!value || key === 'id' || key === 'other' || key === 'name')
                return null;
              if (occupation === Occupation.Laboratory && !value.selected)
                return null;

              return (
                <Grid item md={4} sm={12}>
                  <SingleQuickLabTestForm
                    singleDetail={{
                      name: key,
                      price: value.price,
                      selected: value.selected
                    }}
                    handleChange={handleChange}
                    handleFieldChange={handleFieldChange}
                  />
                </Grid>
              );
            })}
            {occupation === Occupation.Laboratory && (
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  className={classes.textArea}
                  minRows={6}
                  name="other"
                  placeholder="Other Detail"
                  onChange={handleFieldChange}
                  value={qLabTest.other}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          type="submit"
          disabled={occupation === Occupation.Laboratory && !isQueried}
          color="primary"
          variant="contained"
          style={{ marginRight: 10 }}
        >
          {isQueried ? 'Complete Quick Lab Test' : 'Send Quick Lab Test'}
        </Button>
      </Box>
    </>
  );
};
export default QuickLabTestForm;

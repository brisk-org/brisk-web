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
import { QuickLabExamination } from '.';

import QuickLaboratoryTestField from './QuickLaboratoryTestField';
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
    qLabTest: QuickLabExamination;
    setQLabTest: React.Dispatch<React.SetStateAction<QuickLabExamination>>;
  };
}

const QuickLabTestForm: React.FC<PrescriptionFormProps> = ({
  isQueried,
  qLabTestState: { qLabTest, setQLabTest }
}) => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);

  const componentRef = useRef(null);
  const handleCheckboxClick:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined = (event, checked) => {
    const name = event.target.name;
    setQLabTest(prevExamination => ({
      ...prevExamination,
      tests: prevExamination.tests.map(test =>
        test.name === name ? { ...test, selected: checked } : { ...test }
      )
    }));
  };
  const handlePriceChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = event => {
    const name = event.target.name;
    setQLabTest(prevExamination => ({
      ...prevExamination,
      tests: prevExamination.tests.map(test =>
        test.name === name
          ? { ...test, price: parseInt(event.target.value) }
          : { ...test }
      )
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
                  Please Go to Emergency Laboratory table and Pick a Test
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
                  onChange={e =>
                    setQLabTest(prevExamination => ({
                      ...prevExamination,
                      name: e.target.value
                    }))
                  }
                  value={qLabTest.name}
                  label="Name"
                  required
                />
              )}
            </Grid>
            {qLabTest.tests.map(
              test =>
                !(occupation === Occupation.Laboratory && !test.selected) && (
                  <Grid item md={4} sm={12}>
                    <QuickLaboratoryTestField
                      test={{
                        name: test.name,
                        price: test.price,
                        selected: test.selected
                      }}
                      handleCheckboxClick={handleCheckboxClick}
                      handleChange={handlePriceChange}
                    />
                  </Grid>
                )
            )}
            {occupation === Occupation.Laboratory && (
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  className={classes.textArea}
                  minRows={6}
                  name="other"
                  placeholder="Other Detail"
                  onChange={e =>
                    setQLabTest(prevExamination => ({
                      ...prevExamination,
                      other: e.target.value
                    }))
                  }
                  value={qLabTest.other || ''}
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

import React, { useContext, useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Box,
  Button,
  ButtonGroup,
  SelectChangeEvent,
  TextareaAutosize,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import StringTextField from '../../../components/helpers/StringTextField';
import SelectTextField from '../../../components/helpers/SelectTextField';
import NumberTextField from '../../../components/helpers/NumberTextField';
import { useLocation, useHistory } from 'react-router-dom';
import {
  allCardHistoryFormInfo,
  CardFormInfoValueType,
  CardHistoryStateType,
  initialCardHistoryState,
  nullHistoryValue
} from '../../../constants/initialCardFormState';
import {
  requestTestQuery,
  prescribeQuery,
  cardQuery
} from '../../../constants/queries';
import {
  CardDocument,
  useCreateHistoryMutation,
  useHistoryQuery,
  useUpdateHistoryMutation,
  useMarkCardAsSeenMutation,
  Occupation
} from '../../../generated/graphql';
import { AuthContext } from '../../../context/AuthContext';
import {
  convertPlaneHistoryResultToJSON,
  convertJSONToPlaneHistoryResult
} from '../../../utils/historyResultsJson';

const gaOptions = [
  {
    value: 'good',
    label: 'Good looking'
  },
  {
    value: 'chronical',
    label: 'Chronically sick looking'
  },
  {
    value: 'acute',
    label: 'Acutely sick looking'
  }
];
const useStyles = makeStyles(theme => ({
  textarea: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid gray',
    width: '100%',
    maxWidth: '100%',
    padding: '20px 10px',
    minHeight: '100px'
  }
}));
const HistoryForm = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const { occupation } = useContext(AuthContext);

  const id = query.get('id');
  const historyId = query.get('historyId');
  const isNewHistory = !historyId;
  const historyLocation = useHistory();

  const [history, setHistory] = useState<CardHistoryStateType>(
    initialCardHistoryState(query)
  );
  const [clickedButton, setClickedButton] = useState('');

  const [
    createHistory,
    { loading: createHistoryLoading }
  ] = useCreateHistoryMutation({
    onError: err => console.log(err)
  });
  const [
    updateHistory,
    { loading: updateHistoryLoading }
  ] = useUpdateHistoryMutation({
    onError: err => console.log(err),
    refetchQueries: [
      {
        query: CardDocument,
        variables: { id: id || '' }
      }
    ]
  });

  const { data: toBeEditedHistoryData } = useHistoryQuery({
    variables: {
      id: historyId || ''
    },
    skip: !historyId
  });

  const [markAsSeen] = useMarkCardAsSeenMutation();

  useEffect(() => {
    if (!historyId || !toBeEditedHistoryData) return;
    const result = convertJSONToPlaneHistoryResult(
      toBeEditedHistoryData.history.result
    );
    setHistory(result);
    console.log('here', result);
  }, [toBeEditedHistoryData]);

  const handleClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = event => {
    setClickedButton(event.currentTarget.name);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => {
    setHistory(history => ({
      ...history,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    if (!id) return;
    const result = convertPlaneHistoryResultToJSON(history);
    isNewHistory
      ? await createHistory({ variables: { result, id } })
      : historyId &&
        (await updateHistory({
          variables: { id: historyId, result }
        }));

    isNewHistory && (await markAsSeen({ variables: { id } }));
    clickedButton === 'none' && historyLocation.push(cardQuery({ id }));
    clickedButton === 'request' &&
      historyLocation.push(
        requestTestQuery({ id, name: query.get('name') || '' })
      );
    clickedButton === 'prescribe' &&
      historyLocation.push(
        prescribeQuery({
          id,
          name: query.get('name') || '',
          gender: query.get('gender') || '',
          age: query.get('age') || ''
        })
      );
    setHistory(nullHistoryValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ my: '25px' }}>
        <CardHeader
          title={`History form for ${query.get('name')}`}
          subheader="history can be comleted later on"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {Object.entries(allCardHistoryFormInfo).map(
              ([key, valueObj], index) => {
                const {
                  inputSizeMd,
                  inputSizeSm,
                  inputSizeXs,
                  label,
                  type,
                  required
                }: CardFormInfoValueType = valueObj;
                const value = (history as any)[key];
                return (
                  <Grid
                    key={index}
                    item
                    md={inputSizeMd}
                    sm={inputSizeSm}
                    xs={inputSizeXs}
                  >
                    {(type === 'number' && (
                      <TextField
                        fullWidth
                        type="number"
                        label={label}
                        name={key}
                        onChange={handleChange}
                        required={!!required}
                        value={value}
                        variant="standard"
                      />
                    )) ||
                      (type === 'string' && (
                        <TextField
                          fullWidth
                          label={label}
                          name={key}
                          onChange={handleChange}
                          required={!!required}
                          value={value}
                          variant="standard"
                        />
                      )) ||
                      (type === 'select' && (
                        <FormControl fullWidth>
                          <InputLabel>{label}</InputLabel>
                          <SelectTextField
                            label={label}
                            name={key}
                            handleChange={handleChange}
                            value={value}
                            options={gaOptions}
                            required={!!required}
                          />
                        </FormControl>
                      )) ||
                      (type === 'textArea' && (
                        <>
                          <Typography variant="body1" color="textSecondary">
                            {label}
                          </Typography>
                          <TextareaAutosize
                            className={classes.textarea}
                            name={key}
                            onChange={handleChange}
                            placeholder={`"${label}" content goes Here`}
                            value={value}
                            required={required}
                          />
                        </>
                      ))}
                  </Grid>
                );
              }
            )}
          </Grid>
        </CardContent>

        <Box display="flex" justifyContent="flex-end" p={2}>
          <ButtonGroup
            color="primary"
            variant="contained"
            disabled={createHistoryLoading || updateHistoryLoading}
          >
            <Button onClick={handleClick} name="none" type="submit">
              {isNewHistory ? 'Create History' : 'Update History'}
            </Button>
            {occupation === Occupation.Doctor && (
              <Button onClick={handleClick} name="request" type="submit">
                Request Test
              </Button>
            )}
            {occupation === Occupation.Doctor && (
              <Button onClick={handleClick} name="prescribe" type="submit">
                Prescribe
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Card>
    </form>
  );
};

export default HistoryForm;

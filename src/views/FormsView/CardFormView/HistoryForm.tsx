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
  TextField,
  SelectChangeEvent
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TextArea from './TextArea';
import StringTextField from '../../../components/helpers/StringTextField';
import SelectTextField from '../../../components/helpers/SelectTextField';
import NumberTextField from '../../../components/helpers/NumberTextField';
import clsx from 'clsx';
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
  useMarkCardAsSeenMutation
} from '../../../generated/graphql';
import { AuthContext } from '../../../context/AuthContext';
import {
  convertPlaneHistoryResultToJSON,
  convertJSONToPlaneHistoryResult
} from '../../../utils/historyResultsJson';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '25px 0'
  }
}));

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
interface HistoryFormProps {}

const HistoryForm: React.FC<HistoryFormProps> = () => {
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
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState('');
  const [clickedButton, setClickedButton] = useState('');

  const [createHistory] = useCreateHistoryMutation({
    onError: err => console.log(err)
  });
  const [updateHistory] = useUpdateHistoryMutation({
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

  const handleFileChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = event => {
    const file = event.currentTarget.files;
    if (!file) return;
    setFile(file[0]);
    setFileName(file[0].name);
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
    <form onSubmit={handleSubmit} className={clsx(classes.root)}>
      <Card className={classes.root}>
        <CardHeader
          subheader="The information can not be edited"
          title="Patient's History"
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
                  <Grid item md={inputSizeMd} sm={inputSizeSm} xs={inputSizeXs}>
                    {(type === 'number' && (
                      <NumberTextField
                        label={label}
                        name={key}
                        handleChange={handleChange}
                        value={Number(value)}
                        required={required}
                      />
                    )) ||
                      (type === 'string' && (
                        <StringTextField
                          label={label}
                          name={key}
                          handleChange={handleChange}
                          value={value}
                          required={required}
                        />
                      )) ||
                      (type === 'select' && (
                        <SelectTextField
                          label={label}
                          name={key}
                          handleChange={handleChange}
                          value={value}
                          options={gaOptions}
                        />
                      )) ||
                      (type === 'textArea' && (
                        <TextArea
                          name={key}
                          handleChange={handleChange}
                          label={label}
                          value={value}
                          required={required}
                        />
                      ))}
                  </Grid>
                );
              }
            )}
          </Grid>
        </CardContent>

        <Box display="flex" justifyContent="flex-end" p={2}>
          <ButtonGroup color="primary" variant="contained">
            <Button onClick={handleClick} name="none" type="submit">
              {isNewHistory ? 'Create History' : 'Update History'}
            </Button>
            {occupation === 'DOCTOR' && (
              <Button onClick={handleClick} name="request" type="submit">
                Request Test
              </Button>
            )}
            {occupation === 'DOCTOR' && (
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

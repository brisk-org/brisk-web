import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Button,
  Box,
  SelectChangeEvent,
  Icon,
  TextField
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import StringTextField from '../../../components/helpers/StringTextField';
import NumberTextField from '../../../components/helpers/NumberTextField';
import SelectTextField from '../../../components/helpers/SelectTextField';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import {
  allCardProfileFormInfo,
  CardFormInfoValueType,
  CardProfileFormStateType,
  initialCardFormState,
  nullCardValue
} from '../../../constants/initialCardFormState';
import {
  useCreateCardMutation,
  useUpdateCardMutation
} from '../../../generated/graphql';
import { Oval, useLoading } from '@agney/react-loading';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '25px 0'
  }
}));

const genderOptions = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

const CardForm = () => {
  const classes = useStyles();

  const query = new URLSearchParams(useLocation().search);

  const [card, setCard] = useState<CardProfileFormStateType>(
    initialCardFormState(query)
  );

  const queryId = query.get('id');

  const [createCard, { loading: createCardLoading }] = useCreateCardMutation({
    onError: err => console.log(err)
  });
  const [editCard, { loading: editCardLoading }] = useUpdateCardMutation({
    onError: err => console.log(err)
  });
  useEffect(() => {
    console.log(createCardLoading);
  }, [createCardLoading]);
  console.log(createCardLoading, editCardLoading);
  const { indicatorEl } = useLoading({
    loading: createCardLoading || editCardLoading,
    indicator: <Oval />
  });
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => {
    setCard(card => ({
      ...card,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();

    if (!queryId) {
      await createCard({ variables: { ...card } });
      setCard(nullCardValue);
      return;
    }
    await editCard({
      variables: { id: queryId, ...card }
    });

    setCard(nullCardValue);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.root)}>
      <Card className={classes.root}>
        <CardHeader
          subheader="The information can be edited"
          title="Patient's Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {Object.entries(allCardProfileFormInfo).map(
              ([key, valueObj], index) => {
                const {
                  inputSizeMd,
                  inputSizeXs,
                  label,
                  type,
                  helperText,
                  required
                }: CardFormInfoValueType = valueObj;
                const value = (card as any)[key];
                return (
                  <Grid item md={inputSizeMd} xs={inputSizeXs}>
                    {(type === 'number' && (
                      <TextField
                        fullWidth
                        type="number"
                        helperText={helperText}
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
                          helperText={helperText}
                          label={label}
                          name={key}
                          onChange={handleChange}
                          required={!!required}
                          value={value}
                          variant="standard"
                        />
                      )) ||
                      (type === 'select' && (
                        <SelectTextField
                          label={label}
                          name={key}
                          handleChange={handleChange}
                          value={value}
                          options={genderOptions}
                          required={!!required}
                        />
                      ))}
                  </Grid>
                );
              }
            )}
          </Grid>
        </CardContent>

        <Box display="flex" justifyContent="flex-end" m={2}>
          <Button
            variant="contained"
            type="submit"
            disabled={!!indicatorEl}
            endIcon={indicatorEl && <Icon>{indicatorEl}</Icon>}
          >
            {!queryId ? 'Add Card' : 'Update Card'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CardForm;

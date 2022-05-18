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

import SelectTextField from '../../../components/helpers/SelectTextField';
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
    <form onSubmit={handleSubmit}>
      <Card sx={{ my: '25px' }}>
        <CardHeader
          title="New Patient Information"
          subheader="information can be edited later"
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
                        value={value === 0 ? '' : value}
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

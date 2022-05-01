import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Button, Box } from '@mui/material';

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

interface ProfileFormProps {}
const ProfileForm: React.FC<ProfileFormProps> = () => {
  const classes = useStyles();

  const query = new URLSearchParams(useLocation().search);

  const [card, setCard] = useState<CardProfileFormStateType>(
    initialCardFormState(query)
  );

  const id = query.get('id');
  const isNewCard = !id;

  const [createCard] = useCreateCardMutation({
    onError: err => console.log(err)
  });
  const [editCard] = useUpdateCardMutation({
    onError: err => console.log(err)
  });

  const handleChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = event => {
    setCard(card => ({
      ...card,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    isNewCard
      ? await createCard({ variables: { ...card } })
      : id &&
        (await editCard({
          variables: { id, ...card }
        }));

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
                      <NumberTextField
                        label={label}
                        name={key}
                        handleChange={handleChange}
                        value={Number(value)}
                        helperText={helperText}
                        required={!!required}
                      />
                    )) ||
                      (type === 'string' && (
                        <StringTextField
                          label={label}
                          name={key}
                          handleChange={handleChange}
                          value={value}
                          helperText={helperText}
                          required={!!required}
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
          <Button color="primary" variant="contained" name="none" type="submit">
            {isNewCard ? 'Add Card' : 'Update Card'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProfileForm;

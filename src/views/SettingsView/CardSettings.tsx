import React, { useContext, useState } from 'react';
import { Typography, TextField, Box, Button } from '@mui/material';
import {
  SettingDocument,
  useChangeSettingMutation
} from '../../generated/graphql';
import { SettingsContext } from '../../context/SettingContext';
import { useHistory } from 'react-router-dom';

const CardSettings = () => {
  const history = useHistory();

  const {
    cardPrice: oldCardPrice,
    cardExpirationDate: oldCardExpirationDate
  } = useContext(SettingsContext);

  const [price, setPrice] = useState(oldCardPrice);
  const [expirationDate, setExpirationDate] = useState(oldCardExpirationDate);

  const [changeSetting] = useChangeSettingMutation({
    refetchQueries: [
      {
        query: SettingDocument
      }
    ],
    onError: err => console.log(err)
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!price || !expirationDate) return;
    const d = await changeSetting({
      variables: {
        card_price: price,
        card_expiration_date: expirationDate
      }
    });
    !d.errors && history.push('/app/dashboard');
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          margin: '10px 0',
          padding: '5px 15px'
        }}
      >
        <Typography sx={{ mr: 2 }}>Change Card Price Rate</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            my: 2
          }}
        >
          <TextField
            required
            type="number"
            label="Card Price"
            value={price || ''}
            onChange={e => setPrice(parseInt(e.target.value))}
          />
          <TextField
            sx={{ my: 2 }}
            required
            type="number"
            label="Card Expiration Date"
            value={expirationDate || ''}
            onChange={e => setExpirationDate(parseInt(e.target.value))}
          />
          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CardSettings;

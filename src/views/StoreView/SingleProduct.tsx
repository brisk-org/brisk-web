import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';

interface Props {
  product: {
    title: string;
    desc: string;
    price: number;
  };
}
export const ProductCard: React.FC<Props> = ({ product }) => (
  <Card
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    <CardContent>
      <Box display="flex" justifyContent="center" pb="3px">
        {/* <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        /> */}
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {product.title}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {product.desc}
      </Typography>
    </CardContent>
    <Box flexGrow={1} />
    <Divider />
    <Box p={2}>
      <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
        <Grid
          item
          style={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <ClockIcon color="action" /> */}
          <Typography
            color="textSecondary"
            display="inline"
            style={{ paddingLeft: 1 }}
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <DownloadIcon color="action" /> */}
          <Typography
            color="textSecondary"
            display="inline"
            // sx={{ pl: 1 }}
            variant="body2"
          >
            {product.price}
            Downloads
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

import React from 'react';

import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Typography,
  colors
} from '@mui/material';
import { User } from '../../generated/graphql';

export interface RegisteredUsersProps {
  user: {
    __typename?: 'User' | undefined;
  } & Pick<User, 'id' | 'username' | 'occupation' | 'created_at'>;
}

const RegisteredUsers: React.FC<RegisteredUsersProps> = ({ user }) => {
  return (
    <Grid item md={4} sm={6} style={{}}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              style={{ backgroundColor: colors.red[500] }}
              aria-label="recipe"
            >
              R
            </Avatar>
          }
          title={user.username}
          subheader={user.occupation}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.username}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            // onClick={() => setOpenAddPictureDialog(true)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Pictures
          </Button>{' '}
          <Button
            // onClick={() => setOpenWorkHourDialog(true)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Change User Setting
          </Button>
          <Button
            color="secondary"
            variant="contained"
            value={user.id}
            size="small"
            // onClick={handleDeleteUser}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default RegisteredUsers;

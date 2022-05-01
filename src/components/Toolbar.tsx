import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useLoading, Oval } from '@agney/react-loading';
import { SearchTermsType } from '../@types';

interface ToolbarProps {
  loading: boolean;
  disablePhoneSearchField?: boolean;
  searchState: {
    terms: SearchTermsType;
    setTerms: React.Dispatch<React.SetStateAction<SearchTermsType>>;
  };
}

const Toolbar: React.FC<ToolbarProps> = ({
  loading,
  disablePhoneSearchField,
  searchState: { terms, setTerms }
}) => {
  const { indicatorEl } = useLoading({
    loading,
    indicator: <Oval />
  });

  const handleChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = async event => {
    setTerms({
      ...terms,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <form onSubmit={e => e.preventDefault()}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" width={600}>
                <TextField
                  style={{ maxWidth: 300 }}
                  fullWidth
                  onChange={handleChange}
                  name="name"
                  value={terms?.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action">
                          {(terms?.name && indicatorEl) || <SearchIcon />}
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search by Name"
                  variant="outlined"
                  size="small"
                />
                {!disablePhoneSearchField && (
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    name="phone"
                    value={terms?.phone}
                    style={{ margin: '0 25px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action">
                            {(terms?.phone && indicatorEl) || <SearchIcon />}
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search by Phone"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                size="medium"
              >
                Search
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Toolbar;

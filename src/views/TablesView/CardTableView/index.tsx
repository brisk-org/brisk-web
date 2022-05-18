import React, { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import MainContainerTable from '../../../components/MainContainerTable';
import Toolbar from '../../../components/Toolbar';
import { SearchTermsType } from '../../../@types';
import {
  useCardsCountQuery,
  CardsQuery,
  SearchCardsQuery,
  useSearchCardsQuery,
  useCardsQuery,
  NewCreatedCardDocument
} from '../../../generated/graphql';
import SingleRow from './SingleRow';
import { cardTableHeads } from '../../../constants/tableHeads';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CardTableView = () => {
  const classes = useStyles();

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const { data: countData } = useCardsCountQuery();

  const [terms, setTerms] = useState<SearchTermsType>({
    name: '',
    phone: ''
  });
  const [allCards, setAllCards] = useState<CardsQuery>();
  const [searchedCards, setSearchedCards] = useState<SearchCardsQuery>();
  const firstRender = useRef<HTMLDivElement>(null);

  const isBeingSearched = terms.name || terms.phone;

  const {
    data: searchedCardsData,
    loading: searchedDataLoading
  } = useSearchCardsQuery({
    variables: {
      name: terms.name,
      phone: terms.phone,
      skip,
      take
    },
    skip: !isBeingSearched,
    onError: err => {
      console.log(err);
    }
  });

  const {
    loading: fullCardsLoading,
    data: fullCardsData,
    subscribeToMore
  } = useCardsQuery({
    variables: {
      skip,
      take
    },
    skip: !!isBeingSearched,
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only'
  });
  useEffect(() => {
    (function() {
      if (isBeingSearched) {
        setAllCards(undefined);
        setSearchedCards(searchedCardsData);
        return;
      }
      if (!fullCardsLoading) setAllCards(fullCardsData);
    })();
  }, [fullCardsData, fullCardsLoading, searchedCardsData, terms]);

  useEffect(() => {
    subscribeToMore({
      document: NewCreatedCardDocument,
      updateQuery: (prev, { subscriptionData: { data } }) =>
        Object.assign({}, prev, {
          cards: prev.cards ? [data, ...prev.cards] : [data]
        }),
      onError: err => console.log('here', err)
    });
  }, []);

  return (
    <Page className={classes.root} title="Customers">
      <Container ref={firstRender} maxWidth={false}>
        <Toolbar
          loading={searchedDataLoading}
          searchState={{ terms, setTerms }}
        />
        <Box mt={3}>
          {!allCards?.cards[0] && !searchedCards?.searchCards[0] && 'No result'}
          {(fullCardsLoading || searchedDataLoading) && 'Loading...'}
          {allCards?.cards ? (
            <MainContainerTable
              tableHead={cardTableHeads}
              count={countData?.cardsCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {allCards.cards.map((card, index) => (
                <SingleRow key={index} card={card} />
              ))}
            </MainContainerTable>
          ) : (
            <MainContainerTable
              tableHead={cardTableHeads}
              count={countData?.cardsCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {searchedCards?.searchCards.map((card, index) => (
                <SingleRow key={index} card={card} />
              ))}
            </MainContainerTable>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default CardTableView;

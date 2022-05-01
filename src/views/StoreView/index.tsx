import React from 'react';
export const a = () => {
  return <div></div>;
};
// import { Container, Toolbar } from '@mui/material';
// import { Box } from 'face-api.js';
// import { SearchTermsType } from '../../@types';
// import MainContainerTable from '../../components/MainContainerTable';
// import Page from '../../components/Page';
// import { cardTableHeads } from '../../constants/tableHeads';
// import SingleRow from '../TablesView/AsstTableView/SingleRow';

// const StoreView = () => {
//   const [skip, setSkip] = useState(0);
//   const [take, setTake] = useState(10);
//   const { data: productCount } = useProductCountQuery();

//   const [terms, setTerms] = useState<SearchTermsType>({
//     name: '',
//     phone: ''
//   });
//   const [allProducts, setAllProducts] = useState<ProductsQuery>();
//   const [searchedProducts, setSearchedProducts] = useState<
//     SearchProductsQuery
//   >();
//   const firstRender = useRef<HTMLElement>(null);

//   const isBeingSearched = terms.name || terms.phone;

//   const {
//     data: searchedProductsData,
//     loading: searchedDataLoading
//   } = useSearchProductsQuery({
//     variables: {
//       name: terms.name,
//       phone: terms.phone,
//       skip,
//       take
//     },
//     skip: !isBeingSearched,
//     onError: err => {
//       console.log(err);
//     }
//   });

//   const {
//     loading: fullProductsLoading,
//     data: fullProductsData,
//     subscribeToMore
//   } = useProductsQuery({
//     variables: {
//       skip,
//       take
//     },
//     skip: !!isBeingSearched,
//     fetchPolicy: firstRender.current ? 'cache-first' : 'network-only'
//   });
//   useEffect(() => {
//     (function() {
//       if (isBeingSearched) {
//         setAllProducts(undefined);
//         setSearchedProducts(searchedProductsData);
//         return;
//       }
//       if (!fullProductsLoading) setAllProducts(fullProductsData);
//     })();
//   }, [fullProductsData, searchedProductsData, terms]);

//   useEffect(() => {
//     subscribeToMore({
//       document: NewCreatedCardDocument,
//       updateQuery: (prev, { subscriptionData }) => {
//         const newCreatedCard = subscriptionData.data;
//         if (!newCreatedCard) return prev;
//         return Object.assign({}, prev, {
//           products: prev.cards
//             ? [newCreatedCard, ...prev.cards]
//             : [newCreatedCard]
//         });
//       },
//       onError: err => console.log(err)
//     });
//   }, []);

//   r;
//   return (
//     <Page title="Customers">
//       <Container maxWidth={false}>
//         <Toolbar
//           //   loading={searchedDataLoading}
//           loading={false}
//           searchState={{ terms, setTerms }}
//         />
//         <Box mt={3}>
//           {!allProducts?.products[0] &&
//             !searchedProducts?.searchProducts[0] &&
//             'No result'}
//           {(fullProductsLoading || searchedDataLoading) && 'Loading...'}
//           {allProducts?.products ? (
//             <MainContainerTable
//               tableHead={cardTableHeads}
//               count={productCount?.productsCount}
//               skipState={{ skip, setSkip }}
//               takeState={{ take, setTake }}
//             >
//               {allProducts.products.map((card, index) => (
//                 <SingleRow key={index} card={card} />
//               ))}
//             </MainContainerTable>
//           ) : (
//             <MainContainerTable
//               tableHead={cardTableHeads}
//               count={productCount?.productsCount}
//               skipState={{ skip, setSkip }}
//               takeState={{ take, setTake }}
//             >
//               {searchedProducts?.searchProducts.map((card, index) => (
//                 <SingleRow key={index} card={card} />
//               ))}
//             </MainContainerTable>
//           )}
//         </Box>
//       </Container>
//     </Page>
//   );
// };

// export default StoreView;

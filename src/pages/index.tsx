import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { GetStaticProps } from "next/types/index";
import {HomeProps} from '../pageUtils/home'
import Container from '@material-ui/core/Container/Container'
import Typography from '@material-ui/core/Typography/Typography';
import wrapper, { RootState } from '../redux/store';
import { fetchNumUniqueWine, fetchNumUniqueCountry, findWineWith } from '../redux/actions/wineActions';
import { WineState } from '../redux/reducers/wineReducer';
import TextareaAutosize from '@material-ui/core/TextareaAutosize/TextareaAutosize';
import Button from '@material-ui/core/Button/Button';
import Box from '@material-ui/core/Box/Box';
import { selectNumUniqueCountry, selectNumUniqueWine, selectTransformWineList, selectFetchingNumUniqueWine, selectFetchingNumUniqueCountry } from '../redux/selectors/wineSelector';
import WineCollection from '../components/concrete/WineCollection/WineCollection';

// export const getStaticProps: GetStaticProps<HomeProps> = async () =>{
//   return {
//     props:{
//       header: 'Find Me Wine In Progress'
//     }
//   }
// }

export const getStaticProps = wrapper.getStaticProps<HomeProps>(()=>()=>{
  return {
    props:{
      header:'Work In Progress',
      example_desc: `Example:\n\nSharp, simple and candied, with blackberry jam and cola flavors. The tannins are rugged, and the wine finishes with a scour of acidity. Seems at its best now.`,
  
    }
  }
})

const Home:React.FC<HomeProps> = (props:HomeProps) => {
  const dispatch = useDispatch();
  const numUniqueWine = useSelector(selectNumUniqueWine);
  const fetchingUniqueWine = useSelector(selectFetchingNumUniqueWine);
  const numUniqueCountry = useSelector(selectNumUniqueCountry);
  const fetchingUniqueCountry = useSelector(selectFetchingNumUniqueCountry);
  const {findingWine} = useSelector((state:RootState)=>state.wine);
  const wineList = useSelector(selectTransformWineList);
  const [desc, setDesc] = useState<string>('');

  useEffect(() => {
    dispatch(fetchNumUniqueWine());
    dispatch(fetchNumUniqueCountry());
  }, [dispatch])

  const handleDescChange = (evt:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setDesc(evt.target.value);
  }

  const handleSearch = ()=>{
    dispatch(findWineWith(desc));
  }

  return (
    <Container>
      <Typography variant='h1'>{props.header}</Typography>
      {!fetchingUniqueWine?
        <Typography variant='h5'>{`Number of unique wine: ${numUniqueWine}`}</Typography>
        :
        null
      }
      {!fetchingUniqueCountry?
        <Typography variant='h5'>{`Number of unique country: ${numUniqueCountry}`}</Typography>
        :
        null
      }
      <Box>
        <TextareaAutosize 
        aria-label="empty textarea" 
        placeholder={props.example_desc} 
        defaultValue={desc}
        onChange={handleDescChange}
        />
      </Box>
      <Button 
      variant="contained" 
      color="primary"
      onClick={handleSearch}
      disabled={findingWine}
      >
        Search
      </Button>
      <WineCollection data={wineList} />
    </Container>
  );
};

export default Home;
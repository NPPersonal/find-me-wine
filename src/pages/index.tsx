import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { GetStaticProps } from "next/types/index";
import {HomeProps} from '../pageUtils/home'
import Container from '@material-ui/core/Container/Container'
import Typography from '@material-ui/core/Typography/Typography';
import wrapper, { RootState } from '../redux/store';
import { fetchNumUniqueWine, fetchNumUniqueCountry, findWineWith } from '../redux/actions/wineActions';
import { WineState } from '../redux/reducers/wineReducer';

import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Box from '@material-ui/core/Box/Box';
import { selectNumUniqueCountry, selectNumUniqueWine, selectTransformWineList, selectFetchingNumUniqueWine, selectFetchingNumUniqueCountry } from '../redux/selectors/wineSelector';
import WineCollection from '../components/concrete/WineCollection/WineCollection';
import Counter from '../components/concrete/Counter/Counter';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton/IconButton';
import InfoSharp from '@material-ui/icons/InfoSharp';

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
      header:'Wine Recommendation',
      tooltip: `The system analyze your feeling of description about the wine and then recommed similar wines for you.`,
      example_desc: `Describe how do you feel about the wine.\n\nExample:\n\nSharp, simple and candied, with blackberry jam and cola flavors. The tannins are rugged, and the wine finishes with a scour of acidity. Seems at its best now.`,
  
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
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

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

  const handleTooltipClose = () => setOpenTooltip(false);
  const handleTooltipOpen = () => setOpenTooltip(true);

  return (
    <Container>
      <Typography variant='h1'>
        <Box display='flex' paddingBottom={8} justifyContent='center'>{props.header}</Box>
      </Typography>
      <Typography variant='h2'>
        <Box display='flex' justifyContent='center'>
          <Typography variant='inherit'>{`There are total`}</Typography>
          <Box fontWeight={800}>
            <Counter 
            end={!fetchingUniqueWine?numUniqueWine:0} 
            duration={4} 
            />
          </Box>
          <Typography variant='inherit'>{`of wines`}</Typography>
        </Box>
      </Typography>
      <Typography variant='h2'>
        <Box display='flex' justifyContent='center'>
          <Typography variant='inherit'>{`From `}</Typography>
          <Box fontWeight={800}>
            <Counter 
            end={!fetchingUniqueCountry?numUniqueCountry:0} 
            duration={4} 
            />
          </Box>
          <Typography variant='inherit'>{`different countries`}</Typography>
        </Box>
      </Typography>
      <Typography variant='h2'>
        <Box display='flex' justifyContent='center'>
          <Typography variant='inherit'>{`Recommendation base on feeling of the wine`}</Typography>
        </Box>
      </Typography>
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={8} paddingX={12}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={openTooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <Typography variant='h6'>{props.tooltip}</Typography>
          }
          >
            <IconButton onClick={handleTooltipOpen}>
              <InfoSharp />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
        <Box width='100%'>
        <TextField
        fullWidth={true}
        variant='outlined'
        label='Wine Description'
        multiline
        placeholder={props.example_desc}
        defaultValue={desc}
        onChange={handleDescChange}
        />
        </Box>
        <Box paddingTop={2}>
          <Button
          variant="contained" 
          color="primary"
          onClick={handleSearch}
          disabled={findingWine}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box width='inherit' paddingY={8} paddingX={12}>
        <WineCollection data={wineList} />
      </Box>
    </Container>
  );
};

export default Home;
import React from 'react';
import { GetStaticProps } from "next/types/index";
import {HomeProps} from '../pageUtils/home'
import Container from '@material-ui/core/Container/Container'
import Typography from '@material-ui/core/Typography/Typography';

export const getStaticProps: GetStaticProps<HomeProps> = async () =>{
  return {
    props:{
      header: 'Find Me Wine In Progress'
    }
  }
}

const Home:React.FC<HomeProps> = (props:HomeProps) => {
  return (
    <Container>
      <Typography variant='h1'>{props.header}</Typography>
    </Container>
  );
};

export default Home;
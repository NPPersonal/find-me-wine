import React from 'react';
import { InView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import Box, { BoxProps } from '@material-ui/core/Box/Box';
import RootRef from '@material-ui/core/RootRef/RootRef';
import Typography from '@material-ui/core/Typography/Typography';

type CounterProps = React.ComponentProps<typeof CountUp> & BoxProps & {
    caption?: React.ReactNode,
}

const Counter:React.FC<CounterProps> = (props:CounterProps) => {
    const {
        caption,
        ...rest
    } = props;

    return (
        <CountUp {...rest}>
        {({countUpRef, start})=>(
            <InView
            triggerOnce 
            onChange={(inView)=>{
                if(inView) start();
            }}>
                <Box display='flex' flexDirection='row' justifyItems='center' paddingX={2}>
                    {caption}
                    <div ref={countUpRef}>
                        <Typography variant='inherit' align='center' />
                    </div>
                </Box>
            </InView>
        )}
        </CountUp>
    );
};

export default Counter;
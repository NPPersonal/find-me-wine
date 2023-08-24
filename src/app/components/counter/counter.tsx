"use client";

import React from "react";
import { InView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Text } from "../../chakra.ui.provider";

type CounterProps = React.ComponentProps<typeof CountUp> & {
  caption?: React.ReactNode;
};

const Counter: React.FC<CounterProps> = (props: CounterProps) => {
  const { caption, ...rest } = props;
  return (
    <CountUp {...rest}>
      {({ countUpRef, start }) => (
        <InView
          triggerOnce
          onChange={(inView) => {
            if (inView) {
              start();
            }
          }}
        >
          <Text fontSize="3xl" fontWeight="bold">
            <span ref={countUpRef} />
          </Text>
        </InView>
      )}
    </CountUp>
  );
};

export default Counter;

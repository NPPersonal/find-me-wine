import Link from "next/link";
import React from "react";

type LinkToProps = React.ComponentProps<typeof React.Component> & {
  text: React.ReactNode,
  linkTo: string,
  shallow?: boolean,
  display?: "inline" | "block" | "initial",
  underline?: boolean,
  color?: string,
  target?: string,
};

/**
 * Component LinkTo
 * 
 * Display link as text
 * 
 * Customizable color
 * 
 * Enable underline or not
 * 
 * Wrapped Next.JS `Link` 
 * https://nextjs.org/docs/api-reference/next/link
 * 
 * @param {LinkToProps} props 
 * @returns 
 */
const LinkTo: React.FC<LinkToProps> = (props: LinkToProps) => {
  const { text, linkTo, shallow = false, display = "inline", underline, color='blue', target='_blank' } = props;
  return (
    <Link href={linkTo} shallow={shallow}>
      <a 
      style={{ display: display, color: color, textDecoration:underline?'underline':'none'}}
      target={target}
      >{text}</a>
    </Link>
  );
};

export default LinkTo;

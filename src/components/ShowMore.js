import styled from "styled-components";
import { useState } from "react";
import { Spacer } from "./helpers";

/* THIS FILE WAS TAKEN FROM AN IN CLASS EXAMPLE AND BARELY MODIFIED AT ALL (just added flex into the Wrapper, and modified a couple of widths) */

export default function ShowMore({ children, text, open, closed, size }) {
  const [showMore, setShowMore] = useState(false);

  const icon = !showMore ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );

  return (
    <Wrapper>
      <Button onClick={() => setShowMore(!showMore)} size={size}>
        {icon} {showMore ? open : closed} {text}{" "}
      </Button>
      {showMore && children}
      {!showMore && <Spacer size={20} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  max-width: 500px;
`;

const Button = styled.button`
  margin: 0;
  padding: 0;
  cursor: pointer;
  border: none;
  background-color: inherit;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  font-size: ${(p) => p.size}rem;

  svg {
    height: 1rem;
    stroke-width: 4px;
  }
`;

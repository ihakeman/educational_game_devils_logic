import "./styles.css";
import styled from "styled-components";
import Grid from "./components/Grid";
import ShowMore from "./components/ShowMore";
import { Spacer } from "./components/helpers";

export default function App() {
  return (
    <Wrapper className="App">
      {console.log(
        "I get an error about having no unique keys when the game first renders and it is because I did a nested map function. Since the objects don't move around I am not concerned about this, and since I couldn't figure out how to pass the first variable through to the second map if I tried to separate how they are nested, I just left it. The game doesn't have any bugs."
      )}
      <Spacer size={20} />
      <ShowMore text="Devil's Logic" size="2">
        <P>
          While someone else likely already conceived and made this logic
          puzzle, I had never seen it before and came up with it from scratch.
        </P>
        <P>
          <A href="https://en.wikipedia.org/wiki/Nonogram">
            Visit Nonagram's wikipedia page
          </A>{" "}
          to see the inspiration for the game. Devil's Logic is tweaked so that
          just the total number of spaces in each row and column are given,
          rather than individual batches.
        </P>
        <P>
          I called it Devil's Logic because of the 6x6 playing grid and because
          it was painful to make (the frustration took 6 years off my life).
        </P>
      </ShowMore>
      <ShowMore text="Rules" open="Hide" closed="Show" size="1.25">
        <P>
          In Devil's Logic, the grid needs a correct amount of spaces filled in
          each row and column.{" "}
        </P>
        <P>
          The number of spaces to be filled is directly to the left of each row,
          and directly above each column.{" "}
        </P>
        <P>
          The total number of spaces to be filled is listed in the top left
          corner.
        </P>
        <P>The spaces will fill with grey when you click on them.</P>
        <P>
          The grid will lock when you have filled in the grid appropriately
          (solved the puzzle). Note that there are generally multiple correct
          solutions, and any will be accepted.
        </P>
      </ShowMore>
      <Grid rows={6} columns={6}></Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const P = styled.p`
  width: 100%;
  text-align: left;
`;

const A = styled.a`
  color: black;
`;

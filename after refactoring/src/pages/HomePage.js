import "./HomePage.css";
import { Button } from "../componentsHomePage/Button";
import { ButtonLinkGamePage } from "../componentsHomePage/ButtonLinkGamePage";
import { SelectionContainer } from "../componentsHomePage/SelectionContainer";
import { Title } from "../componentsHomePage//Title";
import { Main } from "../componentsHomePage//Main";

export default function HomePage() {
  return (
    <div className="background">
      <Main>
        <SelectionContainer>
          <Title>Select Theme</Title>
          <div className="theme">
            <Button key={1} btn={0}>
              Numbers
            </Button>
            <Button key={2} btn={1}>
              Icons
            </Button>
          </div>
        </SelectionContainer>

        <SelectionContainer>
          <Title>Numbers of Players</Title>
          <div className="numbers-player">
            <Button key={3} btn={2}>
              1
            </Button>
            <Button key={4} btn={3}>
              2
            </Button>
            <Button key={5} btn={4}>
              3
            </Button>
            <Button key={6} btn={5}>
              4
            </Button>
          </div>
        </SelectionContainer>

        <SelectionContainer>
          <Title>Grid Size</Title>
          <div className="grid-size">
            <Button key={7} btn={6}>
              4x4
            </Button>
            <Button key={8} btn={7}>
              6x6
            </Button>
          </div>
        </SelectionContainer>

        <ButtonLinkGamePage>Start Game</ButtonLinkGamePage>
      </Main>
    </div>
  );
}

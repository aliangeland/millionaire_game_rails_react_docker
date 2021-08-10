import React, { useContext } from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";

function Home() {
  const { user } = useContext(GlobalContext);
  return (
    <Grid style={{ marginTop: "6em" }}>
      <Grid.Row centered>
        <Grid.Column width={3}>
          <Segment>
            {user.id ? (
              <Header textAlign="center">
                Welcome dear {user.name}! Your score is {user.score}
              </Header>
            ) : (
              <Header textAlign="center">Welcome dear gamer!</Header>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;

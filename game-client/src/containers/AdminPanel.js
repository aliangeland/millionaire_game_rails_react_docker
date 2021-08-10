import React, { useState } from "react";
import { Grid, Segment, Header } from "semantic-ui-react";

function AdminPanel() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = async () => {};
  const removeQuestion = async () => {};
  const editQuestion = async () => {};
  const addAnswerToQuestion = async () => {};
  const removeAnswerFromQuestion = async () => {};
  const editAnswer = async () => {};

  return (
    <Grid style={{ marginTop: "6em" }}>
      <Grid.Row centered>
        <Grid.Column width={4}>
          <Segment>
            <Header textAlign="center">Under Construction...</Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default AdminPanel;

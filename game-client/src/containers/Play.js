import React, { Fragment, useContext, useState, useEffect } from "react";
import { Grid, Header, Segment, Button, Card, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Play = () => {
  const { user, setUserScore } = useContext(GlobalContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  let history = useHistory();

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      if (window.confirm("Are you ready for the next round?")) {
        getQuestions();
      } else {
        history.push("/");
      }
    }
  }, [questions]);

  const getQuestions = async () => {
    setLoading(true);
    await fetch(`http://localhost:3000/api/questions?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          history.push("/");
        }
        setQuestions(data);
        setLoading(false);
      });
  };

  const answerQuestion = async (answerId) => {
    console.log(answerId)
    console.log(localStorage.token)
    return await fetch(`http://localhost:3000/api/users/play`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        answer_id: answerId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!data.failure) {
          setUserScore(user.score + data.points);
          setQuestions(
            questions.filter((question) => question.id !== data.question_id)
          );
          alert(data.message);
        } else {
          alert(data.failure);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Fragment>
      {Object.keys(user).length > 0 ? (
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={2}>
              <Segment>
                <Header>Your Score: {user.score}</Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column>
              <Segment>
                <Card.Group>
                  {!loading &&
                    questions.map((question) => (
                      <Card key={question.id}>
                        <Card.Content>
                          <Card.Header>{question.title}</Card.Header>
                          <Card.Meta>Points: {question.points}</Card.Meta>
                          <Card.Description>
                            {question.content}
                          </Card.Description>
                        </Card.Content>
                        {question.answers.map((answer) => (
                          <Card.Content>
                            <Card.Description
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>{answer.content}</div>
                              <div>
                                <Icon
                                  floated="right"
                                  size="large"
                                  name="check circle"
                                  style={{ cursor: "pointer" }}
                                  color="green"
                                  onClick={() => answerQuestion(answer.id)}
                                />
                              </div>
                            </Card.Description>
                          </Card.Content>
                        ))}
                      </Card>
                    ))}
                </Card.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={4}>
              <Segment>
                <Header>You should login first!</Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Fragment>
  );
};

export default Play;

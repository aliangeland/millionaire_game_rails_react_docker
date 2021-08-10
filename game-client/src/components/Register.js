import React, { Fragment } from "react";

import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

function Register(props) {
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header>Register as a new user:</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Form>
              <Form.Field>
                  <label>Name</label>
                  <input
                    onChange={(e) => props.setName(e.target.value)}
                    value={props.name}
                    placeholder="Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Surname</label>
                  <input
                    onChange={(e) => props.setSurname(e.target.value)}
                    value={props.surname}
                    placeholder="Surname"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    onChange={(e) => props.setPassword(e.target.value)}
                    value={props.password}
                    placeholder="Password"
                  />
                </Form.Field>
                <Button onClick={props.handleRegister} type="submit">
                  Submit
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
}
export default Register;

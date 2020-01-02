import React from 'react';
import { Form, Container, Button } from 'semantic-ui-react'

class YoutubePlayer extends React.Component {
  render () {
    return (
      <div>
        <Container textAlign='center'>
          <Form>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Video Name' width={6} />
            </Form.Field>
            <Button type='submit'>Search for Video</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default YoutubePlayer;

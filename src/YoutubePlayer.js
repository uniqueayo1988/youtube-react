import React from 'react';
import { Form, Container, Button, Embed } from 'semantic-ui-react'

class YoutubePlayer extends React.Component {
  state = {
    query: 'React',
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=@some@key@&q=`,
    mainVideo: '',
    suggestedVideos: []
  }

  componentDidMount () {
    this.getVideos(this.state.query)
  }

  getVideos = (searchQuery) => {
    let url = `${this.state.url}${searchQuery}`
    return (
      fetch(url).then(response => response.json())
        .then(data => {
          console.log(data)
          let firstVideo = data.items.shift()
          this.setState({
            ...this.state, 
            mainVideo: firstVideo.id.videoId,
            suggestedVideos: data.items
          })
        })
        .catch(e => {
          console.log(e, 'data error')
        })
    )
  }

  searchVideos (e) {
    e.preventDefault()
    alert('Submitted')
    this.getVideos(this.state.query)
  }

  handleChange = (e) => {
    this.setState({...this.state, query: e.target.value})
  }

  render () {
    return (
      <div>
        <Container textAlign='center'>
          <Form onSubmit={this.searchVideos}>
            <Form.Field>
              <h1>Youtube Search App</h1>
              <h1>{this.state.query}</h1>
              <input placeholder='Video Name' width={6} onChange={this.handleChange} />
            </Form.Field>
            <Button type='submit'>Search for Video</Button>
          </Form>

          <Embed 
            id = {this.state.mainVideo}
            placeholder = ''
            source = 'youtube'
          />
        </Container>
      </div>
    )
  }
}

export default YoutubePlayer;

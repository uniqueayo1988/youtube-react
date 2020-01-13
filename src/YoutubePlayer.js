import React from 'react';
import { Form, Container, Button, Embed, Divider, Grid } from 'semantic-ui-react'
import img from './assets/ayo.jpg'
import Suggestion from './Suggestion'

class YoutubePlayer extends React.Component {
  state = {
    query: 'Cars',
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=@some@key@&q=`,
    mainVideo: '',
    suggestedVideos: []
    // GET https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1
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
          console.log(e, 'data errors')
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

  changeVideo =  (video) => {
    this.setState({...this.state, mainVideo: video.id.videoId})
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
            placeholder = {img}
            source = 'youtube'
          />

          <Divider horizontal>
            Suggestions
          </Divider>

          <Grid doubling column={3}>
            {
              this.state.suggestedVideos.map(video => <Suggestion video={video} changeVideo={this.changeVideo} />)
            }
          </Grid>
        </Container>
      </div>
    )
  }
}

export default YoutubePlayer;

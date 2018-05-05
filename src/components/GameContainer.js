import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import Navbar from "./Navbar";
import ImageCard from "./ImageCard";
import API from "../utils/API";
import imageArray from "../images.json";


class GameContainer extends Component {
  state = {
    imageArray: imageArray,
    search: "",
    highScore: 0,
    currentScore: 0,
    imagesClicked: []
  };

  //update current values as the user types into the search field
  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  shufflePictures = () => {
    //Fisher-Yates shuffle - 1938 - how did they do random numbers in 1938??
    let j = 0
    let tempVar = null
    let tempArray = this.state.imageArray;

    for (let i = this.state.imageArray.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      tempVar = tempArray[i]
      tempArray[i] = tempArray[j]
      tempArray[j] = tempVar
    }
    this.setState({ imageArray: tempArray })
  }


  //handle any image getting clicked
  handleImageClick = id => {
    console.log("on click", id);
    console.log(this.state.imagesClicked);

    //set up some working vars for the current and high scores
    let currentScoreVar = this.state.currentScore
    let highScoreVar = this.state.highScore;

    //
    //if indexOf id passed in from clicking the image = -1 then that was a good guess
    //   increment the currentScore
    //    check if the currentScore is the same or more than the high score
    //        if yes update the highscore to equal current score
    //else the user picked an image that they picked already...the game ends
    //   reset the game 
    //no matter what shuffle the pictures each time
    //
    if (this.state.imagesClicked.indexOf(id) === -1) {
      console.log("inside indexOf")
      this.state.imagesClicked.push(id);
      currentScoreVar++

      if (this.state.currentScore >= this.state.highScore) {
        highScoreVar = currentScoreVar;
        // Set this.state.friends equal to the new friends array
      }

      this.setState({
        highScore: highScoreVar,
        currentScore: currentScoreVar,
        imagesClicked: this.state.imagesClicked
      });
    }
    else {
      alert("Nope you already picked that one.  Please try again.")
      this.setState({
        currentScore: 0,
        imagesClicked: []
      })
    }
    this.shufflePictures();

    console.log("imagesClicked", this.state.imagesClicked)
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {

    event.preventDefault();
    console.log("inside submit handler");

    //call API to search giphy
    API.searchGiphy(this.state.search).then(giphyResponse => {
      console.log(giphyResponse.data.data);

      let newImageArray = [];

      console.log(giphyResponse.data.data.length);
      
      //loop through the giphy response and change the imagesArray in state{} to the giphy response
      for (var i = 0; i < giphyResponse.data.data.length; i++) {
        // if (res.data.status === "error") {
        //   throw new Error(res.data.message);
        // }
        let imgObj = {};

        imgObj.id = i;
        imgObj.src = giphyResponse.data.data[i].images.fixed_height_small.url;
        imgObj.alt = giphyResponse.data.data[i].title;
        newImageArray.push(imgObj);
      }
      console.log(newImageArray)

      this.setState({ imageArray: newImageArray })

    })
    .catch(err => this.setState({ error: err.message }));
  };

  //render the web page
  //
  //                    Title
  //1980 Memory Game                      Giphy Search Box
  //    Current Score                  High Score
  //

  render() {
    return (
      <Container>
        <Navbar
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <Row>
          {this.state.imageArray.map(image => (
            <Col size="md-2">
              <ImageCard
                imageFn={this.handleImageClick}
                imageSrc={image.src}
                imageAlt={image.alt}
                imageId={image.id}
                key={image.id}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default GameContainer;

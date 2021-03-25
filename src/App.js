import { Component } from "react";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      isLoading: true,
      breeds: [],
      selectedBreed:""

    };
  }
  componentDidMount() {
    // alert('This component just mounted to the DOM!');
    this.fetchDogs();
   fetch('https://dog.ceo/api/breeds/list')
   .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          breeds: result.message

        })
        console.log(this.state);
      })
  }

  _handleClick = () => {
    console.log('button clicked!')
    console.log(this.state)
       this.setState({
      isLoading: true,
    });
    let breed = this.state.selectedBreed
    console.log(breed);
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          image: result.message,
          isLoading: false,
        });
    // this.fetchDogs();
   
  })
}
  
  _handleUpdate = (e) => {
    console.log('Breed changed to' + e.target.value);
    // let breedChoice = e.target.value;
    // let newState = {...this.state, selectedBreed: e.target.value}
    // console.log(newState);
    this.setState({selectedBreed: e.target.value});
   console.log(this.state); // <- This is still showing old state, but the state is actually updated?
  }


  fetchDogs() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          image: result.message,
          isLoading: false,
        });
      });
  }

  render() {
    // if(this.state.isLoading) {
    //   return (<div>Loading new image</div>)
    // } else {
    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={this.state.image} alt="logo" />
    //         <button onClick={this._handleClick}>Generate new Doggo</button>
    //       </header>
    //     </div>
    //   );
    // }
    /**
     * const isLoading = this.state.isLoading;
     * const image = this.state.image;
     */
    const { isLoading, image, breeds } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        
            <img src={image} alt="logo" />
          
          <label for="dropdown">Choose a Breed:</label>
          <select  onChange={this._handleUpdate} id="dropdown">
            <option selected disabled>Choose a Breed...</option>
            {breeds.map((breed, index) =>
              <option key={index} value={breed}>{breed}</option>
            )}
          </select>
          <button onClick={this._handleClick}>
            {isLoading ? "Loading Doggo" : "Generate new Doggo"}
          </button>
        </header>
      </div>
    );
  }
}
export default App;

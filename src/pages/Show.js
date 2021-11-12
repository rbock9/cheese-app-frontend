import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"

const Show = (props) => {
  // grab the navigate function
  const navigate = useNavigate()
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab cheese from props
  const cheese = props.cheese;
  // create state for form
  const [editForm, setEditForm] = useState({})
  // useEffect to set state to the existing cheese, when the data is available
  useEffect(() => {
      if(props.cheese){
          const singleCheese = cheese.find((p) => p._id === id);
          setEditForm(singleCheese)
      }
  }, [props.cheese])

  if (props.cheese) {
    // grab the target singleCheese from the people array
    const singleCheese = cheese.find((p) => p._id === id);
    
    // handleChange function for form
    const handleChange = (event) => {
        // create a copy of the state
        const newState = {...editForm}
        // update the newState
        newState[event.target.name] = event.target.value
        // update the state
        setEditForm(newState)
    }

    // handleSubmit for form
    const handleSubmit = (event) => {
        // prevent the refresh
        event.preventDefault()
        // pass the form data to updateCheese
        props.updateCheese(editForm, singleCheese._id)
        // redirect cheese back to index
        navigate("/")
    }

    const removesingleCheese = () => {
        props.deleteCheese(singleCheese._id)
        navigate("/")
    }

    const form = (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.countryOfOrigin}
            name="countryOfOrigin"
            placeholder="country of origin"
            onChange={handleChange}
          />
          <input type="submit" value="Update Cheese" />
        </form>
      );

    return (
      <div className="singleCheese">
        <h1>{singleCheese.name}</h1>
        <h2>{singleCheese.countryOfOrigin}</h2>
        <img src={singleCheese.image} alt={singleCheese.name} />
        {form}
        <button onClick={removesingleCheese}>DELETE Cheese</button>
      </div>
    );
  } else {
    return <h1>No Cheese</h1>;
  }
};

export default Show;
import {useParams} from "react-router-dom"

function Show(props) {
  const params = useParams()
  const id = params.id;
  const cheese = props.cheese;
  const singleCheese = cheese.find((p) => p._id === id); //update this later?

  // state for form
  const [editForm, setEditForm] = useState(singleCheese);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  // handlesubmit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateCheese(editForm);
    // redirect cheese back to index
    navigate("/");
  };  

  const removesingleCheese = () => {
    props.deleteCheese(singleCheese._id);
    navigate("/");
  }; 

  return (
    <div className="singleCheese">
      <h1>{singleCheese.name}</h1>
      <h2>{singleCheese.countryOfOrigin}</h2>
      <img src={singleCheese.image} alt={singleCheese.name} />
      <button id="delete" onClick={removesingleCheese}>
        DELETE
      </button>
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
          placeholder="image URL"
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
    </div>
  );
}

export default Show;

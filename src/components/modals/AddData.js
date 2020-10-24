import React, { useState} from "react";
import {useDispatch } from "react-redux";
import {addProductsAPICreator} from "../../redux/actions/products";


const AddData = (props)=> {
    // const [formData, updateFormData] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState();
    const [category, setCategory] = useState(1);
    const dispatch = useDispatch();

    const handleChangeFile=(e)=>{
        const content=e.target.files[0];
        setImage(content)
    }
    const handleChangeName=(e)=>{
        const content=e.target.value;
        setName(content)
    }
    const handleChangePrice=(e)=>{
        const content=e.target.value;
        setPrice(content)
    }
    const handleChangeCategory=(e)=>{
        const content=e.target.value;
        setCategory(content)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let formData=new FormData()
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);
        formData.append("category_id", category);
        dispatch(addProductsAPICreator(formData))
    }
    // console.log(formData);
    return (
      <div className="modal-add-data">
      <div className="content-wrapper">
          <div className="modal-content">
              <form onSubmit={(e)=>{
                  handleSubmit(e);props.handleAddDataModal()
              }}>
              <div className="row">
                  <div className="col-12">
                      <h4 >Add Items</h4>
                  </div>
              </div>
              <div className="row">
                  <div className="col-4">Name</div>
                  <div className="col-8"><input className="input-name" name="name" type="text" onChange={(e)=>{handleChangeName(e)}} /></div>
              </div>
              <div className="row">
                  <div className="col-4">Image</div>
                  <div className="col-8"><input className="input-image" type="file" name="image" onChange={(e)=>{handleChangeFile(e)}} /></div>
              </div>
              <div className="row">
                  <div className="col-4">Price</div>
                  <div className="col-8"><input nameClass="input-price" type="number" name="price" onChange={(e)=>{handleChangePrice(e)}} /></div>
              </div>

              <div className="row">
                  <div className="col-4">Category</div>
                  <div className="col-8">
                      <select name="category" placeholder="Category" onChange={(e)=>{handleChangeCategory(e)}}>
                          <optgroup label="Category">
                              <option value="1" selected>Makanan Khas Jawa Barat</option>
                              <option value="2">Makanan Khas Banten</option>
                          </optgroup>
                      </select>
                  </div>
              </div>
              <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6 d-flex justify-content-between align-items-center align-items-center">
                      <button className="btn-cancel" onClick={props.handleAddDataModal}>Cancel</button>
                      <button className="btn-add" >Add</button>
                  </div>
              </div>
              </form>
          </div>
      </div>
  </div>
    );
}

export default AddData;

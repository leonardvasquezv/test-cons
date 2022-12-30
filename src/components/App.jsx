import { useState } from 'react';
import '../styles/app.css'

// database
const dishes = [
  { id: 1, name: 'Bandeja Paisa', price: 40000, country: 'Colombia'},
]

const App = () => {

  const [data, setData] = useState(dishes)
  const [tempDish, setTempDish] = useState({
    id: null, name: '', price: '', country: ''
  })
  const [editMode, setEditMode] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setTempDish({
      ...tempDish,
      [name]:value
    })
  }

  // this funcion create an autoincrementative id
  const getId = () => {
    let id = 0
    data.forEach((dish) => {
      if (dish.id > id) id = dish.id
    });
    return id+1
  }
  
  // CREATE: this function create a dish and add to dishes array
  const createDish = (e) => {
    e.preventDefault()
    const id = getId()
    setData([...data, {
      ...tempDish,
      price: +tempDish.price,
      id:id
    }])
  }

  const edit = (dish) => {
    setTempDish({
      ...dish
    })
    setEditMode(true)
  }

  // UPDATE: this function edit any dish property by id, receives the dish id, the property(ej: price, name) and the new value for that property.
  const editDish = (tempDish) => {
    const index = data.findIndex((dish) => dish.id === tempDish.id)
    data[index] = tempDish
    console.log(data)
  }
  
  // DELETE: this function delete a dish by id
  const deleteDishById = (id) => {
    const updatedData = data.filter((dish) => dish.id !== id)
    setData(updatedData)
  }

  return (
    <div className="container">
      <div className='container_form'>
        <div className='container_title'>
          Restaurante
        </div>
        <div className='container_inputs'>
          <div className='form'>
            <div className='inputs'>
              <input onChange={handleChange} type="text" name="name" value={tempDish.name} className='input_text' placeholder='Name'/>
              <input onChange={handleChange} type="text" name="price" value={tempDish.price} className='input_text' placeholder='Price'/>
              <input onChange={handleChange} type="text" name="country" value={tempDish.country} className='input_text' placeholder='Country'/>
            </div>
            <div className='buttons'>
              <button onClick={! editMode ? createDish : ()=>editDish(tempDish)} className='button'> {!editMode ? 'Save' : 'Update'}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='tables'>
        <div className='container_table'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Country</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((dish) => {
                const {id, name, price, country } = dish
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{country}</td>
                    <td>
                      <button onClick={()=>edit(dish)} className='action'>
                        Update
                      </button>
                    </td>
                    <td>
                      <button onClick={()=>deleteDishById(id)} className='action'>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react';
import './App.css';
import './index.css';
const initiaItems=[
  {id:1,description:"passport",quantity:2,packed:false},
  {id:2,description:"socks",quantity:10,packed:false},
]
function App() {
  const [items,setItems]=useState([]);
   function AddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  function handleDeleteItem(id){
    setItems((items)=>items.filter((item)=>item.id!==id));
  }
  return (
    <div className="App">
      <Logo></Logo>
      <Form onAddItems={AddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem}></PackingList>
      <Stats></Stats>
    </div>
  );
}
function Logo(){
  return (
    <h1 className='Logoo'> 🚗Travel Far Away👜</h1>
  )
}
function Form({onAddItems}){
  const [description,setDescription]=useState("");
  const [quantity,setQuantity]=useState(1);
  
  function handleSubmit(e){
    e.preventDefault();
    if(!description)return ;
    const newItem={description,quantity,packed:false,id:Date.now()};
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className='Add-frm' onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select className='selectclass' value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
      </select>
      <input className='takeinput' type='text' placeholder='item...' value={description} onChange={(e)=>setDescription(e.target.value)} /> 
      <button className='addbutton' onClick={handleSubmit}>Add</button>
    </form>
  )
}
function PackingList({items,onDeleteItem}){
  return (
    <div className='packinglist'>
      <ul className='ulist'>
        {
        items.map((item)=>(
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem}/>
        ))
        }
      </ul>
    </div>
  )
}
function Item({item,onDeleteItem}){
  return (
    <li className='list1'>

      <span style={item.packed ? {textDecoration:"line-through"} :{}}>
        <input type='checkbox' ></input>
        {item.quantity} {item.description}
      </span>
      <button className='btn' onClick={()=>onDeleteItem(item.id)}>❌</button>
    </li>
  )
}
function Stats(){
  return (
    <footer className='statistic'>
      <em>
        you have X items on your list and you have already packed X(X%);  
      </em>
    </footer>
  )
}
export default App;

import { useState } from 'react';
import './App.css';
import './index.css';
function App() {
  const [items,setItems]=useState([]);
   function AddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  
  function handleDeleteItem(id){
    setItems((items)=>items.filter((item)=>item.id!==id));
  }
  function handleToogleItem(id){
    setItems((items)=>items.map((item)=>item.id===id ? {...item,packed:!item.packed}:item))
  }
  return (
    <div className="App">
      <Logo></Logo>
      <Form onAddItems={AddItem} />
      <PackingList handleToogleItem={handleToogleItem} items={items} onDeleteItem={handleDeleteItem}></PackingList>
      <Stats items={items}></Stats>
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
      <h3>What do you need for your 😍 trip?</h3>
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
function PackingList({items,onDeleteItem,handleToogleItem}){
  const [sortBy,SetsortBy]=useState("input");
  let SortedItems;
  if(sortBy==="input")SortedItems=items;
  if(sortBy==="description")SortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description));
  if(sortBy==="packed")SortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed));
  return (
    <div className='packinglist'>
      <ul className='ulist'>
        {
        SortedItems.map((item)=>(
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} handleToogleItem={handleToogleItem}/>
        ))
        }
      </ul>

      <div className='sortingf'>
        <select className='sortingf1' value={sortBy} onChange={(e)=>SetsortBy(e.target.value)}>
          <option value={"input"}>Sort by input</option>
          <option value={"description"}>Sort by description</option>
          <option value={"packed"}>Sort by packed</option>
        </select>
        <button className='sortingf1'>
          clearlist
        </button>
      </div>
     
    </div>
  )
}
function Item({item,onDeleteItem,handleToogleItem}){
  return (
    <li className='list1'>

        <input type='checkbox' className='checkItem' onChange={()=>handleToogleItem(item.id)} ></input>
      <span style={item.packed ? {textDecoration:"line-through"} :{}}>
        {item.quantity} {item.description}
      </span>
      <button className='btn' onClick={()=>onDeleteItem(item.id)}>❌</button>
    </li>
  )
}
function Stats({items}){
  const numItems=items.length;
  const numPacked=items.filter((item)=>item.packed).length;
  const percent=Math.round((numPacked/numItems)*100);
  
  return (
    <footer className='statistic'>
      <em>{
          percent===100 ? "you got everything,ready to go✈️":
    `    you have ${numItems} items on your list and you have already packed ${numPacked} ( ${percent} %)` 
        }
      </em>
    </footer>
  )
}
export default App;

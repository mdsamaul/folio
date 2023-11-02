import { useRef, useState } from "react";

function ImagesContainer() {
  const [todoInputText, setTodoInputText] = useState("");
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState([]);
  let [check, setCheck] = useState(0);
  let [count, setCount] = useState(0);

  const [todos, setTodos] = useState([
    {
      todo: "https://i.ibb.co/VthVcdL/image-3.webp",
      complete: true,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/m02J951/image-11.jpg",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/H2SzxdQ/image-10.jpg",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/K6v2188/image-9.webp",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/H4Y80Lg/image-8.webp",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/McmytYN/image-7.webp",
      complete: false,
      isDragging: false,
    },
    {
      todo: " https://i.ibb.co/qFHSm3T/image-6.webp",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/9n86r7s/image-5.webp",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/HTWmCR6/image-4.webp",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/vHb5ktn/image-1.webp",
      complete: false,
      isDragging: false,
    },
    {
      todo: "https://i.ibb.co/VSL86nw/image-2.webp",
      complete: false,
      isDragging: false,
    },
  ]);



  // const deleteItem = (itemId) => {
  //   const updatedItems = items.filter(item => item.id !== itemId);
  //   setItems(updatedItems);
  // };
  





  // https://i.ibb.co/VthVcdL/image-3.webp
  // https://i.ibb.co/HTWmCR6/image-4.webp
  // https://i.ibb.co/9n86r7s/image-5.webp
  // https://i.ibb.co/qFHSm3T/image-6.webp
  // https://i.ibb.co/McmytYN/image-7.webp
  // https://i.ibb.co/H4Y80Lg/image-8.webp
  // https://i.ibb.co/K6v2188/image-9.webp
  // https://i.ibb.co/H2SzxdQ/image-10.jpg
  // https://i.ibb.co/m02J951/image-11.jpg
  // https://i.ibb.co/vHb5ktn/image-1.webp
  // https://i.ibb.co/VSL86nw/image-2.webp
  function handleAddTodo() {
    if (todoInputText.length > 0) {
      setTodos([
        ...todos,
        { todo: todoInputText, complete: false, isDragging: false },
      ]);
    }
  }

  // const checkItem = (e, index) => {
  //   if (!check) {
  //     setCount(count + 1);
  //   }

  //   console.log(e, index);

  //   // setCheck(true);
  // };
  // console.log("count", count, check);

  function handleTodoClicks(e, index) {
    switch (e.detail) {
      case 1:
        // complete - > true
        const newArr = [];
        todos.forEach((item, i) => {
          if (i === index) {
            newArr.push({
              todo: item.todo,
              complete: !item.complete,
            });
          } else {
            newArr.push(item);
          }
        });

        setTodos(newArr);
        break;
      case 2:
        setTodos(todos.filter((item, iy) => iy !== index));
        break;

      default:
        break;
    }
  }

  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();
  function D_Start(e, index) {
    todoItemDrag.current = index;
  }
  function D_Enter(e, index) {
    todoItemDragOver.current = index;

    const cpArr = [...todos];

    let finalArr = [];

    cpArr.forEach((item) => {
      finalArr.push({
        todo: item.todo,
        complete: item.complete,
        isDragging: false,
      });
    });

    finalArr[index].isDragging = true;

    setTodos(finalArr);
  }
  function D_End(e, index) {
    const arr1 = [...todos];

    const todo_item_main = arr1[todoItemDrag.current];
    arr1.splice(todoItemDrag.current, 1);
    arr1.splice(todoItemDragOver.current, 0, todo_item_main);

    todoItemDrag.current = null;
    todoItemDragOver.current = null;

    let f_arr = [];

    arr1.forEach((item) => {
      f_arr.push({
        todo: item.todo,
        complete: item.complete,
        isDragging: false,
      });
    });

    setTodos(f_arr);
  }




  const handleButtonClick = (e, index) => {
    // const id = items.filter(item => item.id !== itemId);
    const id = items.filter(item => item === index);
    // console.log(id);
    if(index !== id){
      const newItem = index; 
      setItems((prevItems) => [...prevItems, newItem]);
    }
   
   // Add your logic to determine the new item to be added
  //  const newItem = index; // Replace this with your actual item logic
  //  console.log("new ", items);
       // Update the state by creating a new array with the new item
     

      
  };
console.log(items);








  return (
    <div className="w-[80%] pb-4 my-5 rounded-md drop-shadow-md bg-white  mx-auto h-[100vh] relative border">
      
      <div className="p-5 flex justify-between items-center bg-white">
        <div>
          <h3 className="bg-white">
            <span className=" bg-white">{count}</span> Filed Selection
          </h3>
        </div>
        <div>
        {/* {items.map(item => (
  <div key={item.id}>
    <span>{item.name}</span>
    <button onClick={() => deleteItem(item.id)}>Delete</button>
  </div>
))} */}

          <button className="rounded-none bg-white text-red-800 font-semibold" >
            Delete files
          </button>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-5 absolute bg-white p-2 rounded-md gap-2">
        {todos.map((todo, index) => (
          <div
            key={index}
         
            className={`bg-white ${index === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <div
              draggable
              droppable="true"
              onDragStart={(e) => D_Start(e, index)}
              onDragEnter={(e) => D_Enter(e, index)}
              onDragEnd={(e) => D_End(e, index)}
              style={{
                textDecoration: todo.complete ? "line-through" : "none",
                background: todo.complete ? "bg-[#6f6f6f]" : null,
              }}
              onClick={(e) => handleTodoClicks(e, index)}
              className="bg-white border rounded-md p-0.5"
            >
              <div className="relative cursor-pointer overflow-hidden bg-cover bg-no-repeat border rounded-md">
                <img src={todo.todo}></img>
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[#6f6f6f] opacity-0 transition duration-300 ease-in-out hover:opacity-70">
                  <input
                  onClick={(e)=>handleButtonClick(e,index)}
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 m-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ImagesContainer;

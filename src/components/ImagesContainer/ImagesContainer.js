import { useRef, useState } from "react";
import { FaImages } from 'react-icons/fa';
import { imageUpload } from "../imageUpload";

function ImagesContainer() {

  const [count, setCount] = useState(0);
  const [uploadImage, setUploadImage] = useState("Add Images");
  // ===================================

  const initialCartItems = [
    {
      id: 1,
      name: "https://i.ibb.co/VthVcdL/image-3.webp",
      complete: true,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 2,
      name: "https://i.ibb.co/m02J951/image-11.jpg",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 3,
      name: "https://i.ibb.co/H2SzxdQ/image-10.jpg",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 4,
      name: "https://i.ibb.co/K6v2188/image-9.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 5,
      name: "https://i.ibb.co/H4Y80Lg/image-8.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 6,
      name: "https://i.ibb.co/McmytYN/image-7.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 7,
      name: " https://i.ibb.co/qFHSm3T/image-6.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 8,
      name: "https://i.ibb.co/9n86r7s/image-5.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 9,
      name: "https://i.ibb.co/HTWmCR6/image-4.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 10,
      name: "https://i.ibb.co/vHb5ktn/image-1.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
    {
      id: 11,
      name: "https://i.ibb.co/VSL86nw/image-2.webp",
      complete: false,
      isDragging: false,
      isChecked: false,
    },
  ]; // Example initial cart items
  const [cartItems, setCartItems] = useState(initialCartItems);
  const handleCheckboxChange = (itemId) => {
   
     cartItems.map((countItem) => {
    
      if (countItem.id === itemId) {
        if (countItem.isChecked) {
          setCount(count - 1);
        } else {
          setCount(count + 1);
        }
      }
    });

    const newCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
    );

    setCartItems(newCartItems);
   
  };



  const handleDeleteAllChecked = () => {
    const newCartItems = cartItems.filter((item) => !item.isChecked);
    setCartItems(newCartItems);
   
    setCount(0);
  };





  const handleImageChange = (image) => {

    imageUpload(image)
      .then(data => {
     
       const urlImages=data.data.display_url;
     
       const newItem = {
        id: cartItems.length + 1,
        name: urlImages,
        isChecked: false,
      };
      setCartItems([...cartItems, newItem]);


        
  })
   
  };

  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();
  function D_Start(e, index) {
    todoItemDrag.current = index;
  }
  function D_Enter(e, index) {
    todoItemDragOver.current = index;

    const cpArr = [...cartItems];

    let finalArr = [];

    cpArr.forEach((item) => {
      finalArr.push({
        name: item.name,

        complete: item.complete,
        isDragging: false,
      });
    });

    finalArr[index].isDragging = true;

    setCartItems(finalArr);
  }

  function D_End(e, index) {
    const arr1 = [...cartItems];

    const todo_item_main = arr1[todoItemDrag.current];
    arr1.splice(todoItemDrag.current, 1);
    arr1.splice(todoItemDragOver.current, 0, todo_item_main);

    todoItemDrag.current = null;
    todoItemDragOver.current = null;

    let f_arr = [];

    arr1.forEach((item) => {
      f_arr.push({
        name: item.name,
        complete: item.complete,
        isDragging: false,
      });
    });

    setCartItems(f_arr);
  }

  return (
    <div className="lg:w-[80%] mx-2  pb-4 my-5 rounded-md drop-shadow-md bg-white  lg:mx-auto  relative border">
      
      {
        (count>0)?
        <div className="p-5 h-20 flex justify-between items-center rounded-md bg-white ">
        <div>
          <h3  className="rounded-none bg-white text-slate-800 font-bold">
            <label className="bg-white">
              <input
                type="checkbox"
                defaultChecked
                
              />
            </label>
            <span className=" bg-white pl-2">{count}</span> Filed Selection
                   </h3>
        </div>
        <div>
          <button
            onClick={handleDeleteAllChecked}
            className="rounded-none bg-white text-red-800 font-semibold"
          >
            Delete files
          </button>
        </div>
      </div>
        :
        <div className="p-5 rounded-md h-20 flex justify-between items-center  bg-white">
          <h3 className="bg-white text-xl  font-bold">Gallery</h3>
        </div>
      }
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  absolute bg-white p-2 rounded-md gap-2">
        {/* ======================================= */}

        {cartItems.map((todo, index) => (
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
              className="bg-white border rounded-md p-0.5"
            >
              <div className="relative cursor-pointer overflow-hidden bg-cover bg-no-repeat border rounded-md">
                <img src={todo.name}></img>

                {todo.isChecked ? (
                  <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[#6f6f6f]  transition duration-300 ease-in-out opacity-30">
                    <input
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => handleCheckboxChange(todo.id)}
                      value=""
                      className="w-4 h-4 m-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[#6f6f6f] opacity-0 transition duration-300 ease-in-out hover:opacity-70">
                    <input
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => handleCheckboxChange(todo.id)}
                      value=""
                      className="w-4 h-4 m-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div>
          <div>
           
            <form>
              <div className="flex  justify-center items-center cursor-pointer
               text-white border  border-dashed w-full h-full border-gray-300 rounded font-semibold py-8 md:py-11 lg:py-14 px-3">
                <label>
                  <input
                    onChange={(event) => {
                      handleImageChange(event.target.files[0]);
                    }}
                    className="text-sm w-full h-full cursor-pointer hidden"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    hidden
                  />
                  <div className="py-4 lg:py-0">
                  <div className="flex justify-center items-center cursor-pointer">
                 
                 <FaImages className="text-5xl text-slate-700"/>
            
               </div>
               <div className="text-black cursor-pointer">
                 
                 {uploadImage}</div>
                  </div>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ImagesContainer;

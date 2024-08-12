import React from "react"; 
// import logo from "../img/logo.png"
const cardComponent = () => {
//   return (

// <div class="max-w-xs md:max-w-sm lg:max-w-md h-auto rounded     overflow-hidden shadow-lg bg-white">
//     <img class="h-48 md:h-56 w-full rounded-lg object-cover" src={logo} alt="Logo" />
//     <div class="px-6 py-4">
//         <div class="font-bold text-xl mb-2">eHome</div>
//         <p class="text-sm font-large text-gray-900">
//             This is a sample description for the card component.
//         </p>
//         <h3 class="font-semibold">Rs.600.00</h3>
//     </div>
//     <div class="px-6 pt-4 pb-2">
//         <button class="bg-white hover:bg-blue-300 text-black font-bold py-2 px-4 rounded">
//             See more
//         </button>
//     </div>
// </div>
   
//   );

// class work card 

const beautyProduct = [
  {
    imgUrl:
      "https://baltra.in/uploads/Banner.jpg",
    title: "The Coldest Sunset",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1705554519595-c1143c7fef97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Coolest Dress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1680012589533-9ba597be37b1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Coldest Sunset",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1705554519595-c1143c7fef97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Coolest Dress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
   
  {
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1680012589533-9ba597be37b1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Coldest Sunset",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/7206287/pexels-photo-7206287.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "The Coolest Dress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "The Coldest Sunset",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "The Coolest Dress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "The Coldest Sunset",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "The Coolest Dress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      price: "Rs.6oo",
  },
   
];

return (
  
<div className=" flex flex-wrap justify-around items-center my-2">
  {beautyProduct.map((product, index) => {
    return (
      <div key={index} className=" hover:bg-violet-50 w-60 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out m-2  ">
        <img
          className="w-full h-36 object-cover rounded-t-lg"
          src={product.imgUrl}
          alt="fashion beauty"
        />
        <div className="px-4 py-4">
          <div className="font-semibold text-lg mb-2">{product.title}</div>
          <p className="text-gray-700 text-sm">{product.description}</p>
          <h2 className="text-gray-700 text-xl"> {product.price}</h2>

        </div>
        <div className="px-4 py-4 text-left">
          <button className="bg-white hover:bg-blue-200 text-black font-medium px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out">
            Learn more
          </button>
        </div>
      </div>
    );
  })}
</div>

  
);
  

};

export default cardComponent;
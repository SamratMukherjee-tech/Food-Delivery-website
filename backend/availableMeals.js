// availableMeals.js

const availableMeals = [
  {
    id: "m1",
    name: "MAC and Cheese",
    price: 120,
    description: "Creamy cheddar cheese perfectly cooked with MAC",
    img: "https://www.recipetineats.com/wp-content/uploads/2020/11/Baked-Mac-and-Cheese-pull-shot.jpg",
  },
  {
    id: "m2",
    name: "Grilled Chicken Salad",
    price: 150,
    description: "Fresh salad with grilled chicken, veggies, and vinaigrette",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kXQmTK6PEyziJ9Wu9WRkCfwSPODxQmRIrQ&usqp=CAU",
  },
  {
    id: "m3",
    name: "Vegetarian Pizza",
    price: 200,
    description: "Delicious pizza with a variety of fresh vegetables",
    img: "https://www.amerigas.com/-/media/project/amerigas/blog/website-assets-recipe-images_2023_vegetarian-pizza.jpg",
  },
  // Additional Indian foods
  {
    id: "m4",
    name: "Butter Chicken",
    price: 250,
    description:
      "Tender chicken cooked in a rich, creamy butter and tomato sauce",
    img: "https://www.thespruceeats.com/thmb/t1lWSJrmYs9k_r1qa3MjCMAm2Gw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grilled-butter-chicken-recipe-334202-d67e09c113d2402fa6b097ae13d5e195.jpg",
  },
  {
    id: "m5",
    name: "Paneer Tikka Masala",
    price: 220,
    description: "Grilled paneer cubes in a flavorful tomato-based curry",
    img: "https://s3.amazonaws.com/static.realcaliforniamilk.com/media/recipes_2/paneer-tikka-masala.jpg",
  },
  {
    id: "m6",
    name: "Chicken Biryani",
    price: 280,
    description: "Fragrant rice dish with spiced chicken and aromatic spices",
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-chicken-Biryani.jpg",
  },
  {
    id: "m7",
    name: "Palak Paneer",
    price: 200,
    description: "Paneer cubes in a creamy spinach sauce",
    img: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/palak-paneer-3.jpg",
  },
  {
    id: "m8",
    name: "Chana Masala",
    price: 180,
    description: "Chickpeas in a spicy tomato-based sauce",
    img: "",
  },
  {
    id: "m9",
    name: "Samosa",
    price: 100,
    description: "Crispy pastry filled with spiced potatoes and peas",
    img: "https://www.sharethespice.com/wp-content/uploads/2022/07/Chana-Masala-Featured.jpg",
  },
  {
    id: "m10",
    name: "Dal Tadka",
    price: 160,
    description: "Yellow lentils tempered with spices and herbs",
    img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/04/dal-tadka-recipe.jpg",
  },
  {
    id: "m11",
    name: "Aloo Gobi",
    price: 180,
    description: "Potatoes and cauliflower in a flavorful curry",
    img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/aloo-gobi-recipe.jpg",
  },
  {
    id: "m12",
    name: "Rogan Josh",
    price: 250,
    description: "Slow-cooked lamb in a rich and aromatic curry sauce",
    img: "https://static.toiimg.com/thumb/53192600.cms?imgsize=418831&width=800&height=800",
  },
  {
    id: "m13",
    name: "Dosa",
    price: 150,
    description: "Thin rice crepe filled with spiced potatoes",
    img: "",
  },
  {
    id: "m14",
    name: "Chicken Korma",
    price: 260,
    description: "Chicken in a creamy, nutty, and mildly spiced curry",
    img: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/07/dosa-recipe-3.jpg",
  },
  {
    id: "m15",
    name: "Aloo Paratha",
    price: 120,
    description: "Whole wheat flatbread stuffed with spiced potatoes",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/800px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg",
  },
  {
    id: "m16",
    name: "Matar Paneer",
    price: 210,
    description: "Paneer and peas in a tomato-based curry",
    img: "https://static.toiimg.com/photo/53251884.cms",
  },
  {
    id: "m17",
    name: "Pani Puri",
    price: 80,
    description:
      "Small, round, and crispy puris filled with spicy and tangy water",
    img: "https://static.toiimg.com/thumb/61048461.cms?imgsize=1981854&width=800&height=800",
  },
  {
    id: "m18",
    name: "Vegetable Biryani",
    price: 240,
    description:
      "Flavorful rice dish with mixed vegetables and aromatic spices",
    img: "https://www.madhuseverydayindian.com/wp-content/uploads/2022/11/easy-vegetable-biryani.jpg",
  },
  {
    id: "m19",
    name: "Chicken Tikka",
    price: 200,
    description: "Marinated and grilled chicken skewers",
    img: "https://www.kitchenathoskins.com/wp-content/uploads/2023/07/chicken-tikka-13.jpg",
  },
  {
    id: "m20",
    name: "Gulab Jamun",
    price: 120,
    description: "Deep-fried milk dumplings soaked in sugar syrup",
    img: "https://1.bp.blogspot.com/-8pL6BgbDNqQ/YWOiTC6azwI/AAAAAAAAT0E/jrwSr9ftS8QV59nBP_MAwHSnLm491A9WwCNcBGAsYHQ/s640/Ready%2BMix%2BGulab%2BJamun.JPG",
  },
  // {
  //   id: "m21",
  //   name: "Rasgulla",
  //   price: 120,
  //   description: "Deep-fried milk dumplings soaked in sugar syrup",
  // "img":""},
  // Add more meal objects as needed
];

module.exports = availableMeals;

import img1 from "./assets/1.png"
import img2 from "./assets/2.png"
import img3 from "./assets/3.jpg"


const booksData = [
    {
      id: 1,
      name: "JavaScript and Jquery",
      price: "$99",
      img: img1,
      author: "Jon Duckett",
      rating: 5,
      publisher_year: 2014
    },
    {
      id: 2,
      name: "The Art of Computer Programming",
      price: "$199",
      img: img2,
      author: "Donald Knuth",
      rating: 5,
      publisher_year: 1978
    },
    {
      id: 3,
      name: "The Pragmatic Programmer",
      price: "$49",
      img: img3,
      author: "Andy Hunt and Dave Thomas",
      rating: 4.5,
      publisher_year: 1999
    },
    {
      id: 4,
      name: "Clean Code",
      price: "$39",
      img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xlYW4lMjBjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Robert Martin",
      rating: 4.2,
      publisher_year: 2008
    },
    {
      id: 5,
      name: "Code Complete",
      price: "$59",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXIlMjBwcm9ncmFtbWluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Steve McConnell",
      rating: 4.3,
      publisher_year: 2004
    },
    {
      id: 6,
      name: "Design Patterns",
      price: "$69",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amF2YXNjcmlwdCUyMGFuZCUyMGpxdWVyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Erich Gamma et al.",
      rating: 4.4,
      publisher_year: 1994
    },
    {
      id: 7,
      name: "Refactoring",
      price: "$79",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXIlMjBwcm9ncmFtbWluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Martin Fowler",
      rating: 4.1,
      publisher_year: 1999
    },
    {
      id: 8,
      name: "The Mythical Man-Month",
      price: "$29",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amF2YXNjcmlwdCUyMGFuZCUyMGpxdWVyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Frederick Brooks",
      rating: 3.9,
      publisher_year: 1975
    },
    {
      id: 9,
      name: "The C Programming Language",
      price: "$19",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXIlMjBwcm9ncmFtbWluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Brian Kernighan and Dennis Ritchie",
      rating: 2.6,
      publisher_year: 1978
    }
  ];
  
  export default booksData;
  
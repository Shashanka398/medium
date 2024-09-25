import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

export const useBlogs = () => {
  const [data, setData] = useState([]);
  const [isLoading,setLoading]=useState(true)
    const [error,setError]=useState('')

  useEffect(() => {
    getData();
  }, []);
const getData = async () => {
        
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(BACKEND_URL+'/blogs/bulk',{
          headers: {
           Authorization: `Bearer ${token}`
          }
        });
        setData(res.data.data);
        setLoading(false)
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error)
      }
    };
  return {data,isLoading,error};
};


// export const usePostBlog = ({body}) => {
//   const [data, setData] = useState([]);
//   const [isLoading,setLoading]=useState(true)
//     const [error,setError]=useState('')

//   useEffect(() => {
//     const getData = async () => {
        
//       try {
//         const token = localStorage.getItem('token')
//         const res = await axios.get(BACKEND_URL+'/blogs/bulk',{
//           headers: {
//            Authorization: `Bearer ${token}`
//           }
//         });
//         setData(res.data);
//         setLoading(false)
        
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error)
//       }
//     };

//     getData();
//   }, []);

//   return {data,isLoading,error};
// };

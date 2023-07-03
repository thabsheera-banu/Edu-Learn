// import React, { useEffect, useState, useContext } from 'react'
// import axios from 'axios'
// import Swal from 'sweetalert2';

// function AddCource() {
    
//     const[cate,setCategory] = useState([])
//     const[courseData,setCoueseData] = useState({
//         category : '',
//         title : '',
//         img :'',
//         description : '',
//         techs : ''


//     })
//     useEffect(() => {
//         try{
//             axios.get("http://127.0.0.1:8000/course/category").then((res)=>{
//                 setCategory(res.data)
//             });
//         }
//         catch(error){
//             console.log(error);
            

//         }


//     },[])
//     // console.log(cate);

//     const handleChange =(event) => {
//         setCoueseData({
//             ...courseData,
//             [event.target.name]:event.target.value
//         });
//     }

//     const handleFileChange =(event) => {
//         setCoueseData({
//             ...courseData,
//             [event.target.name] : event.target.files[0]
//         });
//     }

//     const FormSubmit = () =>{
//         const teacherId = localStorage.getItem('teacherId')
//         const _formData=new FormData();
//         _formData.append('category',courseData.category);
//         _formData.append('teacher', teacherId);
//         _formData.append('title',courseData.title);
//         _formData.append('img',courseData.img,courseData.img.name);
//         _formData.append('description',courseData.description);
//         _formData.append('techs',courseData.techs);
//         try{
//             axios.post('http://127.0.0.1:8000/course/course/',_formData ,{
//                 headers : {
//                     'Content-Type' : 'multipart/form-data'
//                 }
//             })
//             .then((res) => {
//                 console.log(res.data);
//                 Swal.fire({
//                     icon:'success',
//                     title:'Success',
//                     text:'Course added suessfully'
//                 });
//             });
            
//         }
//         catch(error){
//             console.log(error);
//         }




        
//     }
//     console.log(courseData);
//   return (
//     <div className='container mt-4'>
//         <div className='row '>
//             {/* <aside className='col-md-3'>

//             </aside> */}
//             <section className='col-9'>
//                 <div className='card'>
//                     <h5 className='card-header'>Add Cource</h5>
//                     <div className='card-body'>
//                         <form>
//                         <div className='mb-3'>
//                                 <label for="title" className='form-label'>Category</label>
//                                 <select onChange={handleChange} name="category"  className='form-control'>
//                                 {cate.map((category,index) => {return <option key={index} value={category.id}>{category.title}</option>})}

//                                 </select>
                                

//                             </div>
//                             <div className='mb-3'>
//                                 <label for="title" className='form-label'>Title</label>
//                                 <input onChange={handleChange} type="text"name="title" id="title" className='form-control'></input>

//                             </div>

//                             <div className='mb-3'>
//                                 <label for="description" className='form-label'>Description</label>
//                                 <textarea  onChange={handleChange} name="description" id="description" className='form-control'></textarea>

//                             </div>
//                             <div className='mb-3'>
//                                 <label for="img" className='form-label'>Image</label>
//                                 <input onChange={handleFileChange} type="file" name="img" id="video" className='form-control'></input>

//                             </div>
//                             <div className='mb-3'>
//                                 <label for="techs" className='form-label'>Technologies</label>
//                                 <textarea onChange={handleChange}  id="techs" name="techs" className='form-control' placeholder='python,java...'></textarea>

//                             </div>
//                             <button  onClick={FormSubmit} type='submit' className='btn btn-primary'>submit</button>
//                         </form>
//                     </div>

//                 </div>

//             </section>

//         </div>
      
//     </div>
//   )
// }

// export default AddCource

import './App.css'
import Course from './course'
import { useState,useEffect } from 'react';

    

function CourseList(){
      const [courses,setCourses] =useState(null);


  const[dummy,SetDummy]= useState(true);

  const [error,setError] =useState(null);


  useEffect(()=>{
    setTimeout( ()=>{
    fetch('http://localhost:3000/courses')
    .then(response => {

        if(!response.ok){
            throw Error("Couldn't retrive data");
        }

        

     return response.json();
    }) 
     
     .then(data => setCourses(data))  
     .catch((error)=>{
        console.log(error.message);
        setError(error.message);
    });

    }, 1000);

  }, []);  //empty dependency mean it run one time;

  function HandleDelete(id ){
    console.log(id);
    const newCourse=courses.filter((course)=>course.id!= id);
    setCourses(newCourse);
}



  //courses.sort((x,y)=>y.rating-x.rating) //descending

//   const  vfmCourses = courses.filter((course)=>
//     course.price<=200)


if (!courses && !error) {
    return <p>Loading...</p>;
}

if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
} //loading is done show error undefined




const coursesList=courses.map(
    (course)=>
<Course  key={course.id} name={course.name}
 image ={course.image} 
 price={course.price} rating={course.rating}
 delete= {HandleDelete} id={course.id}/>
)




    return(
        <>
        {coursesList}
        <button onClick={()=> {SetDummy(false)}}>  Dummy button</button>

        
        </>

    );
}

//npx json-server --watch data/dummyData.json  --port 3000 --static ./data


export default CourseList;


import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import FinalCreate from "./final-create";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



const Final = () => {
    let {idData} = useParams();
    console.log(idData)
    let navigate = useNavigate()
    const [currentId,setCurrentId] = useState(-1)
    const [data, setData] = useState(null)

    const [input,setInput] = useState(
        {
            name: "",
            course : "",
            score: "0"
        }
    )
    const [fetchStatus,setFetchStatus] = useState(true)

    
    
    useEffect(() => {
        if(fetchStatus === true){
            axios.get('https://backendexample.sanbercloud.com/api/student-scores')
            .then((res) =>{
                setData([...res.data])
            })
            .catch((error)=> {
        
            })

            setFetchStatus(false)
            

        }
    }, [fetchStatus,setFetchStatus])

    
    console.log(data)

    const handleInput =(event) =>{
        let name = event.target.name
        let value = event.target.value

        if(name === 'name'){    
            setInput({...input,name : value})
        }
        else if(name === 'course'){ 
            setInput({...input, course : value})
        }
        else if(name === 'score'){
            setInput({...input, score : value})
        }
    }
    
    const handleSubmit = (event)=>{
        event.preventDefault()
        let{
            name,
            course,
            score
        } = input
        axios.post('https://backendexample.sanbercloud.com/api/student-scores', {name , course, score})
        
        .then((res)=>{
            console.log(res)
            setFetchStatus(true)
            
        })
        

        setInput(
            {
                name: "",
                course:"",
                score: ""
            }
        )
    }

    const handleDelete = (event) =>{
        let idData = parseInt(event.target.value)

        axios.delete(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
        .then((res)=>{
            setFetchStatus(true)
            
        })

    }

    const getGrade = (score) => {

        if(score >= 80) {
            return 'A'
        }else if(score >=70 && score <80){
            return 'B'
        }
        else if(score >=60 && score <70){
            return 'C'
        }else if(score >=50 && score <60){
            return 'D'
        }
        else if ( score <50){
            return 'E'
        }

    }
    const handleEdit = (event) =>{
        let idData = parseInt(event.target.value)
        setCurrentId(idData)
        navigate(`/edit/${idData}`)


        axios.get(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
            .then((res)=>{
                let data = res.data
                setInput(
                    {
                        name: data.name,
                        course: data.course,
                        score: data.score
                    }
                )
            })


    }

    return(
        <>
        <div className="flex justify-center text-2xl font-bold mt-10">
            SIMPLE CRUD REACT
        </div>


        <div className="flex justify-center w-auto m-auto ">

        
            <Table hoverable className="mt-14 text-center m-auto">
  <Table.Head className="flex justify-center text-center align-center">
    <Table.HeadCell className="w-48 bg-cyan-500">
      No
    </Table.HeadCell>
    <Table.HeadCell className="w-48 bg-cyan-500">
      Name
    </Table.HeadCell>
    <Table.HeadCell className="w-48 bg-cyan-500">
      Course
    </Table.HeadCell>
    <Table.HeadCell className="w-48">
      Score
    </Table.HeadCell>
    <Table.HeadCell className="w-48">
      Index
    </Table.HeadCell>
    <Table.HeadCell className="w-48">
      Action
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Edit
      </span>
    </Table.HeadCell>
  </Table.Head>

    {data !== null && data. map((res,index) =>{
        return (
            <>
           
            {/* <Table.Body className="divide-y ">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-purple-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index+1}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {res.name}
        </Table.Cell>
        <Table.Cell>    
            {res.course}
        </Table.Cell>
        <Table.Cell>
            {res.score}
        </Table.Cell>
        <Table.Cell>
            {getGrade(res.score)}
        </Table.Cell>
        <Table.Cell>
            <Link to="/add">
        <button  value={res.id}  onClick={handleInput} className="bg-red-500 text-white p-1 rounded-lg m-2">
                Add
            </button>
            </Link>
        <button value={res.id} onClick={handleDelete} className="bg-red-500 text-white p-1 rounded-lg m-2">
                Delete
            </button>
            
            <button value={res.id} onClick={handleEdit} className="bg-red-500 text-white p-1 rounded-lg m-2">
                Edit
            </button>
        </Table.Cell>
        </Table.Row> */}
        <Table.Body className="divide-y m-auto flex justify-center">
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="w-48 whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index + 1}
      </Table.Cell>
      <Table.Cell className="w-48">
        {res.name}
      </Table.Cell>
      <Table.Cell className="w-48">
        {res.course}
      </Table.Cell>
      <Table.Cell className="w-48">
        {res.score}
      </Table.Cell>
      <Table.Cell className="w-48">
        {getGrade(res.score)}
      </Table.Cell>
      <Table.Cell className="w-64">
      <Link to="/add">
        <button  value={res.id}  onClick={handleInput} className="bg-red-500 text-white p-1 rounded-lg m-2">
                Add
            </button>
            </Link>
        <button value={res.id} onClick={handleDelete} className="bg-red-500 text-white p-1 rounded-lg m-2">
                Delete
            </button>
            
            <button value={res.id} onClick={handleEdit} className="bg-red-500 text-white p-1 rounded-lg m-2">
                Edit
            </button>
        
         
      </Table.Cell>
    </Table.Row>
    </Table.Body>
            
            </>
        )
    })}

</Table>





    </div>
        </>
        )
    }


export default Final;
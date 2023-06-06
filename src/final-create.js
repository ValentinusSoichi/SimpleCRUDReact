import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const FinalCreate = (props) => {
    let navigate = useNavigate()

    const [data, setData] = useState(null)

    const [input,setInput] = useState(
        {
            name: "",
            course : "",
            score: "0"
        }
    )
    const [fetchStatus,setFetchStatus] = useState(true)
    const [currentId,setCurrentId] = useState(-1)

    
    
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

        if(currentId === -1){
            axios.post('https://backendexample.sanbercloud.com/api/student-scores', {name , course, score})
            
            .then((res)=>{
                console.log(res)
                setFetchStatus(true)
                navigate('/home')
                
            })
        } else{
            axios.put(`https://backendexample.sanbercloud.com/api/student-scores/${currentId}`, {name, course, score})
            .then((res)=>{
                setFetchStatus(true)
            })
        }

        setCurrentId(-1)
        

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

    const handleEdit = (event) =>{
        let IdData = parseInt(event.target.value)
        setCurrentId(IdData)
        navigate(`/edit/${IdData}`)


        axios.get(`https://backendexample.sanbercloud.com/api/student-scores/${IdData}`)
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

    return(
        <>
        <Link to="/home"><button>Go home</button></Link>

            

<form onSubmit={handleSubmit} className="w-2/4 m-auto">

      <div>
    <div className="mb-2 block">
      <Label
        htmlFor="base"
        value= "Name"
        
      />
    </div>
    <TextInput
    value={input.name}
    onChange={handleInput}
    name="name"
    
      sizing="md"
    />
  </div>

  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="base"
        value= "Mata kuliah"
      />
    </div>
    <TextInput
    onChange={handleInput}
    value={input.course}
    name="course"
      sizing="md"
    />
  </div>

  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="base"
        value= "Nilai"
      />
    </div>
    <TextInput
    onChange={handleInput}
    value={input.score}
    name="score"
      sizing="md"
    />
    </div>


    <div className="p-2 m-auto">
    <Button className="m-auto px-96" type="submit" color="gray">
      Submit
    </Button>
  </div>



</form>


        </>
        )
    }


export default FinalCreate;
import React, { useState } from 'react';
import './home.component.css';
import axios from 'axios';


const Home = () => {
    const [resume, setResume] = useState({
        fname: "",
        lname: "",
        email: "",
        summary: ""
    });

    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);

    function onDelete(id) {
        const filterdata = skills.filter((skill, index) => index !== id);
        setSkills(filterdata);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setResume(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSkillChange(e) {
        setSkill(e.target.value);
    }

    function addSkill() {
        if (skill.length === 0) {
            alert("Please Enter a Skill");
        } else {
            setSkills([...skills, skill]);
            setSkill("");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            fname: resume.fname,
            lname: resume.lname,
            email: resume.email,
            summary: resume.summary,
            skills: skills
        }

        const response = await axios.post('https://resume-server-flame.vercel.app/api/build-resume', data);
        if(response.data.isExits === true){
            alert(response.data.username + " Your Resume is Already Exits and your unique Id is " + response.data.uniqueId);
        }else{
            alert("Your Resume has been generated Successfully here is your unique id " + response.data.uniqueId)
        }

    }


    return (
        <div className="container mt-5">
            Create Your .
            <div className="d-flex justify-content-center align-items-center">
                <form className='w-100 p-5' onSubmit={handleSubmit}>
                    <div className="row w-100 m-0 p-0 mb-2">
                        <div className="mb-2 col-lg-6 p-0">
                            <input type="text" className="form-control" placeholder="First Name"
                                onChange={handleChange}
                                value={resume.fname}
                                name="fname"
                                required
                            />
                        </div>
                        <div className="col-lg-6 p-0">
                            <input type="text" className="form-control" placeholder="First Name"
                                onChange={handleChange}
                                name="lname"
                                value={resume.lname}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-2'>
                        <input type="email" className="form-control" onChange={handleChange} value={resume.email} placeholder='Email Address' name='email' required />
                    </div>
                    <div className='mb-2'>
                        <textarea
                            className='form-control textarea'
                            cols={10}
                            rows={10}
                            value={resume.summary}
                            placeholder='Enter Summary About Your Self'
                            required
                            onChange={handleChange}
                            name='summary'
                        ></textarea>

                    </div>
                    <div className='row mb-1 p-0 m-0'>
                        <div className='col-lg-9 m-0 p-0'>
                            <input type='text' placeholder='Enter your Skills' className='form-control' value={skill} onChange={handleSkillChange}  />
                        </div>
                        <div className='col-lg-3 m-0 p-0'>
                            <button type='button' className='form-control btn btn-primary' onClick={addSkill}>Add Skills</button>
                        </div>
                    </div>
                    <div>
                        <ol className='skill-list'>
                            {skills.map((skill, index) => (
                                <li key={index} className='skill'>
                                    {skill}
                                    <button type='button' onClick={() => onDelete(index)} className='del'>X</button>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <button className='w-100 btn btn-primary' type='submit' >Create Resume</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Resume = () => {
    
    const { uniqueId } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://resume-server-flame.vercel.app/api/user-resume?uniqueId=${uniqueId}`);
                if(response.data.success) {
                    setResumeData(response.data.data);
                    setError(null); 
                } else {
                    setError("No Resume data found");
                }
            } catch (error) {
                setError("Error fetching resume data");
                console.error("Error fetching resume data:", error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div className="m-5">
            <h1>Resume</h1>
            {error ? (
                <div>{error}</div>
            ) : (
                resumeData && (
                    <div>
                        <p>First Name: {resumeData.fname}</p>
                        <p>Last Name: {resumeData.lname}</p>
                        <p>Email: {resumeData.email}</p>
                        <p>Summary: {resumeData.summary}</p>
                        <ol>
                            {resumeData.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ol>
                    </div>
                )
            )}
        </div>
    );
}

export default Resume;

import { useEffect, useState } from "react";
import { getLocal } from "../utils/helper";
import {getProjectApi, getTaskApi} from "../utils/api_service";

function Home () {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchProjects()
    }, [])

    const handleCardClick = async(projectId) => {
        let userId = await getLocal();
        let response = await getTaskApi(userId, projectId);
        
        if (response.success) {
            setTasks(response.data);
        }
        if (selectedProject === projectId) {
            setSelectedProject(null);
        } else {
            setSelectedProject(projectId);
        }
    };

    const fetchProjects = async () => {
        let userId = await getLocal();
        let response = await getProjectApi(userId);
        
        if (response.success) {
            setProjects(response.data);
        }
    }

    return (
        <div className="home-container">
            <p className="login-title">Projects</p>
            <div className="projects-container">
            {projects.map((project, index) => (
                <div key={project.id} className="project-card">
                    <div className="project-card-header" onClick={() => handleCardClick(project.id)}>
                        <p>{project.title}</p>
                        <div className="project-card-footer">
                            {selectedProject === project.id && (
                                <div className="project-card-buttons">
                                    <button className="edit-button">
                                        <i className="fas fa-pen"></i>
                                    </button>
                                    <button className="delete-button">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            )}
                                <i className="fas fa-chevron-down down-arrow"></i>
                        </div>
                    </div>
                    {selectedProject === project.id && 
                        <div className="chart">
                            {tasks.map((task, index) => (
                                <div key={task.id} className="task-group">
                                    <input type="checkbox" defaultChecked={task.status} />
                                    <p style={{ textDecoration: task.status ? 'line-through' : 'none' }}>{task.description}</p>
                                </div>
                            ))}
                            
                        </div>
                    }
                </div>
            )
            )}
            </div>

            <button className="create-project-button">
                <i className="fas fa-plus"></i> Create Project
            </button>
        </div>
    )
}

export default Home
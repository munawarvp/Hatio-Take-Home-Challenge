import { useEffect, useState } from "react";
import { getLocal } from "../utils/helper";
import {addTaskApi, createProjectApi, deleteTaskApi, exportTaskApi, getProjectApi, getTaskApi, taskUpdateApi, updateProjectApi, updateTaskNameApi} from "../utils/api_service";
import { useNavigate } from "react-router-dom";

function Home () {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [showNewInput, setShowNewInput] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedDescription, setEditedDescription] = useState("");
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!getLocal()) {
            navigate("/login");
            return;
        }
        fetchProjects()
    }, [])

    const handleCardClick = async(projectId) => {
        let userId = getLocal();
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
        let userId = getLocal();
        let response = await getProjectApi(userId);
        
        if (response.success) {
            setProjects(response.data);
        }
    }

    const handleTaskInputChange = async (e) => {
        let userId = getLocal();
        if (e.key === 'Enter' && e.target.value.trim()) {
            let addTaskResponse = await addTaskApi(userId, selectedProject, e.target.value);
            if (addTaskResponse.success) {
                let response = await getTaskApi(userId, selectedProject);
                if (response.success) {
                    setTasks(response.data);
                }
                setShowNewInput(false);
            }
        }
    };

    const handleProjectTitleEditClick = (project) => {
        setEditingProject(project.id);
        setEditedTitle(project.title);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleSaveClick = async (projectId) => {
        let userId = getLocal();
        let response = await updateProjectApi(userId, projectId, editedTitle)
        if (response.success) {
            await fetchProjects();
            setEditingProject(null);
        }
    };

    const handleChangeTaskStatus = async (taskId) => {
        let userId = getLocal();
        let response = await taskUpdateApi(userId, taskId);
        if (response.success) {
            let updatedTasks = tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, status: !task.status };
                }
                return task;
            });
            setTasks(updatedTasks);
        }
    };

    const deleteTask = async (taskId) => {
        let userId = getLocal();
        let response = await deleteTaskApi(userId, taskId);
        if (response.success) {
            let updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
        }
    };

    const handleEditTask = (taskId, currentDescription) => {
        setEditingTaskId(taskId);
        setEditedDescription(currentDescription);
    };

    const saveTaskDescription = async (taskId) => {
        let userId = getLocal();
        let response = await updateTaskNameApi(userId, taskId, editedDescription);

        if (response.success) {
            let response = await getTaskApi(userId, selectedProject);
            if (response.success) {
                setTasks(response.data);
                setEditingTaskId(null);
            }
        }
    };

    const handleCreateProject = () => {
        setIsCreatingProject(true);
        setNewProjectTitle("");
    };

    const saveNewProject = async() => {
        if (newProjectTitle.trim() === "") {
            alert("Project title cannot be empty");
            return;
        }
        let userId = getLocal();
        let createProjectResponse = await createProjectApi(userId, newProjectTitle);
        if (createProjectResponse.success) {
            setIsCreatingProject(false);
            await fetchProjects();
        }
    };

    const handleProjectExport = async (projectId) => {
        let userId = getLocal();
        let response = await exportTaskApi(userId, projectId);
        if (response.success) {
            alert(response.message);
            return;
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("user_id");
        window.location.href = "/login";
    }

    return (
        <div className="home-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="login-title">Projects</p>
                <div className="tooltip-container" onClick={logoutUser}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span className="tooltip-text">Logout</span>
                </div>
            </div>
            
            <div className="projects-container">
            {isCreatingProject && (
                <div className="project-card">
                    <p></p>
                    <div className="project-card-header">
                        <input
                            type="text"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            className="new-project-input"
                            placeholder="Enter project title"
                        />
                        <button className="save-new-project-button" onClick={saveNewProject}>
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            )}
            {projects.map((project, index) => (
                <div key={project.id} className="project-card">
                    <div className="project-card-header" onClick={() => handleCardClick(project.id)}>
                    {editingProject === project.id ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    className="project-edit-input"
                                    value={editedTitle}
                                    onChange={handleTitleChange}
                                    autoFocus
                                />
                                <button
                                    className="save-button"
                                    onClick={() => handleSaveClick(project.id)}
                                >
                                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                                </button>
                            </div>
                        ) : (
                            <p>{project.title}</p>
                        )}
                        <div className="project-card-footer">
                            {selectedProject === project.id && (
                                <div className="project-card-buttons">
                                    <button className="edit-button" onClick={(event) => {
                                        event.stopPropagation();
                                        handleProjectTitleEditClick(project)
                                    }}>
                                        <i className="fas fa-pen"></i>
                                    </button>
                                    <button className="delete-button" onClick={(event)=>
                                        {event.stopPropagation();
                                        handleProjectExport(project.id)}
                                    }>
                                        <i className="fa-duotone fa-solid fa-download"></i>
                                    </button>
                                </div>
                            )}
                                <i className="fas fa-chevron-down down-arrow"></i>
                        </div>
                    </div>
                    {selectedProject === project.id && 
                        <div className="chart" onClick={() => setShowNewInput(true)}>
                            {tasks.length === 0 && !showNewInput ? <p>No Tasks</p>: null}
                            {tasks.map((task, index) => (
                                <div key={task.id} className="task-group">
                                    <div className="task-content">
                                        <input
                                            type="checkbox"
                                            defaultChecked={task.status}
                                            onChange={() => handleChangeTaskStatus(task.id)}
                                        />
                                        {editingTaskId === task.id ? (
                                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <input
                                                    type="text"
                                                    value={editedDescription}
                                                    onChange={(e) => setEditedDescription(e.target.value)}
                                                    className="edit-task-input"
                                                    autoFocus
                                                />
                                                <button
                                                    className="save-button"
                                                    onClick={() => saveTaskDescription(task.id)}
                                                >
                                                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <p
                                                style={{
                                                    textDecoration: task.status ? 'line-through' : 'none',
                                                }}
                                            >
                                                {task.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="task-buttons">
                                        <button
                                            className="edit-task-button"
                                            onClick={() => handleEditTask(task.id, task.description)}
                                        >
                                            <i className="fas fa-pen"></i>
                                        </button>
                                        <button
                                            className="delete-task-button"
                                            onClick={() => deleteTask(task.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {showNewInput && (
                                <div className="new-task">
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Enter new task"
                                        onKeyDown={handleTaskInputChange}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </div>
            )
            )}
            </div>

            <button className="create-project-button" onClick={handleCreateProject}>
                <i className="fas fa-plus"></i> Create Project
            </button>
        </div>
    )
}

export default Home
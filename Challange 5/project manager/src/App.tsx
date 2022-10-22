import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import './App.css';
import ActionsButtons from './components/ActionsButtons';
import CreateProjectForm from './components/CreateProject';

type Project = {
    title: string;
    description: string;
    creator: string;
    id: string;
};

function App() {
    const [projects, setProjects] = useState<Project[]>([]);

    const [project, setProject] = useState<Project>({
        title: '',
        description: '',
        creator: '',
        id: '',
    });
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const indexDB = window.indexedDB.open('projects', 1);

        indexDB.onsuccess = () => {
            const db = indexDB.result;
            const tx = db.transaction('project', 'readonly');
            const store = tx.objectStore('project');
            const request = store.getAll();
            request.onsuccess = () => {
                setProjects(request.result);
            };
        };

        indexDB.onerror = () => {
            console.log('error');
        };

        indexDB.onupgradeneeded = () => {
            const db = indexDB.result;
            db.createObjectStore('project', { keyPath: 'id' });
        };
    }, []);

    const createProjectHandler = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const key = e.target.name;
        const value = e.target.value;

        setProject((prevState) => {
            return {
                ...prevState,
                [key]: value,
                id: e.timeStamp.toString(),
            };
        });
    };

    const addProjectToIndexDB = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProjects((prevState) => {
            return [...prevState, project];
        });

        const indexDB = window.indexedDB.open('projects', 1);
        indexDB.onsuccess = () => {
            const db = indexDB.result;
            const tx = db.transaction('project', 'readwrite');
            const store = tx.objectStore('project');
            store.add(project);
        };

        indexDB.onerror = () => {
            console.log('error');
        };

        indexDB.onupgradeneeded = () => {
            const db = indexDB.result;
            db.createObjectStore('project', { keyPath: 'id' });
        };
    };

    const deleteProject = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const id = e.currentTarget.parentElement?.id || '';
        const indexDB = window.indexedDB.open('projects', 1);

        indexDB.onsuccess = () => {
            const db = indexDB.result;
            const tx = db.transaction('project', 'readwrite');
            const store = tx.objectStore('project');
            const request = store.get(id);

            request.onsuccess = () => {
                const data = request.result;
                if (data) {
                    store.delete(id);
                    setProjects((prevState) => {
                        return prevState.filter((project) => project.id !== id);
                    });
                }
            };
        };
    };

    const editProject = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;
        console.log(key, value);
        setProject((prevState) => {
            return {
                ...prevState,
                [key]: value,
                id: e.timeStamp.toString(),
            };
        });
    };

    const onSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = e.currentTarget.closest('.id-holder')?.id || '';
        const indexDB = window.indexedDB.open('projects', 1);

        indexDB.onsuccess = () => {
            const db = indexDB.result;
            const tx = db.transaction('project', 'readwrite');
            const store = tx.objectStore('project');
            const request = store.get(id);

            request.onsuccess = () => {
                const data = request.result;
                console.log(data);
                if (data) {
                    store.put({ ...project, id: id });
                    setProjects((prevState) => {
                        return prevState.map((p) => {
                            console.log(p.id, id, p.id === id);
                            if (p.id === id) {
                                return {
                                    id: p.id,
                                    title: project.title || p.title,
                                    description: project.description || p.title,
                                    creator: project.creator || p.creator,
                                };
                            }
                            return p;
                        });
                    });
                    setProject({
                        title: '',
                        description: '',
                        creator: '',
                        id: '',
                    });
                }
            };
        };
    };

    return (
        <div className="App">
            <div className="grid">
                <div className="flex justify-between border-b pb-4 mb-8">
                    <h1 className="font-bold">My Projects</h1>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-green-800"
                    >
                        Create Project +
                    </button>
                </div>
                <div className="grid gap-4 text-left">
                    <div className="grid grid-cols-4 gap-4 ">
                        <div>
                            <h2 className="text-2xl font-medium">Title</h2>
                        </div>
                        <div>
                            <h2 className="text-2xl font-medium">
                                Description
                            </h2>
                        </div>
                        <div>
                            <h2 className="text-2xl font-medium">creator</h2>
                        </div>
                        <div>
                            <h2 className="text-2xl font-medium">Actions</h2>
                        </div>
                    </div>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="grid grid-cols-4 gap-6 "
                        >
                            <h3 className="text-lg">{project.title}</h3>
                            <p>{project.description}</p>
                            <p>{project.creator}</p>
                            <ActionsButtons
                                id={project.id}
                                onEdit={editProject}
                                onSubmitEdit={onSubmitEdit}
                                onDelete={deleteProject}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <CreateProjectForm
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                addProjectToIndexDB={addProjectToIndexDB}
                createProject={createProjectHandler}
            />
        </div>
    );
}

export default App;

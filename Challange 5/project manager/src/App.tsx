import { ChangeEvent, FormEvent, useEffect, useId, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

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

    return (
        <div className="App">
            <div className="grid">
                <div className="flex justify-between border-b pb-4 mb-8">
                    <h1 className="font-bold">My Projects</h1>
                    <button className="bg-green-800">Create Project +</button>
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
                            <button>Actions</button>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={(e) => addProjectToIndexDB(e)} className="grid">
                <div>
                    <p>Name</p>
                    <input
                        required
                        type="text"
                        name="title"
                        id="title"
                        onChange={(e) => createProjectHandler(e)}
                    />
                </div>
                <div>
                    <p>Description</p>
                    <textarea
                        required
                        name="description"
                        id="title"
                        cols={30}
                        rows={10}
                        onChange={(e) => createProjectHandler(e)}
                    ></textarea>
                </div>
                <div>
                    <p>Creator</p>
                    <input
                        required
                        type="text"
                        name="creator"
                        id="creator"
                        onChange={(e) => createProjectHandler(e)}
                    />
                </div>
                <div>
                    <button>Create</button>
                </div>
            </form>
        </div>
    );
}

export default App;

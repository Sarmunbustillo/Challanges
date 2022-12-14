type CreateProjectFormProps = {
    addProjectToIndexDB: (e: any) => void;
    createProject: (e: any) => void;
    setIsFormOpen: (e: any) => void;
    isFormOpen: boolean;
};

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
    addProjectToIndexDB,
    createProject,
    setIsFormOpen,
    isFormOpen,
}) => {
    return (
        <>
            {isFormOpen ? (
                <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-sm bg-black/75 ">
                    <form
                        onSubmit={(e) => {
                            addProjectToIndexDB(e);
                            setIsFormOpen(false);
                        }}
                        className="grid text-left gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="bg-rose-500 "
                            type="button"
                        >
                            Close
                        </button>
                        <div>
                            <p>Name</p>
                            <input
                                className="w-full"
                                required
                                type="text"
                                name="title"
                                id="title"
                                onChange={(e) => createProject(e)}
                            />
                        </div>
                        <div>
                            <p>Description</p>
                            <textarea
                                required
                                className="w-full"
                                name="description"
                                id="title"
                                cols={30}
                                rows={10}
                                onChange={(e) => createProject(e)}
                            ></textarea>
                        </div>
                        <div>
                            <p>Creator</p>
                            <input
                                required
                                className="w-full"
                                type="text"
                                name="creator"
                                id="creator"
                                onChange={(e) => createProject(e)}
                            />
                        </div>
                        <div>
                            <button className="bg-blue-800 w-full">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default CreateProjectForm;

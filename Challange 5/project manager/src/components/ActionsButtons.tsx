import { useState } from 'react';

type ActionsButtonsProps = {
    onEdit: (e: any) => void;
    onDelete: (e: any) => void;
    onSubmitEdit: (e: any) => void;
    id: string;
};

const ActionsButtons: React.FC<ActionsButtonsProps> = ({
    onEdit,
    onDelete,
    onSubmitEdit,
    id,
}) => {
    const [isActionsOpen, setIsActionsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const actionsOpenHandler = () => {
        setIsActionsOpen((prevState) => !prevState);
        setIsEditOpen(false);
    };

    return (
        <div className="relative">
            <button
                className={`w-32 ${
                    isActionsOpen ? 'border border-slate-200' : ''
                }`}
                onClick={actionsOpenHandler}
            >
                {isActionsOpen ? 'Close' : 'Actions'}
            </button>
            {isActionsOpen && (
                <div
                    className="id-holder absolute top-14 grid z-10 gap-2 p-2 bg-slate-700 rounded-md"
                    id={id}
                >
                    <button
                        onClick={() => setIsEditOpen((prev) => !prev)}
                        className={`mb-2 ${
                            isEditOpen ? 'bg-rose-500' : 'bg-blue-800'
                        }`}
                    >
                        {isEditOpen ? 'Exit Editing' : 'Edit'}
                    </button>
                    {isEditOpen ? (
                        <form
                            onSubmit={(e) => {
                                onSubmitEdit(e);
                                setIsActionsOpen(false);
                            }}
                            className="grid gap-3"
                        >
                            <div>
                                <p>Name</p>
                                <input
                                    className=""
                                    type="text"
                                    name="title"
                                    id="title"
                                    onChange={(e) => onEdit(e)}
                                />
                            </div>
                            <div>
                                <p>Description</p>
                                <textarea
                                    className="w-full"
                                    name="description"
                                    id="title"
                                    cols={30}
                                    rows={10}
                                    onChange={(e) => onEdit(e)}
                                ></textarea>
                            </div>
                            <div>
                                <p>Creator</p>
                                <input
                                    className="w-full"
                                    type="text"
                                    name="creator"
                                    id="creator"
                                    onChange={(e) => onEdit(e)}
                                />
                            </div>
                            <div>
                                <button className="bg-blue-800 mt-2 w-full">
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={(e) => onDelete(e)}
                            className="bg-red-800 w-32"
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionsButtons;

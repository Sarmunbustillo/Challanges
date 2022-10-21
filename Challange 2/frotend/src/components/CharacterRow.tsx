const CharacterRow = ({ children }: { children: JSX.Element[] }) => {
    return (
        <ul className="grid grid-flow-col grid-cols-5 items-center p-4 border-y gap-5  border border-slate-500  odd:bg-slate-800 even:bg-slate-700">
            {children}
        </ul>
    );
};

export default CharacterRow;

import React from 'react';

type Props = {
    currentPage: number;
    nPages: number;
    setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
    currentPage,
    nPages,
    setCurrentPage,
}) => {
    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };
    return (
        <div>
            <nav>
                <ul className="flex gap-4 items-center justify-center mt-5">
                    <li>
                        <button onClick={prevPage}>←</button>
                    </li>
                    <li>
                        {currentPage} of {nPages}
                    </li>
                    <li>
                        <button onClick={nextPage}>→</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;

import { useState } from 'react';
import { CharacterInfo } from '../types';

type Props = {
    character: CharacterInfo;
};
const parseEpisode = (url: string) => {
    const episodeNum = url.split('/');
    return episodeNum[episodeNum.length - 1];
};

const Modal: React.FC<Props> = ({ character }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <button onClick={() => setOpenModal(true)}>👁</button>
            <div
                className={` absolute top-2/1 left-2/4 -translate-x-1/2 border border-slate-500  bg-slate-800  p-4  ${
                    openModal ? 'block' : 'hidden'
                }`}
            >
                <button onClick={() => setOpenModal(false)}>❌</button>
                <img src={character.image} alt={character.name} />
                <p className="my-3 text-lg">Episode </p>
                <ul className="grid grid-cols-5  gap-y-2">
                    {character.episode.map((episode) => {
                        return (
                            <li
                                className="border-b border-slate-200"
                                key={episode}
                            >
                                {parseEpisode(episode)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default Modal;

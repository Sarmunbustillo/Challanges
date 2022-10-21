import { CharacterInfo } from '../types';
import CharacterRow from './CharacterRow';
import Modal from './Modal';

type Props = {
    character: CharacterInfo;
};

const Character: React.FC<Props> = ({ character }) => {
    return (
        <CharacterRow>
            <li className="">{character.name}</li>
            <li className="">{character.status}</li>
            <li className="">{character.gender}</li>
            <li className="">{character.species}</li>
            <li>
                <Modal character={character} />
            </li>
        </CharacterRow>
    );
};

export default Character;

export type ResponseAPI = {
    info: Info;
    results: CharacterInfo[];
};

export type Info = {
    count: number;
    pages: number;
    next: string;
    prev: any;
};

export type CharacterInfo = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
};

export type Origin = {
    name: string;
    url: string;
};

export type Location = {
    name: string;
    url: string;
};

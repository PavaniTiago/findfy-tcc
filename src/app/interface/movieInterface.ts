   export interface MovieProps extends Array<MovieProps> {
    poster_path: string;
    backdrop_path: string;
    id: string;
    title: string;
    genres: [
        {id: number, name: string}
    ]
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
}
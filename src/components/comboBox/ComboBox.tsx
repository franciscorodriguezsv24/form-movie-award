import { useState, useRef, useEffect } from "react"
import { getMovies } from "../../api/getMovies";
import styles from "./comboBox.module.scss"
import { useVirtualizer } from "@tanstack/react-virtual";

    export interface MovieInformation {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    }

    type PropsMovieInformation = {
        setMovieData: React.Dispatch<React.SetStateAction<MovieInformation | undefined>>;
        resetSignal?: boolean;
    }
    


export const Combobox = ({setMovieData, resetSignal} : PropsMovieInformation) => {
    const [input, setInput] = useState<string>('')
    const [returnValue, setReturnValue] = useState<string>('')
    const [showUl, setShowUl] = useState<boolean>(false)
    const ulRef = useRef<HTMLUListElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1);
    const [moviesData, setMoviesData] = useState<MovieInformation[]>([]);

    useEffect(() => {
        setInput('');
        setReturnValue('');
        setShowUl(false);
    }, [resetSignal]);

    
    useEffect(() => {
        getMovies(page).then((data) => 
            setMoviesData(
            (predData) => {
                const newMovies = data.results.filter(
                (newMovie: MovieInformation) => 
                    !predData.some(existingMovie => existingMovie.id === newMovie.id)
                );
                return [...predData, ...newMovies];
            }));
            setLoading(false)
    }, [page]);

    const movies:MovieInformation[] = moviesData

    const title = 'combo'

    const filteredArray = (
        input
        ? movies.filter(item => item.title.toLowerCase().includes(input.toLowerCase()))
        : movies
    )

    const rowVietualizer = useVirtualizer({
        count: filteredArray.length,
        getScrollElement: () => ulRef.current,
        estimateSize: () => 20,
    })

    const handleScroll = () => {
        if (!ulRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = ulRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            setLoading(true);
        }
        
    }

    const handleSelect = (name: string, id: string, item:MovieInformation) => {
        setInput(name) 
        setReturnValue(id)
        setShowUl(false)
        setMovieData(item)
    }

    function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): void => {
        if (timeoutId) {
        clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
        func(...args);
        }, delay);
    };
    }


    const keyDown = (e: React.KeyboardEvent, item: MovieInformation) => {
        if (e.key === 'Enter' || e.key === ' ') {
                handleSelect(item.title, String(item.id), item)
            }
        }

    useEffect(() => {
        const ulElement = ulRef.current;

        if (ulElement) {
            const debouncedHandleScroll = debounce(handleScroll, 500);
            ulElement.addEventListener("scroll", debouncedHandleScroll);
            
            return () => {
                ulElement.removeEventListener("scroll", debouncedHandleScroll);
            };
        }
    }, [handleScroll]);

    useEffect(() => {
    if (loading) {
        setPage((prevPage) => prevPage + 1);
    }
    }, [loading]);
    return (
        <div className={styles.comboBoxContainer}>
            <label htmlFor={`${title}_input`} className={styles.inputLabel}>Select your movie</label>
            <input
                id={`${title}_input`}
                type="text"
                className={styles.inputComboBox}
                placeholder='choose an option'
                value={input}
                onChange={e => {setInput(e.target.value)}}
                onFocus={() => {setShowUl(true)}}
            />
            <input
                id={`${title}_id`}
                type="hidden"
                value={returnValue}
            />
            {showUl &&
                <ul className={styles.listContainer}
                    ref={ulRef}
                    >
                        <li style={{
                            height: `${rowVietualizer.getTotalSize()}px`,
                            listStyle: 'none',
                        }}/>
                    {rowVietualizer.getVirtualItems().map((virtualItem) => {
                        const item = filteredArray[virtualItem.index]
                            if(!item) return null
                            const {key, size, start } = virtualItem

                            return(
                            <button
                                key={key}
                                onKeyDown={(e) => keyDown(e, item)}
                                onClick={() => handleSelect(item.title, String(item.id), item)}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    color: 'black',
                                    left: 0,
                                    width: '100%',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    height: `${size}px`,
                                    transform: `translateY(${start}px)`,
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >{item.title}</button>
                            )
                    })}
                </ul>
            }
        </div>
    )
}

//[movieData, setMovieData]: PropsMovieInformationpm 
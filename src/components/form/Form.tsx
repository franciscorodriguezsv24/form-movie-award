import { Combobox } from '../comboBox/ComboBox'
import styles from './form.module.scss'
import { useState } from 'react'
import { type  MovieInformation } from '../comboBox/ComboBox'

type Inputs = {
  firstName: string
  lastName: string
  email: string
  country: string
  language: string
  title: string
  rate: string
  releaseDate: string
}

export const Form = () => {

  const [movieData, setMovieData] = useState<MovieInformation>();

  console.log("null", movieData)
  return (
    
    <div className={styles.containerForm}>
      <div className={styles.inputContainer}>
        <label htmlFor="firstName" className={styles.inputLabel}>
          First name
        </label>
        <input id="firstName" className={styles.inputForm}/>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="lastName" className={styles.inputLabel}>
          Last name
        </label>
        <input id="lastName" className={styles.inputForm}/>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email
        </label>
        <input id="email" className={styles.inputForm}/>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="country" className={styles.inputLabel}>
          Country
        </label>
        <input id="country" className={styles.inputForm}/>
      </div>
      <div className={styles.inputContainer}>
        <Combobox setMovieData={setMovieData}/>
      </div>
      {
        movieData && 
        <>
        <div className={styles.inputContainer}>
          <label htmlFor="languaje" className={styles.inputLabel}>
            Language
          </label>
          <input id="languaje" className={styles.inputForm} value={movieData.original_language}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.inputLabel}>
            Title
          </label>
          <input id="title" className={styles.inputForm} value={movieData.title}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="rate" className={styles.inputLabel}>
            Rate
          </label>
          <input id="rate" className={styles.inputForm} value={movieData.popularity}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="date" className={styles.inputLabel}>
            Release date
          </label>
          <input id="date" className={styles.inputForm} value={movieData.release_date}/>
        </div>
        <div>
          <img src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`} alt={movieData.title}/>
        </div>
        </>
      }
    </div>
  )
}

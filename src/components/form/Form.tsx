import { Combobox } from '../comboBox/ComboBox'
import styles from './form.module.scss'
import { useState } from 'react'
import { type  MovieInformation } from '../comboBox/ComboBox'
import { useForm, type SubmitHandler } from 'react-hook-form'

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

type SetClose = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Form = ({closeModal}: SetClose) => {

  const { 
    register, 
    formState: { errors }, 
    handleSubmit,
    reset } = useForm<Inputs>()

  const [movieData, setMovieData] = useState<MovieInformation>();
  const [resetCombo, setResetCombo] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    reset()
    setMovieData(undefined)
    setResetCombo(prev => !prev);
    closeModal(true)

}

  return (
  
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.containerForm}>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName" className={styles.inputLabel} aria-invalid={errors.firstName ? "true" : "false"}>
              First name
            </label>
            <input 
              id="firstName" 
              className={styles.inputForm } 
              {...register('firstName', {required: true, maxLength: 20})}
              aria-invalid={errors.firstName ? "true" : "false"}/>
              
              {errors.firstName?.type === "required" && (
                <p role="alert" className={styles.errorMessage} >First name is required</p>
              )}
          </div>
          <div className={styles.inputContainer}>
            <label 
              htmlFor="lastName" 
              className={styles.inputLabel} 
              aria-invalid={errors.lastName ? "true" : "false"}>
              Last name
            </label>
            <input 
              id="lastName" 
              className={styles.inputForm} 
              {...register('lastName', {required: true, maxLength: 20})}
              aria-invalid={errors.lastName ? "true" : "false"}/>
              {errors.lastName?.type === "required" && (
                <p role="alert" className={styles.errorMessage} >Last name is required</p>
              )}

          </div>
          <div className={styles.inputContainer}>
            <label 
              htmlFor="email" 
              className={styles.inputLabel}
              aria-invalid={errors.email ? "true" : "false"}>
              Email
            </label>
            <input 
              type='email' 
              id="email" 
              className={styles.inputForm} 
              {...register('email', {required: true,})}
              aria-invalid={errors.email ? "true" : "false"}/>
              {errors.email?.type === "required" && (
                <p role="alert" className={styles.errorMessage} >Email is required</p>
              )}
          </div>
          <div className={styles.inputContainer}>
            <label 
              htmlFor="country" 
              className={styles.inputLabel}
              aria-invalid={errors.country ? "true" : "false"}>
              Country
            </label>
            <input 
              id="country" 
              className={styles.inputForm} 
              {...register('country', {required: true,})}
              aria-invalid={errors.country ? "true" : "false"}/>
              {errors.country?.type === "required" && (
                <p role="alert" className={styles.errorMessage} >Country is required</p>
              )}
          </div>
          <div className={styles.inputContainer}>
            <Combobox setMovieData={setMovieData} resetSignal={resetCombo}/>
          </div>
        {
          movieData && 
          <>
          <div className={styles.inputContainer}>
            <label htmlFor="language" className={styles.inputLabel}>
              Language
            </label>
            <input id="language" className={styles.inputForm} value={movieData.original_language} {...register('language', {required: true,})}/>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="title" className={styles.inputLabel}>
              Title
            </label>
            <input id="title" className={styles.inputForm} value={movieData.title} {...register('title', {required: true,})}/>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="rate" className={styles.inputLabel}>
              Rate
            </label>
            <input id="rate" className={styles.inputForm} value={movieData.popularity} {...register('rate', {required: true,})}/>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="date" className={styles.inputLabel}>
              Release date
            </label>
            <input id="date" className={styles.inputForm} value={movieData.release_date} {...register('releaseDate', {required: true,})}/>
          </div>
          <div>
            <img src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`} alt={movieData.title}/>
          </div>
          </>
        }
        </div>
        <div className={styles.buttonContainer}>
          <input type='submit' className={styles.buttonSend}/>
        </div>
      </form>
  )
}

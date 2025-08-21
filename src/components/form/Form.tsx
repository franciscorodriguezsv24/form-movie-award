import { Combobox } from '../comboBox/ComboBox'
import styles from './form.module.scss'
import { getMovies } from '../../api/getMovies'
import { use } from 'react'
 

export const Form = () => {

  const data = use(getMovies())
  

  console.log(data)
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
      <div>
        <Combobox/>
      </div>
    </div>
  )
}

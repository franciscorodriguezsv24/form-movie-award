import styles from './home.module.scss'
import Oscars from '../../assets/Oscars-Logo.png'
import { Form } from '../../components/form/Form'
export const Home = () => {
  return (
	<div className={styles.formContainer}>
		<div className={styles.headerForm}>
			<div className={styles.imgContainer}>
				<img src={Oscars} alt='oscars-logo' className={styles.imgLogo}/>
			</div>
			<p className={styles.textSubtitle}>You will choose the film that represents the seventh art</p>
		</div>
		<div className={styles.mainForm}>
			<Form/>
		</div>
		<div className={styles.footerForm}>
g
		</div>
	</div>
  )
}

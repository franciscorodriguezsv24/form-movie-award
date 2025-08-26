import styles from './home.module.scss'
import Oscars from '../../assets/Oscars-Logo.png'
import { Form } from '../../components/form/Form'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import ModalContent from '../../components/modal/Modal'
export const Home = () => {

	  const [showModal, setShowModal] = useState(false);
	
  return (
	<div className={styles.formContainer}>
		<div className={styles.headerForm}>
			<div className={styles.imgContainer}>
				<img src={Oscars} alt='oscars-logo' className={styles.imgLogo}/>
			</div>
			<p className={styles.textSubtitle}>You will choose the film that represents the seventh art</p>
		</div>
		<div className={styles.mainForm}>
			<Form closeModal={setShowModal}/>
		</div>
		<div className={styles.footerForm}>
			&copy; The Oscars 2025
		</div>
		{showModal && createPortal(
			<ModalContent onClose={() => setShowModal(false)} />,
			document.getElementById("modal-root")!
		)}
	</div>
  )
}

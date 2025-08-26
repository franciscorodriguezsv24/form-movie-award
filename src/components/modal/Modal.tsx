import styles from './modal.module.scss'
import icon from '../../assets/check-icon.svg'
type OnAction = {
    readonly onClose: () => void
}

export default function ModalContent({ onClose }: OnAction ) {

    return (
        <div className={styles.styleLayout}>
            <div className={styles.cardModal}>
                <img src={icon} alt='check-icon' className={styles.imgCheck}/>
                <p>Thanks to send your vote to the academy!</p>
                <button onClick={onClose}>Close</button>

            </div>
        </div>
    );
    }

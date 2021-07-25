import styles from './Button.module.css'

const BoxButton = ({btn_text, handle_btn_click}) => {
    return (
        <button className={styles.button} onClick={handle_btn_click}>{btn_text}</button>
    )
};

export default BoxButton;
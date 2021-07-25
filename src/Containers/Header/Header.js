import styles from './Header.module.css'
import Logo from "../../Components/Logo/Logo";

const Header = ({faceRecognition}) => {

    return (
        <div className={styles.header__container}>
            <Logo/>
            {faceRecognition}
        </div>
    );
};

export default Header;
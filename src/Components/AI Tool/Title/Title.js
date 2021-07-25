import styles from './Title.module.css'

const Title = ({title}) => {
    return (
        <h1 className={styles.Title}>{title}</h1>
    )
};

export default Title;
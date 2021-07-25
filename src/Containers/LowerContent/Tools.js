import styles from './Tools.module.css'
import AI_Tool from "../../Components/AI Tool/AI_Tool";

const Tools = ({api_tools}) => {

    return (
        <div className={styles.tools}>
            <div className={styles.tools__main}>
                {
                    // eslint-disable-next-line react/jsx-pascal-case
                    api_tools.map((tool, index) => <AI_Tool title={tool.title}
                                                   btn_text={tool.btn_text}
                                                   api_callback={tool.api_callback}
                                                   onInputChange={tool.onInputChange}
                                                   onKeyPress={tool.onKeyPressAction}
                                                   inputPlaceHolder={tool.inputPlaceHolder} key={index}/>)
                }
            </div>

            <div className={styles.tools__chatbot}>

            </div>
        </div>
    );
};

export default Tools;
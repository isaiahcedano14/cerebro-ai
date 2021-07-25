import Title from "./Title/Title";
import Box from "./Box/Box";
import styles from './AI_Tool.module.css'

const AI_Tool = ({title, btn_text, api_callback, onInputChange, onKeyPress, inputPlaceHolder}) => {
    return (
        <div className={styles.ai_tool_container}>
            <Title title={title}/>
            <Box btn_text={btn_text}
                handle_btn_click={api_callback}
                handleInputChange={onInputChange}
                 onKeyPress={onKeyPress} inputPlaceHolder={inputPlaceHolder}/>
        </div>
    );
};

export default AI_Tool;
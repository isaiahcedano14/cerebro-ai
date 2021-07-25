const Input = ({handleInputChange, onKeyPress, inputPlaceHolder}) => {
    return (
        <input type="text" onChange={handleInputChange} onKeyPress={onKeyPress} placeholder={inputPlaceHolder}/>
    );
};

export default Input
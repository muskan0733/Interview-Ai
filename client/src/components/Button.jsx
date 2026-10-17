function Button(props){
    return(
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            {props.text}
        </button>
    );
}
export default Button;
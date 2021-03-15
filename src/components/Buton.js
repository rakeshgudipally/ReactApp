import PropTypes from 'prop-types';



const Buton = ({color, text, onClick}) => {
   
    return (
        <button onClick={onClick} 
            style= {{backgroundColor: color}}
            className='btn'>
                {text}
        </button>
    )
    
}

// Buton.defaultProps ={
//     color: 'steelblue'
// }

Buton.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick:PropTypes.func
}
export default Buton

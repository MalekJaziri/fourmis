import { useState } from 'react'
import './Footer.css'


export function Footer() {
	const [inputValue, setInputValue] = useState('Entrez votre adresse mail')
	
	function blur(value){
	    if (!inputValue.includes('@')){
	        alert (' votre adresse Mail doit comporter un @ ')
	    } else {
            console.log('Adresse e-mail valide :', inputValue);
    
	    }
	    
	}
	

	return (
		<footer>
			<div className='footer-elem'>
				Pour nous contacter
			</div>
			<div className='footer-elem'>Laissez-nous votre mail :</div>
			
			<input type="mail" name="adressemail" value={inputValue} 
			onChange= {(e) => setInputValue(e.target.value)}
			onBlur={blur}
			/>
			
		</footer>
	)
}


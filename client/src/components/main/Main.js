import './Main.scss'

export function  Main ({children}) {
    
    
    return(
        <main>
               
               <div className="container">
                    {children}
                </div>
            </main>
        )
}
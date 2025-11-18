const Header = ({name}) =>{

    return(
          <>
          <header className="py-6 px-20 drop-shadow-md shadow-red-800">
             <article className='flex justify-between items-center'>
              <div className='flex items-center'>
                     <h1 className="-m-3 text-3x1 font-bold text-red-600">Rates and Memories For Beaches </h1>
    </div>
    <div>
        <h3 className='text-red-400 font-semibold text-2xl'> {name}</h3>
    </div>
    </article>
     </header>
    
        </>
    
    );
      
}

export default Header;

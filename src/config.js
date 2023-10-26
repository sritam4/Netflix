export const url ="https://api.themoviedb.org/3";
export const key ="fda40c64cfb857e6f81ce954501e9d95";
export const imgUrl="https://image.tmdb.org/t/p/original";

export const Card=({img})=><img className='card' src={img} alt="cover" />
  
export const Row = ({title,arr})=>{
    return (
    <div className='row'>
      <h2>{title}</h2>
  
      <div>
        {arr?.map((item,e)=>{
          return(
            <Card key={e} img={`${imgUrl}/${item.poster_path}`}/>
          )
        })}
      </div>
    </div>
  )}
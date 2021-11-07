import { useState, useEffect } from "react";
import axios from 'axios'
 
export default function News(){

    const [data, setData]=useState([]);
    const [search, setSearch]=useState("");
    const [error,setError]=useState(false)
    const [loading, setLoading]=useState(false);
    const apiKey='YOUR API KEY';
    
    useEffect(()=>{
        getData()
    },[loading])

    async function getData(){
        try{
        const res= await axios.get(`https://newsapi.org/v2/everything?q=${search}&from=2021-11-04&sortBy=publishedAt&apiKey=${apiKey}`);
        setData(res.data.articles);
        console.log(data)
        
        }
        catch(err){
            console.log(err);
        }



        /*fetch(`https://newsapi.org/v2/everything?q=tesla&from=2021-06-26&sortBy=publishedAt&apiKey=f982ad5405ca46c69971293c237aeac3`)
        .then((res)=>res.json())
        .then((data)=>console.log(data.articles))
        .catch(err=>console.log(err));*/
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        //getData();
        if(data.length===0)
            setError(true)
        else
            setError(false)              
    }

    const listNews = data.map((news) =>(
        <div key={`${news.publishedAt}${news.author}`} className="col-*-*" style={{width:"400px"}}>
        <div className="card" style={{width: "18rem;"}}>
        <img className="card-img-top" src={news.urlToImage} alt="Card cap" />        
            <h2>{news.title}</h2>
            
            <p>{news.author}</p>
            <i>{news.publishedAt}</i>
            <p><a href={news.url}>{news.content}</a></p>

        </div>
        </div>
     
            
    

   ) 
);  
     

    return(
        <>
         <div className="container-fluid">
          
          <form onSubmit={handleSubmit} className="col-lg-6 offset-lg-3 "
          style={{"margin-left":"69%"}} >
          <div class="row justify-content-center">
          <div class="form-group" style={{"margin-top":"30px"}}>
          <label for="" style={{padding: "3px"}} ><strong>Search news: </strong></label>
              <input type="text" onChange={(e)=>setSearch(e.target.value)}  />
              
              <button type="submit" className="btn btn-primary">Search</button>
              </div>
              </div>
          </form>           
        
          <div className="row" style={{margin:"20px"}}>
              {listNews}
            {error&& 
            <div className="alert alert-danger">
            <strong>Sorry!</strong> No news found related to {search}
          </div>
          }
              
          </div>
          </div>
        </>

    );


} 

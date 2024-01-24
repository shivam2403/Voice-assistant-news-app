import './NewsCard.css'
import { useState,useEffect,createRef } from 'react';

const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage},i,activeArticle}) => {
    const words = description?.split(/\s+/);

    const extractedWords = words?.slice(0, Math.min(words.length, 15)).join(' ');
    const [elRefs,setElRefs]=useState([]);
    const scrollToRef=(ref)=>window.scroll(0, ref.current.offsetTop - 50);

    useEffect(()=>{
        setElRefs((refs)=>Array(20).fill().map((_,j)=>refs[j] || createRef()))
    },[])

    useEffect(()=>{
        if(i===activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle]);
        }
    },[i,activeArticle,elRefs])

  return (
    <div ref={elRefs[i]} className={`nc ${activeArticle===i && 'activeCard'}`}>
        <div className='cardActionsArea'>
            <img className='nc_img' src={urlToImage || "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} alt="" />
            <div style={{paddingLeft:"10px"}} className='nc_info'>
                <p>{(new Date(publishedAt)).toDateString()}</p>
                <p>{source.name}</p>
            </div>
            <h2 style={{paddingLeft:"10px"}} className='nc_title'>{title}</h2>
            <div style={{paddingLeft:"10px"}} className='cardContent'>
                <p className='nc_desc'>{extractedWords}</p>
            </div>
        </div>
        <div className="cardActions" style={{display:"flex",flexDirection:"row",justifySelf:"flex-end",alignItems:"center",gap:"10px"}}>
            <a href={url} target='_' ><button style={{marginLeft:"10px",border:"none",fontSize:"20px",cursor:"pointer"}} className='nc_btn'>Learn More</button></a>
            <h2 style={{marginRight:"10px",fontWeight:"lighter",color:"gray"}} className='nc_cnt'>{i+1}</h2>
        </div>
    </div>
  )
}

export default NewsCard
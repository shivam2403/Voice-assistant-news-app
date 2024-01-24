import React,{useState, useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards'
import './App.css'
import wordsToNumbers from 'words-to-numbers'
import { ALAN_API_KEY } from './utils'

const alanKey=ALAN_API_KEY;

const App = () => {
    const [newsArticles,setNewsArticles]=useState([]);
    const [activeArticle,setActiveArticle]=useState(-1);

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand:({command,articles,number})=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                    console.log(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((prevArticle)=>prevArticle+1);
                }else if(command === 'open'){
                    const parsedNumber=number.length>2 ? wordsToNumbers(number,{fuzzy:true}) : number;
                    const article=articles[parsedNumber-1];
                    console.log(article)

                    if(parsedNumber>20){
                        // alanBtn().playText("Please try that again.")
                    }else if(article?.author!=="heromesa"){
                        window.open(article.url,'_blank');
                        // alanBtn().playText('opening...');
                    }
                }
            }
        })
    },[])

  return (
    <div>
        <div className='logoContainer'>
            <img className='logo' src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" alt="" />
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  )
}

export default App
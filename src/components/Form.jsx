import React, { useState } from 'react';


export default () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleInputUrl = (event) => {
        setUrl(event.target.value);
    }


    const handleClick = async (event) => {
        event.preventDefault();
        console.log(url);
        try{
            const response = await fetch('http://localhost:3001/encurtar', {
                method: "POST",
                body: JSON.stringify({
                    url
                }),
                headers: {
                    "Content-type":"application/json"
                }
            });
    
            const data = await response.text();
            setShortUrl(data);
        }catch(error){
            console.log(error);
        }
        
    }


    return (
        <div>
            <form method="POST">
                <input type="text" name="url" value={url} onInput={handleInputUrl} />
                <button type="submit" onClick={handleClick}> Encurtar </button>
            </form>

            <h2>{shortUrl}</h2>
        </div>
    )



}
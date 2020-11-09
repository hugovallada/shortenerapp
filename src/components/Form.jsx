import React, { useState } from 'react';

import './Form.css';


export default () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleInputUrl = (event) => {
        setUrl(event.target.value);
    }


    const handleClick = async (event) => {
        event.preventDefault();
        console.log(url);
        try {
            const response = await fetch('http://localhost:3001/encurtar', {
                method: "POST",
                body: JSON.stringify({
                    url
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const data = await response.text();
            setShortUrl(data);
        } catch (error) {
            console.log(error);
        }

    }


    // função para copiar com click
    const handleCopy = (event) => {
        const el = document.createElement('textarea');
        el.value = shortUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const handleLink = () => {
        window.location.replace(shortUrl);
    }


    return (
        <div class="form-div">
            <form method="POST">
                <input type="text" name="url" value={url} onInput={handleInputUrl} />
                <button type="submit" onClick={handleClick}> Encurtar </button>
            </form>
            {shortUrl 
            ? 
            <div>
                <button type="button" onClick={handleCopy}>Copy</button>
                <p>{shortUrl}</p>
            </div>
            :
            shortUrl
            }
        </div>
    )



}
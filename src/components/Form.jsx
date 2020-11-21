/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import urlBase from '../sensible/urlBase'; //NOTE: Em caso de erro, criar o arquivo urlBase

import './Form.css';

export default () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [copiado, setCopiado] = useState(false);

    const handleInputUrl = (event) => {
        setUrl(event.target.value);
    }

    const handleClick = async (event) => {
        event.preventDefault();
        setCopiado(false);
        try {
            const base = urlBase || 'localhost:3001';
            const response = await fetch(`http://${base}/encurtar`, {
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
    const handleCopy = () => {
        const el = document.createElement('textarea');
        el.value = shortUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopiado(true)
    }

    const handleCleanClick = () => {
        setShortUrl('');
        setUrl('');
        setCopiado(false);
    }

    return (
        <div class="container">
            <h3 className="tc">Encurte as suas urls!</h3>
            <form method="POST">
                <div className="group">
                    <input type="text" name="url" value={url} onInput={handleInputUrl} className="form-input" placeholder="Digite a sua url aqui..." />
                    <button type="submit" onClick={handleClick} className="btn btn-primary btn-960">
                        Encurtar url
                    </button>
                </div>
            </form>
            <br /><br />
            {shortUrl && shortUrl !== '"Um erro aconteceu"'
                ?
                <>
                
                    <h3 className="tc">Sua ulr encurtada foi gerada!</h3><br/>
                    <div className="flex items-center justify-center pa4 bg-lightest-blue navy group-link rounded">
                        <p className="lh-title ml3">{shortUrl}</p><br />
                        {
                            !copiado 
                            ?
                            <button type="button" onClick={handleCopy} className="btn btn-clipboard">Copiar</button>
                            :
                            <p className="btn-clipboard-copiado">Copiado para o clipboard</p>
                        }
                    </div>
                    <br />
                    <div className="tc clean-button">
                        <button type="button" className="tc btn btn-danger" onClick={handleCleanClick}>Limpar</button>
                    </div>
                </>
                :
                ''
            }
        </div>
    )

}
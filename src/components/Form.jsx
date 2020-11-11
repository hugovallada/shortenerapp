/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';

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
                <div className="form-group row">
                    <input type="text" name="url" value={url} onInput={handleInputUrl} className="form-control col-11" placeholder="Digite a sua url aqui..." />
                    <button type="submit" onClick={handleClick} className="btn btn-primary col-1">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </button>
                </div>
            </form>
            <br /><br />
            {shortUrl
                ?
                <>
                    <h3 className="tc">Sua ulr encurtada foi gerada!</h3>
                    <div className="flex items-center justify-center pa4 bg-lightest-blue navy group-link">
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
                    <div className="tc">
                        <button type="button" className="tc btn btn-danger" onClick={handleCleanClick}>Limpar</button>
                    </div>
                </>
                :
                ''
            }
        </div>
    )

}
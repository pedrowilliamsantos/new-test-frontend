"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

const page = () => {
    const [validResponses, setValidResponses] = useState<string[]>([]);
    useEffect(() => {
        const currentUrl = window.location.href;
        const searchParams = new URLSearchParams(currentUrl.split('?')[1]);
        const respostas = searchParams.get('respostas');
        const responsesArray = respostas ? respostas.split(',') : [];
        setValidResponses(responsesArray);
    }, []);

    const questionData = [
        { title: 'Título da Pergunta 01', responseIndex: 0 },
        { title: 'Título da Pergunta 02', responseIndex: 1 },
        { title: 'Título da Pergunta 03', responseIndex: 2 },
    ];

    return (
        <>
            <div className='mx-60 mt-10'>
                <div className='flex mx-40 gap-3 text text-purple-800 text-2xl font-bold'>
                    <Link href={"/"}>
                        <h1 className='text-gray-300'>Questões</h1>
                    </Link>
                    <Link href={"/perguntas"}>
                        <h1 className='border-b-2 border-purple-600'>Respostas</h1>
                    </Link>
                </div>

                <div className='flex justify-center items-center gap-5 mt-5'>
                    {questionData.map((data, index) => (
                        <div key={index} className={`flex justify-center items-center gap-2 ${index === 2 ? 'text-purple-600 font-bold' : 'text-gray-300'}`}>
                            <FiEdit2 />
                            <button className={index === 2 ? 'border-b-2 border-purple-600' : 'cursor-no-drop'}>{`Caderno de Questoes ${index + 1}`}</button>
                        </div>
                    ))}
                </div>

                {questionData.map((data, index) => (
                    <div key={index} className='flex flex-col gap-5'>
                        <h1 className='flex items-center justify-start mt-5 font-bold text-xl'>{data.title}</h1>
                        <div className='text-gray-500'>
                            <span>Resposta:</span>
                            <p className='text-justify pt-5'>
                                {validResponses[data.responseIndex]}
                            </p>
                        </div>
                        {index < questionData.length - 1 && <hr />}
                    </div>
                ))}
            </div>
        </>
    );
};

export default page;

"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

interface Item {
    id: number;
    titulo: string;
    status: string;
    questoes: number;
}

const Questoes = () => {
    const [mostrarNaoRespondidas, setMostrarNaoRespondidas] = useState(false);

    const items: Item[] = [
        { id: 1, titulo: 'Título do caderno de questões 1', status: 'Respondido', questoes: 10 },
        { id: 2, titulo: 'Título do caderno de questões 2', status: 'Respondido', questoes: 10 },
        { id: 3, titulo: 'Título do caderno de questões 3', status: 'Nao-Respondido', questoes: 3 },
    ];

    const itensFiltrados = items.filter(
        item =>
            !mostrarNaoRespondidas ||
            (mostrarNaoRespondidas && item.status === 'Nao-Respondido')
    );

    return (
        <div className='mx-60 mt-10'>
            <div className='flex mx-40 gap-3 text text-purple-800 text-2xl font-bold'>
                <Link href={"/"}>
                    <h1 className='border-b-2 border-purple-600'>Questões</h1>
                </Link>
                <Link href={"/respostas"}>
                    <h1 className='text-gray-300'>Respostas</h1>
                </Link>
            </div>
            <div className='flex mx-40 gap-1 text-sm my-5 text-gray-500'>
                <input
                    className='cursor-pointer'
                    type="checkbox"
                    id="mostrarNaoRespondidas"
                    checked={mostrarNaoRespondidas}
                    onChange={() => setMostrarNaoRespondidas(!mostrarNaoRespondidas)}
                />
                <label htmlFor="mostrarNaoRespondidas">Mostrar apenas questões não respondidas</label>
            </div>
            <div className='flex justify-center gap-5'>
                {itensFiltrados.map((item) => (
                    <section key={item.id} className='flex-col flex border-2 rounded-3xl p-6 gap-6'>
                        <FiEdit2 size={25} />
                        <h1 className='font-bold text-xl'>{item.titulo}</h1>
                        <div>
                            <span className={`${item.status === 'Respondido' ? "text-green-600 bg-green-300" : ""} font-bold rounded-md p-1 text-sm ${item.status === 'Nao-Respondido' ? 'bg-orange-100 text-orange-400' : ''}`}>
                                {item.status === 'Respondido' ? 'Respondido' : 'Não Respondido'}
                            </span>
                        </div>
                        <span className='text-gray-500'>{item.questoes} questões</span>
                        <Link href={"/perguntas"}>
                            <button
                                disabled={item.status === "Respondido"}
                                style={{ cursor: item.status === "Respondido" ? 'not-allowed' : 'pointer' }}
                                className={`border ${item.status !== "Respondido" ? 'bg-purple-600' : 'bg-purple-400'} px-10 py-2 rounded-3xl text-white font-bold`}
                            >
                                Responder
                            </button>
                        </Link>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Questoes;
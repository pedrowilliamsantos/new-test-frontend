"use client"
import React, { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { CiTimer } from 'react-icons/ci';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";



const Page = () => {
    const [timeRemaining, setTimeRemaining] = useState<number>(25 * 60);
    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);
    const [responses, setResponses] = useState<string[]>(['', '', '']);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);
    let interval: NodeJS.Timeout;

    const startTimer = () => {
        interval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime > 0) {
                    const newMinutes = Math.floor(prevTime / 60);
                    const newSeconds = prevTime % 60;
                    setMinutes(newMinutes);
                    setSeconds(newSeconds);
                    return prevTime - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(interval);
    }, []);

    const formatTime = (timeInSeconds: number): string => {
        const formattedMinutes = Math.floor(timeInSeconds / 60);
        const formattedSeconds = timeInSeconds % 60;
        return `${String(formattedMinutes).padStart(2, '0')}:${String(formattedSeconds).padStart(2, '0')}`;
    };

    const handleEnviarResposta = () => {
        const currentResponse = responses[currentQuestion - 1];

        if (currentResponse.trim() === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Por favor, escreva uma resposta antes de enviar!',
            });
            return;
        }

        if (currentQuestion < 3) {
            setCurrentQuestion(currentQuestion + 1);
            setCharCount(0);
        } else {
            const totalTimeElapsed = 25 * 60 - timeRemaining;
            setElapsedTime(totalTimeElapsed);

            Swal.fire({
                title: 'Tem certeza?',
                text: 'Ao enviar as respostas, você finalizará o teste. Deseja continuar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, enviar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        titleText: "Agradecemos sua participação!",
                        customClass: {
                            title: 'text-purple-800 font-bold text-2lg',
                        },
                        html: `
                            <div class="text-center">
                                <p>Respostas enviadas com sucesso</p>
                                <div class="flex items-center justify-center pt-5">          
                                    <img src="/time.png" alt="" style="width: 20px; height: 20px; margin-right: 10px;" /> 
                                    <span>${formatTime(totalTimeElapsed)} de duração</span>
                                </div>
                            </div>
                        `,
                        imageUrl: "/trofeu.png",
                        imageWidth: 190,
                        imageHeight: 150,
                        confirmButtonText: 'Valeu!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setCurrentQuestion(3);
                            setCharCount(0);
                            const query = responses.join();
                            window.location.href = `/respostas?respostas=${query}`;
                        }
                    });
                } else {
                    setCurrentQuestion(3);
                    setCharCount(0);
                }
            });
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < 3) {
            setCurrentQuestion(currentQuestion + 1);
            setCharCount(0);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
            setCharCount(0);
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const index = currentQuestion - 1;
        const updatedResponses = [...responses];
        const newResponse = e.target.value;

        if (newResponse.length <= 300) {
            updatedResponses[index] = newResponse;
            setCharCount(newResponse.length);
        }
        updatedResponses[index] = e.target.value;
        setResponses(updatedResponses);
    };

    return (
        <>
            <div className='flex justify-between items-center text-center pt-10'>
                <div></div>
                <div className='flex items-center gap-1 ml-40'>
                    <FiEdit2 size={20} />
                    <h1 className='font-bold text-xl'>Título do caderno de questões 3</h1>
                </div>
                <div className='flex items-center text-gray-600 text-xl mr-10 border-2 rounded-md p-1 gap-2 px-5 border-gray-600'>
                    <CiTimer />
                    <span>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</span>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
                <h1 className='font-bold text-gray-400 pt-5'>{`Título da pergunta ${String(currentQuestion).padStart(2, '0')}/03`}</h1>
                <span className='font-bold text-justify w-2/5'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur provident
                    repellat, alias enim blanditiis nesciunt voluptatum beatae? Quam fugit illum voluptatum
                    rem facilis, ratione praesentium officia quo officiis sed iste.
                </span>
                <div className="relative">
                    <textarea
                        className="flex justify-center items-center bg-gray-200 p-5 border-none relative"
                        cols={80}
                        rows={10}
                        placeholder='Escreva sua resposta aqui'
                        value={responses[currentQuestion - 1]}
                        onChange={handleTextareaChange}
                    />
                    <div className="absolute top-2 right-2 p-2 text-sm">
                        <span>{charCount}/300</span>
                    </div>
                </div>
                <button
                    className='bg-purple-600 px-10 py-2 rounded-3xl text-white font-bold'
                    onClick={handleEnviarResposta}
                >
                    {currentQuestion === 3 ? 'Enviar Resposta e Finalizar' : 'Enviar Resposta'}
                </button>
                <div className='flex justify-between items-center mx-60 gap-80'>
                    <button
                        className='px-5 py-2 rounded-3xl text-gray-500 font-bold flex items-center gap-2'
                        onClick={handlePreviousQuestion}
                        style={{ cursor: currentQuestion === 1 ? 'no-drop' : 'pointer' }}
                        disabled={currentQuestion === 1}
                    >
                        <FaArrowLeft />
                        Anterior
                    </button>
                    <button
                        className='px-5 py-2 rounded-3xl text-gray-500 font-bold flex items-center gap-2'
                        onClick={handleNextQuestion}
                        disabled={currentQuestion === 3}
                        style={{ cursor: currentQuestion === 3 ? 'no-drop' : 'pointer' }}
                    >
                        Próxima
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Page;
